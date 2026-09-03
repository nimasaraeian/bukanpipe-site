# Legacy Redirect Map (updated)

**Inventory:** `data/migration/legacy-urls.ts`  
**Engine:** `lib/migration/redirects.ts`  
**Enable in production:** `ENABLE_LEGACY_REDIRECTS=true`

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
