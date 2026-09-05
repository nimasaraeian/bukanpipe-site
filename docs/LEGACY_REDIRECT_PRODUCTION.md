# Legacy Redirect Production Architecture

**Phase:** 009  
**Status:** Implemented — **disabled by default** (`ENABLE_LEGACY_REDIRECTS=false`)

## Problem

Bare legacy WordPress paths (e.g. `/gas-pipe`, `/welding`, `/pipeline_design`) were intercepted by locale middleware **before** `next.config` redirects executed:

```
/gas-pipe → middleware 307 → /en/gas-pipe → 404
```

## Solution

Legacy redirect decisions now run **inside middleware**, **before** generic locale prefix routing.

| Layer | Role |
|---|---|
| `middleware.ts` | Runtime owner — resolves legacy path → single 308 to `/fa{destination}` |
| `lib/migration/redirects.ts` | Single source of truth (`buildLegacyRedirectRules`, `resolveLegacyRedirect`) |
| `next.config.ts` | **Does not** duplicate legacy redirects (`getNextLegacyRedirects()` returns `[]`) |

## Canonical destination policy

- Legacy URLs always redirect to **FA** (`/fa/...`) — the primary published catalog.
- One hop only — no chains, no loops.
- Modern locale-prefixed routes (`/fa/...`, `/en/...`) are unaffected.
- Unknown paths still fall through to locale middleware or 404.

## Environment flag

```bash
ENABLE_LEGACY_REDIRECTS=true   # enable only for redirect QA or production cutover
ENABLE_LEGACY_REDIRECTS=false  # default — staging, preview, local
```

## Representative routes (when enabled)

| Legacy source | Canonical destination |
|---|---|
| `/gas-pipe` | `/fa/products/gas-pipe` |
| `/لوله-های-پلی-اتیلن-آبرسانی` | `/fa/products/water-supply-pipe` |
| `/welding` | `/fa/technical-center/polyethylene-pipe-welding` |
| `/pipeline_design` | `/fa/calculator/pipeline-design` |
| `/standards` | `/fa/downloads` |
| `/qc-and-laboratory` | `/fa/laboratory` |
| `/about_us` | `/fa/about` |
| `/contact-us` | `/fa/contact` |

Full inventory: `data/migration/legacy-urls.ts`

## Tests

- `lib/migration/redirect-smoke.test.ts` — rule map integrity
- `lib/migration/legacy-runtime.test.ts` — resolver, FA prefix, no loops, disabled-by-default

## QA procedure (isolated preview)

1. Set `ENABLE_LEGACY_REDIRECTS=true` on a **preview** deployment only.
2. Verify bare legacy paths return **308** directly to `/fa/...` (not `/en/...`).
3. Confirm no redirect chains (`curl -I -L` max 1 redirect).
4. Disable flag before merging to default staging.

## Production cutover gate

**LEGACY_REDIRECTS_READY = YES** (architecture) — enable flag only after host cutover checklist.
