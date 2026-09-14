# Bukan Pipe — Mobile dark-mode stability (P0/P1)

**Date:** 14 September 2026  
**Approved scope:** P0/P1 from `MOBILE_DARK_MODE_AUDIT.md`  
**Production URL:** https://bukanpipe.com (picks this up after deploy)

No UI redesign. No SEO URL, hreflang, or JSON-LD changes. The header theme toggle is unchanged. Users who already saved light in `localStorage` keep light.

---

## Root cause fixed

First visit used to copy the phone’s `prefers-color-scheme`. Most phones and Instagram/Telegram WebViews report **light**, so the client flipped SSR `data-theme="dark"` to **light**. Light tokens then painted muted/elevated bands white (`#ffffff` / `#eef2f7`) next to dark photo heroes.

WebKit added more white where `html` had no background, generic `body` still used the old cream canvas, and quote/calculator fields used `bg-transparent`.

**After this patch:** no saved key → **dark**. Saved `light` | `dark` still wins. OS light/dark is ignored.

---

## Behavior (priority order)

1. `localStorage["bukan-theme"]` is `light` or `dark` → use it.
2. Otherwise → **dark**. Do not read `prefers-color-scheme`.
3. Header `ThemeToggle` still writes the storage key and swaps the existing light/dark skins.

---

## Files changed

| File | Change |
|---|---|
| `lib/theme/config.ts` | `resolveTheme()` defaults to dark; `THEME_INIT_SCRIPT` matches; `themeColorFor()`; `applyTheme()` updates `meta[name=theme-color]` |
| `lib/theme/config.test.ts` | Unit tests: saved light/dark, empty storage, no `prefers-color-scheme` in the init script |
| `components/theme/ThemeScript.tsx` | `next/script` `beforeInteractive` + parse-blocking locale-head copy; same IIFE |
| `components/theme/ThemeProvider.tsx` | SSR/hydrate state is always `dark`; storage is applied after mount without a first-paint light flip |
| `app/layout.tsx` | Mounts `beforeInteractive` `ThemeScript` (Next.js requirement) |
| `app/[locale]/layout.tsx` | Blocking script in `<head>`; viewport `themeColor: #05070a`, `colorScheme: "dark"` |
| `app/globals.css` | `html, body { background: #05070a }`; `color-scheme: dark` on `html`; `overscroll-behavior-y: none`; cream body canvas removed as fallback |
| `app/industrial-system.css` | `.ind-field` + industrial `input`/`select`/`textarea` use `--ind-bg-elevated`; WebKit autofill override |
| `components/pages/RequestQuotePageContent.tsx` | Replaced `bg-transparent` with `ind-field` |
| `components/calculator/PipelineDesignCalculator.tsx` | Same for numbers, select, and text |

Not changed: light-theme token set, `ThemeToggle` UI, product/article URLs, metadata titles/descriptions, JSON-LD.

---

## Tests performed

`npm run build` — passed (Next.js 16.3.4).  
`npx vitest run lib/theme/config.test.ts lib/seo/metadata.test.ts` — passed.  
Local production: `next start` on `http://localhost:3011`.

### HTML contract

| Check | Result |
|---|---|
| `data-theme="dark"` on SSR `<html>` | Yes |
| `meta name="theme-color" content="#05070a"` | Yes |
| `meta name="color-scheme" content="dark"` | Yes |
| Init script contains `prefers-color-scheme` | **No** |
| Init script: saved light\|dark, else `"dark"` | Yes |

### Browser (Cursor Chromium)

| Case | Setup | Result |
|---|---|---|
| 1. First visit, phone Light | `prefers-color-scheme: light`, no `bukan-theme` | `data-theme=dark`, `html`/`body` `rgb(5, 7, 10)`, muted section `rgb(10, 16, 24)` |
| 2. First visit, phone Dark | `prefers-color-scheme: dark`, no key | Stays dark |
| 3. Saved Light | Toggle once | `data-theme=light`, canvas `rgb(238, 242, 247)`, `theme-color=#eef2f7` |
| 4. Saved Dark | Toggle back | `data-theme=dark`, `theme-color=#05070a` |
| 5. Refresh | Reload with saved light, then with saved dark | Preference persists |
| 6. Instagram WebView | Instagram iPhone UA + OS light + no key | Stays dark |
| iPhone 390×844 | Home + quote + calculator | Dark chrome; no white bands |
| Desktop 1440×900 | `/en` home | Dark industrial UI; toggle still present (`Switch to light mode`) |
| Quote fields | 5 inputs + textarea | Background `rgb(15, 22, 34)` (`--ind-bg-elevated`), white text |
| Calculator fields | 6 numbers + `select` + text | Same opaque elevated fill |

`html` `overscroll-behavior-y` is `none`; canvas is `#05070a`, so iOS rubber-band / status-bar chrome match the brand instead of system white.

**Not a physical device farm.** Real Safari.app / Chrome Android / in-app WebViews were simulated (viewport, `prefers-color-scheme`, Instagram UA). Logic no longer depends on OS theme, which is what those UAs were flipping.

---

## Cache invalidation (rollout)

Cache was never the root cause. After deploy:

1. Hashed CSS/JS URLs change automatically.
2. HTML is already `max-age=0, must-revalidate`.
3. Users with **no** `bukan-theme` key get dark (the fix).
4. Users who tapped the sun icon keep light.
5. No service worker to unregister.
6. Do **not** rename `THEME_STORAGE_KEY` — that would reset opt-in light users.

If a QA phone still looks light: it has `bukan-theme=light`, or old Website Data. Private tab with empty storage should now stay dark even if the phone OS is Light.

---

## Out of scope (unchanged)

- Removing or restyling `ThemeToggle`
- Light-theme aesthetics for opted-in users
- SEO titles, canonicals, hreflang, stub 308s
- Paper/legacy components not used by `SiteShell`
