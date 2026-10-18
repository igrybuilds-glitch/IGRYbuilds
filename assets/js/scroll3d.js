/* IGRYbuilds 3D engine — three.js scroll-driven scenes.
   ES module: import three via the page importmap BEFORE this script.
   Robust by design: no WebGL / mobile / reduced-motion all degrade to a
   flat CSS fallback (.no-webgl on <html>). Never throws when CDNs fail. */
import * as THREE from 'three';
(function () {
  'use strict';
  var ACCENT = 0xc85a2e, CREAM = 0xf3ede0, DARK = 0x2a211b, WARM = 0xffd9b0;

  function webglOK() {
    try {
      var c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
    } catch (e) { return false; }
  }
  function reducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  function smallScreen() {
    return window.matchMedia && (window.matchMedia('(max-width: 900px)').matches ||
      !window.matchMedia('(pointer: fine)').matches);
  }

  function markFallback() { document.documentElement.classList.add('no-webgl'); }

  function makeRenderer(canvas) {
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    return renderer;
  }
  function lights(scene) {
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    var key = new THREE.DirectionalLight(WARM, 2.2); key.position.set(4, 6, 6); scene.add(key);
    var rim = new THREE.PointLight(ACCENT, 60, 40); rim.position.set(-6, -2, -4); scene.add(rim);
    var fill = new THREE.DirectionalLight(CREAM, 0.5); fill.position.set(-4, 2, 5); scene.add(fill);
  }
  function particles(scene, n, spread, color, size) {
    n = n || 260; spread = spread || 16;
    var g = new THREE.BufferGeometry(), pos = new Float32Array(n * 3);
    for (var i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread;
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    var m = new THREE.PointsMaterial({ color: color || CREAM, size: size || 0.035, transparent: true, opacity: 0.55, sizeAttenuation: true });
    var p = new THREE.Points(g, m); scene.add(p); return p;
  }
  function fit(renderer, camera, el) {
    var w = el.clientWidth || 1, h = el.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  function watchVisible(el, onChange) {
    if (!('IntersectionObserver' in window)) { onChange(true); return; }
    new IntersectionObserver(function (es) { onChange(es[0].isIntersecting); }, { threshold: 0.02 }).observe(el);
  }

  /* ---------- signature objects for inner-page heroes ---------- */
  var RECIPES = {
    websites: function () {
      var g = new THREE.Group();
      var knot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(1.5, 0.42, 220, 36),
        new THREE.MeshStandardMaterial({ color: ACCENT, roughness: 0.32, metalness: 0.55 }));
      g.add(knot);
      var ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.6, 0.05, 16, 128),
        new THREE.MeshStandardMaterial({ color: CREAM, roughness: 0.5, metalness: 0.2, transparent: true, opacity: 0.7 }));
      ring.rotation.x = Math.PI / 2.4; g.add(ring);
      g.userData.spin = function (t) { knot.rotation.y = t * 0.25; knot.rotation.x = t * 0.12; ring.rotation.z = t * 0.18; };
      return g;
    },
    redesign: function () {
      var g = new THREE.Group();
      for (var i = 0; i < 2; i++) {
        var t = new THREE.Mesh(
          new THREE.TorusGeometry(1.5, 0.34, 32, 96),
          new THREE.MeshStandardMaterial({ color: i ? CREAM : ACCENT, roughness: 0.35, metalness: 0.5 }));
        t.rotation.y = Math.PI / 2; t.position.x = i ? 0.85 : -0.85;
        t.rotation.x = i ? 0.5 : -0.35; g.add(t);
      }
      g.userData.spin = function (t) { g.rotation.y = t * 0.3; g.rotation.z = Math.sin(t * 0.2) * 0.15; };
      return g;
    },
    seo: function () {
      var g = new THREE.Group();
      var geo = new THREE.SphereGeometry(0.16, 20, 20);
      var mat = new THREE.MeshStandardMaterial({ color: ACCENT, roughness: 0.4, metalness: 0.4 });
      var mat2 = new THREE.MeshStandardMaterial({ color: CREAM, roughness: 0.5, metalness: 0.2 });
      for (var i = 0; i < 42; i++) {
        var s = new THREE.Mesh(geo, i % 3 ? mat : mat2);
        var a = i * 0.55, r = 0.4 + i * 0.055;
        s.position.set(Math.cos(a) * r, (i - 21) * 0.11, Math.sin(a) * r);
        g.add(s);
      }
      g.userData.spin = function (t) { g.rotation.y = t * 0.5; };
      return g;
    },
    automation: function () {
      var g = new THREE.Group();
      var mat = new THREE.MeshStandardMaterial({ color: ACCENT, roughness: 0.35, metalness: 0.55 });
      for (var i = 0; i < 10; i++) {
        var b = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), mat);
        var a = (i / 10) * Math.PI * 2;
        b.position.set(Math.cos(a) * 2.1, Math.sin(a) * 2.1, 0);
        b.rotation.z = a; g.add(b);
      }
      var hub = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.5, 32),
        new THREE.MeshStandardMaterial({ color: CREAM, roughness: 0.4, metalness: 0.5 }));
      hub.rotation.x = Math.PI / 2; g.add(hub);
      g.userData.spin = function (t) { g.rotation.z = t * 0.35; };
      return g;
    },
    chatbots: function () {
      var g = new THREE.Group();
      var mat = new THREE.MeshStandardMaterial({ color: ACCENT, roughness: 0.4, metalness: 0.3 });
      var mat2 = new THREE.MeshStandardMaterial({ color: CREAM, roughness: 0.5, metalness: 0.2 });
      var spots = [[-1.1, 0.5, 0, 0.8], [1.2, -0.3, 0.4, 0.6], [0.1, -1.1, -0.5, 0.5], [0.9, 1.2, -0.8, 0.42]];
      spots.forEach(function (s, i) {
        var m = new THREE.Mesh(new THREE.SphereGeometry(s[3], 28, 28), i % 2 ? mat2 : mat);
        m.position.set(s[0], s[1], s[2]); m.scale.z = 0.72; g.add(m);
      });
      g.userData.spin = function (t) {
        g.rotation.y = Math.sin(t * 0.3) * 0.5;
        g.position.y = Math.sin(t * 0.8) * 0.25;
      };
      return g;
    },
    whatsapp: function () {
      var g = new THREE.Group();
      var phone = new THREE.Mesh(new THREE.BoxGeometry(1.5, 2.9, 0.22),
        new THREE.MeshStandardMaterial({ color: DARK, roughness: 0.35, metalness: 0.6 }));
      g.add(phone);
      var dot = new THREE.Mesh(new THREE.SphereGeometry(0.34, 24, 24),
        new THREE.MeshStandardMaterial({ color: ACCENT, roughness: 0.3, metalness: 0.4, emissive: ACCENT, emissiveIntensity: 0.35 }));
      dot.position.set(0.5, 0.9, 0.2); g.add(dot);
      var dot2 = dot.clone(); dot2.position.set(-0.45, -0.4, 0.2);
      dot2.material = new THREE.MeshStandardMaterial({ color: CREAM, roughness: 0.4, metalness: 0.3 });
      g.add(dot2);
      g.userData.spin = function (t) { g.rotation.y = Math.sin(t * 0.35) * 0.55; g.rotation.x = Math.sin(t * 0.22) * 0.12; };
      return g;
    },
    orb: function () {
      var g = new THREE.Group();
      var m = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6, 1),
        new THREE.MeshStandardMaterial({ color: ACCENT, roughness: 0.3, metalness: 0.6, flatShading: true }));
      g.add(m);
      var wire = new THREE.Mesh(new THREE.IcosahedronGeometry(2.15, 1),
        new THREE.MeshBasicMaterial({ color: CREAM, wireframe: true, transparent: true, opacity: 0.28 }));
      g.add(wire);
      g.userData.spin = function (t) { m.rotation.y = t * 0.3; m.rotation.x = t * 0.14; wire.rotation.y = -t * 0.2; wire.rotation.z = t * 0.1; };
      return g;
    }
  };

  function initHeroObject() {
    var stages = document.querySelectorAll('[data-3d-hero]');
    if (!stages.length) return;
    if (typeof THREE === 'undefined') { markFallback(); return; }
    stages.forEach(function (stage) {
      var canvas = stage.querySelector('canvas.webgl');
      if (!canvas) return;
      var recipe = stage.getAttribute('data-3d-hero') || 'orb';
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(0, 0.4, 7.2);
      lights(scene);
      var obj = (RECIPES[recipe] || RECIPES.orb)();
      obj.position.x = 1.6; scene.add(obj);
      var dust = particles(scene, 200, 14);
      var renderer;
      try { renderer = makeRenderer(canvas); } catch (e) { markFallback(); return; }
      fit(renderer, camera, stage);
      window.addEventListener('resize', function () { fit(renderer, camera, stage); });
      var mx = 0, my = 0;
      window.addEventListener('pointermove', function (e) {
        mx = (e.clientX / window.innerWidth - 0.5); my = (e.clientY / window.innerHeight - 0.5);
      }, { passive: true });
      var visible = true, t0 = performance.now(), still = reducedMotion();
      watchVisible(stage, function (v) { visible = v; });
      function frame(now) {
        requestAnimationFrame(frame);
        if (!visible) return;
        var t = (now - t0) / 1000;
        if (obj.userData.spin) obj.userData.spin(t);
        dust.rotation.y = t * 0.02;
        camera.position.x += ((mx * 1.1) - camera.position.x) * 0.04;
        camera.position.y += ((0.4 - my * 0.9) - camera.position.y) * 0.04;
        camera.lookAt(0.6, 0, 0);
        renderer.render(scene, camera);
        if (still) visible = false; /* render one frame only */
      }
      if (smallScreen()) { markFallback(); return; }
      requestAnimationFrame(frame);
    });
  }

  /* ---------- home: pinned scroll journey ---------- */
  function initJourney() {
    var root = document.getElementById('journey');
    if (!root || typeof THREE === 'undefined') { if (root) markFallback(); return; }
    if (smallScreen()) { markFallback(); return; }
    var canvas = root.querySelector('canvas.webgl');
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    lights(scene);
    var dust = particles(scene, 420, 26);

    /* chapter objects */
    var heroKnot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.7, 0.46, 240, 40),
      new THREE.MeshStandardMaterial({ color: ACCENT, roughness: 0.3, metalness: 0.6 }));
    var heroRing = new THREE.Mesh(new THREE.TorusGeometry(3.1, 0.05, 16, 140),
      new THREE.MeshStandardMaterial({ color: CREAM, roughness: 0.5, metalness: 0.25, transparent: true, opacity: 0.65 }));
    heroRing.rotation.x = Math.PI / 2.3;
    var heroGroup = new THREE.Group(); heroGroup.add(heroKnot, heroRing); scene.add(heroGroup);
    heroGroup.position.x = 2.0; /* keep the headline clear: object lives right of the copy */

    var glyphs = new THREE.Group();
    var glyphGeos = [new THREE.IcosahedronGeometry(0.55, 0), new THREE.TorusGeometry(0.5, 0.2, 18, 40),
      new THREE.BoxGeometry(0.8, 0.8, 0.8), new THREE.OctahedronGeometry(0.6, 0),
      new THREE.TorusKnotGeometry(0.42, 0.14, 90, 14), new THREE.CylinderGeometry(0.4, 0.4, 0.8, 24)];
    glyphGeos.forEach(function (geo, i) {
      var m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
        color: i % 2 ? CREAM : ACCENT, roughness: 0.38, metalness: 0.5 }));
      var a = (i / 6) * Math.PI * 2;
      m.position.set(Math.cos(a) * 3.4, Math.sin(a * 1.3) * 1.1, Math.sin(a) * 1.4);
      m.userData.base = m.position.clone(); m.userData.ph = i * 1.1;
      glyphs.add(m);
    });
    glyphs.visible = false; scene.add(glyphs);

    var tunnel = new THREE.Group();
    var tGeo = new THREE.SphereGeometry(0.06, 10, 10);
    var tMat = new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.8 });
    var tMat2 = new THREE.MeshBasicMaterial({ color: CREAM, transparent: true, opacity: 0.5 });
    var tPts = [];
    for (var i = 0; i < 240; i++) {
      var s = new THREE.Mesh(tGeo, i % 2 ? tMat : tMat2);
      var a = Math.random() * Math.PI * 2, r = 2 + Math.random() * 5;
      s.position.set(Math.cos(a) * r, Math.sin(a) * r, (Math.random() - 0.5) * 30);
      s.userData.z = s.position.z; tPts.push(s); tunnel.add(s);
    }
    tunnel.visible = false; scene.add(tunnel);

    var orb = new THREE.Mesh(new THREE.SphereGeometry(1.35, 48, 48),
      new THREE.MeshStandardMaterial({ color: ACCENT, roughness: 0.25, metalness: 0.5, emissive: ACCENT, emissiveIntensity: 0.25 }));
    var orbHalo = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.04, 14, 120),
      new THREE.MeshBasicMaterial({ color: CREAM, transparent: true, opacity: 0.5 }));
    var orbGroup = new THREE.Group(); orbGroup.add(orb, orbHalo); orbGroup.visible = false; scene.add(orbGroup);
    orbGroup.position.x = 1.6; /* keep the closing copy clear */

    var renderer;
    try { renderer = makeRenderer(canvas); } catch (e) { markFallback(); return; }
    var sticky = root.querySelector('.journey-sticky');
    function sizeAll() { fit(renderer, camera, sticky || root); }
    sizeAll(); window.addEventListener('resize', sizeAll);

    var chapters = Array.prototype.slice.call(root.querySelectorAll('.journey-pin'));
    var dots = Array.prototype.slice.call(root.querySelectorAll('.journey-progress i'));
    function setChapter(idx) {
      chapters.forEach(function (c, i) { c.classList.toggle('on', i === idx); });
      dots.forEach(function (d, i) { d.classList.toggle('on', i === idx); });
    }

    /* keyframed camera/object states, t in 0..1 */
    function applyState(t, time) {
      heroGroup.visible = t < 0.34; glyphs.visible = t >= 0.18 && t < 0.62;
      tunnel.visible = t >= 0.5 && t < 0.86; orbGroup.visible = t >= 0.78;
      var cx, cy, cz, lx, ly;
      if (t < 0.25) {           /* ch1 hero */
        var k = t / 0.25;
        cx = 0; cy = 0.4 - k * 0.4; cz = 8.2 - k * 1.2; lx = 0; ly = 0;
        heroKnot.rotation.y = time * 0.22; heroKnot.rotation.x = time * 0.1;
        heroRing.rotation.z = time * 0.15;
        heroGroup.position.y = Math.sin(time * 0.7) * 0.18;
        heroGroup.scale.setScalar(1 - k * 0.25);
      } else if (t < 0.5) {     /* ch2 services orbit */
        var k2 = (t - 0.25) / 0.25, ang = k2 * 1.1;
        cx = Math.sin(ang) * 5.2; cy = 0.6; cz = Math.cos(ang) * 5.2 + 2.4; lx = 0; ly = 0;
        glyphs.children.forEach(function (m, i) {
          m.position.y = m.userData.base.y + Math.sin(time * 0.9 + m.userData.ph) * 0.35;
          m.rotation.x = time * 0.4 + i; m.rotation.y = time * 0.3;
        });
        var gs = Math.min(1, k2 * 3); glyphs.scale.setScalar(Math.max(0.001, gs));
      } else if (t < 0.75) {    /* ch3/4 work + process tunnel */
        var k3 = (t - 0.5) / 0.25;
        cx = 0; cy = 0; cz = 7 - k3 * 3.4; lx = 0; ly = 0;
        tPts.forEach(function (s) {
          s.position.z = ((s.userData.z + time * 6 + k3 * 14) % 30) - 15;
        });
        tunnel.rotation.z = time * 0.05;
      } else {                  /* ch5 convergence */
        var k4 = (t - 0.75) / 0.25;
        cx = Math.sin(k4 * 0.9) * 2.4; cy = 0.5 - k4 * 0.3; cz = 6.4 - k4 * 1.6; lx = 0; ly = 0;
        orb.rotation.y = time * 0.4; orbHalo.rotation.x = time * 0.5; orbHalo.rotation.y = time * 0.3;
        orbGroup.scale.setScalar(0.6 + k4 * 0.4);
      }
      camera.position.set(cx, cy, cz); camera.lookAt(lx, ly, 0);
      dust.rotation.y = time * 0.015;
      var ci = Math.min(chapters.length - 1, Math.floor(t * chapters.length));
      setChapter(ci);
    }

    var prog = 0, visible = true, t0 = performance.now(), still = reducedMotion();
    watchVisible(root, function (v) { visible = v; });
    function frame(now) {
      requestAnimationFrame(frame);
      if (!visible) return;
      var time = (now - t0) / 1000;
      if (window.__journeyProgress != null) prog = window.__journeyProgress;
      applyState(prog, time);
      renderer.render(scene, camera);
      if (still) visible = false;
    }
    /* scrub driver (set by site3d.js via ScrollTrigger; fallback: scroll listener) */
    function readProgress() {
      var r = root.getBoundingClientRect(), total = root.offsetHeight - window.innerHeight;
      return Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
    }
    if (!('ScrollTrigger' in window)) {
      window.addEventListener('scroll', function () { window.__journeyProgress = readProgress(); }, { passive: true });
    }
    window.__journeySetProgress = function (p) { window.__journeyProgress = p; };
    requestAnimationFrame(frame);
  }

  /* three.js comes from the importmap module script; boot when ready */
  function boot() {
    var needThree = document.querySelector('[data-3d-hero]') || document.getElementById('journey');
    if (!needThree) return;
    if (!webglOK() || smallScreen()) markFallback();
    try {
      if (document.getElementById('journey')) initJourney(); else initHeroObject();
    } catch (e) { markFallback(); }
  }
  boot();
})();
