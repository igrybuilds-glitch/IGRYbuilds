#!/usr/bin/env node
// scripts/perf.mjs — runtime performance probe for the IGRYbuilds 3D site.
// Drives local chrome-headless-shell (SwiftShader software WebGL) over CDP and
// records: FPS during a real user-path scroll (through Lenis), console errors,
// network payload sizes, Performance.* metrics, and journey screenshots.
// NOTE: SwiftShader numbers are a lower-bound smoke test, NOT real-GPU scores.
// A page that janks here has real jank; a page smooth here still needs a real
// device check (that is P2-5's remaining browser-slot work).
//
// Usage:
//   node scripts/perf.mjs --outdir <dir> [--width 1440] [--height 900]
//                          [--mobile] [--port 8123] [--page index.html] [--label desktop]
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHROME = '/opt/hatch/assets/artifacts/headless-shell/chrome-headless-shell';
const CDP_PORT = 9333;

function arg(name, def) {
  const i = process.argv.indexOf('--' + name);
  if (i === -1) return def;
  if (i + 1 < process.argv.length && !process.argv[i + 1].startsWith('--')) return process.argv[i + 1];
  return true;
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Local stand-ins for CDN libs (measured identical bytes; used only when the
// VM's egress to the CDN is down, via Fetch interception — the repo is untouched).
const CDN_MAP = {
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.14.2/gsap.min.js': '/tmp/cdn-local/files/gsap.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.14.2/ScrollTrigger.min.js': '/tmp/cdn-local/files/ScrollTrigger.min.js',
  'https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.min.js': '/tmp/cdn-local/files/lenis.min.js',
  'https://cdn.jsdelivr.net/npm/three@0.183.2/build/three.module.min.js': '/tmp/cdn-local/files/three.module.min.js',
  'https://cdn.jsdelivr.net/npm/three@0.183.2/build/three.core.min.js': '/tmp/cdn-local/files/three.core.min.js', // three r183 splits core into a second chunk
};

async function waitForDebugger(port, tries = 60) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (r.ok) return;
    } catch {}
    await sleep(500);
  }
  throw new Error('chrome debugger never came up');
}

