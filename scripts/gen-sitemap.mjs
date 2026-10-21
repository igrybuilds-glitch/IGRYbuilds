#!/usr/bin/env node
/* IGRYbuilds — sitemap generator with honest <lastmod>.
   Regenerates sitemap.xml from the canonical page list below.
   <lastmod> comes from each file's last git commit date on this branch,
   so it only moves when the page actually changed — "update on change".

   Usage:  node scripts/gen-sitemap.mjs     (from the repo root)
   Node built-ins + git only. */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HOST = 'https://igrybuilds.pages.dev';

/* rel path → [changefreq, priority] — keep in the same order as the sitemap */
const PAGES = [
  ['index.html', 'daily', '1.0'],
  ['services.html', 'weekly', '0.8'],
  ['services/websites.html', 'weekly', '0.8'],
  ['services/redesign.html', 'weekly', '0.8'],
  ['services/seo.html', 'weekly', '0.8'],
  ['services/automation.html', 'weekly', '0.8'],
  ['services/chatbots.html', 'weekly', '0.8'],
  ['services/whatsapp.html', 'weekly', '0.8'],
  ['work.html', 'weekly', '0.8'],
  ['work/design-plus.html', 'weekly', '0.8'],
  ['process.html', 'weekly', '0.8'],
  ['about.html', 'weekly', '0.8'],
  ['pricing.html', 'weekly', '0.8'],
  ['contact.html', 'weekly', '0.8'],
  ['blog.html', 'weekly', '0.8'],
  ['blog/first-30-seconds.html', 'weekly', '0.8'],
  ['blog/follow-up-engine.html', 'weekly', '0.8'],
  ['cities/ajmer.html', 'weekly', '0.8'],
  ['cities/jaipur.html', 'weekly', '0.8'],
  ['cities/bikaner.html', 'weekly', '0.8'],
  ['cities/jodhpur.html', 'weekly', '0.8'],
  ['cities/udaipur.html', 'weekly', '0.8'],
  ['cities/kota.html', 'weekly', '0.8'],
];

function lastmod(rel) {
  try {
    const d = execFileSync('git', ['log', '-1', '--format=%cs', '--', rel],
      { cwd: ROOT, encoding: 'utf8' }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
  } catch { /* fall through */ }
  // untracked or git unavailable: today's UTC date, flagged loudly
  console.error(`WARN: no git lastmod for ${rel}, using today`);
  return new Date().toISOString().slice(0, 10);
}

const missing = PAGES.filter(([rel]) => !fs.existsSync(path.join(ROOT, rel)));
if (missing.length) {
  console.error('MISSING FILES: ' + missing.map(([r]) => r).join(', '));
  process.exit(1);
}

let out = '<?xml version="1.0" encoding="UTF-8"?>\n';
out += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
for (const [rel, freq, prio] of PAGES) {
  out += `  <url><loc>${HOST}/${rel}</loc><lastmod>${lastmod(rel)}</lastmod><changefreq>${freq}</changefreq><priority>${prio}</priority></url>\n`;
}
out += '</urlset>\n';
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), out);
console.log(`sitemap.xml written: ${PAGES.length} urls`);
