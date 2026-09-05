# EN Products Hero — Asset Requirements

**Golden reference:** `docs/design/products-en/golden-reference.png`  
**Status:** P1 recalibration in progress — **NOT approved**

## Required production asset

| Field | Requirement |
|---|---|
| **Path** | `public/media/products/en/hero-pe100-pipe.png` |
| **Subject** | Single large black HDPE / PE100 pipe, perspective matching golden reference |
| **Orientation** | Enters from right; circular opening toward center-left |
| **Detail** | Exploded/cutaway layers at opening, one Bukan-blue stripe, subtle PE texture |
| **Must NOT include** | Water, extra pipes, baked UI labels, baked callout text, background scene |
| **Background** | Transparent PNG preferred |

## Current interim file

The file at `public/media/products/en/hero-pe100-pipe.png` is a **temporary crop** extracted from the golden reference mockup for layout calibration only.

It is **NOT** the approved final render because:

- No transparent background
- Resolution is limited (mockup source is 724px wide)
- Residual leader-line artefact may appear at the crop edge
- Embossed “BUKAN PIPE” on the pipe body is acceptable; UI callout text is not

**Do not approve P1 until a dedicated isolated pipe render replaces this interim asset.**

## Dev overlay

`public/media/products/en/golden-reference-overlay.png` — copy of golden reference for `?designQA=1` calibration only. Must not ship as user-facing content.
