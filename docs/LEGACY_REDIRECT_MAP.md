# Legacy Redirect Map (updated)

The historical URL map has **two layers**. The inventory is the base and wins;
the CSV only ever adds.

| Layer | Source | Engine | Gate |
|---|---|---|---|
| Base | `data/migration/legacy-urls.ts` (Phase-002 inventory) | `lib/migration/redirects.ts` | `ENABLE_LEGACY_REDIRECTS` — **true in production** |
| Additions | `redirect-map-draft.csv` (248 rows) → `data/migration/redirect-map.ts` | `lib/migration/legacy-resolver.ts` | always on |

`npm run redirects:build` compiles the CSV; middleware runs on the edge and
cannot read a file per request. `redirect-map.test.ts` re-runs the compiler
with `--check`, so the CSV and the module cannot drift.

## Overlap between the two layers

`data/migration/redirect-conflicts.json` records every path present in both.
**There are no open conflicts.** All 52 shared paths were ruled on 2026-09-21
and the ruling written into the inventory, so the inventory serves every one of
them and the CSV rows for them are skipped.

Each entry carries its `winner`:

- **43 `agreed`** — the inventory now returns what the CSV asks for. 21 already
  did; 22 were changed by the ruling.
- **9 `inventory`** — the CSV asked for something else and was overruled. The
  entry keeps `csvWanted` so the rejected value stays on record.

### What the ruling changed

| Path | Was | Now |
|---|---|---|
| `/certs` | `/fa/about` | `/fa/certifications` |
| `/policy` | `/fa/about` | `/fa/quality` |
| `/training` | `/fa/laboratory` | `/fa/laboratory/training` |
| `/shop` | soft 404 | `/fa/products` |
| `/آخرین-نوشته-ها` | soft 404 | `/fa/technical-center` |
| `/category/تبلیغات` | `/fa/technical-center` | **410** |
| `/category/blog/برندینگ` | `/fa/about` | **410** |
| 15 author / theme-demo pages | `/fa/about` | **410** |
| `/customer-poll`, `/lab-poll` | soft 404 | **410** |

The last row is the reason `IGNORE_NONINDEXABLE` is now honoured:
`resolveInventoryOutcome()` answers 410 for those rows instead of letting them
fall through to the locale hop and a soft 404. Rows addressing a file are
excluded and stay with the static layer.

### What the ruling kept

`/pipeline_design` (`/fa/calculator/pipeline-design`), `/lab-scope`
(`/fa/laboratory/test-scope`), `/standards` (`/fa/downloads`),
`/خط-مشی-کیفیت-آزمایشگاه` (`/fa/laboratory`), `/آبیاری-زیرسطحی`
(`/fa/applications/agriculture-irrigation`), `/category/blog`
(`/fa/technical-center`) and `/بلوک-ریکاردو` (`/fa/projects`) keep their
inventory destinations; the CSV wanted something different for each.

The test recomputes the whole overlap from the inventory and the CSV and fails
if this file stops describing reality — including if a future edit reopens a
conflict.

## How a request is resolved

`resolveLegacyRequest(pathname, searchParams)` returns redirect, gone, or null
(null = not ours, carry on). Order:

1. **410 for spam parameters.** `LOSS` or `Male` on any path, checked ahead of
   every redirect including the canonical-host hop, so an injected URL is never
   rewritten into a real one first.
2. **The inventory**, so the live base layer outranks every addition.
3. **Exact CSV rows**, decoded and trailing-slash-insensitive.
4. **Query rows** — the irantech CMS front controllers
   (`temp.php?irantech_cms=`, `product2/detail.php?ID=`) and
   `/?download=catalog`. Anything else on a `temp.php` path answers 410 rather
   than guessing.
5. **Wildcard rows**, longest source first.

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

### Rows not implemented for structural reasons

| CSV row | Why |
|---|---|
| L43 `/fa/products/irrigation-pipe` | Source and destination are the same live route — implementing it would be a redirect loop. It already answers 200. |
| L91 `/about/` | The locale redirect already reaches `/fa/about` in one hop. |
| L92 `/contact/` | The locale redirect already reaches `/fa/contact` in one hop. |

All skipped rows — structural, conflicting and already-covered — carry their
reason in `SKIPPED_ROWS` in the compiled map, so the count stays auditable.

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
