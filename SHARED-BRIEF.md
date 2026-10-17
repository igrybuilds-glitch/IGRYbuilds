# IGRYbuilds Site — Shared Build Brief (all builders read this)
Site root: `~/workspace/igrybuilds-build/site/` (git repo, will push to GitHub → Cloudflare Pages).

## Design tokens (from REBUILD-MASTER-PLAN.md — authoritative)
- bg near-black `#050508`; neon purple `#a855f7`; magenta `#ec4899`; cyan `#22d3ee`
- Display font: Oswald or Archivo Narrow (Google Fonts, condensed); body: JetBrains Mono
- Giant headlines, tiny mono labels. Active Theory style hero.

## Nav (every page, identical)
- Transparent bar. Left: IGRYbuilds wordmark. Right: WORK | CONTACT pills.
- Terminal intent menu (homepage hero): "WHAT ARE YOU LOOKING FOR?" →
  Websites / Automation / AI Chatbots / WhatsApp / SEO (each links to /work.html or a filtered work view)

## CDN (pinned, load from these only)
- GSAP 3.14.2 core + ScrollTrigger (cdnjs UMD):
  https://cdnjs.cloudflare.com/ajax/libs/gsap/3.14.2/gsap.min.js
  https://cdnjs.cloudflare.com/ajax/libs/gsap/3.14.2/ScrollTrigger.min.js
- Lenis 1.3.26: https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.min.js
- Three.js 0.183.2 via importmap + UnrealBloomPass from examples/jsm. Lazy import() only on desktop, no reduced-motion. CSS-gradient fallback when no WebGL.

## Real facts (NEVER invent)
- Manmohan Sharma, founder. Age 21, BSc Maths student, Ratangarh, Churu, Rajasthan, India 331802.
- IGRYbuilds founded March 2026. Premium websites + smart automation for local businesses.
- Contact: +91 7014257991 · igrybuilds@gmail.com · WhatsApp link https://wa.me/917014257991
- Pricing (ONLY on /pricing.html, never homepage): Starter ₹5,000 / Pro ₹8,000 / Max ₹15,000.
- Founder photo: copy `~/workspace/imagine_media/media-generation-manmohan-avatar-golden-v1-0-b406941b-57a9-4a9c-b7fe-6b0caf2e2af7.webp` into `assets/img/founder.webp` (his approved current photo; never any other).
- Portfolio framing everywhere: "Concept work & studio experiments" — honest, no fake clients.
- NEVER write "I make websites" / "websites banata hoon". Positioning: founder of IGRYbuilds who helps local businesses win more customers through premium websites + smart automation.
- en-GB copy. No invented stats/testimonials/client names.

## File ownership (do not touch others' files)
- Builder HOME: index.html, assets/css/base.css, assets/js/site.js, assets/js/boot.js
- Builder HERO: assets/js/hero.js, assets/css/hero.css, custom cursor, glitch reveals
- Builder PORTFOLIO: work.html, assets/js/work.js, assets/css/work.css, data/projects.json, scripts/gen-projects.py
- Builder PAGES: pricing.html, about.html, contact.html, assets/css/pages.css
- Builder SEO/COPY (phase 2): sitemap.xml, robots.txt, _headers, JSON-LD per page, meta/OG polish
- QA (phase 2): verification only

## Shared footer (every page, identical)
- "— Manmohan, founder of IGRYbuilds" + CTA + contacts + "Built by hand in Rajasthan, India."
- Floating WhatsApp button bottom-right on all pages: https://wa.me/917014257991

## Environment rules (all work)
- Node: `export PATH=~/node/bin:$PATH` (v22.19.0).
- Every python3 call: prefix `PYTHONPATH=~/workspace/.pystdlib:~/workspace/.pystdlib/lib-dynload`.
- /tmp is per-exec-call ephemeral — stage state in `~/workspace/igrybuilds-build/state/`.
- ffmpeg blend modes: `format=gbrp` before blend, `format=yuv420p` after (avoids magenta cast). Looped-PNG inputs: explicit `-t` on final mix. PIL title cards: measure text fits 1080px.
- ZERO Flow/Veo generation. Own system (ffmpeg + TTS + local) only for any media.

## Quality rules (all builders)
- Manmohan's quality bar: review EVERY deliverable; if good, improve it 4x, and do that 3 times. Reject anything under 7/10.
- Minimum 6 hours total real work — never rush, never a 10-minute build.
- JS must not be required for a complete page (set hidden states in JS, never CSS). prefers-reduced-motion respected. Mobile <900px: heavy motion off.
