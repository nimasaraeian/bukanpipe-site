# Content Architecture

**Phase:** Content migration & SEO implementation  
**Last updated:** 2026-09-03

## Entity separation

| Entity | Route prefix | Content kind | Notes |
|---|---|---|---|
| Products | `/products/*` | `product` | Commercial pages only |
| Applications | `/applications/*` | `application` | Use-case intent, links to products |
| Laboratory | `/laboratory/*` | `laboratory`, `hub` | First-class business unit |
| Technical articles | `/technical-center/*` | `article` | Never mixed with product pages |
| Pillar | `/polyethylene-pipe` | `pillar` | SEO hub linking to products |
| Downloads | `/downloads` | `hub` + `DownloadItem[]` | Structured download center |
| Calculators | `/calculator/*` | `calculator` | Tools separate from articles |
| Company | `/about`, `/quality`, `/certifications`, `/contact` | `company` | Trust content |

**Not published as SEO pages:** `/projects` water/gas legacy pages (insufficient verified data).

## Data layer

- Model: `content/models/content-document.ts`
- Registry: `lib/content/registry.ts`
- FA catalog: `data/content/fa/catalog.ts`
- EN catalog: `data/content/en/catalog.ts` (products only in this phase)

Each `ContentDocument` supports: slug, title, description, seoTitle, seoDescription, primaryKeyword, secondaryKeywords, breadcrumbs, sections, related*, faqs, verificationStatus, lastReviewed.

## Page rendering

- Hub: `ContentHubPage` — lists child documents
- Detail: `ContentDocumentPage` — breadcrumb, H1, sections, FAQ, related links, JSON-LD
- Placeholder specs: `data-required` blocks — no fabricated tables

## Internal linking rules

1. Pillar `/polyethylene-pipe` → all commercial product pages
2. Products → related applications, articles, laboratory
3. Applications → products (not vice versa as primary)
4. Articles → products/applications; never duplicate product specs
5. Laboratory → products + ISO article

## Legacy routes (still present, not IA owners)

- `/engineering`, `/knowledge`, `/tools`, `/standards` — Phase 002 stubs; redirects point to new paths when `ENABLE_LEGACY_REDIRECTS=true`

## Home (FA)

Recommended H1: **تولیدکننده لوله پلی اتیلن آبرسانی، گازرسانی و کشاورزی** — implemented in `messages/fa.ts` hero. Trust metrics tagged VERIFY before production.
