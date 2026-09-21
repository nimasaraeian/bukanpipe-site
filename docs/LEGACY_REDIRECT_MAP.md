# Legacy Redirect Map (updated)

**Map (source of truth):** `redirect-map-draft.csv` at the repo root — 248 rows  
**Compiled to:** `data/migration/redirect-map.ts` (`npm run redirects:build`)  
**Engine:** `lib/migration/legacy-resolver.ts`, called only from `middleware.ts`  
**Always on** — the map is not gated on `ENABLE_LEGACY_REDIRECTS`, which now
covers only the older `data/migration/legacy-urls.ts` inventory.

Middleware runs on the edge and cannot read a file per request, so the CSV is
compiled to a module. Edit the CSV, run `npm run redirects:build`, commit both.
`redirect-map.test.ts` re-runs the compiler with `--check` and fails if they
have drifted.

## How a request is resolved

`resolveLegacyRequest(pathname, searchParams)` returns redirect, gone, or null
(null = not ours, carry on). Order:

1. **410 for spam parameters.** `LOSS` or `Male` on any path, checked ahead of
   every redirect including the canonical-host hop, so an injected URL is never
   rewritten into a real one first.
2. **Exact rows**, decoded and trailing-slash-insensitive.
3. **Query rows** — the irantech CMS front controllers (`temp.php?irantech_cms=`,
   `product2/detail.php?ID=`) and `/?download=catalog`. Anything else on a
   `temp.php` path answers 410 rather than guessing.
4. **Wildcard rows**, longest source first.

Exact beats wildcard, so `/index.php/fa/products/irrigation-pipe` keeps its own
destination instead of collapsing into `/index.php/fa/products/*`.

Every redirect is **308**, single-hop, and matches both slash forms. Persian and
Arabic permalinks arrive percent-encoded and are decoded before matching.

A row matched **by its query string** drops that query on the way out: the
legacy parameter means nothing on the new page, and carrying it across would
mint an indexable duplicate of the page being consolidated onto. A row matched
by path keeps its query, so `utm_*` tags survive.

The map is consulted **before** locale routing, because many historical URLs are
themselves locale-prefixed (`/fa/qc/tech/...`, `/en/contact-us`, `/ar/news`).

### Not redirected

`/wp-admin`, `/wp-includes`, `/wp-content`, `/wp-json` and anything addressing a
file skip the locale hop, so they keep their own 404 instead of spending a 308
to reach the same 404. Mapped rows that address a file (`/about.htm`,
`/index.php`, `/sitemap.html`) are matched first and are unaffected.

### Rows deliberately not implemented

| CSV row | Why |
|---|---|
| L43 `/fa/products/irrigation-pipe` | Source and destination are the same live route — implementing it would be a redirect loop. It already answers 200. |
| L91 `/about/` | The locale redirect already reaches `/fa/about` in one hop. |
| L92 `/contact/` | The locale redirect already reaches `/fa/contact` in one hop. |

These are listed in `SKIPPED_ROWS` in the compiled map, so the count stays
auditable rather than silently dropped.

## High-priority redirects (updated for content phase)

| Legacy path | New canonical path |
|---|---|
| `/pipeline_design` | `/calculator/pipeline-design` |
| `/pipeline_design/*` | `/calculator/pipeline-design` |
| `/welding/` | `/technical-center/polyethylene-pipe-welding` |
| `/temp-cooficient/` | `/technical-center/polyethylene-pipe-temperature-pressure` |
| `/air-vent-valve/` | `/technical-center/air-vent-valve` |
| `/iso-iec17025/` | `/laboratory/iso-17025` |
| `/lab-scope/` | `/laboratory/test-scope` |
| `/qc-and-laboratory/` | `/laboratory` |
| `/training/` | `/laboratory/training` |
| `/about_us/` | `/about` |
| `/quality-policy/` | `/quality` |
| `/certificates/` | `/certifications` |
| `/contact-us/` | `/contact` |
| `/gas-pipe/` | `/products/gas-pipe` |
| Water product legacy | `/products/water-supply-pipe` |
| `/downloads/` | `/downloads` |
| `/standards/` (legacy downloads) | `/downloads` |
| `/articles/`, blog pages | `/technical-center` or specific article |
| `/engineering/*` | `/technical-center/*` (topic-specific where mapped) |
| `/knowledge/*` | `/technical-center/*` |
| `/tools` | `/calculator` |
| `/applications/irrigation` | `/applications/agriculture-irrigation` |

## Multi-intent legacy pages

When one WordPress page mixed intents, redirect to **primary successor**:

- Combined sewage/drainage article → `/products/sewage-pipe` or `/applications/sewage` (context-dependent entry in inventory)
- Gas product content that was blog-shaped → `/products/gas-pipe`

## Not redirected to fake SEO pages

| Legacy | Destination | Reason |
|---|---|---|
| Water projects | `/projects` | No case study data |
| Gas projects | `/projects` | No case study data |
| Attachment-only URLs | null / CDN policy | Not in path redirect table |

## Stale Phase 002 paths (still in app, redirect when enabled)

| Old proposed path | New path |
|---|---|
| `/products/water-pipe` | `/products/water-supply-pipe` |
| `/laboratory/accreditation` | `/laboratory/iso-17025` |
| `/laboratory/tests` | `/laboratory/test-scope` |

## Deployment note

Redirects are **empty until** `ENABLE_LEGACY_REDIRECTS=true` **and** destination pages exist. This phase implements destinations; enable flag after production review.

See also: `docs/CONTENT_MIGRATION_MAP.md`, `docs/SEO_KEYWORD_MAP.md`.
