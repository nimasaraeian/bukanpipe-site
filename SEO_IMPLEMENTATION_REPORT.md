# Bukan Pipe — SEO Implementation Report (A+B)

**Date:** 14 September 2026  
**Approved scope:** Audit packs A+B, plus aligning cookie-less `/` with `hreflang` x-default (FA)  
**Production URL:** https://bukanpipe.com  

No public content URLs were renamed or removed. `/fa` and `/en` architecture is unchanged. The sitemap still enumerates the same **94** canonical page URLs. Bidirectional `hreflang` (`fa` / `en` / `x-default` → FA) is unchanged.

Live production will pick these up **after deploy**. Local production preview (`next start`) already validates the HTTP and HTML contracts below.

---

## Implementation checklist (executed)

| # | Item | Status |
|---|---|---|
| P0.1 | Official `favicon.ico`, `favicon.svg`, `apple-touch-icon.png` from Bukan Pipe logo | Done |
| P0.1 | `metadata.icons` + middleware bypass so `/favicon.ico` is not locale-prefixed | Done |
| P0.2 | Permanent **308** for confirmed stubs `/[locale]/engineering\|knowledge\|tools\|standards` | Done |
| P1.3 | Cookie-less `/` → `/fa` to match x-default; cookie still wins; `/fa` and `/en` unchanged | Done |
| P1.4 | Organization JSON-LD: `alternateName` «بوکان پایپ», `contactPoint`, Instagram `sameAs`, logo ImageObject | Done |
| P1.4 | Article `publisher.logo`; Product `category` | Done |
| P1.5 | `robots.txt` Disallow includes `/fa/*` and `/en/*` stub paths | Done |
| P1.6 | FA request-quote title no longer double-branded; solutions/industries use existing `seoTitle` | Done |
| P2.7 | Footer + company nav + product/lab contextual links (not spammy) | Done |
| Verify | `npm run lint` (changed files clean; repo has pre-existing errors) | Done |
| Verify | `npx tsc --noEmit` + `npm run build` | Done |
| Verify | Local `next start`: favicon 200, stub 308s, `/` → `/fa`, sitemap 94 URLs | Done |

---

## Redirect list

All are **308 permanent**. Stub paths remain as aliases; they are not deleted.

| Source | Destination | Reason |
|---|---|---|
| `/fa/engineering` | `/fa/technical-center` | Confirmed 200 stub with homepage canonical |
| `/en/engineering` | `/en/technical-center` | Same route file as FA; same indexable 200 bug |
| `/fa/knowledge` | `/fa/technical-center` | Confirmed stub |
| `/en/knowledge` | `/en/technical-center` | Same confirmed stub, EN |
| `/fa/tools` | `/fa/calculator` | Existing intended hub (not technical-center) |
| `/en/tools` | `/en/calculator` | Same |
| `/fa/standards` | `/fa/downloads` | Existing intended hub |
| `/en/standards` | `/en/downloads` | Same |

**Not redirected:** any WordPress URL, `/solutions`, `/industries`, `/projects`, or other uncertain paths.

**Homepage (307, not 308):** cookie-less `/` → `/fa`. An `NEXT_LOCALE=en` cookie still sends `/` → `/en`. 307 is correct because language is cookie-negotiated.

---

## Files changed

### Brand icons

| File | Why |
|---|---|
| `scripts/build-favicon-assets.mjs` | Generates icon set from `/public/media/demo/logo.png` |
| `public/favicon.ico` | Google + browser default `/favicon.ico` (32 + 48 PNG) |
| `public/favicon.svg` | High-resolution tab/SVG icon (official logo) |
| `public/apple-touch-icon.png` | iOS home-screen / Apple touch (180×180) |
| `public/icon-192.png`, `public/icon-512.png` | Android/PWA-sized squares from the same logo |
| `app/icon.svg` | Replaced placeholder square with official logo |

### Crawl / locale

| File | Why |
|---|---|
| `middleware.ts` | Bypass favicon assets; cookie-less `/` uses FA |
| `lib/i18n/apex-locale.ts` | Isolated homepage locale rule + tests |
| `lib/seo/stub-redirects.ts` | Single source for confirmed 308s |
| `next.config.ts` | Registers those 308s (`permanent: true`) |
| `app/[locale]/engineering/page.tsx` | `permanentRedirect` + `force-dynamic` (no 200 HTML prerender) |
| `app/[locale]/knowledge/page.tsx` | Same |
| `app/[locale]/tools/page.tsx` | Same → calculator |
| `app/[locale]/standards/page.tsx` | Same → downloads |
| `app/robots.ts` | Locale-prefixed Disallow |
| `lib/seo/robots-disallow.ts` | Shared disallow list |

### Metadata / schema

| File | Why |
|---|---|
| `lib/seo/metadata.ts` | `metadata.icons` |
| `lib/config/site.ts` | `brandNameFa`: «بوکان پایپ»; organization description |
| `lib/seo/page-config.ts` | Logo ImageObject helper |
| `lib/schema/builders.ts` | Organization, Product category, Instagram `sameAs` |
| `lib/schema/content-document.ts` | Article `publisher.logo`; Product category |
| `app/[locale]/request-quote/page.tsx` | Absolute title, no `\| Bukan Pipe` suffix |
| `app/[locale]/solutions/page.tsx` | Use existing `seoTitle` |
| `app/[locale]/industries/page.tsx` | Use existing `seoTitle` |
| `messages/en.ts`, `messages/fa.ts` | Certifications/quote/industrial labels + quote `seoTitle` |

