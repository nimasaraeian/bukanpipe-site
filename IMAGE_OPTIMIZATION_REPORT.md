# Image Optimization Report

Date: 2026-09-17  
Scope: photographic sources used by live `next/image` UI  
Constraint: identical composition, crop, dimensions, colors, and layout — format/delivery only

## Result

| Metric | Value |
| --- | --- |
| Photographic sources converted | 24 |
| Original bytes | 34,744,087 (33.1 MB) |
| WebP bytes | 4,505,310 (4.3 MB) |
| Source-file reduction | **87.0%** |
| Pixel dimensions | unchanged on every file |
| MAE vs original | 0.660–1.481 (accept ≤ 3.5) |
| `npm run build` | 117 routes, TypeScript OK |

Browsers that send `Accept: image/avif` then receive an even smaller AVIF from `/_next/image` (examples at `w=1920&q=90` below).

## What changed / what did not

Changed:

- Photographic PNG/JPEG → same-size WebP (q=90, alphaQuality 100)
- UI `src` paths point at those WebP files
- Inner-page heroes use `next/image` (`priority`, `quality={90}`, `sizes="100vw"`) instead of `unoptimized`
- Homepage LCP stays art-directed `<picture>` + `getImageProps`, quality 90
- Product card / panel `quality={82}` (valid configured quality)

Not changed:

- Layout, crop, object-position, colors, UI design
- URLs, sitemap, metadata copy, headings
- Open Graph / schema image URLs (still original PNG/JPG)
- Logos and icons (`logo.png`, `eitaa.png`, `golden-reference-overlay.png`, favicons)

## Encoding gate

Each WebP was compared to its original at identical width × height.

- Reject if dimensions differ
- Reject if mean absolute error (MAE) > 3.5 per channel
- Side-by-side previews: `.tmp-image-compare/*-compare.jpg`

All 24 files passed. Highest MAE is `hero-pe100` (1.481) because that PNG has alpha; alphaQuality 100 kept the cutout.

## Images changed

Sizes are on-disk sources. Compression % = `(original − webp) / original`.

### Homepage LCP (hero)

| Usage | Original | New | Bytes | Compression | Format | MAE |
| --- | --- | --- | --- | --- | --- | --- |
| Desktop FA pyramid | `/media/brand/home-hero-pyramid-fa.jpg` 2560×1440 | `.webp` | 287,264 → 187,294 | 34.8% | JPEG → WebP | 0.665 |
| Desktop EN pyramid | `/media/brand/home-hero-pyramid-en.jpg` 2560×1440 | `.webp` | 284,658 → 190,606 | 33.0% | JPEG → WebP | 0.660 |
| Mobile FA pyramid | `/media/brand/home-hero-pyramid-mobile-fa.jpg` 1440×1920 | `.webp` | 229,397 → 148,248 | 35.4% | JPEG → WebP | 0.690 |
| Mobile EN pyramid | `/media/brand/home-hero-pyramid-mobile-en.jpg` 1440×1920 | `.webp` | 231,287 → 149,904 | 35.2% | JPEG → WebP | 0.686 |

Visual: side-by-side identical (warehouse pyramid, reflections, blue stripe). Live LCP:

- Desktop 1440px → `/_next/image?...home-hero-pyramid-fa.webp&w=1920&q=90` (AVIF 58,742 B)
- Mobile 390px → `...home-hero-pyramid-mobile-fa.webp&w=828&q=90`

### Inner-page heroes (LCP)

| Page | Original | UI WebP | Bytes | Compression | MAE |
| --- | --- | --- | --- | --- | --- |
| About | ChatGPT Sep 8 PNG 1672×941 (2,599,137) | `/media/editorial/about-page-hero.webp` | 372,194 | 85.7% | 1.467 |
| Laboratory | ChatGPT Sep 4 (5) PNG 1672×941 (1,810,812) | `/media/editorial/laboratory-page-hero.webp` | 164,282 | 90.9% | 0.868 |
| Quality | ChatGPT Sep 4 (4) PNG 1672×941 (1,607,030) | `/media/editorial/quality-page-hero.webp` | 111,138 | 93.1% | 0.840 |
| Applications | `/media/brand/applications-hero.png` | `.webp` | 1,969,518 → 203,466 | 89.7% | 0.997 |
| Calculator | `/media/brand/calculator-hero.png` | `.webp` | 1,667,871 → 124,730 | 92.5% | 0.827 |
| Downloads | `/media/brand/downloads-hero.png` | `.webp` | 1,575,419 → 120,980 | 92.3% | 0.812 |
| Technical | `/media/brand/technical-center-hero.jpg` 1024×576 | `.webp` | 99,786 → 73,392 | 26.5% | 0.757 |

About / laboratory / quality WebPs were copied to slug filenames. Next.js `/_next/image` returns 400 for paths with spaces or commas; the original PNGs stay in place for OG.

Live about hero (desktop): `/_next/image?...about-page-hero.webp&w=1920&q=90` → **AVIF 140,804 B** vs a previous `unoptimized` 2.6 MB PNG.

### Factory slides (home cards, many inner heroes)

All 1672×941 opaque PNG.

| File | Original | WebP | Compression | MAE |
| --- | --- | --- | --- | --- |
| `bukan-slide-01-yard` | 2,111,601 | 246,846 | 88.3% | 1.201 |
| `bukan-slide-02-extrusion` | 2,036,155 | 227,606 | 88.8% | 1.092 |
| `bukan-slide-03-product` | 1,746,468 | 138,418 | 92.1% | 0.941 |
| `bukan-slide-04-inventory` | 1,879,489 | 175,892 | 90.6% | 1.063 |

