## Staging deployment (Phase 008 EN QA)

**Date:** 2026-09-03  
**Deployment ID:** `5PhgeYwFCMwNMLDMqcjFzebDKTNp`  
**Public staging URL:** https://bukanpipe.vercel.app  
**Build:** 99 static routes · uncommitted local fixes deployed via `vercel deploy --prod`

| Policy | Status |
|--------|--------|
| Custom domain | Not attached |
| `NEXT_PUBLIC_ALLOW_INDEXING` | false → `noindex, nofollow` |
| `ENABLE_LEGACY_REDIRECTS` | false |

### Live EN route QA (40 checks)

All 35 EN content routes + `/en/request-quote` → **200**. Invalid slugs → **404**. Zero hreflang→404.

### Issues found and fixed (during QA)

| Issue | Fix |
|-------|-----|
| `/en/downloads` → 404 | Removed FA-only guard; bilingual `DownloadsPageContent` |
| Persian TOC label on EN pillar/articles | `ArticleTableOfContents` → "On this page" for EN |
| H1 `&amp;` in hero | Hero copy: "gas and irrigation" |

### Open issues (not fixed — pre-existing)

| Issue | Severity |
|-------|----------|
| Legacy paths (`/gas-pipe`) hit middleware locale prefix → 404 | Blocker for legacy cutover |
| Canonical/hreflang use `*.vercel.app` deployment URL | Fix at production via `NEXT_PUBLIC_SITE_URL` |
| Lighthouse SEO 69 | Expected while `noindex` active |
| Mobile perf 74 | Hero images — optimization backlog |
| Footer tagline still generic siteConfig copy | Minor copy polish |

### Lighthouse mobile `/en`

| Category | Score |
|----------|-------|
| Performance | 74 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 69 (noindex) |

Raw report: `docs/lighthouse-en-home-mobile.json`

---


## Route coverage

| Area | EN paths | Status |
|------|----------|--------|
| Home | `/en` | Implemented |
| Products hub + 6 products | `/en/products/*` | Implemented |
| Applications hub + 7 apps | `/en/applications/*` | Implemented |
| Laboratory hub + 5 pages | `/en/laboratory/*` | Implemented |
| Technical hub + 4 articles | `/en/technical-center/*` | Implemented |
| Pillar | `/en/polyethylene-pipe` | Implemented |
| Downloads | `/en/downloads` | Implemented |
| Calculator + pipeline design | `/en/calculator/*` | Implemented |
| About, Quality, Certifications, Contact | `/en/about` etc. | Implemented |
| Request Quote | `/en/request-quote` | Existing bilingual page |

## Content quality checks

| Check | Result |
|-------|--------|
| Native English (not literal FA translation) | PASS — independent copy in `data/content/en/*` |
| No unverified global positioning | PASS — no "global leader", "worldwide exporter" |
| Established 1997 (1376 validated) | PASS — About, home manufacturing |
| No "30+ years" exaggeration | PASS |
| Verified standards only as compliance claims | PASS — INSO 14427-2 water; EN 1555 / INSO 11233 / IGS gas |
| ISO/IEC 17025 not claimed without certificate | PASS — framework language only |
| No fabricated specs (OD, SDR, PN tables) | PASS — spec CTA to sales |
| Single H1 per page | PASS — via ContentDocumentPage |
| Unique EN titles/descriptions | PASS — validate-catalog.test.ts |
| LTR rendering | PASS — locale `en` → `ltr` |
| EN nav/footer IA parity with FA | PASS — nav-items.ts updated |

## SEO / technical

| Check | Result |
|-------|--------|
| hreflang fa ↔ en on shared paths | PASS — locale-availability.ts |
| x-default → FA when bilingual | PASS |
| No hreflang to 404 | PASS — tests updated |
| Sitemap EN full catalog | PASS — getAllPublishedPaths("en") |
| JSON-LD from content metadata | PASS — existing pipeline |
| noindex (staging policy) | PASS — not changed |

## Automated tests

Run:

```bash
npm test
npm run build
```

Expected: all tests pass; static generation includes EN routes for products, applications, laboratory, technical center.

## Manual staging QA (post-deploy)

When deployed to staging, verify:

- [ ] Mobile EN nav (9 items + quote CTA)
- [ ] Lighthouse SEO (still limited by noindex policy)
- [ ] No Persian text on EN pages
- [ ] Contact tel:/mailto: links work internationally

## Factual safety items (EN)

| Item | Status |
|------|--------|
| Max OD 630 mm | Published — verified legacy |
| Factory location Bukan, West Azerbaijan | Published |
| Since 1997 / 1376 | Published with dual calendar note |
| Certificate PDFs on certifications page | Pending verification |
| Full spec tables on product pages | Pending factory data |
| ISO/IEC 17025 current accreditation | Requires valid certificate |
| Download PDFs | Empty public queue (honest UI) |

## Gates

| Gate | Status |
|------|--------|
| EN_CONTENT_READY | YES |
| EN_SEO_FOUNDATION_READY | YES |
| EN_INTERNAL_LINKING_READY | YES |
| EN_HREFLANG_READY | YES |
| EN_FACTUAL_SAFETY_READY | YES (with documented pending items) |
| EN_VISUAL_QA_READY | PENDING — requires staging browser pass |
| READY_FOR_EN_STAGING_QA | YES (content/build); visual QA on deploy |

## Changed files (Phase 008)

### New

- `data/content/en/products.ts`
- `data/content/en/applications.ts`
- `data/content/en/laboratory.ts`
- `data/content/en/technical.ts`
- `data/content/en/company.ts`
- `data/content/en/downloads.ts`
- `data/content/en/home.ts`
- `docs/EN_SERP_RESEARCH.md`
- `docs/EN_SEO_KEYWORD_MAP.md`
- `docs/EN_INTERNAL_LINK_MAP.md`
- `docs/EN_CONTENT_QA.md`

### Updated

- `data/content/en/catalog.ts`
- `data/content/shared/product-factory.ts`
- `lib/i18n/locale-availability.ts`
- `lib/i18n/locale-availability.test.ts`
- `lib/i18n/nav-items.ts`
- `lib/sitemap/paths.ts`
- `lib/content/validate-catalog.test.ts`
- `lib/content/internal-links.test.ts`
- `components/home/IndustrialHomePage.tsx`
- `components/home/PremiumHeroSection.tsx`
- `messages/en.ts`
- `app/[locale]/applications/[slug]/page.tsx`
- `app/[locale]/laboratory/[slug]/page.tsx`
- `app/[locale]/technical-center/[[...slug]]/page.tsx`

### Not done (per instructions)

- Production deploy
- Custom domain
- Global indexing enable
- Legacy redirects enable
- Git commit
