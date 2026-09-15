# Performance repair — final report

**Date:** 15 September 2026  
**Scope:** Homepage `/fa` and `/en`. Local production (`next start`, port 3001). Lighthouse 12.8.2.  
**Not deployed.** `/` → `/fa`, canonicals, hreflang, and sitemap were not changed.

---

## 1. Original baseline (production Lighthouse, user-verified)

| | Mobile `/fa` | Desktop `/fa` |
|---|---|---|
| Performance | 50 | 97 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| FCP | ~1.7s | ~0.4s |
| LCP | ~6.9s | ~1.3s |
| TBT | ~30ms | ~10ms |
| CLS | **1.000** | 0 |
| Speed Index | ~3.5s | ~0.7s |

Mobile LCP node: `.engine-hero-scene-photo--mobile` → `/media/brand/home-hero-pyramid-mobile-fa.jpg` (962×1920 into ~617×823).  
Desktop LCP: `/media/brand/home-hero-pyramid-fa.jpg` (2560×1440 into ~1335×751).  
Both originals appeared in the page payload.

---

## 2. Confirmed root causes

Documented in `PERFORMANCE_ROOT_CAUSE_AUDIT.md`. In code:

1. **CLS 1.0** — Chrome treated a post-parse `html { color-scheme }` write as a whole-document shift. SSR HTML had `data-theme="dark"` but **no** inline `color-scheme`. `THEME_INIT_SCRIPT` and `ThemeProvider` → `applyTheme()` always set `style.colorScheme` after parse.
2. **Dual hero download** — two `next/image` elements, both `priority` + `unoptimized`. CSS `display:none` does not cancel fetch or preload.
3. **LCP bytes** — original JPEGs, no srcset, CSS `filter` on the LCP `<img>`.
4. **Mobile main thread** — `@property` border-angle spin, title `background-position` shine, scroll-reveal `filter: blur`. TBT was already low; this was style/paint work.
5. **Fonts** — both Estedad and Vazirmatn registered from one module; Next preloaded both on `/fa`.

---

## 3. Files changed (this repair)

| File | Role |
|---|---|
| `app/[locale]/layout.tsx` | SSR `style={{ colorScheme: "dark" }}`; `loadUiFont(locale)` |
| `app/layout.tsx` | Removed duplicate `ThemeScript` |
| `lib/theme/config.ts` | Init script sets `color-scheme` only for stored **light**; `applyTheme` is a no-op when already matching |
| `components/theme/ThemeProvider.tsx` | Hydration applies theme only on mismatch |
| `components/theme/ThemeScript.tsx` | Blocking head script only |
| `components/home/HomeHeroPhoto.tsx` | **New** — `<picture>` + `getImageProps`, media preloads |
| `components/home/PremiumHeroSection.tsx` | Single `<HomeHeroPhoto />` |
| `app/engine-hero.css` | One photo class; no dual `display:none`; no LCP `filter`; no opacity-0 fade-up |
| `app/industrial-system.css` | ≤768px motion budget; title-shine freeze after later rules |
| `lib/fonts.ts` | Locale dynamic import |
| `lib/fonts-fa.ts` / `lib/fonts-en.ts` | **New** — one family each, `preload: false`, WOFF2 |
| `app/fonts/Estedad-Variable.woff2` | **New** |
| `app/fonts/Vazirmatn-Variable.woff2` | **New** |
| `next.config.ts` | WebP, qualities `[75,82]`, no 3840 `deviceSizes` |
| `lib/performance/home-hero-architecture.test.ts` | **New** architecture guards |
| `lib/theme/config.test.ts` | Init script must not rewrite dark `color-scheme` |

SEO/routing files were **not** part of this repair.

---

## 4. Exact fixes

### CLS
- First HTML already has `data-theme="dark"` and `style="color-scheme:dark"`.
- Blocking script updates `color-scheme` **only** when `localStorage` is `light`.
- `ThemeProvider` does not rewrite a matching theme after paint.

### Hero / LCP
- One `<picture>`: desktop `<source media="(min-width: 1024px)">`, mobile `<img>` + srcset.
- Matching `<link rel="preload" as="image" media="…">` so the unused art-direction is not requested.
- Next optimizer: WebP, quality 82, `fetchPriority="high"`, `loading="eager"`, `decoding="sync"`.
- AVIF was measured then dropped: Chrome still picked AVIF, and LCP **render delay** stayed ~3–4s simulated. WebP paints with comparable observed LCP and simpler decode.

