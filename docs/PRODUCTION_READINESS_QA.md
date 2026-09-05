# Production Readiness QA — Phase 009

**Checkpoint base:** `65631a30bcf07055bff41abe9687835c7949ebd5`  
**Staging deploy:** https://bukanpipe.vercel.app  
**Deploy ID:** `76A1ur96Uf7xuemguP9R1hu2WU68`  
**Date:** 2026-09-03

---

## Final gates

| Gate | Result |
|---|---|
| LEGACY_REDIRECTS_READY | **YES** (architecture; flag off on staging) |
| CALCULATOR_VERIFIED | **NO** |
| FA_PUBLIC_COPY_READY | **YES** |
| EN_PUBLIC_COPY_READY | **YES** |
| PRODUCTION_METADATA_READY | **YES** (requires env at cutover) |
| INDEXING_CUTOVER_READY | **YES** (config; not enabled) |
| RESPONSIVE_FINAL_READY | **YES** (spot-check; no blockers) |
| LIGHTHOUSE_FINAL_REVIEWED | **YES** |
| FACTORY_DATA_LAUNCH_SAFE | **YES** |
| NEW_LINT_ERRORS | **0** |
| READY_FOR_PRODUCTION_CUTOVER | **NO** |

---

## 1. Legacy redirect fix

Middleware resolves legacy paths **before** locale prefix routing via `resolveLegacyRedirect()` in `lib/migration/redirects.ts`. Single source of truth; `next.config` redirects empty.

**With `ENABLE_LEGACY_REDIRECTS=false` (staging):**

| URL | Result |
|---|---|
| `/gas-pipe` | 307 → `/en/gas-pipe` → 404 (expected until flag enabled) |

**With `ENABLE_LEGACY_REDIRECTS=true` (unit tests):**

| URL | Result |
|---|---|
| `/gas-pipe` | 308 → `/fa/products/gas-pipe` |
| `/welding` | 308 → `/fa/technical-center/polyethylene-pipe-welding` |
| `/pipeline_design` | 308 → `/fa/calculator/pipeline-design` |
| `/standards` | 308 → `/fa/downloads` |

See `docs/LEGACY_REDIRECT_PRODUCTION.md`.

---

## 2. Calculator

**CALCULATOR_VERIFIED = NO**

Hazen-Williams implementation produces non-plausible friction/head for baseline inputs (documented in `docs/CALCULATOR_FINAL_VALIDATION.md`). Recommendation: **B** — keep public with preliminary-engineering disclaimer.

---

## 3. Public copy hygiene

| Locale | Status |
|---|---|
| FA catalog | No `منبع:`, VERIFY, TODO, مسیر توسعه in rendered copy — test pass |
| EN catalog | No internal SEO/editorial phrases — test pass |
| EN route meta descriptions | Cleaned “development route” language in `messages/en.ts` |

---

## 4. Home metadata (live)

| Page | Title |
|---|---|
| `/fa` | تولیدکننده لوله پلی اتیلن PE100 \| بوکان پایپ |
| `/en` | HDPE & PE100 Pipe Manufacturer \| Bukan Pipe |

Both use locale-specific `seoDescription`. `robots: noindex, nofollow` confirmed.

---

## 5. Canonical / metadataBase

- `createRootMetadata()` exported from `app/[locale]/layout.tsx` with `metadataBase`
- `NEXT_PUBLIC_SITE_URL` takes precedence over `VERCEL_URL` (`lib/config/env.ts`)
- **Staging note:** Vercel project should set `NEXT_PUBLIC_SITE_URL=https://bukanpipe.vercel.app` — current deploy uses deployment hostname in canonical until env is set in dashboard
- Production cutover: `NEXT_PUBLIC_SITE_URL=https://bukanpipe.com`

---

## 6. Robots / indexing

| Check | Staging |
|---|---|
| robots.txt | `Disallow: /` |
| Page meta | `noindex, nofollow` |
| Indexing flag | `NEXT_PUBLIC_ALLOW_INDEXING=false` |

See `docs/PRODUCTION_ENV_CHECKLIST.md`.

---

## 7. Branded 404

- `app/[locale]/[...rest]/page.tsx` catch-all triggers localized `not-found.tsx`
- FA: Persian, RTL, home + products CTAs — verified live
- EN: same pattern with LTR copy
- Metadata: `robots: noindex`

---

## 8. Responsive pass (browser spot-check)

Viewports checked on FA/EN home, product, 404: **390×844**, **768×1024**, **1440×900**.

No overflow blockers; mobile nav drawer works; RTL/LTR direction correct; footer and CTAs wrap cleanly.

---

## 9. Lighthouse (mobile, prior run + review)

| Page | Performance | Notes |
|---|---|---|
| FA Home | **92** | TBT 130 ms |
| EN Home | **74** | TBT **730 ms** (primary gap) |
| Both | CLS ≈ 0 | Good |

**EN vs FA:** EN LCP is actually faster (2.6 s vs 3.0 s) but **Total Blocking Time** is ~6× higher, driving the performance score down. Likely causes: Latin font stack + hydration on EN home bundle. No safe fix applied in Phase 009 (would need targeted JS/font audit).

Material issues only documented — no score-chasing.

---

## 10. Factory data

See `docs/FACTORY_DATA_LAUNCH_MATRIX.md`. **FACTORY_DATA_LAUNCH_SAFE = YES**.

