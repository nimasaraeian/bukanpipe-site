# Pre-Production QA — Phase 006

**Date:** 2026-09-03  
**Scope:** Visual, UX, conversion, technical SEO, accessibility, route integrity  
**Deploy / commit:** Not performed in this phase

## Summary

Phase 006 focused on navigation alignment with approved FA information architecture, conversion path hierarchy, hreflang/sitemap safety for incomplete EN, factual timeline wording, contact/spec CTAs, calculator disclaimer, internal link integrity, and redirect rule smoke testing.

---

## 1. Visual issues found / fixed

| Issue | Resolution |
|---|---|
| Header exposed legacy IA (`/solutions`, `/industries`, `/engineering`) | FA nav rebuilt: products, applications, laboratory, technical center, downloads, calculator, about, contact |
| Footer linked to `/engineering`, `/solutions`, `/industries` | FA footer columns: products, resources, company — all canonical paths |
| Hero primary CTA pointed to `/applications` instead of quote | Primary → `/request-quote` (استعلام قیمت); secondary → products; tertiary text links → technical center + calculator |
| Float card claimed «۳+ دهه» | Replaced with **«از سال ۱۳۷۶»** |
| Technical articles used marketing-scale headings | Article mode: smaller heading scale + TOC for long articles |
| Laboratory related link misclassified (`iso-17025` as article) | Fixed to `laboratory` relation — no `/technical-center/iso-17025` orphan |

**Not changed:** Approved visual system, color tokens, hero photography layout.

---

## 2. Mobile issues

| Item | Status |
|---|---|
| Mobile drawer nav | Updated to full FA IA + quote CTA |
| Header breakpoint | Nav list at `xl` (9 items); drawer below |
| Tap targets on spec CTAs | Added full-width-friendly button rows |
| Article TOC | Scroll-margin on headings for fixed header |

**Manual viewport audit recommended:** 390px / 360px / 768px / 1280px / 1440px on staging.

---

## 3. Conversion improvements

| Path | Change |
|---|---|
| Homepage hero | Primary commercial CTA = استعلام قیمت |
| Product pages | Spec CTA block → «دریافت جدول مشخصات فنی» + «تماس با واحد فروش» |
| Application pages | Hero: استعلام محصول + مشاهده محصولات |
| Laboratory pages | Hero: mailto lab + contact (service-first) |
| Technical articles | Calculator secondary + quote primary |
| Contact page | tel:/mailto: on phone/email list items |
| Header | Persistent «استعلام قیمت» CTA |

---

## 4. Navigation issues

| Before | After |
|---|---|
| Missing applications, technical center, downloads, calculator, contact | All in FA primary nav |
| EN locale switch from FA-only pages → 404 | `switchLocalePathSafe` → EN home fallback |
| Old IA terms in footer | Removed |

**Note:** `/solutions`, `/industries`, `/engineering`, `/knowledge`, `/tools`, `/standards` remain as redirect stubs only — not in nav or sitemap.

---

## 5. Broken links

Automated crawl (`lib/content/internal-links.test.ts`): **0 broken FA internal links** in nav, footer, home cards, breadcrumbs, and related content.

---

## 6. Rendered SEO issues

| Check | Status |
|---|---|
| Unique titles/descriptions (FA catalog) | PASS — validated in Phase 005 |
| Canonical per page | PASS — `createPageMetadata` |
| hreflang | **Fixed** — only emitted when both locales have a real page |
| robots | noindex until launch (`allowIndexing`) |
| JSON-LD on content pages | PASS — `ContentDocumentPage` |
| Single H1 | PASS — hero + content hierarchy |
| Sitemap | **Fixed** — FA published content + `/request-quote`; EN home/products/catalog only |

**Manual HTML audit on staging still recommended** for OG images and breadcrumb JSON-LD on all priority URLs.

---

## 7. hreflang fixes

- Added `lib/i18n/locale-availability.ts`
- EN alternates suppressed for `/about`, `/laboratory/*`, `/technical-center/*`, `/applications/*`, etc.
- Product detail pages retain `fa` + `en` alternates

---

## 8. Sitemap / indexability

- Removed stub routes (engineering, solutions, industries, projects, pricing, dealers, verify, tools, knowledge, standards) from sitemap generation
- EN sitemap excludes FA-only URLs (prevents Search Console 404 noise)
- `robots.txt` unchanged — follows `allowIndexing` env

---

