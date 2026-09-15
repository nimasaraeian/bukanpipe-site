# Performance root-cause audit — Bukan Pipe `/fa`

**Date:** 15 September 2026  
**Scope:** homepage LCP/CLS (mobile vs desktop). No production code was changed for this document.

Desktop Lighthouse ~97 is the control. Mobile ~50 is a first-viewport architecture failure, not a “too many images somewhere on the site” problem.

---

## A. Exact cause(s) of CLS (~1.000)

Lighthouse attributes the shift to:

```html
<html class="…" data-theme="dark" dir="rtl" lang="fa" style="color-scheme: dark;">
```

That **inline** `style="color-scheme: dark"` is **not** in the server HTML. It is written by JavaScript:

| Writer | File | When |
|---|---|---|
| Duplicate init | `app/layout.tsx` → `ThemeScript` (`next/script` `beforeInteractive`) | Injected into the document; timing is not the same as a blocking `<head>` script |
| Blocking init | `app/[locale]/layout.tsx` → `ThemeBlockingScript` | Inline in `<head>` |
| Hydration | `components/theme/ThemeProvider.tsx` `useEffect` → `applyTheme()` | **After first paint**, every visit |

`applyTheme()` always does:

```ts
document.documentElement.dataset.theme = theme;
document.documentElement.style.colorScheme = theme;
```

even when the value is already `"dark"`.

Chrome treats a post-parse `color-scheme` change on `<html>` as a **whole-document** layout shift (score ~1.0). This matches the evidence: desktop CLS 0 (often cached / different timing) vs mobile CLS 1.000 on a cold Lighthouse run.

Secondary (smaller) CLS risks, not the 1.0:

- `display: swap` on Estedad (`lib/fonts.ts`) — Next.js size-adjust fallback should absorb most of this.
- `ScrollRevealRoot` adds `.ind-scroll-reveal` (`opacity: 0` + `filter: blur(12px)` + `translateY(2.25rem)`) after hydration. Hero is excluded. First-viewport product cards sit below `min-height: 100svh`, so this should not produce a full-page 1.0.

**Fix direction:** SSR `style={{ colorScheme: "dark" }}` on `<html>`. Init script mutates only when stored theme is `light`. `ThemeProvider` must not rewrite matching `data-theme` / `color-scheme`. Remove the duplicate `beforeInteractive` script.

---

## B. Exact cause(s) of high mobile LCP (~6.9s)

LCP node: `.engine-hero-scene-photo--mobile`  
URL: `/media/brand/home-hero-pyramid-mobile-fa.jpg`  
Natural ~962×1920, displayed ~617×823.

Stacked causes, in order:

1. **Two `next/image` elements, both `priority` + `unoptimized`** in `components/home/PremiumHeroSection.tsx`. CSS `display: none` at 1024px does **not** prevent fetch. Next also emits **two** image preloads.
2. **`unoptimized`** bypasses `/_next/image` — the browser gets the original JPEG, not WebP/AVIF or a srcset candidate near 828–1080px.
3. **CSS `filter: brightness() contrast() saturate()`** on the LCP `<img>` (`.engine-hero--luminous .engine-hero-scene-photo--mobile` in `app/engine-hero.css`). Filters force an extra paint of the LCP pixels.
4. Homepage is a client tree (`IndustrialHomePage` → `PremiumHeroSection`), so hero HTML is still SSR’d, but the image optimizer never runs.

Desktop LCP (`home-hero-pyramid-fa.jpg` 2560×1440 into ~1335×751) is fast because the connection and CPU hide the waste. The same waste is fatal on mobile.

---

## C. Whether both hero images download

**Yes, by construction.**

```tsx
<Image src={mobile} priority unoptimized className="…--mobile" />
<Image src={desktop} priority unoptimized className="…--desktop" />
```

```css
.engine-hero-scene-photo--desktop { display: none; }
@media (min-width: 1024px) {
  .engine-hero-scene-photo--mobile { display: none; }
  .engine-hero-scene-photo--desktop { display: block; }
}
```

Hidden `<img>` + `priority` preload = both JPEGs on every viewport.

---

## D. Critical rendering path (`/fa`)

1. `/` → 307 `/fa` (~40ms; keep).
2. Locale layout CSS: `globals.css` → `engine-hero.css` + `industrial-system.css` + `assistant.css` + Tailwind (~38 KB render-blocking; not the LCP bottleneck).
3. Estedad variable `@font-face` (and likely Vazirmatn CSS too — both `localFont()` run in `lib/fonts.ts` even though only one class is applied).
4. Two hero JPEG preloads.
5. Theme scripts (twice) + hydration `applyTheme`.
6. Client JS: `SiteShell`, header, `ScrollRevealRoot`, full `IndustrialHomePage`.
7. Continuous `ind-border-light-spin` (`@property` angle → conic-gradient) on every `.ind-glass` / product card, including off-screen.