### Product family renders

All 1672×941. `hero-pe100` has alpha (kept).

| File | Original | WebP | Compression | MAE |
| --- | --- | --- | --- | --- |
| `hero-pe100` (products hub LCP) | 2,105,201 | 361,288 | 82.8% | 1.481 |
| `water` | 1,556,329 | 218,122 | 86.0% | 0.889 |
| `gas` | 1,751,487 | 196,776 | 88.8% | 0.890 |
| `irrigation` | 1,806,225 | 150,114 | 91.7% | 0.897 |
| `sewer` | 1,627,406 | 146,404 | 91.0% | 0.777 |
| `drainage` | 2,269,609 | 309,082 | 86.4% | 1.192 |
| `pe100` | 1,461,601 | 153,726 | 89.5% | 0.812 |

### Other photographic

| File | Original | WebP | Compression | MAE |
| --- | --- | --- | --- | --- |
| `home-manufacturing-editorial.jpg` 1440×1800 | 265,838 | 161,410 | 39.3% | 0.723 |
| `about-factory-hero.png` 1672×941 | 1,764,499 | 173,392 | 90.2% | 1.032 |

`about-factory-hero.webp` is the encoded sibling of the home OG PNG. Page heroes do not use it; OG still points at the PNG.

## Left as PNG / SVG (logos, icons)

| Asset | Why |
| --- | --- |
| `/media/demo/logo.png` | Brand mark; transparency + sharpness. Header uses `next/image` w=256. |
| `/media/demo/eitaa.png` | Small social icon with alpha. |
| `/media/products/en/golden-reference-overlay.png` | QA overlay, not a photo. |
| Favicons / apple-touch | Platform icons. |

No SVG sources existed for these marks. They were not converted to WebP.

## next/image delivery

`next.config.ts`:

- `formats: ["image/avif", "image/webp"]`
- `qualities: [75, 82, 90]`

LCP:

| Surface | Component | Settings |
| --- | --- | --- |
| Home hero | `HomeHeroPhoto` | `priority`, q=90, `sizes="100vw"`, `<picture>` desktop/mobile |
| Inner heroes | `IndustrialPageHero` | `priority`, q=90, `sizes="100vw"` — `unoptimized` removed |
| About hero | `AboutPageHero` | same |
| Products pipe | `ProductsHeroSection` | `priority`, q=90, `sizes="(min-width: 1024px) 860px, 100vw"` |
| Product / panel cards | `IndustrialCards` | q=82, card `sizes` |

Measured optimizer output (`Accept: image/avif`, local production server):

| Request | HTTP | Type | Bytes |
| --- | --- | --- | --- |
| about-page-hero.webp w=1920 q=90 | 200 | AVIF | 140,804 |
| laboratory-page-hero.webp w=1920 q=90 | 200 | AVIF | 71,658 |
| quality-page-hero.webp w=1920 q=90 | 200 | AVIF | 49,113 |
| applications-hero.webp w=1920 q=90 | 200 | AVIF | 84,451 |
| bukan-slide-01-yard.webp w=1920 q=90 | 200 | AVIF | 91,851 |
| home-hero-pyramid-fa.webp w=1920 q=90 | 200 | AVIF | 58,742 |
| water.webp w=640 q=82 | 200 | AVIF | 14,659 |
| logo.png w=256 q=75 | 200 | AVIF | 8,464 |

## SEO freeze

`lib/seo/page-config.ts` and `lib/schema/builders.ts` still use original PNG/JPG URLs.

Verified in the live document:

| Page | `og:image` |
| --- | --- |
| `/fa` | `.../media/brand/about-factory-hero.png` |
| `/fa/products` | `.../media/demo/bukan-slide-03-product.png` |
| `/fa/applications` | `.../media/brand/applications-hero.png` |
| `/fa/laboratory` | original ChatGPT PNG |
| `/fa/about` | original ChatGPT PNG |
| `/fa/quality` | original ChatGPT PNG |

Canonical URLs, titles, and heading structure were not edited.

## Visual verification (local `next start`, `/fa`)

| Viewport | Page | Hero resource | Broken images |
| --- | --- | --- | --- |
| 1440 desktop | Home | pyramid-fa.webp w=1920 q=90 | 0 |
| 1440 desktop | Products | hero-pe100.webp w=1080 q=90 | 0 |
| 1440 desktop | Applications | applications-hero.webp w=1920 q=90 | 0 |
| 1440 desktop | Laboratory | laboratory-page-hero.webp w=1920 q=90 | 0 |
| 1440 desktop | About | about-page-hero.webp w=1920 q=90 | 0 |
| 390 mobile | Home | pyramid-mobile-fa.webp w=828 q=90 | 0 |
| 390 mobile | About | about-page-hero.webp | 0 |
| 390 mobile | Products | hero-pe100.webp w=828 q=90 | 0 |
| 390 mobile | Quality | quality-page-hero.webp w=828 q=90 | 0 |

Layout, copy, and chrome match the previous pages. Photos decode with `naturalWidth > 0`.

## Why the site was slow

Heroes were opaque PNG at ~1.5–2.6 MB. Inner heroes used `unoptimized`, so the browser downloaded the raw PNG (about ~24s on a slow link). `/_next/image` also had to decode those PNGs on cache miss.

Same pixels now ship as WebP sources (~100–370 KB) and AVIF responses (~50–140 KB at 1920px).

## Build

```
npm run build
```

Next.js 16.3.4 — compiled, TypeScript clean, 117 routes generated.