async function main() {
  const W = parseInt(arg('width', '1440'), 10);
  const H = parseInt(arg('height', '900'), 10);
  const mobile = arg('mobile', false) === true || arg('mobile', false) === 'true';
  const forcePointerFine = arg('force-pointer-fine', false) === true || arg('force-pointer-fine', false) === 'true';
  const label = arg('label', mobile ? 'mobile' : 'desktop');
  const page = arg('page', 'index.html');
  const sport = arg('port', '8123');
  const outdir = arg('outdir', '/tmp/perf-out');
  fs.mkdirSync(outdir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const report = { label, viewport: { W, H, mobile }, page, startedAt: new Date().toISOString() };

  const chrome = spawn(CHROME, [
    `--remote-debugging-port=${CDP_PORT}`,
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--enable-unsafe-swiftshader', // software WebGL so the three.js scene renders
    '--no-proxy-server', // VM sets proxy env vars; localhost must bypass them
    '--run-all-compositor-stages-before-draw', // keep BeginFrames flowing for rAF
    '--hide-scrollbars',
    '--mute-audio',
    `--window-size=${W},${H}`,
    'about:blank',
  ], { stdio: 'ignore' });

  try {
    await waitForDebugger(CDP_PORT);
    const targets = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json/list`)).json();
    const t = targets.find((x) => x.type === 'page');
    if (!t) throw new Error('no page target');
    const ws = new WebSocket(t.webSocketDebuggerUrl);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = (e) => rej(e); });

    let id = 0;
    const pending = new Map();
    const listeners = new Map();
    ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data.toString());
      if (msg.id && pending.has(msg.id)) {
        const fn = pending.get(msg.id); pending.delete(msg.id); fn(msg);
      } else if (msg.method) {
        const fns = listeners.get(msg.method) || [];
        for (const f of fns) { try { f(msg.params); } catch {} }
      }
    };
    const on = (method, fn) => {
      if (!listeners.has(method)) listeners.set(method, []);
      listeners.get(method).push(fn);
    };
    const send = (method, params = {}, timeoutMs = 30000) => new Promise((resolve, reject) => {
      const mid = ++id;
      const timer = setTimeout(() => {
        if (pending.has(mid)) { pending.delete(mid); reject(new Error('cdp timeout: ' + method)); }
      }, timeoutMs);
      pending.set(mid, (msg) => {
        clearTimeout(timer);
        if (msg.error) reject(new Error(method + ': ' + JSON.stringify(msg.error)));
        else resolve(msg.result || {});
      });
      ws.send(JSON.stringify({ id: mid, method, params }));
    });
    const evaluate = async (expression, awaitPromise = false) => {
      const r = await send('Runtime.evaluate', { expression, awaitPromise, returnByValue: true }, 60000);
      return r.result && 'value' in r.result ? r.result.value : undefined;
    };

    // ---- collectors ----
    const net = new Map(); // requestId -> {url, mime}
    const payloads = [];
    const failed = [];
    on('Network.requestWillBeSent', (p) => {
      if (!net.has(p.requestId)) net.set(p.requestId, { url: p.request.url, mime: null, status: null });
    });
    on('Network.responseReceived', (p) => {
      net.set(p.requestId, { url: p.response.url, mime: p.response.mimeType, status: p.response.status });
    });
    on('Network.loadingFinished', (p) => {
      const n = net.get(p.requestId);
      if (n && n.url.startsWith('http')) payloads.push({ url: n.url, mime: n.mime, status: n.status, bytes: p.encodedDataLength });
      net.delete(p.requestId);
    });
    on('Network.loadingFailed', (p) => {
      const n = net.get(p.requestId);
      failed.push({ url: n ? n.url : p.requestId, error: p.errorText });
      net.delete(p.requestId);
    });
    const consoleErrors = [];
    on('Log.entryAdded', (p) => {
      if (p.entry.level === 'error') consoleErrors.push({ source: p.entry.source, text: p.entry.text.slice(0, 300), url: (p.entry.url || '').slice(-80) });
    });
    on('Runtime.exceptionThrown', (p) => {
      consoleErrors.push({ source: 'exception', text: (p.exceptionDetails.text || '') + ' :: ' + (p.exceptionDetails.exception ? String(p.exceptionDetails.exception.description || '').slice(0, 200) : '') });
    });
    on('Runtime.consoleAPICalled', (p) => {
      if (p.type === 'error') consoleErrors.push({ source: 'console.error', text: p.args.map((a) => (a.value ?? a.description ?? '').toString().slice(0, 200)).join(' | ') });
    });

    await send('Page.enable');
    await send('Runtime.enable');    await send('Log.enable');
    await send('Network.enable');
    await send('Performance.enable');
    // Intercept CDN requests and serve byte-identical local copies when present
    // (VM egress to cdnjs/jsdelivr flaps; measurement must not depend on it).
    const cdnFiles = {};
    for (const [u, f] of Object.entries(CDN_MAP)) {
      try { if (fs.existsSync(f)) cdnFiles[u] = fs.readFileSync(f); } catch {}
    }
    report.cdnInterception = Object.keys(cdnFiles);
    if (Object.keys(cdnFiles).length) {
      await send('Fetch.enable', { patterns: [{ urlPattern: 'https://cdnjs.cloudflare.com/*' }, { urlPattern: 'https://cdn.jsdelivr.net/*' }] });
      on('Fetch.requestPaused', async (p) => {
        try {
          const body = cdnFiles[p.request.url];
          if (body) {
            await send('Fetch.fulfillRequest', {
              requestId: p.requestId, responseCode: 200,
              responseHeaders: [
                { name: 'Content-Type', value: 'text/javascript' },
                { name: 'Content-Length', value: String(body.length) },
                { name: 'Access-Control-Allow-Origin', value: '*' }, // real CDNs send this; module scripts need it
              ],
              body: body.toString('base64'),
            });
          } else {
            await send('Fetch.continueRequest', { requestId: p.requestId });
          }
        } catch { try { await send('Fetch.continueRequest', { requestId: p.requestId }); } catch {} }
      });
    }
    await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile });
    if (forcePointerFine) {
      // Headless reports no fine pointer, which trips the site's "mobile-like"
      // gate and skips three.js. Real desktops with a mouse DO match
      // (pointer:fine) — stub it so we measure the true full-3D scene cost.
      await send('Page.addScriptToEvaluateOnNewDocument', {
        source: `(() => { const orig = window.matchMedia.bind(window);
          window.matchMedia = (q) => q === '(pointer: fine)'
            ? { matches: true, media: q, onchange: null, addListener(){}, removeListener(){}, addEventListener(){}, removeEventListener(){}, dispatchEvent(){ return false; } }
            : orig(q); })();`,
      });
      report.pointerStub = 'pointer:fine forced (desktop-with-mouse simulation)';
    }

    const url = `http://127.0.0.1:${sport}/${page}`;
    await send('Page.navigate', { url });
    // wait for load
    await new Promise((resolve) => {
      const to = setTimeout(resolve, 25000);
      on('Page.loadEventFired', () => { clearTimeout(to); resolve(); });
    });
    await sleep(6000); // let three.js init / Lenis settle

    report.webgl = await evaluate(`(() => { const c = document.createElement('canvas'); const gl = c.getContext('webgl2') || c.getContext('webgl'); return gl ? (gl.getParameter(gl.RENDERER) + ' | ' + gl.getParameter(gl.VERSION)) : 'NONE'; })()`);
    report.canvasCount = await evaluate(`document.querySelectorAll('canvas').length`);
    report.scrollHeight = await evaluate(`document.documentElement.scrollHeight`);
    report.title = await evaluate(`document.title`);
    report.libs = await evaluate(`({ gsap: !!window.gsap, scrollTrigger: !!window.ScrollTrigger, lenis: (typeof window.Lenis !== 'undefined'), journey: !!document.querySelector('#journey') })`);
    const metricsBefore = await send('Performance.getMetrics');
    report.metricsBefore = Object.fromEntries(metricsBefore.metrics.map((m) => [m.name, m.value]));

    // ---- Phase A: rAF sampler + real-path scroll gestures (through Lenis) ----
    // Screenshots stay OUTSIDE the sampling window (readback spikes pollute FPS).
    const shotTop = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outdir, `shot-${label}-${stamp}-top.png`), Buffer.from(shotTop.data, 'base64'));
    const samplerSrc = `(() => new Promise((resolve) => {
      const D = 15000;
      const deltas = [];
      let last = performance.now();
      const t0 = last;
      let frames = 0;
      function tick(now) {
        deltas.push(+(now - last).toFixed(2));
        last = now; frames++;
        if (now - t0 < D) requestAnimationFrame(tick);
        else resolve({ frames, durationMs: +(now - t0).toFixed(1), deltas });
      }
      requestAnimationFrame(tick);
    }))()`;
    const samplerPromise = evaluate(samplerSrc, true); // don't await yet
    const scrollH = report.scrollHeight || 4000;
    const steps = 6;
    for (let i = 0; i < steps; i++) {
      await send('Input.synthesizeScrollGesture', {
        x: Math.floor(W / 2), y: Math.floor(H / 2),
        yDistance: -Math.floor(scrollH / steps), speed: 1400,
      }, 15000).catch(() => {});
      await sleep(400);
    }
    await sleep(2500);
    const shotEnd = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outdir, `shot-${label}-${stamp}-end.png`), Buffer.from(shotEnd.data, 'base64'));
    const sample = await samplerPromise;
    report.phaseA = sample && sample.frames > 30 ? summarize(sample, 'raf+lenis-scroll') : { stalled: true, frames: sample ? sample.frames : 0 };

    // ---- Phase B fallback: beginFrame loop if rAF stalled ----
    if (report.phaseA.stalled) {
      await send('HeadlessExperimental.beginFrame').catch(() => {});
      const bf = [];
      await evaluate(`window.scrollTo(0, 0)`);
      await sleep(500);
      const scrollPromise = evaluate(`window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' }); 'ok'`);
      for (let i = 0; i < 90; i++) {
        const t0 = Date.now();
        await send('HeadlessExperimental.beginFrame', { screenshot: undefined }).catch(() => {});
        bf.push(Date.now() - t0);
      }
      await scrollPromise;
      report.phaseB = summarize({ frames: bf.length, durationMs: bf.reduce((a, b) => a + b, 0), deltas: bf }, 'beginFrame+smooth-scroll');
    }

    const metricsAfter = await send('Performance.getMetrics');
    const after = Object.fromEntries(metricsAfter.metrics.map((m) => [m.name, m.value]));
    report.metricsDelta = {};
    for (const k of Object.keys(after)) {
      const d = after[k] - (report.metricsBefore[k] || 0);
      if (Math.abs(d) > 0.0001) report.metricsDelta[k] = +d.toFixed(3);
    }
    report.jsHeapUsedMB = after.JSHeapUsedSize ? +(after.JSHeapUsedSize / 1048576).toFixed(1) : null;

    // payloads: top by bytes
    payloads.sort((a, b) => b.bytes - a.bytes);
    report.totalBytes = payloads.reduce((a, p) => a + p.bytes, 0);
    report.requestCount = payloads.length;
    report.topPayloads = payloads.slice(0, 18).map((p) => ({ bytes: p.bytes, url: p.url.length > 90 ? '…' + p.url.slice(-90) : p.url }));
    report.failedRequests = failed;
    // dedupe console errors
    const seen = new Set();
    report.consoleErrors = consoleErrors.filter((e) => {
      const k = e.source + '|' + e.text.slice(0, 120);
      if (seen.has(k)) return false;
      seen.add(k); return true;
    }).slice(0, 20);
    report.consoleErrorCount = consoleErrors.length;

    ws.close();
    const out = path.join(outdir, `perf-${label}-${stamp}.json`);
    fs.writeFileSync(out, JSON.stringify(report, null, 2));
    console.log('WROTE ' + out);
    console.log(JSON.stringify(summarizeForStdout(report), null, 2));
  } finally {
    chrome.kill('SIGKILL');
  }
}

