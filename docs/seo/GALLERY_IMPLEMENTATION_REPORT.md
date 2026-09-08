# Gallery Implementation Report

Generated: 2026-09-08

## Routes

| Locale | URL | Label |
| --- | --- | --- |
| FA | `/fa/gallery` | گالری کارخانه |
| EN | `/en/gallery` | Factory Gallery |

## Asset pipeline

- **Script:** `scripts/build-gallery-assets.mjs` (`npm run media:gallery`)
- **Sources:** `image/` (local, non-destructive)
- **Outputs:** `public/media/gallery/` (WebP: thumb 640px, card 1280px, full up to 2560px)
- **Manifest:** `data/gallery/gallery-manifest.json`
- **SEO map:** `docs/seo/GALLERY_IMAGE_SEO_MAP.md`

## Image inventory summary

| Metric | Count |
| --- | --- |
| Discovered processable sources | 157 |
| Published | 138 |
| Excluded (duplicates + skip rules) | 19 |
| Excluded formats (DNG/TIF/PNG logos/AI) | not processed |

### Exclusion reasons

- Duplicate basenames across folders (prefer canonical subfolder copy)
- `ChatGPT*.png`, `آرم_بزرگ.png`, `about-factory-gate.jpg`
- `Copy (2) of IMG_*.JPG` near-duplicates
- `photo_2023-*` accessory product shots (low gallery relevance)
- DNG/TIF/RAW (9 DNG + 1 TIF — not converted; JPG counterparts used where available)

### Categories published

| Category | FA label | Count |
| --- | --- | --- |
| aerial | نمای هوایی و محوطه کارخانه | 3 |
| production | خطوط تولید | 30 |
| laboratory | آزمایشگاه و کنترل کیفیت | 11 |
| products | محصولات | 59 |
| warehouse | انبار | 8 |
| logistics | بارگیری و لجستیک | 14 |
| facility | زیرساخت و محیط کارخانه | 13 |

## Hero selection

- **Source:** `3-تولید/DJI_0472.JPG`
- **Public hero:** `/media/gallery/bukan-pipe-hdpe-factory-aerial-hero/bukan-pipe-hdpe-factory-aerial-hero-card.webp`
- **OG crop:** `/media/gallery/bukan-pipe-gallery-og.webp` (1200×630)

## SEO implementation

- **Metadata:** `createPageMetadata` with `titleAbsolute: true` (no duplicate `| Bukan Pipe`)
- **Canonical:** self-referencing `/fa/gallery`, `/en/gallery`
- **Hreflang:** via `buildLanguageAlternates`
- **OG/Twitter:** gallery OG crop + locale-specific alt
- **JSON-LD:** `CollectionPage` + `ImageGallery` + `ImageObject` + `BreadcrumbList` (`lib/schema/gallery-schema.ts`)
- **Image sitemap:** Next.js sitemap `images` field on both gallery URLs (138 URLs each)
- **HTML images:** semantic `<figure>` / `<img src>` / `<figcaption>` — no CSS background for indexable photos
- **Filter URLs:** client-only state; no indexable category routes

## Navigation

- **Company submenu (desktop + mobile):** About → **Gallery** → Laboratory → Quality
- **Footer company column:** gallery link added (FA + EN)

## Internal linking

- FA About, Quality, Laboratory hub, Products catalog
- EN About, Quality, Laboratory hub

## Components

| File | Role |
| --- | --- |
| `app/[locale]/gallery/page.tsx` | Route + metadata + JSON-LD |
| `components/gallery/GalleryPageView.tsx` | Server page composition |
| `components/gallery/GalleryHero.tsx` | LCP hero (priority img) |
| `components/gallery/GalleryExperience.tsx` | Client filters + lightbox orchestration |
| `components/gallery/GalleryFeaturedGrid.tsx` | Editorial CSS grid |
| `components/gallery/GalleryFullGrid.tsx` | Full semantic gallery |
| `components/gallery/GalleryLightbox.tsx` | Accessible modal |
| `app/gallery.css` | Gallery-specific styles |

## Accessibility

- Keyboard: Escape, arrows (RTL-aware)
- Focus trap on lightbox open
- Body scroll lock
- `prefers-reduced-motion` respected for hover transforms
- Visible focus rings on controls

## Known limitations

- Alt/caption text uses category-based templates with sequence variation; images flagged `needsReview` in manifest where filename gives no content signal (e.g. `IMG_*`, numbered files)
- DNG/TIF originals not converted — JPG versions used
- No Playwright e2e in project; Vitest covers metadata, schema, sitemap, manifest
- Lighthouse not run in CI; hero/card WebP sizes logged at build time

## needsReview images

Images with `needsReview: true` in manifest should receive human-reviewed alt/caption copy when content is verified visually.

## PASS/FAIL matrix

| Area | Status |
| --- | --- |
| Visual Design | PASS (editorial grid, industrial tokens) |
| FA RTL | PASS |
| EN LTR | PASS |
| Mobile | PASS (responsive CSS, scroll filters) |
| Accessibility | PASS (semantic HTML, lightbox a11y) |
| Image SEO | PASS (img src, alt, figcaption, filenames) |
| Schema | PASS |
| Canonical | PASS |
| Hreflang | PASS |
| Image Sitemap | PASS (via Next sitemap images) |
| Performance | PASS (lazy below fold, hero priority, WebP) |
| Tests | PASS (Vitest gallery suite) |
| Production Build | PASS |
