# Image Art Direction — Bukan Pipe

**Date:** 2026-09-03  
**Inventory:** `data/media/legacy-media.ts`  
**Gap brief:** `docs/PHOTOGRAPHY_GAP_REPORT.md`

Photography, industrial geometry, type and layout are one system. Images are not dropped into cards after the layout is finished.

---

## Audit method

Read-only sources:

- WordPress REST `GET /wp-json/wp/v2/media` page 1 (96 items) and page 2 (28 items)
- Individual `media_details` for the highest-value stills (width, height, generated sizes, occasional filesize)
- Phase 003 owned PDFs and the `.ir` air-valve video
- Attachment permalinks and legacy alt text

Origin binary download of `/wp-content/uploads` timed out from this environment (0 bytes). Sharpness, lighting and compression were therefore graded from **resolution metadata + alt/page evidence**, not from a local pixel inspection. That limitation is recorded on each sampled row. No stock photography was used.

---

## Grade board

| Grade | Meaning | Found |
|---|---|---|
| **A — Hero / premium ready** | Sharp, well lit, ≥~1920 on the long edge, croppable for cinematic layouts without inventing quality | **None** |
| **B — Supporting content** | Usable in editorial bands, not a giant hero | `klaf.jpg` 1923×801 (subject unconfirmed — not shown until visually verified); `lifting-pipe.jpg` 1200×540 |
| **C — Archive / small display** | Factory portraits ~533×800; lab 500×305; product stills ~800×400 | QC series, f2–f5, gas/product stills, lab tests |
| **REJECT** | Tables, watermarks, unverified customer logos, generic filenames, video-as-hero, unknown `sample.jpg` | Spec graphics, partner marks, several 2019 leftovers |

Never upscale a C or REJECT file into a hero.

---

## Hero policy

`HERO_IMAGE_POLICY.homepageTreatment = INDUSTRIAL_SIGNATURE`

There is no A-grade authentic hero photograph. The homepage and design-system lumen use the **pipe visual signature** (concentric bore + extrusion flow, SVG/CSS). Authentic B/C stills sit **beside or below** that signature, at their native strength.

Professional factory photography is required before any photographic homepage hero.

---

## Visual signature

Inspired by polyethylene geometry: circular cross-section, extrusion, flow, infrastructure networks. Implemented as inline SVG + slow CSS motion (`prefers-reduced-motion` respected). No WebGL. It complements photography; it does not replace factory authenticity.

---

## Editorial treatments

Use these instead of a rectangle inside a generic card:

- Signature as a full-bleed geometric field under type
- Asymmetric image + paper text split
- Overlay type only on a dark gradient (readable contrast)
- Ring / diagonal masks on small product and lab stills
- Filmstrip of mixed aspect ratios
- Portrait art direction: keep the hall vertical on small screens; do not center-crop the subject away

Do not distort pipes, equipment or certificates.

---

## Semantic image SEO

- Meaningful photographs use `next/image` or `<img>` / `<picture>`, never CSS `background-image`
- Alt describes the actual picture (`خط تولید…` only if that is what is shown)
- Decorative signature: `aria-hidden` / empty alt
- `sizes` match the layout; below-the-fold stays lazy; only a true LCP may be `priority` (today the LCP is the inline signature + heading, not a photo)
- Proposed public filenames exist only where the subject is evidenced (`bukan-pipe-laboratory.jpg`, `bukan-pipe-production-hall.jpg`, `bukan-pipe-gas-pipe.jpg`, `bukan-pipe-loading-straight-pipe.jpg`)
- Generic names (`IMG_`, `sample.jpg`, `1.jpg`) are not migrated as-is
- `klaf.jpg` has no public filename until the subject is confirmed

---

## Discovery SEO (architecture)

- `lib/seo/image-sitemap.ts` can attach image URLs to sitemap rows when a **public** page publishes a stable asset. Currently empty — `/design-system` is noindex and must not seed the image sitemap
- Stable public URLs will be `/media/…` after local migration, not WordPress upload paths
- Page-specific OG: `createPageMetadata({ ogImage })` exists; no page emits a photograph until a composed 1200×630 exists
- Organization JSON-LD still has **no** `logo` or `image` (unverified lockup)
- Product JSON-LD still has **no** image, offers, or SKU. Do not invent Product imagery

---

## Social / OG system

Specified in `lib/seo/og.ts` for: homepage, product family, application, laboratory, engineering article, project/case study.

Composition: authentic still (if grade allows) + Bukan Pipe identity + short page title. No clutter. Status: **specified, not rendered**. Homepage OG remains a text `summary` card until photography exists.

---

## Remote hosting (temporary)

`next.config.ts` allows `bukanpipe.com/wp-content/uploads/**`. Displayed stills are `unoptimized` remote URLs until a local `public/media/` copy with a descriptive name is approved. This is a bridge, not the long-term media architecture.
