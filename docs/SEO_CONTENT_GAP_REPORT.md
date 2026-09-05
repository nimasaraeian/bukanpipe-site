# SEO Content Intelligence — Gap Report

**Project:** Bukan Pipe (`bukanpipe.com`)  
**Audit date:** 2026-09-05  
**Scope:** Content architecture, landing pages, product depth, internal linking, image SEO, multilingual model

---

## Executive summary

The SEO Content Intelligence Audit is **implemented in codebase** — not metadata-only. A reusable bilingual content model now drives product landing pages, technical guides, structured blocks, FAQ/schema, curated internal links, and image metadata.

**Remaining gaps** are mostly operational (indexing env, dedicated OG assets, verified spec tables from factory ERP) and content expansion (more long-tail articles, project case studies).

---

## 1. Landing pages requested vs delivered

| Target landing page | URL | Status |
|---------------------|-----|--------|
| Water HDPE Pipes | `/products/water-supply-pipe` | **Upgraded** — definition, spec table, applications, advantages, FAQ, internal links, Product + FAQPage schema |
| Gas HDPE Pipes | `/products/gas-pipe` | **Upgraded** — same SEO block structure |
| Irrigation HDPE Pipes | `/products/irrigation-pipe` | **Upgraded** — same SEO block structure |
| Industrial HDPE Pipes | `/products/industrial-pipe` | **Created** — new product landing (was application-only) |
| PE100 Technical Guide | `/technical-center/pe100-technical-guide` | **Created** — engineering guide with spec table + FAQ |
| HDPE Installation Guide | `/technical-center/hdpe-installation-guide` | **Created** — field installation guide with FAQ |

Canonical URLs preserved — no duplicate `/guides/*` paths that would split ranking signals.

---

## 2. Product page upgrades (all 7 products)

Each product document now includes:

- **Definition block** (`What is it?` / `تعریف`)
- **Technical specifications table** (factory-verified facts + service-specific rows)
- **Applications** and **advantages** lists
- **Curated internal-links block** (hub ↔ product ↔ guide graph)
- **FAQ** (where applicable) → **FAQPage** JSON-LD
- **Product** JSON-LD with **ImageObject** (alt from `heroImage`)
- **BreadcrumbList** schema (unchanged, verified)

Products: water, gas, irrigation, **industrial (new)**, PE100, sewer, drainage.

---

## 3. Reusable SEO content model

| Artifact | Path |
|----------|------|
| Extended block types | `content/models/content-document.ts` |
| Builders (product + article) | `lib/content/seo-content-model.ts` |
| EN product seeds | `data/content/en/seo-product-seeds.ts` |
| FA product seeds | `data/content/fa/seo-product-seeds.ts` |
| EN/FA article seeds | `data/content/en/seo-article-seeds.ts`, `data/content/fa/seo-article-seeds.ts` |
| Block renderers | `components/content/ContentBlocks.tsx` |
| Internal link graph | `lib/content/seo-link-graph.ts` |

**Pattern for new locales:** add `xx/seo-product-seeds.ts` + `buildSeoProductDocument("xx", seed)` — no template duplication in React.

---

## 4. Internal linking system

- **In-page:** `internal-links` blocks on every SEO landing product and new guides
- **Related resources:** `doc.related` arrays expanded (products hub, technical hub, cross-links)
- **Typed graph:** `lib/content/seo-link-graph.ts` with relation labels aligned to `lib/config/linking.ts`
- **Application → product:** industrial application should reference `industrial-pipe` (verify in `applications.ts` related arrays)

**Still recommended (not blocking launch):**

- Footer quick links to all six primary landings (partially covered in nav)
- Contextual links from `/polyethylene-pipe` pillar body to new guides (pillar content not restructured in this pass)

---

## 5. Image SEO

| Item | Implementation |
|------|----------------|
| Structured metadata | `ContentHeroImage` on each product (`src`, `alt`, `title`, `width`, `height`) |
| OG images | `getOgImageForContent()` prefers `doc.heroImage` |
| Hero crops | `productDetailHeroImages` in `data/media/page-hero-images.ts` |
| Public filenames | Existing paths under `/media/products/en/*.png` — descriptive alt text added |

