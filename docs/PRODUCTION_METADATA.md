# Production metadata and canonical domain

**Status:** Pre-cutover documentation (Phase 007)  
**Production domain:** Not attached yet — expected `https://bukanpipe.com` or approved official domain at cutover.

## Current staging behavior

| Variable | Staging / Preview | Effect |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Unset on Vercel → falls back to `https://${VERCEL_URL}` | Canonical, OG URL, JSON-LD `@id` use preview hostname |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `false` | `robots: noindex, nofollow` on all pages |
| `ENABLE_LEGACY_REDIRECTS` | `false` (default) | No legacy path redirects in Next config |

Implementation: `lib/config/env.ts` → `siteConfig.siteUrl` → `lib/seo/canonical.ts`.

## Future production configuration

Set in **Production** environment only (not Preview):

```env
NEXT_PUBLIC_SITE_URL=https://bukanpipe.com
NEXT_PUBLIC_ALLOW_INDEXING=true
ENABLE_LEGACY_REDIRECTS=true
```

After cutover:

1. Confirm DNS/host points to Vercel production project.
2. Set `NEXT_PUBLIC_SITE_URL` to the official canonical origin (no trailing slash).
3. Redeploy production.
4. Verify `<link rel="canonical">` and OG URLs use `bukanpipe.com`, not `*.vercel.app`.
5. Enable legacy redirects only after live HTTP 301 smoke pass on production host.
6. Submit sitemap in Search Console for the canonical domain.

## Optional hardening (post-cutover)

- Add `metadataBase: new URL(siteConfig.siteUrl)` in `createRootMetadata()` so relative OG images resolve to the canonical domain.
- Add `NEXT_PUBLIC_CANONICAL_ORIGIN` separate from preview if staging must always show future production URLs in metadata (not recommended for preview — use preview URL for honest QA).

## hreflang note

Alternates are emitted only when both locales have a real page (`lib/i18n/locale-availability.ts`). EN remains partial; do not expand hreflang until EN pages exist.
