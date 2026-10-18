/* ============================================================================
 * IGRYbuilds — Light Hero Canvas (hero.js, 2026-10-18 redesign)
 * Slow drifting radial washes (terracotta / ochre, <=6% opacity) on a
 * 2D canvas over warm paper. No WebGL, no three.js, no neon.
 *
 * GATING (all must pass, else clean CSS fallback):
 *   - viewport width >= 900px (desktop)
 *   - prefers-reduced-motion: no-preference
 *   - navigator.connection.saveData is falsy
 *   - 2D canvas context actually creatable
 *
 * MARKUP CONTRACT:
 *   <section id="igry-hero" data-hero>
 *     <canvas id="hero-canvas"> (created if absent)
 *     <div class="hero-content"> …headline, intent menu… </div>
 *   </section>
 *
 * LIFECYCLE: hero.js dispatches `igry:hero-ready` (detail.mode =
 * 'canvas' | 'fallback') once the first frame is painted or the fallback
 * is applied. boot.js listens to fade the scene in; motion.js listens to
 * play the hero intro choreography ([data-hero-intro]).
 *
 * Fallback: section gets .hero-fallback (pure CSS washes, animated
 * drift, disabled under reduced-motion). Never a broken canvas.
 * ========================================================================== */
(function () {
  'use strict';

  window.IGRY = window.IGRY || {};
  var IGRY = window.IGRY;

  var SELECTOR = '#igry-hero';
  var CANVAS_ID = 'hero-canvas';

  /* Terracotta / ochre washes — alpha capped at 0.06 (<=6% opacity). */
  var WASHES = [
    { x: 0.20, y: 0.28, r: 0.46, rgb: '180,80,46',   a: 0.060, dx: 0.055, dy: 0.035, sp: 0.10, ph: 0.0 },
    { x: 0.80, y: 0.20, r: 0.40, rgb: '206,138,58',  a: 0.050, dx: 0.045, dy: 0.030, sp: 0.08, ph: 2.1 },
    { x: 0.64, y: 0.82, r: 0.46, rgb: '147,57,31',   a: 0.045, dx: 0.040, dy: 0.045, sp: 0.065, ph: 4.2 },
    { x: 0.30, y: 0.86, r: 0.34, rgb: '180,80,46',   a: 0.035, dx: 0.035, dy: 0.030, sp: 0.09, ph: 5.5 }
  ];

  var api = {
    mode: 'pending',   // 'canvas' | 'fallback' | 'pending'
    pause: pause,
    resume: resume,
    supports: supports,
    init: init
  };
  IGRY.hero = api;

  /* ------------------------------------------------------------------ */
  /* Gating                                                                */
  /* ------------------------------------------------------------------ */
  function supports() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return false;
    try {
      if (typeof window.matchMedia === 'function') {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
        if (!window.matchMedia('(min-width: 900px)').matches) return false;
      } else {
        return false; // can't verify — stay safe, use fallback
      }
      if (window.navigator && window.navigator.connection &&
          window.navigator.connection.saveData) return false;
      var c = document.createElement('canvas');
      return !!(c.getContext && c.getContext('2d'));
    } catch (e) {
      return false;
    }
  }

  function afterFirstPaint() {
    return new Promise(function (resolve) {
      var done = function () { resolve(); };
      if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(done, { timeout: 1500 });
      } else if (document.readyState === 'complete') {
        window.setTimeout(done, 60);
      } else {
        window.addEventListener('load', function () { window.setTimeout(done, 60); }, { once: true });
        // Safety: never wait forever on a stalled load event.
        window.setTimeout(done, 4000);
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Fallback                                                              */
  /* ------------------------------------------------------------------ */
  function applyFallback(heroEl, reason) {
    api.mode = 'fallback';
    if (heroEl) {
      heroEl.classList.add('hero-fallback');
      heroEl.setAttribute('data-hero-state', 'ready');
      var stale = heroEl.querySelector('#' + CANVAS_ID);
      if (stale && stale.parentNode) stale.parentNode.removeChild(stale);
    }
    dispatchReady('fallback', reason);
  }

  function dispatchReady(mode, reason) {
    try {
      window.dispatchEvent(new window.CustomEvent('igry:hero-ready', {
        detail: { mode: mode, reason: reason || null }
      }));
    } catch (e) { /* very old engine — boot.js timeout covers it */ }
  }

  /* ------------------------------------------------------------------ */
  /* 2D wash canvas                                                        */
  /* ------------------------------------------------------------------ */
  var live = null; // holds the running scene for pause/resume/teardown

  function startCanvas(heroEl) {
    var canvas = heroEl.querySelector('#' + CANVAS_ID);
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = CANVAS_ID;
      heroEl.insertBefore(canvas, heroEl.firstChild);
    }
    canvas.setAttribute('aria-hidden', 'true'); // decorative — headline stays in the DOM

    var ctx;
    try {
      ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('no-2d');
    } catch (e) {
      applyFallback(heroEl, 'canvas-failed');
      return;
    }

    var w = 0, h = 0, dpr = 1;
    function size() {
      w = heroEl.clientWidth || window.innerWidth;
      h = heroEl.clientHeight || window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }
    size();

    // Scroll scrub: drives --hs (0→1) for the CSS parallax on .hero-content.
    var scrollP = 0;
    var scrub = null;
    var onScrollNative = null;
    function setScroll(p) {
      scrollP = Math.max(0, Math.min(1, p));
      heroEl.style.setProperty('--hs', scrollP.toFixed(4));
    }
    if (window.ScrollTrigger) {
      scrub = window.ScrollTrigger.create({
        trigger: heroEl,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: function (self) { setScroll(self.progress); }
      });
    } else {
      onScrollNative = function () {
        var r = heroEl.getBoundingClientRect();
        setScroll(-r.top / (r.height || 1));
      };
      window.addEventListener('scroll', onScrollNative, { passive: true });
      onScrollNative();
    }

    // Pause when offscreen or tab hidden — zero wasted frames.
    var inView = true;
    var tabVisible = !document.hidden;
    var io = null;
    if (typeof window.IntersectionObserver === 'function') {
      io = new window.IntersectionObserver(function (entries) {
        inView = entries[0] && entries[0].isIntersecting;
      }, { threshold: 0.02 });
      io.observe(heroEl);
    }
    var onVis = function () { tabVisible = !document.hidden; };
    document.addEventListener('visibilitychange', onVis);

    var running = true;
    var firstFrame = true;
    var lastDraw = 0;
    var startT = (window.performance && performance.now) ? performance.now() : Date.now();

    function markReady() {
      if (!firstFrame) return;
      firstFrame = false;
      heroEl.setAttribute('data-hero-state', 'ready');
      heroEl.classList.add('is-live'); // CSS fades the canvas in
      dispatchReady('canvas');
    }

    function draw(now) {
      var t = (now - startT) / 1000;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      var fade = 1 - scrollP * 0.55;
      for (var i = 0; i < WASHES.length; i++) {
        var wsh = WASHES[i];
        var cx = (wsh.x + wsh.dx * Math.sin(t * wsh.sp + wsh.ph)) * w;
        var cy = (wsh.y + wsh.dy * Math.cos(t * wsh.sp * 0.8 + wsh.ph)) * h;
        var rr = wsh.r * Math.max(w, h) * (1 + 0.05 * Math.sin(t * wsh.sp * 0.6 + wsh.ph));
        var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr);
        var a = (wsh.a * fade).toFixed(4);
        g.addColorStop(0, 'rgba(' + wsh.rgb + ',' + a + ')');
        g.addColorStop(1, 'rgba(' + wsh.rgb + ',0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
    }

    function frame(now) {
      if (!running) return;
      live.raf = requestAnimationFrame(frame);
      if (!inView || !tabVisible || document.hidden) return;
      // Throttle: ~20fps is plenty for slow washes; keeps it cheap.
      if (now - lastDraw < 50) return;
      lastDraw = now;
      draw(now);
      markReady(); // first painted frame — boot.js fades the scene in now
    }

    function onResize() { size(); }

    window.addEventListener('resize', onResize);

    function teardown() {
      running = false;
      if (live && live.raf) cancelAnimationFrame(live.raf);
      window.removeEventListener('resize', onResize);
      if (onScrollNative) window.removeEventListener('scroll', onScrollNative);
      document.removeEventListener('visibilitychange', onVis);
      if (io) io.disconnect();
      if (scrub) scrub.kill();
      live = null;
      // Restore the safe no-op closures so pause()/resume() stay throwable-free.
      api.pause = pause;
      api.resume = resume;
      delete api.teardown;
    }

    live = {
      raf: 0,
      pause: function () { running = false; if (live.raf) cancelAnimationFrame(live.raf); },
      resume: function () {
        if (running || api.mode !== 'canvas') return;
        running = true;
        live.raf = requestAnimationFrame(frame);
      },
      teardown: teardown,
      setScroll: setScroll
    };

    api.mode = 'canvas';
    api.pause = live.pause;
    api.resume = live.resume;
    api.teardown = live.teardown;

    live.raf = requestAnimationFrame(frame);
  }

  function pause() { if (live && live.pause) live.pause(); }
  function resume() { if (live && live.resume) live.resume(); }

  /* ------------------------------------------------------------------ */
  /* Boot                                                                  */
  /* ------------------------------------------------------------------ */
  var booted = false;

  function init(selector) {
    if (booted) return Promise.resolve(api.mode);
    booted = true;
    var heroEl = document.querySelector(selector || SELECTOR);

    if (!heroEl) {
      // Homepage contract broken — nothing to do, but still signal.
      dispatchReady('fallback', 'no-hero-element');
      api.mode = 'fallback';
      return Promise.resolve(api.mode);
    }

    if (!supports()) {
      applyFallback(heroEl, 'gate');
      return Promise.resolve(api.mode);
    }

    return afterFirstPaint().then(function () {
      if (!supports()) { // re-check: resize / settings may have changed
        applyFallback(heroEl, 'gate-late');
        return api.mode;
      }
      startCanvas(heroEl);
      return api.mode;
    });
  }

  /* Auto-boot on the homepage when the hero section exists. Other builders
   * may also call IGRY.hero.init('#igry-hero') explicitly — init is idempotent. */
  function autoBoot() {
    var run = function () {
      if (document.querySelector(SELECTOR)) init(SELECTOR);
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run, { once: true });
    } else {
      run();
    }
  }
  autoBoot();
})();
