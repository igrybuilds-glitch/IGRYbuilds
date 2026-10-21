# IGRYbuilds Site — Shared Build Brief (all builders read this)
Site root: `~/workspace/igrybuilds-build/site/` (git repo, will push to GitHub → Cloudflare Pages).

## Design tokens (from assets/css/3d.css — authoritative, matches shipped site)
- Warm charcoal + cream + single terracotta. Flat colours only; no gradients as decoration.
- `--bg:#141110` · `--bg2:#1d1713` · `--bg3:#241c16` (warm-charcoal scale)
- `--ink:#f3ede0` (cream body text) · `--muted:#a89b8a` · `--faint:#6f6355`
- `--line:rgba(243,237,224,.14)` · `--line-soft:rgba(243,237,224,.08)`
- `--accent:#c85a2e` (terracotta) · `--accent-deep:#a3451f` · `--accent-soft:#e8a87c`
- `--ok:#7fb069` · `--radius:14px` · `--ease:cubic-bezier(.22,1,.36,1)`
- Display font: **Fraunces** (`--font-d:"Fraunces",Georgia,serif`) — headlines, chapter numbers, service indices; italic accents in `--accent-soft`
- Body font: **Inter** (`--font-b:"Inter",system-ui,sans-serif`)
- Display style: large serif headlines with italic terracotta accents; small uppercase eyebrow labels (letter-spaced, `--accent-soft`); card rows and price cards on `--bg2`/`--bg3`

## Nav (every page, identical)
- Fixed transparent `.site-nav` bar. Left: IGRYbuilds wordmark (`IGRY` + italic terracotta `builds` span). Right (desktop): Services | Work | Process | Pricing | About — five links, no Contact button. Burger menu on mobile → full-screen overlay menu (home + all sections + services list + Contact as an accent `.hot` pill).

## Homepage hero (shipped)
- Scroll-driven 3D journey (`#journey`, `.stage3d` canvas with `.webgl`), sticky-scroll chapters — NOT a terminal menu. The old "WHAT ARE YOU LOOKING FOR?" intent menu was abandoned; do not reintroduce it.
- H1: "Websites that *win customers.*" (accent-soft italic em). No-JS / no-WebGL / mobile users see the `.stage-fallback` CSS rings (`.no-webgl` on `<html>`), never a blank hero.

## CDN (pinned, load from these only) + asset rules
- **GSAP 3.14.2 core + ScrollTrigger (cdnjs UMD) — `index.html` ONLY**, loaded `defer`:
  https://cdnjs.cloudflare.com/ajax/libs/gsap/3.14.2/gsap.min.js
  https://cdnjs.cloudflare.com/ajax/libs/gsap/3.14.2/ScrollTrigger.min.js
  (Never re-add to other pages — P1-6.)
- **Lenis 1.3.26 — every page (28/28)**: https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.min.js
- **Three.js 0.183.2 — importmap → MINIFIED build**, pinned:
  `{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.183.2/build/three.module.min.js"}}`
  Single-key importmap ("three" only — no addons mapping). UnrealBloomPass is NOT used; do not add the post-processing stack.
- **three.js is lazy + gated**: `scroll3d.js` calls `import('three')` only when WebGL is available AND viewport is >900px AND pointer is fine AND no reduced-motion. The importmap exists on the 21 pages with `.stage3d` canvas markup; 404 + all blog posts ship ZERO three.js references (P0-1).
- **Fonts are SELF-HOSTED — zero Google Fonts requests** (P2-4). 8 woff2 in `assets/fonts/`: Fraunces variable 400–600 (normal + italic), Inter variable 400–600 + Inter static 700; latin + latin-ext subsets. `@font-face` blocks at the top of `3d.css` use `font-display:swap`. Every page carries 3 same-origin `<link rel="preload" as="font">` preloads (depth-correct). `_headers` gives `/assets/fonts/*` immutable 1-year cache. Never re-add the fonts.googleapis.com stylesheet or preconnects.
- **CSP** (`_headers`, Cloudflare Pages): `default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data:; connect-src 'self' https://cdn.jsdelivr.net; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://wa.me` — any new CDN must be added here first.
- **Share image**: `assets/img/og-share.jpg` (1200×630, brand card matching the token palette) — `og:image` + `twitter:image` on all pages with `og:image:width/height` (1200/630).

## Real facts (NEVER invent)
- Manmohan Sharma, founder. Age 21, BSc Maths student, Ratangarh, Churu, Rajasthan, India 331802.
- IGRYbuilds founded March 2026. Premium websites + smart automation for local businesses.
- Contact: +91 7014257991 · igrybuilds@gmail.com · WhatsApp link https://wa.me/917014257991
- Pricing (ONLY on /pricing.html, never homepage): Starter ₹5,000 / Pro ₹8,000 / Max ₹15,000.
- Founder photo: `assets/img/founder.webp` (his approved current photo; never any other).
- Portfolio framing everywhere: "Concept work & studio experiments" — honest, no fake clients.
- NEVER write "I make websites" / "websites banata hoon". Positioning: founder of IGRYbuilds who helps local businesses win more customers through premium websites + smart automation.
- en-GB copy. No invented stats/testimonials/client names.

## File ownership (shipped file names — do not touch others' files)
- Homepage: index.html, assets/js/site3d.js (global UI), assets/js/scroll3d.js (3D scenes)
- Styles: assets/css/3d.css (design system — tokens, @font-face, all components)
- Content: services/*.html, cities/*.html, blog/*.html, work/*.html, plus services.html / cities served via footer
- Headers/meta/schema: _headers, per-page JSON-LD, sitemap.xml (regenerate lastmod with scripts/gen-sitemap.mjs), robots.txt
- QA (phase 2): scripts/qa.mjs — the ONLY score that counts; `node scripts/qa.mjs` must stay green.

## Shared footer (every page, identical)
- "— Manmohan Sharma, founder of IGRYbuilds" + CTA "Have a project in mind? Let's talk →" (→ contact.html) + contacts (+91 70142 57991 · igrybuilds@gmail.com) + "Areas we serve" city block (all 6 cities) + "Built by hand in Rajasthan, India. © 2026 IGRYbuilds."
- Floating WhatsApp button bottom-right on all pages (`.wa-float` → https://wa.me/917014257991)

## Environment rules (all work)
- Node: `export PATH=~/node/bin:$PATH` (v22.19.0).
- Every python3 call: prefix `PYTHONPATH=~/workspace/.pystdlib:~/workspace/.pystdlib/lib-dynload`.
- /tmp is per-exec-call ephemeral — stage state in `~/workspace/igrybuilds-build/state/`.
- ffmpeg blend modes: `format=gbrp` before blend, `format=yuv420p` after (avoids magenta cast). Looped-PNG inputs: explicit `-t` on final mix. PIL title cards: measure text fits 1080px.
- ZERO Flow/Veo generation. Own system (ffmpeg + TTS + local) only for any media.

## Quality rules (all builders)
- Manmohan's quality bar: review EVERY deliverable; if good, improve it 4x, and do that 3 times. Reject anything under 7/10.
- Minimum 6 hours total real work — never rush, never a 10-minute build.
- JS must not be required for a complete page (set hidden states in JS, never CSS). prefers-reduced-motion respected. Mobile ≤900px: heavy motion off (WebGL scenes degrade to the `.no-webgl` fallback).
