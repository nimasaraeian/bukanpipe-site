# Legacy Redirect Smoke Test — Phase 006

**Date:** 2026-09-03  
**Environment:** Local rule-map validation (not production)  
**Flag tested:** `ENABLE_LEGACY_REDIRECTS=true` (simulated via `buildLegacyRedirectRules()` — production flag remains **disabled**)

## Method

1. Verified redirect inventory integrity (`lib/migration/validate.test.ts`).
2. Ran high-value smoke cases against derived rules (`lib/migration/redirect-smoke.test.ts`).
3. Confirmed `getNextLegacyRedirects()` returns **empty array** when `ENABLE_LEGACY_REDIRECTS` is unset (default safe state).

Live HTTP 301 testing was **not** run against a deployed host in this phase. Rule-map tests confirm single-hop destinations that match implemented FA routes.

## High-value cases — PASS

| Legacy source | Expected destination | Status |
|---|---|---|
| `/pipeline_design` | `/calculator/pipeline-design` | PASS |
| `/welding` | `/technical-center/polyethylene-pipe-welding` | PASS |
| `/temp-cooficient` | `/technical-center/polyethylene-pipe-temperature-pressure` | PASS |
| `/air-vent-valve` | `/technical-center/air-vent-valve` | PASS |
| `/iso-iec17025` | `/laboratory/iso-17025` | PASS |
| `/lab-scope` | `/laboratory/test-scope` | PASS |
| `/qc-and-laboratory` | `/laboratory` | PASS |
| `/about_us` | `/about` | PASS |
| `/policy` | `/about` | PASS |
| `/certs` | `/about` | PASS |
| `/contact-us` | `/contact` | PASS |
| `/gas-pipe` | `/products/gas-pipe` | PASS |
| `/standards` | `/downloads` | PASS |
| `/training` | `/laboratory` | PASS |

## Additional checks — PASS

- No high-value source redirects to homepage (`/`).
- No redirect loops detected among derived rules.
- Trailing-slash variants emit the same destination (covered in `validate.test.ts`).

## Inventory notes

| Documented path | Inventory reality |
|---|---|
| `/quality-policy/` → `/quality` | Legacy URL is `/policy/` → `/about` (MERGE). FA `/quality` is a new canonical page, not a redirect target. |
| `/certificates/` → `/certifications` | Legacy gallery is `/certs/` → `/about` (MERGE). `/certifications` is new IA. |
| `/downloads/` → `/downloads` | No standalone `/downloads` legacy HTML path in inventory; `/standards` redirects to `/downloads`. |
| `/tools` → `/calculator` | Implemented as in-app stub redirect in app router; not in WordPress redirect inventory. |

## Production state after test

- `ENABLE_LEGACY_REDIRECTS` **not** enabled in `.env` or deployment config.
- `next.config.ts` redirects remain empty in default dev/prod until flag is explicitly set.

## Recommended pre-deploy step

After staging deploy, run manual curl checks:

```bash
curl -I https://staging.example/fa/gas-pipe/
curl -I "https://staging.example/fa/pipeline_design?foo=1"
```

Expect single `301` to locale-prefixed canonical paths (host/locale policy TBD at deploy).
