# SEO Audit & Implementation Report

**Site:** https://bukanpipe.vercel.app  
**Date:** 2026-09-05  
**Scope:** Technical SEO, multilingual indexing, structured data, social metadata

---

## 1. Problems Found (Before)

| Area | Issue | Severity |
|------|--------|----------|
| Sitemap | Homepage (`/` / `/en` / `/fa`) missing from `sitemap.xml` | High |
| Sitemap | `/solutions` and `/industries` excluded despite live content | Medium |
| Sitemap | No `priority` or `changeFrequency` hints | Low |
| Metadata | Most pages had no Open Graph image | High |
| Metadata | Stub routes (`/projects`, `/pricing`, `/dealers`, `/verify`) indexable | Medium |
| Schema | `Organization` missing `logo` | Medium |
| Schema | `WebSite.inLanguage` hardcoded to `"en"` on FA pages | Medium |
| Schema | `Product` JSON-LD missing `brand`, `manufacturer`, `image` | Medium |
| Schema | No `ManufacturingBusiness` entity | Medium |
| Config | No centralized per-route SEO configuration | Medium |
| Launch | `NEXT_PUBLIC_ALLOW_INDEXING=false` blocks all crawlers (intentional pre-launch) | Info |
| Host | `bukanpipe.com` canonical / www redirects not at CDN (documented only) | High at launch |
| Images | Image sitemap still empty (awaiting verified public photo set) | Low |

---

## 2. Changes Applied

### Central SEO system — `lib/seo/page-config.ts`

Reusable configuration surface:

```typescript
{
  title, description, path, locale,
  keywords, canonical, hreflang,
  ogImage, index, schema
}
```

Helpers: `getOgImageForPath()`, `getOgImageForContent()`, `isNoindexPath()`, `metadataFromSeoConfig()`.

### Metadata pipeline — `lib/seo/metadata.ts`

- Default OG + Twitter large-image cards on **every** page
- Contextual OG images per hub (home, products, applications, laboratory, technical, calculator)
- Automatic `noindex` for stub paths
- `titleAbsolute` support for pre-formatted titles (`| Bukan Pipe`)

### Sitemap — `app/sitemap.ts`, `lib/sitemap/paths.ts`

- Added `/`, `/solutions`, `/industries`
- Added `priority` and `changeFrequency` per URL type
- 74 paths × 2 locales ≈ **148 URLs** (deduped)

### Multilingual — `lib/i18n/locale-availability.ts`

- hreflang alternates now include `/solutions` and `/industries`

### Structured data — `lib/schema/builders.ts`

- `Organization` → `logo`
- `ManufacturingBusiness` (factory, phone, email, address)
- `WebSite` → locale-aware `inLanguage` + `publisher`
- `Product` → `brand`, `manufacturer`, optional `image`
- Article publisher/author on content pages

### Robots — `app/robots.ts`

- Disallow stub routes when indexing is enabled

### Copy — `messages/en.ts`, `messages/fa.ts`

- Enterprise SEO titles/descriptions for products, solutions, industries hubs (EN + FA)

---

## 3. Files Modified

```
lib/seo/page-config.ts          (new)
lib/seo/page-config.test.ts     (new)
lib/seo/metadata.ts
lib/seo/metadata.test.ts
lib/content/metadata.ts
lib/sitemap/paths.ts
lib/i18n/locale-availability.ts
lib/i18n/route-metadata.ts
lib/schema/builders.ts
lib/schema/builders.test.ts
lib/schema/content-document.ts
lib/content/internal-links.test.ts
app/sitemap.ts
app/robots.ts
app/[locale]/layout.tsx
app/[locale]/page.tsx
messages/en.ts
messages/fa.ts
data/media/legacy-media.test.ts
docs/SEO_AUDIT_IMPLEMENTATION.md (this file)
```

---

## 4. Remaining Recommendations

### Launch blockers (ops, not code)

1. Set `NEXT_PUBLIC_SITE_URL=https://bukanpipe.com`
2. Set `NEXT_PUBLIC_ALLOW_INDEXING=true`
3. Enable `ENABLE_LEGACY_REDIRECTS=true` for WordPress URL migration
4. Implement host canonical redirects (www, HTTP, `.ir`) per `docs/HOST_CANONICAL_POLICY.md`

### Content & rich results

5. Add verified social profile URLs to `siteConfig.social` for `sameAs`
6. Render dedicated 1200×630 OG PNGs (specs in `lib/seo/og.ts`) — currently using brand hero assets
7. Populate image sitemap when public photography is approved
8. Expand product JSON-LD with `offers` only when verified pricing exists
9. Add FAQ sections to more hub pages for AI Overview eligibility

### Performance SEO

10. Run Lighthouse on production after launch; home mobile snapshots in `docs/lighthouse-*.json`
11. Consider AVIF for hero images (Next.js Image already optimizes formats)

### AI search

12. Technical Center articles already carry FAQ schema where FAQs exist — extend to product comparison blocks
13. Add explicit definition paragraphs (What is PE100? What is HDPE pipe?) on pillar pages

---

## 5. Expected Improvements

| Signal | Expected impact |
|--------|-----------------|
| Homepage in sitemap | Faster discovery of EN/FA entry points |
| hreflang on 148 URLs | Correct bilingual indexing, reduced duplicate-content risk |
| OG images on all pages | Higher CTR from social and messaging apps |
| Product + ManufacturingBusiness schema | Eligibility for rich results and entity recognition |
| Stub noindex | Cleaner crawl budget, no thin-content penalties |
| Localized FA metadata | Better relevance for Persian industrial queries (لوله پلی اتیلن، PE100، …) |

---

## Verification

```bash
npm test -- --run          # 111 tests passing
curl https://bukanpipe.com/robots.txt
curl https://bukanpipe.com/sitemap.xml
```

Use Google Search Console URL Inspection after launch for `/en`, `/fa`, and a product URL.