## 9. Redirect smoke test

See [LEGACY_REDIRECT_SMOKE_TEST.md](./LEGACY_REDIRECT_SMOKE_TEST.md).  
**REDIRECTS_TESTED = YES** (rule-map). Live HTTP 301 on staging still pending.

---

## 10. Accessibility

| Item | Status |
|---|---|
| tel: / mailto: on contact lists | Added |
| Keyboard nav header | Existing focus styles retained |
| Article TOC | Semantic `<nav>` + anchor links |
| Decorative hero images | `alt=""` / `aria-hidden` unchanged |
| Form labels (calculator) | Existing labeled inputs |

**Not audited in automation:** Full contrast pass, screen reader run-through.

---

## 11. Performance observations

- `npm run build` — **PASS** (82 static routes)
- No new large client bundles in this phase
- Hero images already `priority` on homepage
- Lighthouse not run in CI — recommend manual audit on Home, Product, Technical article, Laboratory, Pillar before staging sign-off

---

## 12. Factual-safety corrections

| Claim | Action |
|---|---|
| «۳+ دهه» / «بیش از سه دهه» on home, about, pillar | → **«از سال ۱۳۷۶»** |
| Typo «زهkشی» in pillar | → «زهکشی» |
| Spec tables | Not fabricated — spec CTA guides to quote/contact |
| Downloads | Public list empty until `fileUrl` verified |
| ISO 17025 certificate | Wording remains conditional; no «دارای گواهی معتبر» without PDF |
| Calculator | Preliminary-results disclaimer added |

---

## 13. Remaining factory dependencies

- Verified specification tables (SDR/PN matrices) per product
- Download PDF URLs and validity dates
- Current ISO/IEC 17025 certificate scan + scope
- Certificate/award PDFs for `/certifications`
- Legal company name consistency on quality policy merge content
- WhatsApp — not linked (no approved number)
- EN content layer (intentionally incomplete)

---

## 14. Calculator blocker

**CALCULATOR_VERIFIED = NO**

Legacy JavaScript parity not independently confirmed. Public calculator includes restrained engineering note; formulas unchanged.

---

## 15. Changed files (Phase 006)

```
app/sitemap.ts
components/calculator/PipelineDesignCalculator.tsx
components/content/ContentBlocks.tsx
components/content/ContentDocumentPage.tsx
components/home/IndustrialHomePage.tsx
components/home/PremiumHeroSection.tsx
components/layout/IndustrialFooter.tsx
components/layout/PremiumHeroHeader.tsx
data/content/fa/company.ts
data/content/fa/laboratory.ts
data/content/fa/technical.ts
lib/config/routes.ts
lib/content/internal-links.test.ts
lib/i18n/locale-availability.ts
lib/i18n/locale-availability.test.ts
lib/i18n/nav-items.ts
lib/i18n/path.ts
lib/migration/redirect-smoke.test.ts
lib/seo/metadata.ts
lib/sitemap/paths.ts
messages/en.ts
messages/fa.ts
docs/LEGACY_REDIRECT_SMOKE_TEST.md
docs/PRE_PRODUCTION_QA.md
```

---

## 16. Test / build results

| Command | Result |
|---|---|
| `npm test` | **65/65 PASS** |
| `npm run build` | **PASS** (82 routes) |
| `npm run lint` | Pre-existing errors in unrelated files (hub `children` prop, HeroComposition, header effects) — not introduced in Phase 006 |

---

## Release gates

| Gate | Status |
|---|---|
| VISUAL_QA_READY | **YES** (FA; manual viewport sign-off recommended) |
| MOBILE_READY | **YES** |
| CONVERSION_PATHS_READY | **YES** |
| TECHNICAL_SEO_READY | **YES** |
| REDIRECTS_TESTED | **YES** (rule-map; staging HTTP pending) |
| FACTUAL_SAFETY_READY | **YES** (within verified-legacy scope) |
| CALCULATOR_VERIFIED | **NO** |
| READY_FOR_STAGING | **YES** (with calculator disclaimer + factory queue) |
| READY_FOR_PRODUCTION | **NO** |

Also unchanged from Phase 005:

- `CONTENT_READY = YES` (FA)
- `SEO_FOUNDATION_READY = YES`
- `READY_FOR_PRODUCTION_DEPLOY = NO`
- Do **not** enable `ENABLE_LEGACY_REDIRECTS` until staging HTTP smoke pass
