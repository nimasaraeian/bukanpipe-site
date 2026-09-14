# Mobile dark-mode stability audit

**Site:** https://bukanpipe.com  
**Date:** 14 September 2026  
**Scope:** Theme system, mobile UA painting, missing backgrounds, cache  
**Code changes:** none (awaiting approval)

Reported symptom: on some phones, **some sections look light/white** while the industrial UI is supposed to stay dark.

---

## Executive conclusion

This is not a Vercel/CSS-chunk cache bug, and it is not a missing Tailwind `dark:` class on the live industrial pages.

There are **two stacked root causes**. Together they explain “only some devices” and “only some sections”:

1. **Primary — first visit follows the phone’s OS light/dark setting.**  
   `ThemeScript` and `getPreferredTheme()` set `data-theme="light"` and inline `color-scheme: light` whenever `prefers-color-scheme: light` and there is no `localStorage` key `bukan-theme`. Most iPhones and Android phones ship in **Light** mode. In-app browsers (Instagram, Telegram, WhatsApp) also typically report light. The live industrial CSS then paints muted/elevated bands as **white / `#eef2f7` / `#ffffff`**, while photo heroes stay dark. That reads as “random white sections” on an otherwise dark brand site.

2. **Secondary — unpainted canvas + transparent native controls on WebKit.**  
   `html` has **no background**. Generic `body` still has the **old cream canvas** (`#f3f1eb`). Quote/calculator fields use `bg-transparent`. iOS Safari often fills transparent inputs and overscroll/safe-area gaps with **system white**, especially when `color-scheme: light` is set.

Desktop looks stable because many desktops are in Dark mode, or the user already toggled the header control (persisted in `localStorage`).

---

## 1. Dark theme implementation

### How theme is applied

| Layer | Behavior |
|---|---|
| SSR `app/[locale]/layout.tsx` | `<html data-theme="dark">` always. `suppressHydrationWarning` on `<html>` only. |
| Blocking intent | Inline `ThemeScript` in a manual `<head>` |
| Client | `ThemeProvider` reads `document.documentElement.dataset.theme`, then `applyTheme()` |
| Persistence | `localStorage["bukan-theme"]` = `"light"` \| `"dark"` |
| First visit (no key) | **`prefers-color-scheme: light` → light theme** |
| CSS tokens | `:root, [data-theme="dark"]` vs `[data-theme="light"]` in `app/industrial-system.css` |
| Toggle | Header `ThemeToggle` — opt-in, not the default path |

`ThemeScript` (current logic, paraphrased):

```
if localStorage is light|dark → use it
else if prefers-color-scheme: light → LIGHT + color-scheme:light
else → DARK
```

SSR HTML is always dark. The script (or `ThemeProvider` after hydrate) can immediately switch the document to light on a light OS. That is a **client/server theme mismatch** by design.

### CSS variables (live industrial system)

Dark (`:root` / `[data-theme="dark"]`):

- `--ind-bg-deep: #05070a`
- `--ind-bg-base: #0a1018`
- `--ind-bg-elevated: #0f1622`
- `color-scheme: dark`

Light (`[data-theme="light"]`):

- `--ind-bg-deep: #eef2f7`
- `--ind-bg-base: #f5f8fc`
- `--ind-bg-elevated: #ffffff`  ← true white cards/surfaces
- Muted sections get a **white-tinted gradient** (`rgba(255,255,255,0.72)` …)
- `color-scheme: light`

Light theme is a real, intentional skin — not a remnant. The bug is **auto-selecting it on mobile**, plus incomplete dark canvas on `html`.

### Tailwind

`app/globals.css` `@theme` still defines **light paper/canvas** tokens (`--color-canvas: #f3f1eb`, `--color-paper: #fffcf7`). Those utilities (`bg-paper`, `bg-canvas`, `.surface-paper`) **do not follow `data-theme`**.

Live `SiteShell` pages use industrial classes (`ind-section`, `ind-glass`), not those paper utilities. Paper styles remain a landmine if old components are remounted (`Form.tsx`, `Section.tsx`, `Technical.tsx`, unused `SiteHeader` / `CorporateHomePage`).

There is **no Tailwind `dark:` / `prefers-color-scheme` media query** driving the live industrial layout. Theme is 100% `data-theme` + CSS variables.

### `color-scheme`

Set in two places:

1. CSS: `:root { color-scheme: dark }` and `[data-theme="light"] { color-scheme: light }`
2. **Inline** `document.documentElement.style.colorScheme` from `ThemeScript` / `applyTheme`

Inline `color-scheme: light` wins over CSS. Safari then paints form controls, scrollbars, and some UA chrome as light even if a child still has a dark background.

### `prefers-color-scheme`

