# Legacy Redirect Map (updated)

**Inventory:** `data/migration/legacy-urls.ts`  
**Engine:** `lib/migration/legacy-resolver.ts` (rule table in `lib/migration/redirects.ts`)  
**Enable in production:** `ENABLE_LEGACY_REDIRECTS=true`

## How a request is resolved

`resolveLegacyRequest(pathname, searchParams)` returns one of three outcomes,
in this order. Middleware is the only caller.

1. **410 for spam parameters.** A request carrying `LOSS` or `Male` is gone on
   any path, checked ahead of every redirect including the canonical-host hop,
   so an injected URL is never rewritten into a real one first. This one does
   not wait for `ENABLE_LEGACY_REDIRECTS`.
2. **Nothing, when a path addresses a file** (`/wp-content/**.pdf`), except
   `/index.php`. Those keep whatever the static layer answers.
3. **410 for deleted pages** — the `IGNORE_NONINDEXABLE` rows, which are theme
   demos, WooCommerce scaffolding, surveys and the WordPress feed. They are
   never 301'd to the homepage; that is a soft 404.
4. **Exact rows**, then **`?p=` / `?page_id=`** keyed by the inventory's own
   `wordpressId`, then **prefix patterns** (longest first). Exact beats pattern,
   so `/category/محصولات` keeps `/products` instead of falling into
   `/category/*` → `/technical-center`.

Every redirect is 308, single-hop, and matches both slash forms. Persian
permalinks arrive percent-encoded and are decoded before matching.

Unmapped paths are left alone: `/wp-admin`, `/wp-includes`, `/wp-content`,
`/wp-json` and anything addressing a file skip the locale hop so they 404
directly rather than spending a 308 to reach the same 404.

### Not implemented

The `irantech` query-string rows from the draft map are not here — no record of
those parameters exists in the repo, and they are not derivable from the
inventory. They need the original row data before they can be written.

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
