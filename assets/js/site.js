/* ============================================================
   IGRYbuilds — site.js (Builder HOME)
   Shared interactions: nav state, mobile menu, scroll reveals,
   copy-to-clipboard chips, smooth anchors, footer year.

   Integration contract with Builder HERO (motion.js / hero.js / cursor.js):
   - This file NEVER initialises Lenis or GSAP. motion.js owns them and
     exposes `window.IGRY.motion` (with .scrollTo and .lenis).
   - motion.js also owns [data-reveal] choreography via GSAP. The CSS
     fallback reveal below activates ONLY when motion.js is absent
     (no window.IGRY.motion): site.js adds `reveal-css` to <html>, which
     is the sole gate for the hidden states in base.css. This keeps CSS
     transitions from fighting GSAP's per-frame inline styles.
   - `#hero-canvas` is owned by hero.js (Three.js). site.js does not touch it.
   - Everything here degrades gracefully when libs are absent.
   ============================================================ */
(function () {
  "use strict";

  var doc = document.documentElement;

  /* Mark JS as available so CSS can gate hidden states on `html.js`. */
  doc.classList.add("js");

  var reducedMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Nav: scrolled state ---------- */
  var nav = document.getElementById("siteNav");
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var burger = document.getElementById("navBurger");
  var menu = document.getElementById("mobileMenu");

  function setMenu(open) {
    if (!burger || !menu) return;
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.hidden = !open;
    doc.style.overflow = open ? "hidden" : "";
  }

  if (burger && menu) {
    burger.addEventListener("click", function () {
      setMenu(burger.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        burger.focus();
      }
    });
  }

  /* ---------- Smooth anchors (Lenis-aware via IGRY.motion) ---------- */
  function motionAPI() {
    return (window.IGRY && window.IGRY.motion) ? window.IGRY.motion : null;
  }
  function smoothTo(target) {
    var api = motionAPI();
    if (api && typeof api.scrollTo === "function") {
      api.scrollTo(target, { offset: -70 });
      return;
    }
    var el = typeof target === "string" ? document.querySelector(target) : target;
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    }
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[data-scroll]');
    if (!a) return;
    var href = a.getAttribute("href");
    if (href && href.charAt(0) === "#") {
      e.preventDefault();
      smoothTo(href);
    }
  });

  /* ---------- Scroll reveal (CSS fallback; active ONLY when motion.js is absent) ---------- */
  function motionOwnsReveals() {
    return !!(window.IGRY && window.IGRY.motion &&
              typeof window.gsap !== "undefined" &&
              typeof window.ScrollTrigger !== "undefined");
  }

  function initReveals() {
    if (motionOwnsReveals()) {
      doc.classList.add("motion-on"); /* Builder HERO's GSAP owns transforms */
      return;
    }
    doc.classList.add("reveal-css");
    var items = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
    if (!items.length) return;

    if (!("IntersectionObserver" in window) || reducedMotion) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    items.forEach(function (el) { io.observe(el); });
  }

  /* Give motion.js a short window to claim choreography before fallback runs. */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      window.setTimeout(initReveals, 350);
    });
  } else {
    window.setTimeout(initReveals, 350);
  }

  /* ---------- Copy-to-clipboard chips ---------- */
  document.addEventListener("click", function (e) {
    var chip = e.target.closest("[data-copy]");
    if (!chip) return;
    var value = chip.getAttribute("data-copy");
    if (!value) return;

    function tick() {
      chip.classList.add("copied");
      var orig = chip.textContent;
      chip.textContent = "Copied ✓";
      window.setTimeout(function () {
        chip.classList.remove("copied");
        chip.textContent = orig;
      }, 1600);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).then(tick).catch(function () { /* keep original text */ });
    } else {
      var ta = document.createElement("textarea");
      ta.value = value;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); tick(); } catch (err) { /* ignore */ }
      document.body.removeChild(ta);
    }
  });

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- WhatsApp float: hide while mobile menu is open ---------- */
  var waFloat = document.querySelector(".wa-float");
  if (waFloat && burger) {
    var mo = new MutationObserver(function () {
      var open = burger.getAttribute("aria-expanded") === "true";
      waFloat.style.visibility = open ? "hidden" : "";
    });
    mo.observe(burger, { attributes: true, attributeFilter: ["aria-expanded"] });
  }
})();