### Hero render delay
- Removed CSS `filter` from the LCP image (overlays remain).
- Removed `engine-fade-up` (`animation-fill-mode: both` held copy at `opacity: 0` until 0.85s). Copy/trust/floats are visible on the first frame.

### Mobile motion (≤768px)
- Scroll reveal: opacity + `translate3d(0, 12px, 0)` only — no blur.
- Card `::after` border spin: `animation: none`, static gradient.
- Title shine: `animation: none` (rule placed **after** the base shine so it actually wins).
- `prefers-reduced-motion: reduce` still disables non-essential motion.

**Visual change (documented):** on viewports ≤768px the headline no longer sweeps a shine, card edges do not spin, and below-fold cards fade/translate without blur. Desktop motion is unchanged.

### Fonts
- `/fa` HTML does not reference Vazirmatn; `/en` does not reference Estedad.
- `preload: false` because the shared `[locale]` layout still traces both modules; CSS applies only the active `className`.
- Estedad/Vazirmatn served as WOFF2 (~128 KB / ~111 KB) instead of gzipped TTF.
- `adjustFontFallback: "Arial"` for swap metrics.

### JS
- No framework rewrite. TBT was not the bottleneck.

---

## 5. Before / after mobile (`/fa`)

Lighthouse 12, `localhost:3001`, simulated Slow 4G + 4× CPU. Median of 3 runs after picture + CLS + WebP + motion (then one confirmation after WOFF2).

| Metric | Before | After (median of 3) | WOFF2 confirmation |
|---|---|---|---|
| Performance | 50 | **79** | 80 |
| Accessibility | 100 | 100 | 100 |
| Best Practices | 100 | 100 | 100 |
| SEO | 100 | 100 | 100 |
| FCP | ~1.7s | 2.28s | 1.99s |
| LCP (simulated) | ~6.9s | 4.68s | 4.54s |
| LCP (observed, unthrottled) | — | **1.19s** | 1.29s |
| TBT | ~30ms | 129ms | 154ms |
| CLS | 1.000 | **0.0015** | 0.0015 |
| Speed Index | ~3.5s | 2.91s | 2.96s |
| Non-composited animations | several | **none** | none |

Simulated LCP is still above 2.5s because ~90% of that number is **element render delay** under 4× CPU (CSS + style/layout), not hero download. Observed LCP on the same machine is ~1.2s (FCP ≈ LCP: first paint *is* the hero).

**85+ simulated mobile** was not reached locally. Do not treat 79–80 as a production PSI score; re-run PageSpeed on `https://bukanpipe.com/fa` after deploy.

---

## 6. Before / after desktop (`/fa`)

Median of 3 runs, `--preset=desktop`.

| Metric | Before | After (median) |
|---|---|---|
| Performance | 97 | **99** |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| FCP | ~0.4s | 0.51s |
| LCP | ~1.3s | **0.97s** |
| TBT | ~10ms | 0–28ms (median 0) |
| CLS | 0 | 0.003 |
| Speed Index | ~0.7s | 0.54s |

Desktop did not regress. Residual CLS ~0.003 is font/fallback noise, not the old html `color-scheme` 1.0.

---

## 7. Hero network before / after

### Before (architecture)
Two `<img priority unoptimized>`: mobile JPEG **and** desktop JPEG on every viewport.

### After — mobile (412 CSS px, Lighthouse)

| | |
|---|---|
| URL | `/_next/image?url=/media/brand/home-hero-pyramid-mobile-fa.jpg&w=750&q=82` |
| MIME | `image/webp` |
| Transferred | **45,040 B** |
| Encoded | ~45 KB |
| Priority | High |
| Start | ~34–213 ms |
| Complete | ~44–602 ms |
| Desktop pyramid | **not requested** |

### After — desktop (Lighthouse desktop preset)

| | |
|---|---|
| URL | `/_next/image?url=/media/brand/home-hero-pyramid-fa.jpg&w=1920&q=82` |
| MIME | `image/webp` |
| Transferred | **88,559 B** |
| Priority | High |
| Start | ~36–49 ms |
| Complete | ~51–344 ms |
| Mobile pyramid | **not requested** |

SSR HTML contains exactly one `<picture>` and media-scoped preloads. DevTools at 403px and 1440px matched: `currentSrc` was mobile-only / desktop-only respectively.

---

## 8. CLS before / after