Used **only in JS** (`ThemeScript`, `getPreferredTheme`). Not used as a CSS `@media` for the industrial skin. So the OS theme never “partially” restyles a section via CSS media queries — it flips the **whole** `data-theme`. The patchy look comes from **light tokens on some bands + dark photos/hardcoded hero scrims**.

### `theme-color` / viewport

```ts
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};
```

**No `themeColor`.** iOS Safari status bar, home-indicator, and overscroll can show the **browser default white** around `viewport-fit: cover`.

---

## 2. Mobile rendering

### iOS Safari / Android Chrome (WebKit)

| Mechanism | Effect |
|---|---|
| Default OS Light | First visit → `data-theme="light"` |
| In-app WKWebView | Often reports light; may block or delay `localStorage` |
| Transparent `<input>` | UA default **white fill** (`bg-transparent` on quote + similar fields) |
| `backdrop-filter` glass | If parent/`html` is unpainted, glass can look milky/white |
| Overscroll / safe area | Unpainted `html` shows white rubber-band |
| Autofill | Yellow/white native fill; no `:-webkit-autofill` override in industrial CSS |

Android Chrome follows the same `prefers-color-scheme` rule. Desktop Chrome with OS dark stays dark unless the user toggles light.

### Viewport

`100svh` on `body.industrial-body` + `viewportFit: "cover"` without a dark `theme-color` or `html` background leaves notch/home-indicator gaps to the UA canvas (white).

### Hydration mismatch

| Server | Client (typical phone, no storage) |
|---|---|
| `data-theme="dark"` | Script sets `"light"` |
| `ThemeProvider` state `"dark"` | `readInitialTheme()` → `"light"` |
| `color-scheme` from CSS: dark | Inline `color-scheme: light` |

`suppressHydrationWarning` is only on `<html>`. `ThemeToggle` can disagree for one frame. CSS variables can swap after first paint if the inline script is **not** guaranteed `beforeInteractive` (App Router manual `<head>` + `dangerouslySetInnerHTML` is weaker than `next/script` `strategy="beforeInteractive"`). On slow mobiles that delay looks like sections “popping” from dark to white.

`SiteShell` is a client component wrapping every page; it does not itself switch theme classes. Theme is document-level.

---

## 3. Missing backgrounds / white inheritance

### Confirmed gaps

1. **`html` has no `background-color`.** Only `scroll-behavior` / `scrollbar-gutter`. Mobile overscroll = white.
2. **Generic `body` still uses the old light canvas** (`#f7f5ef` / `--color-canvas`). `body.industrial-body` overrides it, but any frame where the class is missing, or any UA paint of `body` vs `html`, can flash cream/white.
3. **`.ind-section` has padding only** — transparent. Relies on `.industrial-site` / body. Fine when those are dark; fails if `html` shows through.
4. **Quote (and similar) fields:** `bg-transparent` on `<input>` / `<textarea>` (`RequestQuotePageContent`). iOS paints them white.
5. **Light muted/elevated sections** (once `data-theme="light"`):

```css
[data-theme="light"] .ind-section-muted { /* white-tinted gradient */ }
[data-theme="light"] .ind-bg-elevated { #ffffff }
```

Home uses `ind-section-muted` and `ind-section-elevated` (products, applications, CTA band). Those are the bands most likely to look “suddenly white” next to a dark photo hero.

### Affected live components (not a redesign list)

| Surface | Why it can look light |
|---|---|
| Home `IndustrialHomePage` muted/elevated sections | Light-theme tokens → near-white bands |
| `IndustrialPageHero` + following `.ind-section` | Hero stays photographic/dark; next band uses `--ind-bg-base` |
| `ind-glass` / `ind-glass-strong` | Translucent; over white canvas → milky |
| `RequestQuotePageContent` inputs | `bg-transparent` + iOS UA white |
| `PipelineDesignCalculator` inputs | Native controls; inherit `color-scheme` |
| `PremiumHeroHeader` (scrolled) | Light theme uses `rgba(255,255,255,0.62)` chips |
| `.engine-hero-trust` on light | `rgba(255,255,255,0.78)` bar |
| iOS chrome / overscroll | No `theme-color`, no `html` bg |

### Not the live tree (latent)

`CorporateHomePage` (`bg-white`), `SiteHeader` (`bg-paper`), `Form.tsx` (`bg-paper`), `components/ui/ContentBlocks.tsx` paper stats. Unused by `SiteShell`. Do not ship them into the industrial tree without industrial tokens.

---

## 4. Caching

| Layer | Finding | Verdict |
|---|---|---|
| HTML (Vercel) | `Cache-Control: public, max-age=0, must-revalidate` | Not a stale-theme store |
| CSS/JS | Content-hashed `/_next/static/...` | New deploy = new URLs |
| `data-theme` | Client-only (`localStorage` + OS) | Not in HTML cache |
| Service worker / PWA | **None** (no `sw.js`, no web manifest) | Not a cause |
| In-app WebView cache | Can keep an old JS bundle briefly | Secondary; not the pattern |

