# Staging QA Report — Phase 007

**Date:** 2026-09-03  
**Commit:** `f82dfa9233b27bf26f53b92e9872264ade7331de`  
**Deployment ID:** `BtiK6BbG1brY7nLTBD7vGjbuqUJZ`  
**Public staging URL:** https://bukanpipe.vercel.app  
**Preview URL (SSO-protected):** https://bukanpipe-lif5c05jq-nima-saraeians-projects.vercel.app  

**Custom domains attached:** None (`bukanpipe.com` / `bukanpipe.ir` not pointed)

---

## 0. Source hygiene

| Pattern | Public content | Action |
|---|---|---|
| `زهk` | None in `data/content/fa/` | Fixed pre-commit (`چارچوب` in laboratory SEO) |
| `VERIFY` / `DATA_REQUIRED` / `TODO` / `Lorem` | Not in rendered FA catalog | PASS — test guard in `validate-catalog.test.ts` |
| `legacy` | Internal metadata fields only (`legacy-claim`) | Not shown in public UI |
| `PLACEHOLDER` | Demo asset roles only (`/media/demo/*`) | Documented in `TEMPORARY_ASSET_POLICY.md` |

**Pre-commit checks:** `npm test` 65/65 PASS · `npm run build` PASS

---

## 1. Deployment

| Item | Value |
|---|---|
| Platform | Vercel (`nima-saraeians-projects/bukanpipe`) |
| Build | Production build, 82 static routes |
| Env (staging) | `ENABLE_LEGACY_REDIRECTS=false` (default) |
| Indexing | `NEXT_PUBLIC_ALLOW_INDEXING=false` → `noindex, nofollow` |

**Note:** Team preview deployments require Vercel SSO login. Public QA uses the `bukanpipe.vercel.app` alias (same build as deployment `BtiK6BbG1brY7nLTBD7vGjbuqUJZ`).

---

## 2. Live HTTP QA (FA priority routes)

Base: `https://bukanpipe.vercel.app`

| Route | Status |
|---|---|
| `/fa` | 200 |
| `/fa/products` | 200 |
| `/fa/products/water-supply-pipe` | 200 |
| `/fa/products/gas-pipe` | 200 |
| `/fa/products/pe100-pipe` | 200 |
| `/fa/applications` | 200 |
| `/fa/laboratory` | 200 |
| `/fa/laboratory/iso-17025` | 200 |
| `/fa/technical-center` | 200 |
| `/fa/technical-center/polyethylene-pipe-welding` | 200 |
| `/fa/technical-center/air-vent-valve` | 200 |
| `/fa/technical-center/polyethylene-pipe-temperature-pressure` | 200 |
| `/fa/polyethylene-pipe` | 200 |
| `/fa/calculator/pipeline-design` | 200 |
| `/fa/downloads` | 200 |
| `/fa/about` | 200 |
| `/fa/quality` | 200 |
| `/fa/certifications` | 200 |
| `/fa/contact` | 200 |
| `/fa/request-quote` | 200 |
| `/fa/does-not-exist` | 404 |
| `/fa/products/fake-slug` | 404 |
| `/fa/technical-center/fake` | 404 |

**EN safety**

| Route | Status |
|---|---|
| `/en/products/gas-pipe` | 200 |
| `/en/about` | 404 |
| `/en/laboratory` | 404 |
| `/en/products/fake` | 404 |

---

## 3. Rendered SEO (sample: `/fa/products/gas-pipe`)

| Check | Result |
|---|---|
| `<title>` | `لوله پلی اتیلن گازرسانی \| بوکان پایپ` |
| `<h1>` | `لوله پلی‌اتیلن گازرسانی` |
| `canonical` | `https://bukanpipe-aex63l5d9-nima-saraeians-projects.vercel.app/fa/products/gas-pipe` |
| `robots` | `noindex, nofollow` |
| JSON-LD | Present (BreadcrumbList + content schemas) |
| hreflang | Emitted only on bilingual product pages (not on FA-only pages) |
| OG | Present |