function summarize(sample, kind) {
  const d = [...sample.deltas].sort((a, b) => a - b);
  const n = d.length;
  const mean = d.reduce((a, b) => a + b, 0) / n;
  const q = (p) => d[Math.min(n - 1, Math.floor(n * p))];
  const over50 = d.filter((x) => x > 50).length;
  const over100 = d.filter((x) => x > 100).length;
  return {
    kind,
    frames: sample.frames,
    durationMs: sample.durationMs,
    avgFps: +(1000 / mean).toFixed(1),
    p50FrameMs: +q(0.5).toFixed(1),
    p95FrameMs: +q(0.95).toFixed(1),
    p99FrameMs: +q(0.99).toFixed(1),
    worstFrameMs: +d[n - 1].toFixed(1),
    framesOver50ms: over50,
    framesOver100ms: over100,
    jankPct: +((over50 / n) * 100).toFixed(1),
  };
}

function summarizeForStdout(r) {
  return {
    label: r.label,
    webgl: r.webgl,
    canvasCount: r.canvasCount,
    scrollHeight: r.scrollHeight,
    phaseA: r.phaseA,
    phaseB: r.phaseB,
    jsHeapUsedMB: r.jsHeapUsedMB,
    metricsDelta: r.metricsDelta,
    totalBytes: r.totalBytes,
    requestCount: r.requestCount,
    topPayloads: (r.topPayloads || []).slice(0, 8),
    failedRequests: r.failedRequests,
    consoleErrorCount: r.consoleErrorCount,
    consoleErrors: r.consoleErrors,
  };
}

main().catch((e) => { console.error('PERF FAILED:', e.message); process.exit(1); });
