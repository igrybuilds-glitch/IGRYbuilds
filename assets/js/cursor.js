/* ============================================================================
 * IGRYbuilds — Custom Cursor (cursor.js)
 * Desktop-only (≥900px, fine pointer, no prefers-reduced-motion).
 *
 * Two elements: a small difference-blend dot that tracks 1:1, and a
 * trailing ring that lerps behind it. The ring morphs into a labeled
 * badge ("VIEW") over [data-cursor="view"] targets, grows over links and
 * buttons, and shrinks while pressed.
 *
 * Markup contract: add data-cursor="view" to work cards / teasers.
 * The class `has-cursor` on <html> hides the native cursor via hero.css.
 * Without JS, nothing changes — native cursor everywhere.
 * ========================================================================== */
(function () {
  'use strict';

  window.IGRY = window.IGRY || {};
  var IGRY = window.IGRY;

  var DESKTOP_Q = '(min-width: 900px)';
  var HOVERABLE = 'a, button, [role="button"], input, select, textarea, label, [data-magnetic], [data-cursor]';
  var FIELD = 'input, textarea, select, [contenteditable="true"]';

  function eligible() {
    if (typeof window.matchMedia !== 'function') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    if (!window.matchMedia(DESKTOP_Q).matches) return false;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return false;
    return true;
  }

  function build() {
    var dot = document.createElement('div');
    dot.className = 'igry-cursor';
    dot.setAttribute('aria-hidden', 'true');

    var ring = document.createElement('div');
    ring.className = 'igry-cursor-ring';
    ring.setAttribute('aria-hidden', 'true');

    var label = document.createElement('span');
    label.className = 'igry-cursor-label';
    label.textContent = 'VIEW';
    ring.appendChild(label);

    document.body.appendChild(dot);
    document.body.appendChild(ring);
    return { dot: dot, ring: ring, label: label };
  }

  function init() {
    if (!eligible()) return;
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init, { once: true });
      return;
    }

    var parts = build();
    var dot = parts.dot;
    var ring = parts.ring;
    document.documentElement.classList.add('has-cursor');

    var x = -100, y = -100;       // dot (1:1)
    var rx = -100, ry = -100;     // ring (lerped)
    var visible = false;
    var hoverKind = null;         // null | 'link' | 'view'
    var pressed = false;
    var rafId = 0;
    var lastT = 0;

    var useGsap = typeof window.gsap !== 'undefined';
    var dotX, dotY, ringX, ringY;
    if (useGsap) {
      // Centre the transform origin so quickTo x/y lands on the pointer.
      window.gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });
      dotX = window.gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' });
      dotY = window.gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' });
      ringX = window.gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
      ringY = window.gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });
    }

    function place(el, px, py) {
      el.style.transform = 'translate3d(' + px + 'px,' + py + 'px,0) translate(-50%,-50%)';
    }

    function loop(t) {
      if (document.hidden) { rafId = 0; return; } // restarted on visibilitychange
      var dt = Math.min(64, t - (lastT || t)) / 16.666;
      lastT = t;
      if (useGsap) {
        dotX(x); dotY(y);
        ringX(rx); ringY(ry);
        // extra lerp for a softer trail behind quickTo
        rx += (x - rx) * 0.16 * dt;
        ry += (y - ry) * 0.16 * dt;
      } else {
        place(dot, x, y);
        rx += (x - rx) * 0.16 * dt;
        ry += (y - ry) * 0.16 * dt;
        place(ring, rx, ry);
      }
      rafId = requestAnimationFrame(loop);
    }

    function setState(kind) {
      if (hoverKind === kind) return;
      hoverKind = kind;
      ring.classList.toggle('is-link', kind === 'link');
      ring.classList.toggle('is-view', kind === 'view');
      // The dot sits before the ring in the DOM — hide it directly when the
      // ring morphs into the solid VIEW badge (no backwards sibling select).
      dot.classList.toggle('is-view-hide', kind === 'view');
    }

    function show() {
      if (visible) return;
      visible = true;
      dot.classList.add('is-on');
      ring.classList.add('is-on');
    }
    function hide() {
      if (!visible) return;
      visible = false;
      dot.classList.remove('is-on');
      ring.classList.remove('is-on');
      setState(null);
    }

    document.addEventListener('mousemove', function (e) {
      x = e.clientX; y = e.clientY;
      if (!visible) { rx = x; ry = y; show(); }
    }, { passive: true });

    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);
    window.addEventListener('blur', hide);

    // Hover state via delegation — survives dynamically added content.
    // Over form fields the native cursor stays (I-beam) and ours hides.
    document.addEventListener('mouseover', function (e) {
      var t = e.target && e.target.closest ? e.target.closest(HOVERABLE) : null;
      if (!t) {
        setFieldMode(false);
        setState(null);
        return;
      }
      if (t.closest(FIELD)) {
        setFieldMode(true);
        setState(null);
        return;
      }
      setFieldMode(false);
      var kind = t.getAttribute('data-cursor');
      setState(kind === 'view' ? 'view' : 'link');
    }, { passive: true });

    function setFieldMode(on) {
      dot.classList.toggle('is-field', on);
      ring.classList.toggle('is-field', on);
    }

    document.addEventListener('mousedown', function () {
      pressed = true;
      dot.classList.add('is-down');
      ring.classList.add('is-down');
    });
    document.addEventListener('mouseup', function () {
      pressed = false;
      dot.classList.remove('is-down');
      ring.classList.remove('is-down');
    });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        hide();
        if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
      } else if (!rafId) {
        lastT = 0;
        rafId = requestAnimationFrame(loop);
      }
    });

    // If the tab was hidden when the loop starts, wait for visibility.
    if (!document.hidden) rafId = requestAnimationFrame(loop);
    else {
      var onVis = function () {
        if (!document.hidden) {
          document.removeEventListener('visibilitychange', onVis);
          rafId = requestAnimationFrame(loop);
        }
      };
      document.addEventListener('visibilitychange', onVis);
    }

    IGRY.cursor = {
      destroy: function () {
        cancelAnimationFrame(rafId);
        document.documentElement.classList.remove('has-cursor');
        if (dot.parentNode) dot.parentNode.removeChild(dot);
        if (ring.parentNode) ring.parentNode.removeChild(ring);
      }
    };
  }

  IGRY.cursorInit = init;
  /* test seam */
  IGRY.cursorEligible = eligible;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