**Staging canonical behavior:** Uses `VERCEL_URL` (deployment-specific hostname) when `NEXT_PUBLIC_SITE_URL` is unset. At cutover set `NEXT_PUBLIC_SITE_URL=https://bukanpipe.com` — see `docs/PRODUCTION_METADATA.md`.

**Home title:** Root `<title>` remains `Bukan Pipe` (absolute default). FA meta description is localized. Non-blocking for staging; improve before production SEO sign-off.

---

## 4. Sitemap (live)

- FA: all published content paths + `/request-quote`
- EN: `/`, `/products`, six product slugs, `/request-quote` only
- Excluded: `/en/about`, `/en/laboratory`, engineering/knowledge/tools stubs
- URLs use deployment hostname (same canonical note as above)

---

## 5. Responsive / visual QA

Browser QA performed on live staging (mobile-width viewport).

**Pages verified:** Home (full scroll), mobile nav drawer, product content via HTTP.

**Screenshot artifact:** `staging-qa-home-mobile-390.png` (mobile menu — FA IA labels confirmed)

| Viewport | Status |
|---|---|
| Mobile menu | PASS — 9 nav items + استعلام قیمت; no Solutions/Industries/Engineering |
| RTL / FA copy | PASS — «از سال ۱۳۷۶», localized hero |
| Hero CTAs | PASS — استعلام قیمت primary, products secondary |
| Footer IA | PASS — products / resources / company columns |

**Manual pass still recommended:** 1440×900, 1280×800, 768×1024 on product, application, laboratory, technical article, pillar, calculator, contact.

---

## 6. Mobile navigation

Drawer items (all navigate targets verified in HTTP map):

1. خانه → `/fa`
2. محصولات → `/fa/products`
3. کاربردها → `/fa/applications`
4. آزمایشگاه → `/fa/laboratory`
5. مرکز فنی → `/fa/technical-center`
6. دانلود → `/fa/downloads`
7. ماشین‌حساب → `/fa/calculator`
8. درباره ما → `/fa/about`
9. تماس → `/fa/contact`
10. استعلام قیمت (CTA) → `/fa/request-quote`

Menu opens/closes via hamburger; `aria-expanded` toggles correctly.

---

## 7. Conversion paths

| Path | Result |
|---|---|
| Home → Request Quote | PASS |
| Product → spec CTA → quote / contact | PASS |
| Product hero → quote + contact | PASS |
| Laboratory → mailto lab + contact | PASS |
| Contact → tel:/mailto: list items | PASS |
| Request quote form | PASS — honest “not connected” message + phone/email fallback |
| Pillar / technical → related links | PASS (internal link test 0 broken) |

No dead commercial CTAs found on priority pages.

---

## 8. Request quote (`/fa/request-quote`)

- Fields: name*, company, phone*, email, product need, message*
- Submit shows **«ارسال آنلاین هنوز فعال نیست»** — does not fake success
- Direct contact: verified sales phones + `info@bukanpipe.com`
- Link to full contact page

---

## 9. Lighthouse (mobile — Home)

Artifact: `docs/lighthouse-home-mobile.json`

| Category | Score |
|---|---|
| Performance | **92** |
| Accessibility | **100** |
| Best Practices | **100** |
| SEO | **69** (expected: `noindex`, generic home title) |

**Notes:** LCP ~3.0s (hero image). No material CLS issues observed. SEO score suppressed by intentional staging `noindex`.

---

## 10. Images

| Check | Status |
|---|---|
| Broken images on priority pages | None observed |
| Hero / cards | Demo assets from `/media/demo/*` — labeled temporary in asset policy |
| Alt text | Decorative heroes use `alt=""`; content images use descriptive alt where set |
| Factory authenticity | Demo photography — **not** represented as verified factory imagery in copy |

**Factory asset queue:** spec PDFs, certificate scans, authentic factory photography — see `docs/CONTENT_VERIFICATION_QUEUE.md` and `docs/TEMPORARY_ASSET_POLICY.md`.

---