**Gap:** Physical file rename on disk (e.g. `water-hdpe-pipe-bukan.png`) not done — would require asset pipeline + CDN cache bust. Alt/title/schema compensate for now.

**Gap:** Dedicated 1200×630 OG PNGs per landing (currently product render crops).

---

## 6. Multilingual SEO

| Feature | Status |
|---------|--------|
| Localized titles/H1 intent | EN + FA seeds with matched intent (not literal MT) |
| hreflang | Existing `lib/content/metadata.ts` + locale routes — **unchanged, compatible** |
| FA RTL heroes | Product hero positions in `page-hero-images.ts` |
| FA copy hygiene tests | Updated for new block types |

**Gap:** Additional locales (AR, TR, etc.) — model ready, seeds not written.

---

## 7. Schema markup coverage

| Page type | Schema |
|-----------|--------|
| Product landings | Organization, BreadcrumbList, **Product** (ImageObject), **FAQPage** |
| Technical guides | Organization, BreadcrumbList, **Article**, **FAQPage** |
| Hubs | Organization, BreadcrumbList |

---

## 8. Content gaps (prioritized backlog)

### P0 — Launch blockers (ops, not content model)

- Set `NEXT_PUBLIC_ALLOW_INDEXING=true` and `NEXT_PUBLIC_SITE_URL=https://bukanpipe.com` in production
- Host-level apex/www canonical redirects
- Legacy WordPress URL 301 map live on production

### P1 — High-value content

- [ ] Factory-issued **diameter / SDR / PN / weight tables** as downloadable PDF (linked from spec-cta)
- [ ] Expand **industrial** application page body to link prominently to `/products/industrial-pipe`
- [ ] Pillar page `/polyethylene-pipe` — add internal-links block to new guides
- [ ] **Project case studies** (currently `/projects` is noindex stub)

### P2 — Long-tail SEO

- [ ] Standards hub pages (INSO 14427-2, INSO 11233) as articles
- [ ] Electrofusion vs butt fusion decision tree (interactive)
- [ ] Cable protection product landing (application exists, no product slug)

### P3 — Image / rich results

- [ ] Rename media files on disk for keyword-rich URLs
- [ ] Unique OG images per primary landing
- [ ] Product `offers` schema when public pricing policy allows

---

## 9. Verification checklist

- [x] Six primary SEO landings live in content catalog (EN + FA)
- [x] All products use unified SEO block structure
- [x] New block types render on public pages
- [x] Unit tests for SEO model (`lib/content/seo-content-model.test.ts`)
- [x] Public copy hygiene tests updated for new blocks
- [ ] Run full `npm test` before deploy
- [ ] Manual check: `/en/products/industrial-pipe`, `/fa/products/industrial-pipe`
- [ ] Manual check: `/en/technical-center/pe100-technical-guide`
- [ ] Google Rich Results Test on one product + one guide URL

---

## 10. Files changed (summary)

```
content/models/content-document.ts          — definition, spec-table, internal-links, heroImage
lib/content/seo-content-model.ts            — reusable EN/FA builders
lib/content/seo-link-graph.ts               — cluster link graph
data/content/en|fa/seo-product-seeds.ts     — product landing content
data/content/en|fa/seo-article-seeds.ts     — PE100 + installation guides
data/content/en|fa/products.ts              — wired to SEO model
data/content/en|fa/technical.ts             — new articles registered
data/content/en|fa/catalog.ts               — hub related links
components/content/ContentBlocks.tsx        — new block renderers
data/media/page-hero-images.ts              — product + guide heroes
lib/seo/page-config.ts                      — heroImage OG priority
lib/schema/builders.ts                      — Product ImageObject
lib/schema/content-document.ts              — pass imageAlt
docs/SEO_CONTENT_GAP_REPORT.md              — this report
```

---

*Generated as part of the SEO Content Intelligence Audit implementation.*
