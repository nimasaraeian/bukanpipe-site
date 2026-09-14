# Final deployment checklist — mobile dark-mode patch

**Date:** 14 September 2026  
**Target:** https://bukanpipe.com (`main` → Vercel production)  
**Commit scope:** theme init, canvas paint, quote/calculator fields, audit/report docs  
**Not in commit:** `Bukan Pipe Company.pdf`, `image/`

Pre-deploy items below were verified in this working tree before push.

---

## 1. SEO files unchanged

`git diff` against these paths is **empty**. Layout still calls the same `createRootMetadata()` and the same `JsonLd` builders. The only layout addition is viewport **chrome** (`themeColor` / `colorScheme`), not titles, descriptions, canonicals, or schema.

| Surface | Files | Status |
|---|---|---|
| Sitemap | `app/sitemap.ts`, `lib/sitemap/paths.ts`, `lib/seo/image-sitemap.ts` | Unchanged |
| Robots | `app/robots.ts`, `lib/seo/robots-disallow.ts` | Unchanged |
| Metadata (titles, descriptions, canonical, robots, icons, OG) | `lib/seo/metadata.ts`, `lib/seo/page-config.ts`, page `generateMetadata` | Unchanged |
| hreflang | `lib/i18n/locale-availability.ts`, `lib/i18n/apex-locale.ts` | Unchanged |
| JSON-LD | `lib/schema/builders.ts`, `components/seo/JsonLd.tsx`, locale layout `<JsonLd>` data | Unchanged |

Not a content SEO change: `app/[locale]/layout.tsx` `viewport.themeColor = "#05070a"` (browser chrome / status bar).

---

## 2. Mobile theme (confirmed locally)

Storage key: `localStorage["bukan-theme"]`. OS `prefers-color-scheme` is **not** read.

| Case | Expected | Local result |
|---|---|---|
| No saved preference | `data-theme="dark"`, canvas `#05070a` | Pass (including OS Light + Instagram UA) |
| Saved `light` | Light industrial skin, persists on refresh | Pass |
| Saved `dark` | Dark industrial skin, persists on refresh | Pass |

Header theme toggle still writes the key. Quote and calculator fields use `--ind-bg-elevated` (`#0f1622` in dark), not transparent.

`npm run build` passed before this checklist.

---

## 3. Production smoke test (after deploy)

Wait until the Vercel production deployment for this commit is **Ready**, then hit:

| URL | Expect |
|---|---|
| https://bukanpipe.com/ | 307 → `/fa`; document dark if no `bukan-theme` |
| https://bukanpipe.com/fa | 200; `data-theme="dark"`; `theme-color` `#05070a`; no `prefers-color-scheme` in the theme init script; muted sections not white |
| https://bukanpipe.com/en | 200; same dark default; desktop header toggle still present |
| https://bukanpipe.com/fa/request-quote | 200; inputs/textarea opaque dark (`#0f1622`), not white |
| https://bukanpipe.com/en/request-quote | 200; same field paint |
| https://bukanpipe.com/fa/calculator | 200; dark page; no cream/white bands |
| https://bukanpipe.com/en/calculator | 200; same |

Private/incognito (empty storage) must stay **dark** even if the phone OS is Light.

Optional SEO sanity (should match pre-patch): `/sitemap.xml` still lists the same locs; `/robots.txt` unchanged; `/fa` still has `hreflang` + Organization JSON-LD.

---

## Rollout notes

- HTML is `max-age=0, must-revalidate`; CSS/JS are content-hashed.
- Existing `bukan-theme=light` users keep light. Empty storage becomes dark.
- No service worker to clear.
- If a device still looks light after deploy: it has a saved light key, or stale Website Data. Use a private tab to confirm the default.
