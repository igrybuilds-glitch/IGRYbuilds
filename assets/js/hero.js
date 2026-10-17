/* ============================================================================
 * IGRYbuilds — 3D Hero (hero.js)
 * Active Theory style particle void: full-viewport Three.js point field,
 * neon purple / magenta / cyan on #050508, UnrealBloomPass, subtle mouse
 * parallax, slow drift, scroll-scrubbed camera.
 *
 * GATING (all must pass, else clean CSS-gradient fallback):
 *   - viewport width >= 900px (desktop)
 *   - prefers-reduced-motion: no-preference
 *   - navigator.connection.saveData is falsy
 *   - WebGL(2) context actually creatable
 *
 * LOADING: three.js is lazy import()ed via importmap AFTER first paint
 * (requestIdleCallback / window load). The page MUST include this importmap
 * in <head> (HOME builder):
 *
 *   <script type="importmap">
 *   { "imports": {
 *       "three": "https://cdn.jsdelivr.net/npm/three@0.183.2/build/three.module.js",
 *       "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.183.2/examples/jsm/"
 *   } }
 *   </script>
 *
 * MARKUP CONTRACT (HOME builder):
 *   <section id="igry-hero" data-hero>
 *     <!-- hero.js creates <canvas id="hero-canvas"> if not present -->
 *     <div class="hero-content"> …headline, intent menu… </div>
 *   </section>
 *
 * LIFECYCLE: hero.js dispatches `igry:hero-ready` (detail.mode =
 * 'webgl' | 'fallback') once the first frame is painted or the fallback
 * is applied. boot.js listens to fade the scene in; motion.js listens to
 * play the hero intro choreography.
 *
 * Fallback: section gets .hero-fallback (pure CSS gradient, animated
 * drift, disabled under reduced-motion). Never a broken canvas.
 * ========================================================================== */
