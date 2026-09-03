# Search Console Migration Checklist

**Status:** Access **not available** in this phase. Final production migration is **NOT READY** until this checklist is reviewed with live Search Console data.

Search Console is not a blocker for documenting architecture. It **is** a blocker for declaring cutover complete.

Backlink status in the inventory is **UNKNOWN**. Do not invent referring domains.

---

## Before requesting access

- [ ] Confirm which Google account(s) will own `bukanpipe.com` and `bukanpipe.ir`
- [ ] Confirm DNS TXT / HTML file / GA / Google Analytics 4 association options
- [ ] Decide prefix vs domain properties (apex, `www`, `.ir`)

---

## After access (export before changing hosts or robots)

- [ ] Export **indexed pages** (Coverage / Pages) for `https://bukanpipe.com`
- [ ] Export indexed pages for `https://bukanpipe.ir` if a property exists
- [ ] Export **Performance**: queries, pages, countries, devices (16 months if available)
- [ ] Identify **top landing pages** by clicks and impressions
- [ ] Separate **branded** vs **non-branded** queries
- [ ] Note high-impression URLs that are **not** in `data/migration/legacy-urls.ts` and add them
- [ ] Export **sitemaps** submitted historically (legacy `/sitemap.xml` currently **500**)
- [ ] Review **crawl errors**, not-found, server errors, excluded reasons
- [ ] Review **HTTPS** and **page experience** issues if shown
- [ ] List **hreflang / canonical** mismatches if reported
- [ ] Confirm whether `www` and `http` variants have properties or are already folded

---

## Mapping completeness gate

- [ ] Every URL with impressions in the last year has a KEEP / 301 / MERGE / IGNORE / REVIEW decision
- [ ] No high-click URL 301s to the homepage
- [ ] PDF/attachment URLs with impressions have an asset plan
- [ ] `.ir` URLs are covered by host 301 policy, not left as a second property without redirects

---

## Cutover (only with launch approval)

- [ ] Add the new production property / keep domain property
- [ ] Submit the **new** sitemap (`/sitemap.xml` from Next.js), not the broken WP sitemap
- [ ] Use URL Inspection on: `/`, `/products`, `/laboratory`, `/about`, `/standards`, `/products/gas-pipe` (when live), former `/gas-pipe/`
- [ ] Change of Address tool **only** if Google documents it for this host move **and** `.ir` → `.com` is a true site move
- [ ] Monitor Coverage, 404, and redirect errors daily for two weeks, then weekly

---

## This phase’s conclusion

Search Console: **not connected**.  
Final migration: **NOT READY**.
