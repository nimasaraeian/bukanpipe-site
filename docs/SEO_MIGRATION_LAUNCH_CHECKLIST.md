# SEO Migration Launch Checklist

**Status:** Prepared for a future launch. Nothing here authorizes production deploy, indexing, or live redirects.

Indexing remains `NEXT_PUBLIC_ALLOW_INDEXING=false` until explicit approval.

---

## Pre-launch

### Crawl and inventory

- [ ] Recrawl the live legacy site (full, not REST-only) and diff against `data/migration/legacy-urls.ts`
- [ ] Add any Search Console / analytics URLs missing from the inventory
- [ ] Recrawl staging of the new site
- [ ] Confirm mapping completeness: every valuable URL has KEEP / REBUILD / 301 / MERGE / REVIEW / IGNORE
- [ ] No blanket 301 to `/`
- [ ] Prefer 410 for WooCommerce leftovers and theme demos

### Canonical / robots / sitemap

- [ ] Production origin is `https://bukanpipe.com` (no preview host in canonicals)
- [ ] `www` / HTTP / `.ir` host policy live at DNS/CDN (`docs/HOST_CANONICAL_POLICY.md`)
- [ ] One hop where possible; no redirect loops
- [ ] Trailing-slash behavior matches ADR-012
- [ ] `robots.txt` allows indexing **only** after approval; staging stays noindex
- [ ] New sitemap lists only launch-indexable URLs with real content
- [ ] Plan to **remove noindex** (`NEXT_PUBLIC_ALLOW_INDEXING=true`) as a dedicated launch step, not earlier
- [ ] Legacy broken `/sitemap.xml` (HTTP 500) is not submitted

### Redirects and metadata

- [ ] Destination pages for 301s return 200 with real content (not development shells)
- [ ] `ENABLE_LEGACY_REDIRECTS=true` only at cutover, after a staging test of the same map
- [ ] Sample 301s: `/gas-pipe` → `/products/gas-pipe`, `/about_us` → `/about`, `/qc-and-laboratory` → `/laboratory`, `/standards` stays
- [ ] Encoded Persian slugs resolve
- [ ] No redirect-to-self, no chains in the map (`npm test` migration suite)
- [ ] Title / meta / canonical / Open Graph QA on hub URLs
- [ ] Structured data emits only verified fields
- [ ] Images: no leftover `.ir` asset URLs; certificates not shown unless valid
- [ ] Internal links use new IA paths, not WordPress slugs

### 404 / DNS / measurement

- [ ] Spot-check IGNORE URLs (shop, theme demos) — 410 or 404, not soft-404 homepage
- [ ] DNS and TLS for apex, `www`, `.ir` as required by host policy
- [ ] Search Console access completed (`docs/SEARCH_CONSOLE_MIGRATION_CHECKLIST.md`)
- [ ] Analytics property on the production origin
- [ ] Conversion tracking for RFQ / contact / lab request defined (implementation may be a later phase)

---

## Launch

- [ ] Deploy production
- [ ] Confirm indexing flag is the approved value
- [ ] Test host redirects (HTTP, www, `.ir`)
- [ ] Test path redirects (enabled map)
- [ ] Verify canonical host in HTML
- [ ] Verify robots.txt
- [ ] Submit new sitemap
- [ ] URL Inspection on key URLs (home, products, laboratory, about, standards, gas pipe)

---

## Post-launch

- [ ] Crawl production; compare to staging
- [ ] Monitor 404 / 410 vs unexpected losses
- [ ] Monitor indexing (Coverage)
- [ ] Monitor organic traffic and branded vs non-branded queries
- [ ] Monitor rankings for gas, laboratory, standards, manufacturer queries **without inventing numbers here**
- [ ] Monitor redirect hits and loops in logs/CDN
- [ ] Compare old vs new landing pages for top Search Console URLs
- [ ] Re-run backlink review when a provider is available (currently UNKNOWN)

---

## Explicitly out of scope until approved

Design system, homepage visual design, commercial page build-out, RFQ backend, live dealer verification, database, production DNS edits from this repo, enabling indexing during development.