(function () {
  'use strict';

  window.IGRY = window.IGRY || {};
  var IGRY = window.IGRY;

  /* Brand tokens (mirror SHARED-BRIEF). */
  var BG = 0x050508;
  var PALETTE = [0xa855f7, 0xec4899, 0x22d3ee]; // purple / magenta / cyan

  var SELECTOR = '#igry-hero';
  var CANVAS_ID = 'hero-canvas';

  var api = {
    mode: 'pending',   // 'webgl' | 'fallback' | 'pending'
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
      var gl = c.getContext('webgl2') || c.getContext('webgl');
      return !!gl;
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
  /* Scene                                                                 */
  /* ------------------------------------------------------------------ */
  var live = null; // holds the running scene for pause/resume/teardown

  function softSprite(THREE) {
    var size = 64;
    var cv = document.createElement('canvas');
    cv.width = cv.height = size;
    var ctx = cv.getContext('2d');
    var g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.35, 'rgba(255,255,255,0.55)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    var tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  function makeCloud(THREE, sprite, count, radiusMin, radiusMax, size, opacity) {
    var pos = new Float32Array(count * 3);
    var col = new Float32Array(count * 3);
    var tmp = new THREE.Color();
    for (var i = 0; i < count; i++) {
      // Flattened spherical shell — a "void" with depth, denser near centre.
      var r = radiusMin + Math.pow(Math.random(), 0.7) * (radiusMax - radiusMin);
      var theta = Math.random() * Math.PI * 2;
      var y = (Math.random() * 2 - 1) * radiusMax * 0.55;
      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * r;
      // Weighted palette pick: purple dominant, magenta accents, cyan sparks.
      var pick = Math.random();
      var hex = pick < 0.5 ? PALETTE[0] : (pick < 0.82 ? PALETTE[1] : PALETTE[2]);
      tmp.setHex(hex).multiplyScalar(0.55 + Math.random() * 0.45);
      col[i * 3] = tmp.r; col[i * 3 + 1] = tmp.g; col[i * 3 + 2] = tmp.b;
    }
    var geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    var mat = new THREE.PointsMaterial({
      size: size,
      map: sprite,
      vertexColors: true,
      transparent: true,
      opacity: opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    return new THREE.Points(geo, mat);
  }

  function startWebGL(heroEl, THREE, mods) {
    var EffectComposer = mods.EffectComposer;
    var RenderPass = mods.RenderPass;
    var UnrealBloomPass = mods.UnrealBloomPass;
    var OutputPass = mods.OutputPass;

    var canvas = heroEl.querySelector('#' + CANVAS_ID);
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = CANVAS_ID;
      heroEl.insertBefore(canvas, heroEl.firstChild);
    }
    canvas.setAttribute('aria-hidden', 'true'); // decorative — headline stays in the DOM

    var w = heroEl.clientWidth || window.innerWidth;
    var h = heroEl.clientHeight || window.innerHeight;

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: false,          // bloom pass smooths; AA is wasted fill-rate
        alpha: false,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      applyFallback(heroEl, 'renderer-failed');
      return;
    }
    renderer.setClearColor(BG, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);

    var scene = new THREE.Scene();
    scene.background = new THREE.Color(BG);
    scene.fog = new THREE.FogExp2(BG, 0.012);

    var camera = new THREE.PerspectiveCamera(58, w / h, 0.1, 400);
    camera.position.set(0, 2, 56);

    var sprite = softSprite(THREE);
    var area = w * h;
    var innerCount = Math.max(2800, Math.min(4200, Math.round(area / 420)));
    var outerCount = Math.max(900, Math.min(1600, Math.round(area / 1400)));

    var inner = makeCloud(THREE, sprite, innerCount, 6, 42, 0.85, 0.9);
    var outer = makeCloud(THREE, sprite, outerCount, 30, 85, 1.5, 0.55);
    var core = new THREE.Group();
    core.add(inner);
    scene.add(core);
    scene.add(outer);

    // Faint neon core glow behind the headline.
    var glowMat = new THREE.SpriteMaterial({
      map: sprite,
      color: 0xa855f7,
      transparent: true,
      opacity: 0.16,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    var glow = new THREE.Sprite(glowMat);
    glow.scale.set(60, 34, 1);
    glow.position.set(0, 2, -18);
    scene.add(glow);

    // Post: bloom makes the neon read as light, not dots.
    var composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    var bloom = new UnrealBloomPass(
      new THREE.Vector2(w, h),
      0.95,   // strength
      0.55,   // radius
      0.0     // threshold — bloom the dim tails too
    );
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    // Mouse parallax (lerped, tiny).
    var mx = 0.5, my = 0.5, tx = 0.5, ty = 0.5;
    var onMouse = function (e) {
      tx = e.clientX / window.innerWidth;
      ty = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMouse, { passive: true });

    // Scroll scrub: camera pulls back, bloom breathes, void spins on.
    var scrollP = 0;
    var scrub = null;
    if (window.ScrollTrigger) {
      scrub = window.ScrollTrigger.create({
        trigger: heroEl,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: function (self) {
          scrollP = self.progress;
          heroEl.style.setProperty('--hs', scrollP.toFixed(4));
        }
      });
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
    var clock = new THREE.Clock();
    var elapsed = 0;
    var firstFrame = true;

    function markReady() {
      if (!firstFrame) return;
      firstFrame = false;
      heroEl.setAttribute('data-hero-state', 'ready');
      heroEl.classList.add('is-live'); // CSS fades the canvas in
      dispatchReady('webgl');
    }

    function frame() {
      if (!running) return;
      live.raf = requestAnimationFrame(frame);
      if (!inView || !tabVisible || document.hidden) {
        clock.getDelta(); // keep delta from jumping on resume
        return;
      }
      var dt = Math.min(clock.getDelta(), 0.05);
      elapsed += dt;

      // Slow drift — the void breathes.
      core.rotation.y += dt * 0.028;
      core.rotation.x = Math.sin(elapsed * 0.07) * 0.05;
      outer.rotation.y -= dt * 0.016;
      core.position.y = Math.sin(elapsed * 0.24) * 0.9;
      glow.material.opacity = 0.13 + Math.sin(elapsed * 0.5) * 0.035;

      // Mouse parallax.
      mx += (tx - mx) * 0.045;
      my += (ty - my) * 0.045;
      camera.position.x = (mx - 0.5) * 9;
      camera.position.y = 2 + (0.5 - my) * 6;

      // Scroll scrub state.
      camera.position.z = 56 + scrollP * 66;
      bloom.strength = 0.95 + scrollP * 0.55;
      core.rotation.y += scrollP * dt * 0.35;
      inner.material.opacity = 0.9 * (1 - scrollP * 0.55);

      camera.lookAt(0, 1, 0);
      composer.render();
      markReady(); // first painted frame — boot.js fades the scene in now
    }

    function onResize() {
      var nw = heroEl.clientWidth || window.innerWidth;
      var nh = heroEl.clientHeight || window.innerHeight;
      var pr = Math.min(window.devicePixelRatio || 1, 2);
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(pr);
      composer.setPixelRatio(pr);
      renderer.setSize(nw, nh, false);
      composer.setSize(nw, nh);
    }
    window.addEventListener('resize', onResize);

    // Context loss → degrade to the CSS fallback, never a dead canvas.
    canvas.addEventListener('webglcontextlost', function (e) {
      e.preventDefault();
      teardown();
      applyFallback(heroEl, 'context-lost');
    });

    function teardown() {
      running = false;
      if (live && live.raf) cancelAnimationFrame(live.raf);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
      if (io) io.disconnect();
      if (scrub) scrub.kill();
      try {
        scene.traverse(function (o) {
          if (o.geometry) o.geometry.dispose();
          if (o.material) {
            (Array.isArray(o.material) ? o.material : [o.material]).forEach(function (m) {
              if (m.map) m.map.dispose();
              m.dispose();
            });
          }
        });
        renderer.dispose();
      } catch (e) { /* noop */ }
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
        if (running || api.mode !== 'webgl') return;
        running = true;
        clock.getDelta();
        live.raf = requestAnimationFrame(frame);
      },
      teardown: teardown,
      setScroll: function (p) { scrollP = Math.max(0, Math.min(1, p)); }
    };

    api.mode = 'webgl';
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
      // Lazy import — three.js never blocks first paint.
      return Promise.all([
        import('three'),
        import('three/addons/postprocessing/EffectComposer.js'),
        import('three/addons/postprocessing/RenderPass.js'),
        import('three/addons/postprocessing/UnrealBloomPass.js'),
        import('three/addons/postprocessing/OutputPass.js')
      ]).then(function (mods) {
        var THREE = mods[0];
        startWebGL(heroEl, THREE, {
          EffectComposer: mods[1].EffectComposer,
          RenderPass: mods[2].RenderPass,
          UnrealBloomPass: mods[3].UnrealBloomPass,
          OutputPass: mods[4].OutputPass
        });
        return api.mode;
      }).catch(function () {
        applyFallback(heroEl, 'import-failed');
        return api.mode;
      });
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