### Internal links

| File | Why |
|---|---|
| `lib/i18n/nav-items.ts` | Company dropdown: certifications. Footer: industrial pipe, lab, certifications, request-quote |
| `lib/content/seo-content-model.ts` | One product block: Laboratory, Certifications, Request quote |
| `data/content/fa/catalog.ts`, `data/content/en/catalog.ts` | Products hub links to lab + certifications |
| `data/content/fa/laboratory.ts`, `data/content/en/laboratory.ts` | Lab hub → certifications |

### Tests

`lib/i18n/apex-locale.test.ts`, `lib/seo/stub-redirects.test.ts`, `lib/seo/implementation-ab.test.ts`, plus updates to schema/metadata tests.

---

## SEO reason (by goal)

### Google brand mark (tabs, bookmarks, SERP favicon)

Google and browsers request **`/favicon.ico` at the site root**. Middleware previously 307’d that to `/en/favicon.ico` (404). The tab icon was a hollow placeholder SVG.

Now `/favicon.ico` is the official Bukan Pipe mark, **200**, not locale-prefixed. HTML also exposes SVG + Apple touch icons via `metadata.icons`.

### Indexable stub 200s

`/fa/engineering` (and twins) were prerendered **200** documents titled “Bukan Pipe” with canonical `https://bukanpipe.com`. That wastes crawl budget and can dilute the homepage.

They now **308** to the live hubs. Paths still exist as aliases.

### Homepage language consistency

| Signal | Before | After |
|---|---|---|
| `hreflang` x-default | `/fa` | `/fa` (unchanged) |
| `/fa` / `/en` canonicals | locale URLs | unchanged |
| Cookie-less `/` | **307 → `/en`** | **307 → `/fa`** |
| Cookie `NEXT_LOCALE=en` | `/en` | `/en` |

`defaultLocale` remains `en` for other unprefixed paths. Only apex `/` was aligned with x-default.

### Organization entity

JSON-LD now has Persian `alternateName`, a factual manufacturer description, sales `contactPoint` (existing factory phone/email — not invented), Instagram `sameAs` from `contactConfig` only, and an ImageObject logo. LinkedIn was **not** added (no verified URL).

Product schema includes `category: "HDPE polyethylene pipe"`. Article publisher includes logo ImageObject.

### robots.txt

Disallow now matches real production paths (`/fa/projects`, `/en/projects`, …) as well as bare paths. Published locale prefixes `/fa` and `/en` stay allowed.

### Titles

FA request-quote is `استعلام قیمت لوله پلی اتیلن | بوکان پایپ` (no extra `| Bukan Pipe`). Solutions/industries use the keyword `seoTitle` already stored in messages.

### Internal linking

One extra company-nav item and a small footer set (products, laboratory, certifications, technical center, request quote). Product pages get **one** quality/enquiry block (3 links). Lab hubs link certifications. No mass footer spam.

---

## Validation results

### Unit tests

`vitest` on SEO/schema/i18n/internal-link suites: **62 passed**.

### Typecheck

`npx tsc --noEmit`: **pass**.

### Lint

- Changed SEO files: **pass** (`npx eslint` on the touched list).
- Full `npm run lint`: **fails on pre-existing files** not in this change set (`AssistantPanel`, `PremiumHeroHeader`, `HeroComposition`, etc.). Those were not modified.

### Build

`npm run build`: **pass**. Stub routes compile as dynamic (`ƒ`), not static HTML. `/icon.svg`, `/robots.txt`, `/sitemap.xml` remain static.

### Local production preview (`next start :3010`)

| Check | Result |
|---|---|
| `/favicon.ico` | **200** `image/x-icon` (not 307 to `/en/...`) |
| `/favicon.svg` | **200** |
| `/apple-touch-icon.png` | **200** |
| `/` | **307** → `/fa` |
| `/fa`, `/en` | **200** |
| `/fa/engineering` | **308** → `/fa/technical-center` |
| `/en/engineering` | **308** → `/en/technical-center` |
| `/fa/knowledge` | **308** → `/fa/technical-center` |
| `/fa/tools` | **308** → `/fa/calculator` |
| `/fa/standards` | **308** → `/fa/downloads` |
| `/fa` hreflang | `en` + `fa` + `x-default=/fa` |
| `/fa` icons | shortcut + ico + svg + apple-touch-icon |
| `/fa/request-quote` title | `استعلام قیمت لوله پلی اتیلن \| بوکان پایپ` |
| `robots.txt` | locale-prefixed Disallow present |
| `sitemap.xml` | **94** unique `<loc>` (unchanged count) |

### Production URL note

`https://bukanpipe.com/favicon.ico` will return **200** only **after this build is deployed**. Until then, production still 307s the old missing file.

---

## Explicitly not done (out of A+B / unsafe)

- No slug or IA URL changes
- No page deletions
- No `/solutions` or `/industries` redirects
- No extra WordPress 308s
- No invented LinkedIn / extra social URLs
- No Product `offers` / prices
- `defaultLocale` not flipped globally
- ChatGPT-named OG files not renamed (needs a separate image 308 plan)
- EN twins of four FA-only technical articles not created
