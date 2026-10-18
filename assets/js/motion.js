/* ============================================================================
 * IGRYbuilds — Global Motion System (motion.js, 2026-10-18 redesign)
 * Loaded on the homepage (defer). Owns: Lenis smooth scroll, GSAP/ScrollTrigger
 * wiring, masked line-reveal choreography, magnetic buttons, hero intro
 * coordination, and global rAF/loop pausing.
 *
 * Motion language: ONE authored easing — cubic-bezier(0.22, 1, 0.36, 1) —
 * used for everything. Reveals are masked line reveals
 * (overflow:hidden wrapper + translateY(112%)→0), 900ms, 60ms stagger.
 * No glitch, no flicker, no scramble.
 *
 * Conventions for markup (built by other builders):
 *   [data-reveal]            masked line reveal on scroll into view
 *     data-reveal-delay="0.15"                 stagger/offset seconds
 *   [data-reveal-group] > [data-reveal-item]  staggered group reveal
 *   [data-reveal-lines]      headline split into masked lines, rise on enter
 *   [data-magnetic]          magnetic pull toward cursor (desktop only)
 *   [data-hero-intro]        hero entrance items (played on igry:hero-ready)
 *   [data-cursor="view"]     cursor morphs into "VIEW" badge (cursor.js)
 *
 * Resilience rules (hard):
 *  - Hidden initial states are set ONLY via JS (gsap.from / gsap.set).
 *    CSS never hides [data-reveal] elements, so no-JS / CDN-fail pages
 *    render complete content.
 *  - Every feature guards on its dependency (gsap, ScrollTrigger, Lenis).
 *  - prefers-reduced-motion: no Lenis smoothing, no reveals, no loops —
 *    content appears in final state immediately.
 *  - Mobile <900px: no custom cursor, no magnetic, no pins; simple reveals.
 *  - Only transform/opacity are animated. Never layout properties.
 * ========================================================================== */