---

## E. Non-composited animations (initial viewport + first 2s)

| Animation | File | Paint/layout? | On mobile first view? | Verdict |
|---|---|---|---|---|
| `--ind-border-light-angle` / `ind-border-light-spin` | `industrial-system.css` | Yes — custom property + conic-gradient + mask | Product cards below fold still animate | Disable ≤768px; keep desktop |
| `ind-hero-title-shine` (`background-position`) | `industrial-system.css` | Yes — paint | H1 in hero | Freeze at rest position ≤768px |
| `ind-scroll-reveal` `filter: blur()` | `industrial-system.css` + `ScrollRevealRoot.tsx` | Yes | After hydrate, below fold | Mobile: opacity + 12px translate only |
| `engine-fade-up` (opacity) | `engine-hero.css` | Compositor | Copy/trust | Keep |
| Logo orbit `transform` | `engine-hero.css` | Compositor | Header | Keep |
| Hero img `filter` | `engine-hero.css` | Paint of LCP | Yes | Remove from img |

---

## F. Font-loading behavior

`app/[locale]/layout.tsx` applies `uiFontByLocale[locale]`, so **FA markup uses Estedad class names**.

But `lib/fonts.ts` **calls `localFont()` for both Estedad and Vazirmatn at module load**. Next.js then emits both files / `@font-face` / preloads for any route that imports that module (the locale layout).

- Estedad Variable ~165 KB  
- Vazirmatn Variable ~137 KB  
- `display: "swap"`, weight `100 900`

**Fix:** split `lib/fonts-fa.ts` / `lib/fonts-en.ts` and `await import()` only the active locale so `/fa` cannot preload Vazirmatn.

---

## G. JS / CSS contribution

- TBT ~30ms — **do not rewrite the framework**.
- Main-thread 2.8s on mobile is **Style/Layout/Rendering** from filters, `@property` border spin, blur reveals — not unused JS (~25 KB).
- `IndustrialHomePage` is `"use client"` for copy/locale; acceptable. Hero `<picture>` can still SSR.

---

## H. Mobile vs desktop

| | Mobile | Desktop |
|---|---|---|
| Hero fetch | Mobile **and** desktop JPEG | Same dual fetch, cheaper on broadband |
| LCP | ~6.9s | ~1.3s |
| CLS | 1.0 (`color-scheme` on html) | 0 |
| Motion | Blur + border-angle + title shine + dual decode | Same CSS, spare GPU |
| Hero layout | Overlay, `100svh` | Side-by-side luminous |

---

## I. Files / components responsible

- `components/home/PremiumHeroSection.tsx` — dual priority images  
- `app/engine-hero.css` — hide-via-CSS, LCP `filter`  
- `lib/theme/config.ts` — init script always sets `style.colorScheme`  
- `components/theme/ThemeProvider.tsx` — post-paint `applyTheme`  
- `app/layout.tsx` — extra `ThemeScript`  
- `app/[locale]/layout.tsx` — no SSR `color-scheme` style; both fonts imported  
- `lib/fonts.ts` — both variable fonts registered  
- `app/industrial-system.css` — border spin, title shine, blur reveal  
- `components/motion/ScrollRevealRoot.tsx` — applies blur reveal classes  
- `next.config.ts` — no `formats` / oversized `deviceSizes` (3840) once optimizer is on  

---

## J. Ranked fixes (impact / risk)

| Rank | Fix | Impact | Risk |
|---|---|---|---|
| 1 | SSR color-scheme + mutate html only for light + stop hydration rewrite | CLS 1.0 → ~0 | Low |
| 2 | One `<picture>` + media sources; drop dual `priority` | Cut ~0.4–1.5 MB duplicate hero | Low |
| 3 | Remove `unoptimized`; AVIF/WebP srcset | LCP bytes | Low–med (quality 82) |
| 4 | Remove CSS `filter` on LCP img | LCP render delay | None (overlays stay) |
| 5 | Freeze title shine + border spin + blur reveal on ≤768px | Main thread / animations | Visual: static shine, static card edge |
| 6 | Locale-only `localFont` import | ~137 KB on `/fa` | Low |
| 7 | Drop 3840 `deviceSizes` | Desktop payload | None at current display widths |

Do **not**: change `/` → `/fa`, metadata, hreflang, or dark cinematic identity.