**Cache is not the root cause.** Invalidation is still listed below for a clean rollout after a theme-default change.

---

## 5. File checklist

| File | Role |
|---|---|
| `app/[locale]/layout.tsx` | Hardcoded `data-theme="dark"`; viewport **without** `themeColor`; ThemeScript in `<head>` |
| `components/theme/ThemeScript.tsx` | **Follows OS light** on first visit |
| `lib/theme/config.ts` | Same OS fallback; sets inline `colorScheme` |
| `components/theme/ThemeProvider.tsx` | Hydrates from DOM; SSR default `"dark"` |
| `app/industrial-system.css` | Full light + dark token sets; light muted = white |
| `app/globals.css` | Light `@theme` tokens; cream `body`; no `html` fill |
| `app/engine-hero.css` | Light-theme hero/header overrides |
| `lib/seo/metadata.ts` | No `themeColor` (viewport lives in layout) |
| Tailwind | No `darkMode: 'class'` driving live pages |

---

## Root cause (one paragraph)

The industrial site is **dark-first in SSR and in brand**, but **light-first on a typical phone** because the blocking theme script copies `prefers-color-scheme`. Light tokens turn muted/elevated sections and elevated surfaces **white**. WebKit then adds more white where `html` has no paint and where inputs are `background: transparent`. Devices already on OS dark, or with `bukan-theme=dark` stored, look correct — which matches “some mobile devices.”

---

## Recommended fix (do not implement until approved)

Do **not** globally recolor Tailwind `@theme` or delete the light skin. Do **not** change URLs or SEO metadata except viewport `themeColor`.

### P0 — stop accidental light theme (behavioral, not visual redesign)

1. **Default `data-theme` to `dark` unless `localStorage["bukan-theme"] === "light"`.**  
   Remove the `prefers-color-scheme: light` branch from `ThemeScript` and `getPreferredTheme()`. Keep the header toggle for users who explicitly want light.
2. **Keep `color-scheme: dark` unless the stored choice is light.** Do not set inline light `color-scheme` on first visit.
3. Paint the canvas:  
   `html.industrial-root, body.industrial-body { background-color: #05070a; }`  
   (or `var(--ind-bg-deep)` with dark as the unresolved default on `:root` only.)
4. Viewport: `themeColor: "#05070a"` (and optionally `colorScheme: "dark"`). This is chrome/status-bar, not SEO content.

### P1 — WebKit white islands (still no redesign)

5. Quote / calculator / contact fields: **opaque** `background-color: var(--ind-bg-elevated)` (not `transparent`); add `:-webkit-autofill` using the same token.
6. Load theme via `next/script` `strategy="beforeInteractive"` so mobile first paint cannot sit on SSR dark then flip.
7. Initialize `ThemeProvider` so SSR and first client render agree (default dark; read storage only after mount if needed, without a light flash).

### P2 — optional hardening

8. `overscroll-behavior-y: none` on `html` or match body fill so iOS bounce is dark.
9. Leave light-theme CSS in place for the toggle; do not restyle desktop light users who already opted in (`localStorage`).

### Explicitly out of scope unless requested

- Removing `ThemeToggle`
- Restyling desktop light theme aesthetics
- Changing product/article URLs, hreflang, JSON-LD
- Enabling a service worker

---

## Cache invalidation strategy (after the fix ships)

1. Deploy as usual (hashed CSS/JS already bustes). No purge of `/media` required.
2. HTML already `max-age=0, must-revalidate` — new theme script is on next document request.
3. Users who **already saved** `bukan-theme=light` keep light (respect explicit choice). Users with **no key** get dark after deploy — that is the intended correction.
4. If a QA device still looks light: Safari Settings → Website Data for bukanpipe.com, or a private tab (private tab will now stay **dark**, not follow OS).
5. No service-worker unregister step (none installed).
6. Optional: bump `THEME_STORAGE_KEY` only if we must ignore a corrupted value; **do not** bump it just to force dark on users who tapped the sun icon.

---

## Suggested QA (post-approval)

| Device | Setup | Expect |
|---|---|---|
| iPhone Safari | OS Light, no site data | Entire page dark; no cream bands; no white inputs |
| iPhone Safari | OS Dark | Unchanged dark |
| iPhone Safari | Toggle to light once | Light skin (opt-in) persists |
| Instagram in-app browser | Default | Dark, not white sections |
| Android Chrome | OS Light, no site data | Dark |
| Desktop | Existing light toggle | Still light |

Approval requested before any code change.
