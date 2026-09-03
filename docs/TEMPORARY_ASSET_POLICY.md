# Temporary Asset Policy — Phase 004C

**Date:** 2026-09-03  
**Status:** Active for design development only  
**Registry:** `data/media/temporary-assets.ts`  
**Bindings:** `data/media/visual-bindings.ts`  
**Components:** `components/media/VisualAsset.tsx`

Until official Bukan Pipe photography is supplied, the site uses **premium temporary visuals** to evaluate layout, rhythm, and the final visual experience. These assets are **not** publishable business imagery.

---

## Purpose

- Approve the Luminous Precision visual system with realistic media density
- Test responsive image behaviour, card ratios, hero bands, and OG composition slots
- Keep legacy WordPress inventory (`data/media/legacy-media.ts`) as a **reference audit**, not as design-development photography

---

## Allowed temporary visuals

| Kind | Examples in repo |
|---|---|
| Abstract industrial imagery | Factory placeholder geometry |
| Engineering visuals | QC chart abstraction |
| 3D pipe-inspired renders | Hero bore + extrusion SVG |
| Infrastructure concepts | Project network map |
| Material / texture studies | (reserved for future slots) |
| Premium technical illustrations | Product cross-section diagram |

All current assets live under `/media/demo/bukan-demo-*.png` (premium AI-generated renders, 2026-09-03) and are registered in `temporary-assets.ts`. Legacy SVG sketches remain in the same folder as unused fallbacks.

---

## Forbidden

- Stock or generated photos that could be mistaken as Bukan Pipe factory, employees, projects, laboratory, or products
- Fake factory photos, fake employees, fake projects, fake certifications
- Fake product claims (diameters, PN, SKUs, standards) embedded in visuals
- Using legacy WordPress B/C stills as design-development hero or card photography (they remain in the inventory for migration planning only)

---

## Mandatory status labels

Every temporary visual rendered in the UI carries:

1. **DEMO VISUAL**
2. **REPLACE WITH OFFICIAL FACTORY ASSET**

Implemented via `DemoVisualNotice` on `VisualAsset` / `FillVisualAsset`. Do not remove these overlays from design-development pages.

Each registry row also records:

- `status: DEMO_VISUAL`
- `replaceWith: …` (official target description)

---

## Image roles

| Role | Slot | Current demo id |
|---|---|---|
| `HERO_VISUAL` | Homepage hero band / wide editorial | `demo-hero-visual` |
| `FACTORY_PLACEHOLDER` | Factory / about editorial | `demo-factory-placeholder` |
| `PRODUCT_PLACEHOLDER` | Product cards, catalog rhythm | `demo-product-placeholder` |
| `LAB_PLACEHOLDER` | Laboratory cards and QC bands | `demo-lab-placeholder` |
| `PROJECT_PLACEHOLDER` | Project / case-study bands | `demo-project-placeholder` |

Change bindings in `data/media/visual-bindings.ts` — not component markup — to swap visuals site-wide.

---

## Swap architecture (launch)

1. Add official asset record (future `official-assets.ts` or extend registry with `kind: official`)
2. Update `visual-bindings.ts` ids for each slot
3. Remove or hide `DemoVisualNotice` when `status !== DEMO_VISUAL`
4. Update SEO alt/title/description from verified copy
5. Attach stable `/media/…` URLs to sitemap and OG when pages are indexable

Components (`VisualAsset`, `FillVisualAsset`, cards, filmstrip) stay unchanged.

---

## SEO metadata structure

Each `TemporaryVisualRecord` includes:

```typescript
seo: {
  alt: string;        // describes the placeholder honestly
  title: string;      // short English title for tooling / OG prep
  description: string;
  decorative: boolean;
}
```

- Alt must **not** claim factory authenticity
- Decorative assets use empty alt and `aria-hidden` where appropriate
- Product JSON-LD still has **no** image until verified product photography exists

---

## Next.js handling

- Local SVGs under `public/media/demo/` use default `next/image` optimization
- `sizes` derive from `sizesForVisualRole()` in `lib/media/visual-asset.ts`
- Remote legacy URLs remain on `EditorialImage` for the **legacy archive** section in `/design-system` only

---

## Before production launch

Replace every `DEMO_VISUAL` binding with verified official Bukan Pipe assets. Remove temporary SVGs from public routes or retain only if explicitly approved as brand illustration (not photography).

See also:

- `docs/IMAGE_ART_DIRECTION.md`
- `docs/PHOTOGRAPHY_GAP_REPORT.md`
- `docs/LEGACY_MEDIA_MIGRATION.md`
