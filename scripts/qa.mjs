#!/usr/bin/env node
/* IGRYbuilds — independent QA gate for the static site.
   Replaces the unverifiable build-time "QA 670/670" claim: every score
   from now on comes from running this script.

   Usage:  node scripts/qa.mjs        (from the repo root, any cwd works)
   Exit:   0 = all checks pass, 1 = at least one failure.

   Per HTML page it checks:
     - HTTP 200 when served locally
     - <title> present and non-empty
     - meta description present and non-empty
     - canonical link present — EXCEPT 404.html, which must NOT carry one
       (a 404 canonical is incorrect practice; 404.html also needs robots noindex)
     - share card image: og:image + twitter:image present and equal,
       target asset exists locally, og:image width/height + both alts present
     - exactly one <h1>
     - every JSON-LD block parses as valid JSON (and at least one exists)
     - every <img> carries an alt attribute
     - no dead internal links (href/src resolving to a missing file)
   Plus: sitemap.xml and robots.txt serve with HTTP 200.
   No dependencies — Node built-ins only. */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/* ---------- discover pages ---------- */
function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === '.git' || name === 'node_modules') continue;
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith('.html')) out.push(path.relative(ROOT, p));
  }
  return out;
}
const pages = walk(ROOT).sort();

/* ---------- tiny static server ---------- */
const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent((req.url || '/').split('?')[0].split('#')[0]);
  if (urlPath.endsWith('/')) urlPath += 'index.html';
  const file = path.join(ROOT, urlPath);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.writeHead(404); res.end('not found'); return;
  }
  res.writeHead(200); fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

function get(p) {
  return new Promise((resolve, reject) => {
    http.get(base + p, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => resolve({ status: res.statusCode, body }));
    }).on('error', reject);
  });
}

/* ---------- checks ---------- */
let passed = 0, total = 0;
const failures = [];
function check(page, name, ok, detail = '') {
  total++;
  if (ok) passed++;
  else failures.push(`${page} :: ${name}${detail ? ' — ' + detail : ''}`);
}

function resolveInternal(pageRel, ref) {
  let r = ref.split('#')[0].split('?')[0];
  if (!r) return null; // pure fragment
  let target;
  if (r.startsWith('/')) target = path.join(ROOT, r);
  else target = path.resolve(ROOT, path.dirname(pageRel), r);
  if (r.endsWith('/')) target = path.join(target, 'index.html');
  else if (fs.existsSync(target) && fs.statSync(target).isDirectory())
    target = path.join(target, 'index.html');
  return target;
}

for (const rel of pages) {
  const urlPath = '/' + rel.split(path.sep).join('/');
  const { status, body } = await get(urlPath);
  check(rel, 'http-200', status === 200, `got ${status}`);
  if (status !== 200) continue;

  const title = body.match(/<title>([\s\S]*?)<\/title>/i);
  check(rel, 'title', !!title && title[1].trim().length > 0);

  const metaTags = body.match(/<meta\b[^>]*>/gi) || [];
  const desc = metaTags.find((t) => /name\s*=\s*"description"/i.test(t));
  const descVal = desc && desc.match(/content\s*=\s*"([^"]*)"/i);
  check(rel, 'meta-description', !!descVal && descVal[1].trim().length > 0);

  const hasCanonical = /<link\b[^>]*rel\s*=\s*"canonical"/i.test(body);
  if (rel === '404.html')
    check(rel, 'no-canonical-on-404', !hasCanonical, '404 page must not carry a canonical');
  else
    check(rel, 'canonical', hasCanonical);

  if (rel === '404.html') {
    const robotsTag = metaTags.find((t) => /name\s*=\s*"robots"/i.test(t));
    const robotsVal = robotsTag && robotsTag.match(/content\s*=\s*"([^"]*)"/i);
    check(rel, 'noindex-on-404', !!robotsVal && /noindex/i.test(robotsVal[1]),
      robotsVal ? robotsVal[1] : 'no robots meta');
  }

  const ogImg = metaTags.find((t) => /property\s*=\s*"og:image"/i.test(t));
  const ogImgVal = ogImg && ogImg.match(/content\s*=\s*"([^"]*)"/i);
  const twImg = metaTags.find((t) => /name\s*=\s*"twitter:image"/i.test(t));
  const twImgVal = twImg && twImg.match(/content\s*=\s*"([^"]*)"/i);
  let shareOk = !!(ogImgVal && twImgVal && ogImgVal[1] === twImgVal[1]);
  let shareDetail = '';
  if (shareOk) {
    const u = ogImgVal[1];
    const local = u.startsWith('https://igrybuilds.pages.dev') ? u.slice('https://igrybuilds.pages.dev'.length)
      : (u.startsWith('/') ? u : null);
    if (!local || !fs.existsSync(path.join(ROOT, local))) {
      shareOk = false; shareDetail = 'og:image target missing locally: ' + u;
    } else {
      const hasWH = /property\s*=\s*"og:image:width"/i.test(body) && /property\s*=\s*"og:image:height"/i.test(body);
      const hasAlt = /property\s*=\s*"og:image:alt"/i.test(body) && /name\s*=\s*"twitter:image:alt"/i.test(body);
      if (!hasWH || !hasAlt) { shareOk = false; shareDetail = 'missing og:image dims or image alt tags'; }
    }
  } else shareDetail = 'og:image/twitter:image missing or mismatched';
  check(rel, 'share-image', shareOk, shareDetail);

  const h1s = (body.match(/<h1\b/gi) || []).length;
  check(rel, 'single-h1', h1s === 1, `found ${h1s}`);

  const ldBlocks = [...body.matchAll(/<script\b[^>]*type\s*=\s*"application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => m[1]);
  let ldOk = ldBlocks.length > 0, ldDetail = ldBlocks.length ? '' : 'no JSON-LD block';
  for (const block of ldBlocks) {
    try { JSON.parse(block); } catch (e) { ldOk = false; ldDetail = 'JSON.parse failed: ' + e.message; break; }
  }
  check(rel, 'json-ld-parses', ldOk, ldDetail);

  const imgs = body.match(/<img\b[^>]*>/gi) || [];
  const noAlt = imgs.filter((t) => !/\balt\s*=/i.test(t));
  check(rel, 'img-alt', noAlt.length === 0, `${noAlt.length}/${imgs.length} img without alt`);

  const refs = [...body.matchAll(/\b(?:href|src)\s*=\s*"([^"]+)"/gi)].map((m) => m[1]);
  const dead = [];
  for (const ref of refs) {
    if (/^(https?:)?\/\//i.test(ref) || /^(mailto:|tel:|data:|javascript:)/i.test(ref) || ref.startsWith('#')) continue;
    const target = resolveInternal(rel, ref);
    if (target && !fs.existsSync(target)) dead.push(ref);
  }
  check(rel, 'internal-links', dead.length === 0, dead.length ? 'dead: ' + dead.join(', ') : '');
}

for (const extra of ['/sitemap.xml', '/robots.txt']) {
  const { status } = await get(extra);
  check(extra.slice(1), 'http-200', status === 200, `got ${status}`);
}

server.close();

/* ---------- report ---------- */
console.log(`Pages checked: ${pages.length}`);
if (failures.length) {
  console.log(`\nFAILURES (${failures.length}):`);
  for (const f of failures) console.log('  ✗ ' + f);
}
console.log(`\nQA SCORE: ${passed}/${total} passed`);
process.exit(failures.length ? 1 : 0);
