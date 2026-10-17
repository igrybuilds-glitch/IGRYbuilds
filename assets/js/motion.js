/* ============================================================================
 * IGRYbuilds — Global Motion System (motion.js)
 * Loaded on EVERY page (defer). Owns: Lenis smooth scroll, GSAP/ScrollTrigger
 * wiring, reveal-on-scroll choreography, glitch text reveals, magnetic
 * buttons, hero intro coordination, and global rAF/loop pausing.
 *
 * Conventions for markup (built by other builders):
 *   [data-reveal]            fade-up reveal on scroll into view
 *     data-reveal="up|down|left|right|fade|scale"   (default "up")
 *     data-reveal-delay="0.15"                     stagger/offset seconds
 *   [data-reveal-group] > [data-reveal-item]        staggered group reveal
 *   [data-reveal-lines]      headline split into masked lines, rise on enter
 *   [data-glitch]            scramble-decode text reveal on scroll enter
 *     (optional) data-glitch="EXACT TEXT"           explicit final text
 *   [data-glitch-hover]      quick scramble on hover (nav links, labels)
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
        easing: function (t) { return 1 - Math.pow(1 - t, 4); }
      });
    } else if (typeof target === 'string') {
      var el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' });
    } else if (target && target.scrollIntoView) {
      target.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth' });
    }
  }

  /* ------------------------------------------------------------------ */
  /* Reveal-on-scroll choreography                                         */
  /* ------------------------------------------------------------------ */
  function initReveals() {
    if (!hasGSAP() || reducedMotion()) return;
    var gsap = window.gsap;

    if (hasGSAP() && window.ScrollTrigger) {
      window.ScrollTrigger.config({ ignoreMobileResize: true });
    }

    // Single-attribute reveals.
    gsap.utils.toArray('[data-reveal]').forEach(function (el) {
      var kind = (el.getAttribute('data-reveal') || 'up').toLowerCase();
      var delay = parseFloat(el.getAttribute('data-reveal-delay') || '0', 10) || 0;
      var vars = {
        opacity: 0,
        duration: 1,
        delay: delay,
        ease: 'power3.out',
        overwrite: 'auto',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      };
      if (kind === 'up') vars.y = 36;
      else if (kind === 'down') vars.y = -36;
      else if (kind === 'left') vars.x = 48;
      else if (kind === 'right') vars.x = -48;
      else if (kind === 'scale') vars.scale = 0.94;
      // "fade" leaves transform alone.
      gsap.from(el, vars);
    });

    // Staggered groups.
    gsap.utils.toArray('[data-reveal-group]').forEach(function (group) {
      var items = group.querySelectorAll('[data-reveal-item]');
      if (!items.length) return;
      gsap.from(items, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        overwrite: 'auto',
        scrollTrigger: { trigger: group, start: 'top 85%', once: true }
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
      gsap.from(el, {
        opacity: 0, y: 30, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
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
        yPercent: 115,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.09,
        overwrite: 'auto',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
    } catch (err) {
      // Measurement failed (hidden element, odd layout) — restore + fade.
      el.textContent = original;
      gsap.from(el, {
        opacity: 0, y: 30, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
    }
  }

  /* ------------------------------------------------------------------ */
  /* Glitch text reveals — scramble decode                                 */
  /* ------------------------------------------------------------------ */
  var GLYPHS = '!<>-_\\/[]{}=+*^?#@$%&01';

  function randomGlyph() {
    return GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length));
  }

  /**
   * Scramble-decode `el` into its final text. Uses rAF; bails instantly when
   * the tab is hidden or reduced-motion is on (final text set directly).
   */
  function scrambleTo(el, finalText, duration) {
    duration = duration || 1100;
    var live = el.querySelector('.glitch-live');
    if (!live) {
      live = document.createElement('span');
      live.className = 'glitch-live';
      live.setAttribute('aria-hidden', 'true');
      el.innerHTML = '';
      el.appendChild(live);
    }
    if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', finalText);
    if (reducedMotion() || document.hidden) {
      live.textContent = finalText;
      return;
    }
    var start = null;
    var len = finalText.length;
    function frame(now) {
      if (document.hidden) { live.textContent = finalText; return; }
      if (start === null) start = now;
      var p = Math.min(1, (now - start) / duration);
      // Ease the reveal count so the tail decodes faster.
      var n = Math.floor(len * (p < 0.6 ? p * p * 1.4 : 0.504 + (p - 0.6) * 1.24));
      n = Math.max(0, Math.min(len, n));
      var out = finalText.slice(0, n);
      for (var i = n; i < len; i++) {
        out += finalText[i] === ' ' ? ' ' : randomGlyph();
      }
      live.textContent = out;
      if (p < 1) requestAnimationFrame(frame);
      else live.textContent = finalText;
    }
    requestAnimationFrame(frame);
  }

  function initGlitchReveals() {
    var els = document.querySelectorAll('[data-glitch]');
    if (!els.length) return;

    els.forEach(function (el) {
      var finalText = el.getAttribute('data-glitch') || el.textContent || '';
      finalText = finalText.trim();
      if (!finalText) return;
      // Preserve for screen readers; visual layer scrambles.
      if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', finalText);
      el.classList.add('u-glitch');
      if (!el.getAttribute('data-text')) el.setAttribute('data-text', finalText);

      var play = function () { scrambleTo(el, finalText, 1100); };

      if (!hasGSAP() || reducedMotion()) { play(); return; }

      window.ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: play
      });
    });

    // Hover scramble for nav links / mono labels.
    if (!reducedMotion()) {
      document.querySelectorAll('[data-glitch-hover]').forEach(function (el) {
        var finalText = (el.getAttribute('data-glitch-hover') || el.textContent || '').trim();
        if (!finalText) return;
        var busy = false;
        el.addEventListener('mouseenter', function () {
          if (busy) return;
          busy = true;
          scrambleTo(el, finalText, 420);
          setTimeout(function () { busy = false; }, 480);
        });
      });
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
      var xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
      var yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });
      var strength = parseFloat(el.getAttribute('data-magnetic-strength') || '0.35', 10) || 0.35;

      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      });
      el.addEventListener('mouseleave', function () {
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' });
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
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          stagger: 0.12, overwrite: 'auto', clearProps: 'transform'
        });
    };

    if (hasGSAP() && !reducedMotion()) {
      // Set hidden state via JS only (no-JS pages stay complete).
      window.gsap.set(items, { opacity: 0, y: 44 });
    }

    window.addEventListener('igry:hero-ready', play);
    // Fallback: if hero.js never fires (fallback CSS hero, script blocked),
    // still play the intro shortly after load.
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
    initGlitchReveals();
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
      hasLenis: hasLenis,
      randomGlyph: randomGlyph
    }
  };

  ready(init);
})();
