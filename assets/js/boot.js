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
     (detail {mode: 'webgl'|'fallback'}) once the scene is up. If the
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

  function frame(now) {
    if (done) return;
    var t = Math.min(1, ((now || Date.now()) - start) / DURATION);
    var eased = 1 - Math.pow(1 - t, 3); /* easeOutCubic */
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
