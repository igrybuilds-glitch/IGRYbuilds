/* ============================================================
   IGRYbuilds — boot.js (Builder HOME)
   Boot loader: % counter + IGRYbuilds wordmark, then scene fade-in.
   - Overlay starts `hidden` in markup; this script unhides it.
   - No JS => overlay never appears, page is fully usable.
   - prefers-reduced-motion => skips the counter, finishes instantly.
   - On finish: html gets `boot-done`, `igry:boot-done` is dispatched
     (motion.js / hero.js from Builder HERO can gate on either).
   ============================================================ */
(function () {
  "use strict";

  var boot = document.getElementById("boot");
  if (!boot) return;

  var reduced = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var pctEl = boot.querySelector("[data-boot-pct]");
  var done = false;

  /* HERO-INTEGRATION contract: hero.js dispatches `igry:hero-ready`
     (detail {mode: 'canvas'|'fallback'}) once the scene is up. If the
     counter is done and the hero is ready, fade the loader now —
     no need to wait out the full LOAD_GRACE for window load. */
  var heroReady = false;
  window.addEventListener("igry:hero-ready", function () { heroReady = true; });

  function lock(on) {
    document.documentElement.style.overflow = on ? "hidden" : "";
  }

  function finish() {
    if (done) return;
    done = true;
    boot.classList.add("done");
    document.documentElement.classList.add("boot-done");
    try {
      window.dispatchEvent(new CustomEvent("igry:boot-done"));
    } catch (e) { /* older browsers: ignore */ }
    lock(false);
    window.setTimeout(function () {
      if (boot.parentNode) boot.parentNode.removeChild(boot);
    }, 700);
  }

  /* Show the overlay (it was `hidden` in markup). */
  boot.hidden = false;
  lock(true);

  if (reduced) {
    if (pctEl) pctEl.textContent = "100";
    finish();
    return;
  }

  var DURATION = 1700;      /* counter run time, ms */
  var LOAD_GRACE = 2600;    /* max extra wait for window load, ms */
  var start = (window.performance && performance.now) ? performance.now() : Date.now();
  var loaded = document.readyState === "complete";

  window.addEventListener("load", function () { loaded = true; });

  /* The one authored easing: cubic-bezier(0.22, 1, 0.36, 1) */
  function authoredEase(p) {
    if (p <= 0) return 0;
    if (p >= 1) return 1;
    var cx = 0.66, bx = -0.24, ax = 0.58;   /* x1=0.22, x2=0.36 */
    var cy = 3.0, by = -3.0, ay = 1.0;        /* y1=1, y2=1 */
    function sx(t) { return ((ax * t + bx) * t + cx) * t; }
    function sy(t) { return ((ay * t + by) * t + cy) * t; }
    function sdx(t) { return (3 * ax * t + 2 * bx) * t + cx; }
    var t = p, i, err, d;
    for (i = 0; i < 8; i++) {
      err = sx(t) - p;
      if (Math.abs(err) < 1e-6) break;
      d = sdx(t);
      if (Math.abs(d) < 1e-6) break;
      t -= err / d;
    }
    return sy(Math.max(0, Math.min(1, t)));
  }

  function frame(now) {
    if (done) return;
    var t = Math.min(1, ((now || Date.now()) - start) / DURATION);
    var eased = authoredEase(t);
    if (pctEl) {
      var v = Math.floor(eased * 100);
      pctEl.textContent = (v < 10 ? "00" : v < 100 ? "0" : "") + v;
    }
    if (t < 1) {
      window.requestAnimationFrame(frame);
    } else {
      var waited = 0;
      (function waitForLoad() {
        if (done) return;
        if (loaded || heroReady || waited >= LOAD_GRACE) {
          finish();
        } else {
          waited += 60;
          window.setTimeout(waitForLoad, 60);
        }
      })();
    }
  }

  if (window.requestAnimationFrame) {
    window.requestAnimationFrame(frame);
  } else {
    finish();
  }

  /* Safety: never trap the user behind the loader. */
  window.setTimeout(finish, DURATION + LOAD_GRACE + 1500);
})();