## 11. Live redirect test (`ENABLE_LEGACY_REDIRECTS=true`)

Tested locally on port 3001 with flag enabled.

| Legacy URL | Expected | Actual |
|---|---|---|
| `/gas-pipe` | 301 → `/fa/products/gas-pipe` | **FAIL** — middleware 307 → `/en/gas-pipe` → 404 |
| `/welding`, `/pipeline_design`, etc. | 301 to mapped paths | **FAIL** — same middleware pre-empts legacy rules |

**Root cause:** Locale middleware runs before `next.config` redirects, prefixing default locale (`en`) onto bare legacy paths. Legacy redirect rules never execute.

**Production impact:** Enabling `ENABLE_LEGACY_REDIRECTS` alone is **insufficient** until middleware/redirect ordering is fixed (e.g. exempt legacy paths from locale middleware, or run redirects at edge/host level).

Rule-map tests (`redirect-smoke.test.ts`) still PASS — inventory is correct; runtime integration is blocked.

---

## 12. 404 UX

- Returns default Next.js 404 page (English)
- `robots: noindex` — PASS
- No Product/Article schema on 404 — PASS
- **Improvement backlog:** Branded FA 404 with nav + home link

---

## 13. Calculator runtime (`/fa/calculator/pipeline-design`)

- Renders with engineering disclaimer
- Inputs accept numeric values; table updates
- `CALCULATOR_VERIFIED = NO` (formulas not parity-checked vs legacy JS)
- No formula changes in this phase

---

## 14. Lint classification

`npm run lint` → 17 problems (16 errors, 1 warning) — **all pre-existing**:

| File | Issue | Introduced this phase? |
|---|---|---|
| Hub pages `children` prop | react/no-children-prop | No |
| `PremiumHeroHeader` / `IndustrialHeader` | setState in effect | No |
| `HeroComposition.tsx` | static component in render | No |
| `PremiumHeroSection.tsx` | jsx-key in icon arrays | No |
| `page-hero-images.ts` | unused `_direction` | No |

**NEW_LINT_ERRORS = NO**

---

## 15. Phase 007 fixes (included in commit)

1. Laboratory SEO typo `چارچoob` → `چارچوب`
2. `/request-quote` — commercial form UI with honest no-backend fallback (replaces development stub page for FA)
3. `docs/PRODUCTION_METADATA.md` — canonical domain cutover guide

---

## 16. Remaining production blockers

1. **Legacy redirect runtime** — middleware vs redirect ordering
2. **Calculator parity** — independent legacy JS verification
3. **Factory data** — spec tables, download PDFs, ISO 17025 certificate, certification scans
4. **Canonical domain** — set `NEXT_PUBLIC_SITE_URL` at cutover
5. **Branded 404** — optional UX polish
6. **Home `<title>`** — FA-specific title for production SEO
7. **EN content** — intentionally incomplete

---

## Final gates

| Gate | Status |
|---|---|
| STAGING_DEPLOYED | **YES** |
| LIVE_HTTP_QA | **YES** |
| RESPONSIVE_QA | **YES** (mobile nav + home; full viewport matrix partial) |
| CONVERSION_QA | **YES** |
| LIVE_SEO_QA | **YES** (staging canonical hostname noted) |
| LIGHTHOUSE_REVIEWED | **YES** (home mobile) |
| LIVE_REDIRECT_TEST | **NO** — middleware blocks legacy 301s |
| EN_SAFETY_READY | **YES** |
| NEW_LINT_ERRORS | **NO** |
| CALCULATOR_VERIFIED | **NO** |
| FACTORY_DATA_COMPLETE | **NO** |
| READY_FOR_PRODUCTION_CUTOVER | **NO** |

## Recommendation

**NO-GO for production cutover.**

Staging is validated for FA content, conversion paths, and SEO foundation. Proceed with stakeholder review on https://bukanpipe.vercel.app. Do **not** attach `bukanpipe.com` until legacy redirect middleware is fixed, calculator is verified, and factory asset queue items are resolved or explicitly deferred.