---

## 11. Contact / quote QA

| Item | FA | EN |
|---|---|---|
| Factory phones | 044-46433444–5, 044-4150 | +98 44 4643 3444–5 |
| Sales | 09144822511, 09143820556, info@bukanpipe.com | Same |
| Lab | 09013414979, lab@bukanpipe.com | Same |
| Quote form | Transparent offline fallback — no fake submit | Same |
| **Telegram / Eitaa** | Icons + lab phone fallback (URLs pending verification) | Same |
| **Factory map** | `FactoryLocationMap` — address embed + directions CTA | Same |

Central config: `lib/config/contact.ts`

---

## Phase 009 Addition — Contact channels + map

| Check | Status |
|---|---|
| Telegram icon visible | PASS |
| Eitaa icon visible | PASS |
| Verified deep links | N/A — `url: null` until factory confirms |
| Lab phone fallback (no fake URL) | PASS |
| Google Maps embed loads | PASS (address-query fallback) |
| Directions link | PASS |
| FA RTL / EN LTR | PASS |
| Keyboard focus on channel rows | PASS |
| LocalBusiness schema (no geo) | PASS |

---

## 12. EN stub routes

| Route | Behaviour |
|---|---|
| `/en/engineering` | 307 → `/en/technical-center` |
| `/en/knowledge` | 307 → `/en/technical-center` |
| `/en/tools` | 307 → `/en/calculator` |

No “development route” placeholder copy on these paths.

---

## 13. Lint

| Category | Count |
|---|---|
| Pre-existing errors | 16 |
| Phase 009 new errors | **0** |

Pre-existing: `react/no-children-prop`, hero keys, header effects, HeroComposition static components.

---

## 14. Tests / build

| Command | Result |
|---|---|
| `npm test` | **104/104 PASS** |
| `npm run build` | **99 routes PASS** |
| `npm run lint` | 16 pre-existing errors, **0 new** |

---

## Phase 009 Addition — EN calculator + mobile language switcher

| Check | Status |
|---|---|
| EN calculator zero Persian (dictionary + content + component) | PASS |
| Pre-rendered EN calculator HTML (post-build) | PASS |
| Calculator uses `messages/*/calculator.pipelineDesign` | PASS |
| Mobile `FA / EN` switch in header (`xl:hidden`) | PASS |
| Language switch removed from drawer | PASS |
| Desktop dropdown retained (`hidden xl:block`) | PASS |
| `switchLocalePathSafe` bilingual + home fallback | PASS |
| Aria labels (`Switch language to Persian` / `تغییر زبان به انگلیسی`) | PASS |
| Local mobile QA (360×800, 390×844) — Home, Calculator, Contact | PASS |
| Drawer = nav + theme + quote only (no duplicate lang) | PASS |
| Tests | **104/104 PASS** |

### Changed files (addition)

- `components/calculator/PipelineDesignCalculator.tsx` — i18n via `useLocale()`
- `components/layout/HeaderLocaleControls.tsx` — mobile + desktop locale controls
- `components/layout/PremiumHeroHeader.tsx` — header layout, drawer without lang
- `messages/en.ts`, `messages/fa.ts` — `calculator.pipelineDesign`, switch labels
- `app/engine-hero.css` — `.engine-header-lang-switch` styles
- `lib/content/en-calculator-render.test.ts` — Persian leak guard
- `lib/i18n/header-locale.test.ts` — placement + route switch tests

---

## 15. Remaining blockers before cutover

1. **Calculator formula validation** with legacy JS — CALCULATOR_VERIFIED = NO
2. **Set Vercel env** `NEXT_PUBLIC_SITE_URL=https://bukanpipe.vercel.app` for clean staging canonicals (optional but recommended)
3. **Enable legacy redirects** only at cutover (`ENABLE_LEGACY_REDIRECTS=true`)
4. **Production domain + indexing flags** when explicitly approved
5. **Factory certificate PDFs** if expanding factual cert claims (defer-safe today)

---

## Changed files (Phase 009)

- `middleware.ts` — legacy redirect before locale routing
- `lib/migration/redirects.ts` — resolver, FA canonical destinations
- `lib/migration/legacy-runtime.test.ts` — runtime redirect tests
- `lib/calculator/pipeline-design.test.ts` — validation matrix tests
- `lib/content/fa-public-copy.test.ts` — FA hygiene
- `lib/seo/canonical-production.test.ts`, `lib/seo/not-found.test.ts`
- `app/[locale]/page.tsx` — home SEO titles
- `app/[locale]/layout.tsx` — root metadata
- `app/[locale]/not-found.tsx`, `components/pages/NotFoundContent.tsx`
- `app/[locale]/[...rest]/page.tsx` — catch-all 404
- `messages/fa.ts`, `messages/en.ts` — home titles, notFound, route SEO
- `lib/config/env.ts`, `.env.example`
- `docs/LEGACY_REDIRECT_PRODUCTION.md`
- `docs/CALCULATOR_FINAL_VALIDATION.md`
- `docs/PRODUCTION_ENV_CHECKLIST.md`
- `docs/FACTORY_DATA_LAUNCH_MATRIX.md`
- `docs/PRODUCTION_READINESS_QA.md`

**Not committed** per phase instructions.
