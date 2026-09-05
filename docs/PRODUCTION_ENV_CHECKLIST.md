# Production Environment Checklist

**Target domain:** `https://bukanpipe.com` (not attached in Phase 009)

## Staging (current — bukanpipe.vercel.app)

```bash
NEXT_PUBLIC_SITE_URL=https://bukanpipe.vercel.app
NEXT_PUBLIC_ALLOW_INDEXING=false
ENABLE_LEGACY_REDIRECTS=false
```

| Check | Expected |
|---|---|
| robots.txt | `Disallow: /` |
| Page robots meta | `noindex, nofollow` |
| Canonical URLs | `https://bukanpipe.vercel.app/...` |
| Legacy redirects | Off — bare `/gas-pipe` → locale prefix only |

## Production cutover (when approved — do not enable yet)

```bash
NEXT_PUBLIC_SITE_URL=https://bukanpipe.com
NEXT_PUBLIC_ALLOW_INDEXING=true
ENABLE_LEGACY_REDIRECTS=true
```

| Check | Expected |
|---|---|
| robots.txt | `Allow: /`, sitemap URL on bukanpipe.com |
| Page robots meta | `index, follow` (except 404, design-system) |
| metadataBase / canonical / OG / hreflang | All `https://bukanpipe.com` — **no** `*.vercel.app` |
| Legacy bare URLs | 308 → `/fa/...` in one hop |
| x-default hreflang | Points to FA URLs |

## Preview deployments (PR branches)

```bash
# Do NOT set NEXT_PUBLIC_SITE_URL to production
NEXT_PUBLIC_ALLOW_INDEXING=false
ENABLE_LEGACY_REDIRECTS=false
```

If `NEXT_PUBLIC_SITE_URL` is unset, origin falls back to `https://${VERCEL_URL}` for preview-only canonicals. Indexing remains blocked by `NEXT_PUBLIC_ALLOW_INDEXING=false`.

## Indexing safety

Indexing requires **both**:

1. `NEXT_PUBLIC_ALLOW_INDEXING=true`
2. Production domain attached with correct `NEXT_PUBLIC_SITE_URL`

`app/robots.ts` and `createPageMetadata()` read `siteConfig.allowIndexing` from env at build time.

## Redirect QA (isolated)

Enable `ENABLE_LEGACY_REDIRECTS=true` on a **dedicated preview** only. Never enable on default staging until cutover.

## Verification commands

```bash
curl -sI https://bukanpipe.vercel.app/robots.txt
curl -sI https://bukanpipe.vercel.app/fa | grep -i robots
curl -sI https://bukanpipe.vercel.app/sitemap.xml
```

With redirects enabled on QA preview:

```bash
curl -sI https://<preview>/gas-pipe
# Expect: 308 Location: /fa/products/gas-pipe
```