| | Mobile | Desktop |
|---|---|---|
| Before | 1.000 (`html` `color-scheme`) | 0 |
| After | **0.00–0.0015** | **0.003** |

SSR `/fa` snippet: `data-theme="dark"` + `style="color-scheme:dark"`. Layout-shift log on a desktop reload: **no entries**.

---

## 9. Animation changes

| Effect | Desktop | Mobile ≤768px | Why |
|---|---|---|---|
| Card conic border spin | Unchanged | Static gradient | `@property` + mask is paint-bound |
| Title shine `background-position` | Unchanged | Frozen rest position | Non-composited; was still winning over an earlier freeze rule |
| Scroll reveal blur | Unchanged | Opacity + 12px translate | Filter forces paint |
| Hero copy/trust fade-up | **Removed** | **Removed** | `both` fill-mode held `opacity: 0` on first frame |
| LCP image CSS filter | Removed | Removed | Extra paint of LCP pixels |
| Logo orbit (transform) | Kept | Kept | Compositor-safe |

---

## 10. Font changes

| | Before | After |
|---|---|---|
| `/fa` | Estedad + Vazirmatn preloaded | Estedad WOFF2 only (~129 KB). No Vazirmatn request |
| `/en` | Both | Vazirmatn WOFF2 only. No Estedad in HTML |
| Format | Variable TTF (~165 / ~137 KB) | WOFF2 (~128 / ~111 KB) |
| Preload | Next auto-preload both | `preload: false` (shared layout traces both modules) |
| Fallback | swap | swap + Arial `adjustFontFallback` |

Typography families are unchanged.

---

## 11. Bundle / payload

- Unused JS (~25 KB) left alone (TBT was not the mobile failure).
- Hero payload: two full JPEGs → one WebP (~45 KB mobile / ~89 KB desktop).
- Font: unused locale family no longer downloaded; FA font ~129 KB WOFF2.
- Render-blocking CSS still ~35 KB (`0y479idkxryw1.css`). Not inlined (fragile, small remaining win).

---

## 12. Visual regression

Checked in the Cursor browser and via production HTML:

- Dark default canvas preserved (`data-theme="dark"`).
- Light theme still applies from stored `bukan-theme` without rewriting dark on first paint.
- FA RTL hero copy on the right; EN LTR structure unchanged (one `<picture>` per locale pyramid).
- Header, language switch, theme toggle, CTAs remain.
- Mobile ≤768px: shine/border spin simplified as in §9. Desktop cinematic motion kept.
- No blank hero; photo uses `object-fit: cover` on small screens and existing luminous `contain` on desktop ≥1024.

Full matrix 360/390/412 × 1366/1440/1920 and Safari were not run as a separate device lab. CSS breakpoints (768 / 1024) cover those widths. **Re-check in Safari after deploy.**

---

## 13. SEO regression

Not modified: canonical builder, hreflang, x-default (`/` → `/fa`), metadata, JSON-LD, sitemap, robots, headings, internal links, locale URLs.  
Lighthouse SEO **100** after repair.

---

## 14. Accessibility

Lighthouse Accessibility **100**. Hero photo remains `alt=""` inside `aria-hidden` scene (decorative). Landmark/header/nav unchanged. Title shine freeze does not remove the heading.

---

## 15. Remaining optional improvements

1. **Simulated mobile LCP** — still ~4.5s in Lighthouse 12 (render delay under 4× CPU). Observed ~1.2s. Next levers: split below-fold CSS, WOFF2 unicode-range subset of Estedad, avoid extra style work in `industrial-system.css`.
2. **TBT 120–150ms locally** vs ~30ms on production CDN — likely Lighthouse 12 + uncached localhost. Watch production TBT; do not rewrite client trees unless PSI TBT is actually high.
3. **Locale font preload** — restoring a *single* locale-specific preload needs route-group layouts, not `preload: true` on both `localFont()` modules.
4. **Quality 82 vs 75** — 82 is allowed in `images.qualities`. Below-fold thumbs still use 75.
5. Re-run **production** PageSpeed (median of 3) on `https://bukanpipe.com/fa` and `/en` after deploy.

---

## Deployment recommendation

- **Commit** this repair (performance files only).
- **Do not deploy blindly.** After merge: production smoke on `/fa` and `/en`, then PSI mobile + desktop (median of 3).
- Stop condition: if production desktop drops below ~95 or SEO/a11y leave 100, revert the image-format or font preload pieces first — CLS/picture architecture should stay.
