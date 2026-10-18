/* IGRYbuilds 3D — site chrome. No hard dependency on GSAP/Lenis:
   every enhancement checks for its library first. */
(function () {
  'use strict';

  /* ---------- smooth scroll ---------- */
  try {
    if (window.Lenis && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
      if (window.ScrollTrigger) lenis.on('scroll', function () { window.ScrollTrigger.update(); });
      window.__lenis = lenis;
    }
  } catch (e) { /* plain scroll is fine */ }

  /* ---------- mobile menu ---------- */
  var burger = document.getElementById('navBurger'), menu = document.getElementById('mobileMenu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      document.body.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open'); document.body.classList.remove('menu-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- reveals (IntersectionObserver, no GSAP needed) ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('revealed');
          en.target.style.transition = 'opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1)';
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 4, 3) * 70 + 'ms';
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('revealed'); });
  }

  /* ---------- journey scrub driver (home) ---------- */
  var journey = document.getElementById('journey');
  if (journey && window.ScrollTrigger && window.gsap) {
    try {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.create({
        trigger: journey, start: 'top top', end: 'bottom bottom', scrub: 0.6,
        onUpdate: function (self) { window.__journeyProgress = self.progress; }
      });
    } catch (e) { /* scroll3d.js has its own scroll fallback */ }
  }

  /* ---------- footer year ---------- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- copy chips ---------- */
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var v = btn.getAttribute('data-copy');
      function done() {
        var old = btn.textContent; btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = old; }, 1400);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(v).then(done, done);
      else {
        var ta = document.createElement('textarea'); ta.value = v; document.body.appendChild(ta);
        ta.select(); try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta); done();
      }
    });
  });

  /* ---------- contact form -> WhatsApp compose ---------- */
  var form = document.getElementById('intakeForm');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var g = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
      var msg = 'Hi IGRYbuilds, I need: ' + g('f-need') +
        '\nName: ' + g('f-name') + '\nPhone: ' + g('f-phone') +
        '\nBudget: ' + g('f-budget') + '\nDetails: ' + g('f-msg');
      window.open('https://wa.me/917014257991?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    });
  }
})();