(function () {
  'use strict';

  window.IGRY = window.IGRY || {};
  var IGRY = window.IGRY;

  /* ------------------------------------------------------------------ */
  /* The one authored easing: cubic-bezier(0.22, 1, 0.36, 1)               */
  /* ------------------------------------------------------------------ */
  function cubicBezierEasing(x1, y1, x2, y2) {
    var cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
    var cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
    function sampleX(t) { return ((ax * t + bx) * t + cx) * t; }
    function sampleY(t) { return ((ay * t + by) * t + cy) * t; }
    function sampleDX(t) { return (3 * ax * t + 2 * bx) * t + cx; }
    function solveX(x) {
      var t = x, i, err, d;
      for (i = 0; i < 8; i++) {
        err = sampleX(t) - x;
        if (Math.abs(err) < 1e-6) return t;
        d = sampleDX(t);
        if (Math.abs(d) < 1e-6) break;
        t -= err / d;
      }
      var lo = 0, hi = 1;
      t = x;
      while (hi - lo > 1e-6) {
        if (Math.abs(sampleX(t) - x) < 1e-6) return t;
        if (x > sampleX(t)) lo = t; else hi = t;
        t = (hi - lo) * 0.5 + lo;
      }
      return t;
    }
    return function (p) {
      if (p <= 0) return 0;
      if (p >= 1) return 1;
      return sampleY(solveX(p));
    };
  }
  var EASE = cubicBezierEasing(0.22, 1, 0.36, 1);

  /* ------------------------------------------------------------------ */
  /* Environment                                                          */
  /* ------------------------------------------------------------------ */
  var DESKTOP_Q = '(min-width: 900px)';
  var REDUCED_Q = '(prefers-reduced-motion: reduce)';

  function mq(q) {
    return typeof window.matchMedia === 'function'
      ? window.matchMedia(q).matches
      : false;
  }
  function reducedMotion() { return mq(REDUCED_Q); }
  function isDesktop() { return mq(DESKTOP_Q); }

  function hasGSAP() {
    return typeof window.gsap !== 'undefined' &&
           typeof window.ScrollTrigger !== 'undefined';
  }
  function hasLenis() { return typeof window.Lenis !== 'undefined'; }

  var state = {
    lenis: null,
    heroIntroPlayed: false,
    heroIntroTimer: null,
    started: false
  };

  /* ------------------------------------------------------------------ */
  /* Lenis + GSAP single-loop wiring                                       */
  /* Canonical pattern: ONE frame-loop owner (gsap.ticker), lagSmoothing 0 */
  /* ------------------------------------------------------------------ */
  function initLenis() {
    if (reducedMotion() || !hasLenis()) return null;

    var lenis;
    try {
      if (hasGSAP()) {
        // autoRaf OFF — gsap.ticker owns the loop (never both).
        lenis = new window.Lenis({
          lerp: 0.1,
          smoothWheel: true,
          anchors: true,
          autoRaf: false
        });
        lenis.on('scroll', window.ScrollTrigger.update);
        window.gsap.ticker.add(function (time) {
          lenis.raf(time * 1000);
        });
        window.gsap.ticker.lagSmoothing(0);
      } else {
        lenis = new window.Lenis({
          lerp: 0.1,
          smoothWheel: true,
          anchors: true,
          autoRaf: true
        });
      }
    } catch (err) {
      // Lenis failed (CDN quirk, old engine) — native scroll is fine.
      return null;
    }
    return lenis;
  }

  /* In-page anchor smoothing when Lenis is absent (native otherwise). */
  function initAnchorFallback() {
    if (state.lenis || reducedMotion()) return;
    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, { passive: false });
  }

  /* Lenis-aware scrollTo helper for other builders. */
  function scrollToTarget(target, opts) {
    opts = opts || {};
    if (state.lenis) {
      state.lenis.scrollTo(target, {
        offset: typeof opts.offset === 'number' ? opts.offset : -72,
        duration: reducedMotion() ? 0 : (opts.duration || 1.4),
        easing: EASE
      });
    } else if (typeof target === 'string') {
      var el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' });
    } else if (target && target.scrollIntoView) {
      target.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' });
    }
  }

  /* ------------------------------------------------------------------ */
  /* Masked line reveals                                                   */
  /* Each [data-reveal] is wrapped in an overflow:hidden mask (JS-built)   */
  /* and rises translateY(112%)→0 on scroll enter. Unwrapped on complete   */
  /* so hover lifts / shadows are never clipped afterwards.                */
  /* ------------------------------------------------------------------ */
  function wrapMask(el) {
    var parent = el.parentNode;
    if (!parent) return null;
    var mask = document.createElement('div');
    mask.className = 'igry-reveal-mask';
    parent.insertBefore(mask, el);
    mask.appendChild(el);
    return mask;
  }

  function unwrapMask(el, mask) {
    var parent = mask.parentNode;
    if (!parent) return;
    parent.insertBefore(el, mask);
    parent.removeChild(mask);
  }

  function maskedReveal(el, delay, triggerEl) {
    var gsap = window.gsap;
    var mask = wrapMask(el);
    if (!mask) return;
    el.classList.add('igry-revealing'); // CSS transitions off while GSAP drives
    gsap.from(el, {
      yPercent: 112,
      duration: 0.9,
      ease: EASE,
      delay: delay || 0,
      overwrite: 'auto',
      scrollTrigger: { trigger: triggerEl || mask, start: 'top 90%', once: true },
      onComplete: function () {
        el.classList.remove('igry-revealing');
        unwrapMask(el, mask);
        gsap.set(el, { clearProps: 'transform,opacity' });
      }
    });
  }

  function initReveals() {
    if (!hasGSAP() || reducedMotion()) return;
    var gsap = window.gsap;

    if (window.ScrollTrigger) {
      window.ScrollTrigger.config({ ignoreMobileResize: true });
    }

    // Single-attribute masked reveals.
    gsap.utils.toArray('[data-reveal]').forEach(function (el) {
      var delay = parseFloat(el.getAttribute('data-reveal-delay') || '0', 10) || 0;
      maskedReveal(el, delay);
    });

    // Staggered groups — 60ms between items.
    gsap.utils.toArray('[data-reveal-group]').forEach(function (group) {
      var items = group.querySelectorAll('[data-reveal-item]');
      if (!items.length) return;
      var wrapped = [];
      Array.prototype.forEach.call(items, function (item, i) {
        var mask = wrapMask(item);
        if (mask) wrapped.push({ el: item, mask: mask, i: i });
      });
      if (!wrapped.length) return;
      var wrappedEls = wrapped.map(function (w) { return w.el; });
      wrappedEls.forEach(function (el) { el.classList.add('igry-revealing'); });
      gsap.from(wrappedEls, {
        yPercent: 112,
        duration: 0.9,
        ease: EASE,
        stagger: 0.06,
        overwrite: 'auto',
        scrollTrigger: { trigger: group, start: 'top 88%', once: true },
        onComplete: function () {
          wrapped.forEach(function (w) {
            w.el.classList.remove('igry-revealing');
            unwrapMask(w.el, w.mask);
            gsap.set(w.el, { clearProps: 'transform,opacity' });
          });
        }
      });
    });

    // Masked line reveals for headlines — deferred until webfonts land so
    // word-wrap measurement matches the rendered type. Safety timeout in
    // case fonts.ready never resolves.
    (function initLineReveals() {
      var els = gsap.utils.toArray('[data-reveal-lines]');
      if (!els.length) return;
      var done = false;
      var run = function () {
        if (done) return;
        done = true;
        els.forEach(function (el) { splitLinesReveal(el); });
        try { window.ScrollTrigger.refresh(); } catch (e) { /* noop */ }
      };
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(run);
        setTimeout(run, 1600);
      } else {
        run();
      }
    })();

    // Refresh once webfonts land so trigger positions are exact.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        try { window.ScrollTrigger.refresh(); } catch (e) { /* noop */ }
      });
    }
  }

  /**
   * Split an element's text into visual lines (word-wrap aware), wrap each
   * line in an overflow-hidden mask, and rise lines up on scroll enter.
   * Fallback: plain fade if measurement fails.
   */
  function splitLinesReveal(el) {
    var gsap = window.gsap;
    var original = el.textContent;
    var words = original.trim().split(/\s+/);
    if (words.length < 2) {
      maskedReveal(el, 0);
      return;
    }
    try {
      el.setAttribute('aria-label', original.trim());
      el.innerHTML = '';
      var frag = document.createDocumentFragment();
      words.forEach(function (w, i) {
        var s = document.createElement('span');
        s.className = 'rl-word';
        s.textContent = w;
        s.setAttribute('aria-hidden', 'true');
        frag.appendChild(s);
        if (i < words.length - 1) frag.appendChild(document.createTextNode(' '));
      });
      el.appendChild(frag);

      var wordEls = Array.prototype.slice.call(el.querySelectorAll('.rl-word'));
      var lines = [];
      var current = [];
      var lastTop = null;
      wordEls.forEach(function (w) {
        var top = w.offsetTop;
        if (lastTop === null || Math.abs(top - lastTop) < 4) {
          current.push(w);
        } else {
          lines.push(current);
          current = [w];
        }
        lastTop = top;
      });
      if (current.length) lines.push(current);
      if (!lines.length) throw new Error('no lines');

      el.innerHTML = '';
      var lineInners = [];
      lines.forEach(function (lineWords) {
        var mask = document.createElement('span');
        mask.className = 'rl-line';
        mask.setAttribute('aria-hidden', 'true');
        var inner = document.createElement('span');
        inner.className = 'rl-inner';
        lineWords.forEach(function (w, i) {
          inner.appendChild(w);
          if (i < lineWords.length - 1) inner.appendChild(document.createTextNode(' '));
        });
        mask.appendChild(inner);
        el.appendChild(mask);
        lineInners.push(inner);
      });

      gsap.from(lineInners, {
        yPercent: 112,
        duration: 0.9,
        ease: EASE,
        stagger: 0.06,
        overwrite: 'auto',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
    } catch (err) {
      // Measurement failed (hidden element, odd layout) — restore + masked reveal.
      el.textContent = original;
      maskedReveal(el, 0);
    }
  }

  /* ------------------------------------------------------------------ */
  /* Magnetic buttons (desktop, fine pointer, no reduced motion)           */
  /* ------------------------------------------------------------------ */
  function initMagnetic() {
    if (!hasGSAP() || reducedMotion() || !isDesktop()) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    var gsap = window.gsap;

    gsap.utils.toArray('[data-magnetic]').forEach(function (el) {
      var xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: EASE });
      var yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: EASE });
      var strength = parseFloat(el.getAttribute('data-magnetic-strength') || '0.35', 10) || 0.35;

      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      });
      el.addEventListener('mouseleave', function () {
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: EASE, overwrite: 'auto' });
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Hero intro — coordinated with hero.js via igry:hero-ready             */
  /* ------------------------------------------------------------------ */
  function initHeroIntro() {
    var items = document.querySelectorAll('[data-hero-intro]');
    if (!items.length) return;

    var play = function () {
      if (state.heroIntroPlayed) return;
      state.heroIntroPlayed = true;
      if (state.heroIntroTimer) { clearTimeout(state.heroIntroTimer); state.heroIntroTimer = null; }
      if (!hasGSAP() || reducedMotion()) return; // already in final state
      window.gsap.fromTo(items,
        { opacity: 0, y: 44 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: EASE,
          stagger: 0.06, overwrite: 'auto', clearProps: 'transform'
        });
    };

    if (hasGSAP() && !reducedMotion()) {
      // Set hidden state via JS only (no-JS pages stay complete).
      window.gsap.set(items, { opacity: 0, y: 44 });
    }

    window.addEventListener('igry:hero-ready', play);
    // Fallback: if hero.js never fires (script blocked), still play the
    // intro shortly after load.
    state.heroIntroTimer = setTimeout(play, 3500);
  }

  /* ------------------------------------------------------------------ */
  /* Global pause — tab hidden / pagehide                                  */
  /* ------------------------------------------------------------------ */
  function pauseAll() {
    if (state.lenis) { try { state.lenis.stop(); } catch (e) { /* noop */ } }
    if (hasGSAP()) { try { window.gsap.ticker.sleep(); } catch (e) { /* noop */ } }
    if (IGRY.hero && typeof IGRY.hero.pause === 'function') {
      try { IGRY.hero.pause(); } catch (e) { /* noop */ }
    }
  }
  function resumeAll() {
    if (state.lenis) { try { state.lenis.start(); } catch (e) { /* noop */ } }
    if (hasGSAP()) { try { window.gsap.ticker.wake(); } catch (e) { /* noop */ } }
    if (IGRY.hero && typeof IGRY.hero.resume === 'function') {
      try { IGRY.hero.resume(); } catch (e) { /* noop */ }
    }
  }

  function initVisibilityPausing() {
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) pauseAll(); else resumeAll();
    });
    window.addEventListener('pagehide', pauseAll);
  }

  /* ------------------------------------------------------------------ */
  /* Boot                                                                */
  /* ------------------------------------------------------------------ */
  function init() {
    if (state.started) return;
    state.started = true;

    if (hasGSAP() && window.ScrollTrigger) {
      try { window.gsap.registerPlugin(window.ScrollTrigger); } catch (e) { /* noop */ }
    }

    state.lenis = initLenis();
    initAnchorFallback();
    initReveals();
    initMagnetic();
    initHeroIntro();
    initVisibilityPausing();
  }

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  /* Public API for other builders. */
  IGRY.motion = {
    init: init,
    refresh: function () {
      if (hasGSAP() && window.ScrollTrigger) {
        try { window.ScrollTrigger.refresh(); } catch (e) { /* noop */ }
      }
    },
    scrollTo: scrollToTarget,
    pause: pauseAll,
    resume: resumeAll,
    get lenis() { return state.lenis; },
    reducedMotion: reducedMotion(),
    isDesktop: isDesktop(),
    /* test seam */
    _utils: {
      reducedMotion: reducedMotion,
      isDesktop: isDesktop,
      hasGSAP: hasGSAP,
      hasLenis: hasLenis
    }
  };

  ready(init);
})();
