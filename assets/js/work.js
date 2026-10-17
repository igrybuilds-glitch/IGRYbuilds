/* IGRYbuilds /work — portfolio engine.
   Loads data/projects.json (1000 concept projects), renders 24 per batch,
   with category filter chips, debounced live search and a modal detail view.
   Thumbnails are pure-CSS browser mockups: .pal-N palette x .arch-N layout.
   Framing is honest throughout: "concept work & studio experiments". */
(function () {
  "use strict";

  var BATCH = 24;
  var DATA_URL = "data/projects.json";

  /* Intent-menu deep links (work.html?cat=websites|automation|chatbots|whatsapp|seo).
     Service -> business categories that most often need it. Curated UX preset,
     not a claim about the projects themselves. "websites" = every concept. */
  var SERVICE_CATS = {
    automation: ["Real Estate", "Clinics", "Restaurants", "Hotels", "Travel Agents",
      "Event Planners", "Coaches", "Tutors", "Gyms", "Salons", "Garages", "Pet Services"],
    chatbots: ["E-commerce", "Restaurants", "Hotels", "Clinics", "Travel Agents",
      "Real Estate", "Cafes", "Spas"],
    whatsapp: ["Restaurants", "Salons", "Spas", "Clinics", "Hotels", "Real Estate",
      "Event Planners", "Garages", "Boutiques", "Jewellers"],
    seo: ["Restaurants", "Cafes", "Clinics", "Salons", "Hotels", "Architects",
      "Interior Designers", "Lawyers", "Bakeries", "Photographers"]
  };
  var SERVICE_LABEL = { automation: "Automation", chatbots: "AI Chatbots",
    whatsapp: "WhatsApp Systems", seo: "SEO" };

  /* 24 category archetypes — distinct abstract mini-layouts, no fake copy. */
  var ARCH = [
    /* 0 hero-block */      '<div class="nv"></div><div class="hr"><div class="ln mid"></div><div class="ln short"></div><div class="btn"></div></div>',
    /* 1 nav-bar */         '<div class="nv"></div><div class="tb"><span class="on"></span><span></span><span></span><span></span></div><div class="split"><div><div class="ln"></div><div class="ln mid"></div><div class="btn"></div></div><div class="cell hi"></div></div>',
    /* 2 grid */            '<div class="nv"></div><div class="grd2"><div class="cell hi"></div><div class="cell"></div><div class="cell"></div><div class="cell hi"></div></div>',
    /* 3 menu-list */       '<div class="nv"></div><div class="li"></div><div class="li"></div><div class="li"></div><div class="li"></div><div class="btn"></div>',
    /* 4 booking-card */    '<div class="nv"></div><div class="r3"><div class="crd"><div class="ln"></div><div class="ln short"></div></div><div class="crd hi"><div class="ln"></div><div class="ln short d2"></div></div><div class="crd"><div class="ln"></div><div class="ln short"></div></div></div>',
    /* 5 split-hero */      '<div class="nv"></div><div class="split"><div><div class="ln"></div><div class="ln short"></div><div class="btn"></div></div><div class="hr"></div></div>',
    /* 6 stats-row */       '<div class="nv"></div><div class="r3"><div class="cell hi"><div class="ln short"></div></div><div class="cell"><div class="ln short"></div></div><div class="cell"><div class="ln short"></div></div></div><div class="r2"><div class="cell"></div><div class="cell"></div></div>',
    /* 7 gallery-wall */    '<div class="nv"></div><div class="grd2"><div class="cell hi"></div><div class="cell"></div><div class="cell"></div><div class="cell hi"></div></div><div class="ln short"></div>',
    /* 8 pricing-cards */   '<div class="nv"></div><div class="r3"><div class="crd"><div class="ln mid"></div><div class="ln short d2"></div><div class="btn"></div></div><div class="crd hi"><div class="ln mid"></div><div class="ln short d2"></div><div class="btn"></div></div><div class="crd"><div class="ln mid"></div><div class="ln short d2"></div><div class="btn"></div></div></div>',
    /* 9 testimonial */     '<div class="nv"></div><div class="q"><div class="ln mid"></div><div class="ln short"></div></div><div class="avrow"><div class="av"></div><div class="av"></div><div class="av"></div><div class="ln short" style="width:80px"></div></div>',
    /* 10 map-block */      '<div class="nv"></div><div class="split"><div class="mp"></div><div><div class="ln"></div><div class="ln short"></div><div class="btn"></div></div></div>',
    /* 11 chat-ui */        '<div class="nv"></div><div class="bub"><div class="ln"></div></div><div class="bub r"><div class="ln short"></div></div><div class="bub"><div class="ln mid"></div></div><div class="in"></div>',
    /* 12 video-hero */     '<div class="nv"></div><div class="vd"></div><div class="ln short"></div>',
    /* 13 list-feed */      '<div class="nv"></div><div class="li"></div><div class="li"></div><div class="li"></div><div class="avrow"><div class="av"></div><div class="ln short" style="width:70px"></div></div>',
    /* 14 steps */          '<div class="nv"></div><div class="stp"><span class="n"></span><span class="t"><span class="ln"></span></span></div><div class="stp"><span class="n"></span><span class="t"><span class="ln short"></span></span></div><div class="stp"><span class="n"></span><span class="t"><span class="ln mid"></span></span></div><div class="btn"></div>',
    /* 15 before-after */   '<div class="nv"></div><div class="bf"><div></div><div></div></div><div class="ln short"></div>',
    /* 16 calendar */       '<div class="nv"></div><div class="cal">' + calDays() + '</div><div class="btn"></div>',
    /* 17 reviews */        '<div class="nv"></div><div class="stars"><i></i><i></i><i></i><i></i><i></i></div><div class="q"><div class="ln mid"></div><div class="ln short"></div></div><div class="li"></div>',
    /* 18 slider-hero */    '<div class="nv"></div><div class="hr"><div class="ln mid"></div><div class="btn"></div></div><div class="dots"><i class="on"></i><i></i><i></i></div>',
    /* 19 icons-row */      '<div class="nv"></div><div class="r3"><div><div class="icn"></div><div class="ln short" style="margin:5px auto 0;width:60%"></div></div><div><div class="icn"></div><div class="ln short" style="margin:5px auto 0;width:60%"></div></div><div><div class="icn"></div><div class="ln short" style="margin:5px auto 0;width:60%"></div></div></div><div class="ln mid" style="margin:0 auto"></div>',
    /* 20 accordion */      '<div class="nv"></div><div class="li"></div><div class="li"></div><div class="li"></div><div class="btn"></div>',
    /* 21 product-grid */   '<div class="nv"></div><div class="r3"><div class="crd hi"><div class="ln short d2"></div></div><div class="crd"><div class="ln short d2"></div></div><div class="crd hi"><div class="ln short d2"></div></div></div><div class="ln short"></div>',
    /* 22 form-ui */        '<div class="nv"></div><div class="frm"><div class="fld"></div><div class="fld"></div><div class="fld tall"></div></div><div class="btn"></div>',
    /* 23 tabs */           '<div class="nv"></div><div class="tb"><span class="on"></span><span></span><span></span></div><div class="panel"><div class="ln"></div><div class="ln mid"></div><div class="ln short d2"></div></div>'
  ];

  var PAL_NAMES = [
    "Ultraviolet", "Neon Bloom", "Ion Storm", "Violet Haze", "Fuchsia Drive",
    "Skyline", "Cotton Candy", "Lagoon", "Ultraviolet Rose", "Deep Current",
    "Magenta Shift", "Lavender Drift"
  ];
  var PAL_HEX = [
    ["#a855f7", "#ec4899"], ["#ec4899", "#22d3ee"], ["#22d3ee", "#a855f7"],
    ["#8b5cf6", "#f472b6"], ["#d946ef", "#6366f1"], ["#38bdf8", "#a855f7"],
    ["#f472b6", "#8b5cf6"], ["#2dd4bf", "#a855f7"], ["#a855f7", "#fb7185"],
    ["#22d3ee", "#60a5fa"], ["#ec4899", "#8b5cf6"], ["#c084fc", "#22d3ee"]
  ];

  function calDays() {
    var out = "";
    for (var i = 0; i < 14; i++) out += '<span class="day' + (i === 8 ? " on" : "") + '"></span>';
    return out;
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function thumbHTML(p, archOverride) {
    var a = (typeof archOverride === "number") ? archOverride : p.archetype;
    return '<div class="thumb pal-' + p.palette + ' arch-' + a + '" aria-hidden="true">' +
      '<div class="chrome"><i></i><i></i><i></i><u></u></div>' +
      '<div class="mock">' + ARCH[a] + "</div></div>";
  }

  function cardHTML(p) {
    var kindLabel = p.kind === "flagship" ? "Flagship" : "Experiment";
    return '<article class="card will-in" data-id="' + esc(p.id) + '" tabindex="0" role="button" ' +
      'aria-label="' + esc(p.title) + ", " + esc(p.category) + ' concept">' +
      '<span class="card-kind' + (p.kind === "flagship" ? " flag" : "") + '">' + kindLabel + "</span>" +
      thumbHTML(p) +
      '<div class="card-meta"><span class="card-cat">' + esc(p.category) + "</span>" +
      "<h3>" + esc(p.title) + "</h3><p>" + esc(p.tagline) + "</p></div></article>";
  }

  /* Pure filter: category + query over title/category/tagline. */
  function filterProjects(projects, category, query) {
    var q = (query || "").trim().toLowerCase();
    return projects.filter(function (p) {
      if (category !== "all" && p.category !== category) return false;
      if (!q) return true;
      return (p.title + " " + p.category + " " + p.tagline).toLowerCase().indexOf(q) !== -1;
    });
  }

  function countLabel(shown, total, category, query, presetLabel) {
    var scope = presetLabel || (category === "all" ? "all categories" : category);
    if (query && query.trim()) scope += ' matching \u201C' + query.trim() + "\u201D";
    return "Showing <b>" + shown + "</b> of <b>" + total + "</b> \u2014 " + esc(scope);
  }

  /* ---------------- browser wiring (skipped under node) ---------------- */
  function init() {
    document.documentElement.classList.add("js");
    var grid = document.getElementById("grid");
    var chipsBox = document.getElementById("chips");
    var search = document.getElementById("search");
    var clearBtn = document.getElementById("clearSearch");
    var countEl = document.getElementById("countLine");
    var loadBtn = document.getElementById("loadMore");
    var emptyBox = document.getElementById("empty");
    var resetBtn = document.getElementById("resetFilters");

    var projects = [];
    var byId = {};
    var categories = [];
    var state = { category: "all", query: "", shown: 0, filtered: [],
      multiCat: null, presetLabel: "" };
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var observer = null;

    if (!reduceMotion && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("in"); observer.unobserve(e.target); }
        });
      }, { rootMargin: "120px" });
    }

    function paintCount() {
      countEl.innerHTML = countLabel(state.shown, state.filtered.length, state.category, state.query, state.presetLabel);
    }

    function renderBatch() {
      var next = state.filtered.slice(state.shown, state.shown + BATCH);
      if (!next.length) return;
      var html = next.map(cardHTML).join("");
      var tmp = document.createElement("div");
      tmp.innerHTML = html;
      var nodes = Array.prototype.slice.call(tmp.children);
      nodes.forEach(function (node) {
        grid.appendChild(node);
        bindCard(node);
        if (observer) observer.observe(node); else node.classList.add("in");
      });
      state.shown += next.length;
      paintCount();
      var remaining = state.filtered.length - state.shown;
      loadBtn.hidden = remaining <= 0;
      if (remaining > 0) {
        loadBtn.innerHTML = 'Load more <span class="left">' + remaining + " left</span>";
      }
    }

    function applyFilters(resetScroll) {
      var list = projects;
      if (state.multiCat && state.multiCat.length) {
        list = projects.filter(function (p) { return state.multiCat.indexOf(p.category) !== -1; });
      }
      state.filtered = filterProjects(list, state.category, state.query);
      state.shown = 0;
      grid.innerHTML = "";
      emptyBox.hidden = state.filtered.length > 0;
      renderBatch();
      if (resetScroll) {
        var y = grid.getBoundingClientRect().top + window.scrollY - 140;
        window.scrollTo({ top: Math.max(0, y), behavior: reduceMotion ? "auto" : "smooth" });
      }
    }

    function buildChips() {
      var counts = {};
      projects.forEach(function (p) { counts[p.category] = (counts[p.category] || 0) + 1; });
      var chipFor = function (c, n) {
        var pressed = c === "all" ? "true" : "false";
        var label = c === "all" ? "All" : c;
        return '<button class="chip" data-cat="' + esc(c) + '" aria-pressed="' + pressed + '">' +
          esc(label) + '<span class="n">' + n + "</span></button>";
      };
      var html = chipFor("all", projects.length);
      categories.forEach(function (c) { html += chipFor(c, counts[c] || 0); });
      chipsBox.innerHTML = html;
      chipsBox.addEventListener("click", function (ev) {
        var btn = ev.target.closest(".chip");
        if (!btn) return;
        chipsBox.querySelectorAll(".chip").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
        btn.setAttribute("aria-pressed", "true");
        state.category = btn.getAttribute("data-cat");
        state.multiCat = null; state.presetLabel = "";
        applyFilters(false);
      });
    }

    var debounce = null;
    search.addEventListener("input", function () {
      clearBtn.hidden = !search.value;
      clearTimeout(debounce);
      debounce = setTimeout(function () {
        state.query = search.value;
        applyFilters(false);
      }, 220);
    });
    clearBtn.addEventListener("click", function () {
      search.value = ""; clearBtn.hidden = true; state.query = "";
      applyFilters(false); search.focus();
    });
    loadBtn.addEventListener("click", renderBatch);
    resetBtn.addEventListener("click", function () {
      state.category = "all"; state.query = ""; state.multiCat = null; state.presetLabel = "";
      search.value = ""; clearBtn.hidden = true;
      chipsBox.querySelectorAll(".chip").forEach(function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-cat") === "all" ? "true" : "false");
      });
      applyFilters(false);
    });

    /* ---------- modal ---------- */
    var backdrop = document.getElementById("modalBackdrop");
    var modalBox = document.getElementById("modalBox");
    var lastFocus = null;

    function openModal(p) {
      lastFocus = document.activeElement;
      var kindLabel = p.kind === "flagship" ? "Studio flagship concept" : "Studio experiment";
      modalBox.innerHTML =
        '<div class="modal-wrap"><button class="modal-close" id="modalCloseInner" aria-label="Close details">\u00D7</button>' +
        thumbHTML(p) +
        '<div class="modal-body"><span class="modal-cat">' + esc(p.category) + " \u00B7 " + esc(kindLabel) + "</span>" +
        '<h2 id="modalTitle">' + esc(p.title) + "</h2>" +
        '<p class="modal-tag">' + esc(p.tagline) + "</p>" +
        '<div class="modal-facts">' +
        "<span class='fact'>Layout \u2014 <b>" + esc(ARCH_NAME(p.archetype)) + "</b></span>" +
        "<span class='fact'><span class='sw' style='background:linear-gradient(135deg," +
        PAL_HEX[p.palette][0] + "," + PAL_HEX[p.palette][1] + ")'></span>Palette \u2014 <b>" +
        esc(PAL_NAMES[p.palette]) + "</b></span>" +
        "<span class='fact'>Ref \u2014 <b>" + esc(p.id.toUpperCase()) + "</b></span>" +
        "</div>" +
        '<div class="modal-cta">' +
        '<a class="btn-solid" href="contact.html">Start your project</a>' +
        '<a class="btn-ghost" href="https://wa.me/917014257991?text=' +
        encodeURIComponent("Hi IGRYbuilds! I saw the " + p.title + " concept (" + p.id.toUpperCase() + ") — I'd like something like this.") +
        '" target="_blank" rel="noopener">WhatsApp us</a>' +
        "</div>" +
        '<p class="modal-note">Concept work &amp; studio experiments — design studies from the IGRYbuilds studio, not client work.</p>' +
        "</div></div>";
      backdrop.classList.add("open");
      document.body.style.overflow = "hidden";
      document.getElementById("modalCloseInner").addEventListener("click", closeModal);
      document.getElementById("modalCloseInner").focus();
    }
    function closeModal() {
      backdrop.classList.remove("open");
      document.body.style.overflow = "";
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    backdrop.addEventListener("click", function (ev) { if (ev.target === backdrop) closeModal(); });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && backdrop.classList.contains("open")) closeModal();
    });

    function bindCard(node) {
      var open = function () { var p = byId[node.getAttribute("data-id")]; if (p) openModal(p); };
      node.addEventListener("click", open);
      node.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); open(); }
      });
    }

    /* ---------- boot ---------- */
    fetch(DATA_URL, { cache: "force-cache" })
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (data) {
        projects = data;
        projects.forEach(function (p) { byId[p.id] = p; });
        categories = [];
        projects.forEach(function (p) { if (categories.indexOf(p.category) === -1) categories.push(p.category); });
        categories.sort();
        buildChips();
        /* intent-menu deep link: work.html?cat=<service> pre-filters the grid */
        try {
          var m = /[?&]cat=([a-z]+)/i.exec(window.location.search || "");
          if (m && SERVICE_CATS[m[1].toLowerCase()]) {
            var svc = m[1].toLowerCase();
            state.multiCat = SERVICE_CATS[svc];
            state.presetLabel = SERVICE_LABEL[svc] + " concepts";
          }
        } catch (e) { /* stay on the full grid */ }
        applyFilters(false);
      })
      .catch(function (err) {
        grid.innerHTML = "";
        emptyBox.hidden = false;
        emptyBox.querySelector("h2").textContent = "Projects could not load";
        emptyBox.querySelector("p").textContent = "The project data failed to load (" + err.message + "). Please refresh, or reach us directly.";
        countEl.textContent = "";
        loadBtn.hidden = true;
      });
  }

  function ARCH_NAME(i) {
    var names = ["hero-block", "nav-bar", "grid", "menu-list", "booking-card", "split-hero",
      "stats-row", "gallery-wall", "pricing-cards", "testimonial", "map-block", "chat-ui",
      "video-hero", "list-feed", "steps", "before-after", "calendar", "reviews",
      "slider-hero", "icons-row", "accordion", "product-grid", "form-ui", "tabs"];
    return names[i] || ("layout-" + i);
  }

  if (typeof document !== "undefined" && typeof window !== "undefined") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
  }

  /* node harness for tests + static pre-render */
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { ARCH: ARCH, PAL_NAMES: PAL_NAMES, PAL_HEX: PAL_HEX, esc: esc, cardHTML: cardHTML, thumbHTML: thumbHTML, filterProjects: filterProjects, countLabel: countLabel, ARCH_NAME: ARCH_NAME };
  }
})();
