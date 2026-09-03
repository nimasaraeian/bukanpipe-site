# Host Canonical Policy

**Status:** Documented target — **not implemented**  
**Date:** 2026-09-03  
**Production target:** `https://bukanpipe.com`

Do not change DNS, hosting, or live redirects from this repository. Indexing stays off on the greenfield app.

---

## Observed current behavior (read-only, 2026-09-03)

Evidence sources: HTTP probes, `robots.txt`, WordPress REST (`/wp-json/wp/v2`), RSS `/feed/`. Local `curl` often timed out from this environment; browser/WebFetch succeeded. WordPress version observed: **6.6.7**.

| Probe | Result |
|---|---|
| `http://bukanpipe.com/` | **301** → `https://bukanpipe.com/` |
| `http://www.bukanpipe.com/` | **301** → `https://bukanpipe.com/` |
| `http://bukanpipe.ir/` | **301** → `https://bukanpipe.com/` |
| `http://www.bukanpipe.ir/` | **301** → `https://bukanpipe.com/` |
| `https://bukanpipe.com/` | **200** — primary content host |
| `https://bukanpipe.ir/` | **200** — still serves HTML duplicating `.com` |
| `https://www.bukanpipe.com/` | **UNKNOWN** (probe timed out) |
| `https://www.bukanpipe.ir/` | Not separately confirmed beyond HTTP→`.com` |

### Content host

**`https://bukanpipe.com` currently serves the WordPress site.** REST `link` values are already `https://bukanpipe.com/...` even when requested from the `.ir` REST origin.

### Duplicate-content risk

**High.** `https://bukanpipe.ir/` returns HTML instead of consolidating to `.com`. That is an independent indexable duplicate of the same WordPress content. `.ir` must not remain an independent public website at launch.

HTTP `.ir` already points at `.com`. HTTPS `.ir` does not.

### robots / sitemap

| Host | robots.txt | Sitemap listed | Sitemap fetch |
|---|---|---|---|
| `.com` | Allow `/`; disallow `/wp-admin/` (ajax allowed) | `https://bukanpipe.com/sitemap.xml` | **HTTP 500** |
| `.ir` | Same allow/disallow | Sitemap URL points at **`.com`** | Same broken `.com` sitemap |

`/wp-sitemap.xml` and Yoast-style sitemap paths returned **404**. RSS `/feed/` works and identifies as `.com`, but item GUIDs still include `https://bukanpipe.ir/?p=…` and one leftover `http://localhost/bukan/?p=…`.

### Asset-host dependencies

Media library canonical URLs observed on `.com` (`/wp-content/uploads/…`). RSS still encloses at least one video on **`.ir`**:

`https://bukanpipe.ir/wp-content/uploads/2023/08/air_valve.mp4`

The same file class also exists on `.com`. Cross-host media is a launch-breakage risk if `.ir` is shut down before assets are copied or URLs rewritten. Details: `docs/LEGACY_MEDIA_MIGRATION.md`.

### Canonical tags

Not fully harvested page-by-page (many theme leftover URLs). REST already emits `.com` permalinks. Treat HTTPS `.ir` HTML as duplicate until host 301s exist.

---

## Target policy (eventual production)

**Primary canonical host:** `https://bukanpipe.com` (apex, HTTPS, no `www`).

Intended consolidations, **only after** domain ownership, hosting control, and business/legal approval:

```text
http://bukanpipe.com/*        → 301 https://bukanpipe.com/{path}
http://www.bukanpipe.com/*    → 301 https://bukanpipe.com/{path}
https://www.bukanpipe.com/*   → 301 https://bukanpipe.com/{path}
http://bukanpipe.ir/*         → 301 https://bukanpipe.com/{path}   (already observed for home)
https://bukanpipe.ir/*        → 301 https://bukanpipe.com/{path}
http://www.bukanpipe.ir/*     → 301 https://bukanpipe.com/{path}
https://www.bukanpipe.ir/*    → 301 https://bukanpipe.com/{path}
```

Rules:

- One hop. Do not chain `www` → `http://apex` → `https://apex`.
- Preserve path on host redirects (`/gas-pipe/` on `.ir` becomes the `.com` equivalent, then the path-level mapping in `docs/LEGACY_REDIRECT_MAP.md`).
- Trailing-slash normalization happens on the **canonical host** (new app: no trailing slash except `/`). Combine carefully so host 301 + path 301 is still one hop at the CDN/hosting layer, or accept a single host hop then a single path hop — never three.
- Do not operate `bukanpipe.ir` as a second indexable site.

Query strings: drop WordPress tracking/`utm` unless a specific campaign must survive. `?p={id}` GUIDs should later map to the same destination as that post’s permalink (not implemented in this phase).

---

## Implementation prerequisites (blockers)

Do **not** activate host redirects until all of the following are true:

1. Confirmed control of DNS for `bukanpipe.com` and `bukanpipe.ir` (and `www` records).
2. Confirmed TLS certificates for apex and `www` on both TLDs if those names will receive traffic.
3. Confirmed hosting/CDN where 301s can be set **before** or **at** the application (so the new Next.js origin is not required to answer `.ir`).
4. Business/legal approval that `.ir` may permanently consolidate to `.com`.
5. Media on `.ir` copied or proven identical on `.com` (see media doc).
6. Search Console property coverage for both hosts (see `docs/SEARCH_CONSOLE_MIGRATION_CHECKLIST.md`).
7. Path-level legacy redirects ready and destinations returning 200 (see launch checklist).

This repository’s Next.js `redirects()` only covers **path** mappings on whatever host the app is deployed to. Host/TLD policy belongs in DNS/CDN/hosting. `ENABLE_LEGACY_REDIRECTS` remains **false**.

---

## www / HTTP / HTTPS

| Topic | Current | Target |
|---|---|---|
| HTTP `.com` | Already 301 to HTTPS apex (home confirmed) | Keep; apply to all paths at the edge |
| `www` HTTP `.com` | 301 to HTTPS apex (home confirmed) | Keep for all paths |
| `www` HTTPS `.com` | Unknown | 301 to HTTPS apex |
| Trailing slash | WordPress uses trailing slashes | New app: none except `/` (ADR-012) |

---

## Related

- Path inventory: `data/migration/legacy-urls.ts`
- Path map: `docs/LEGACY_REDIRECT_MAP.md`
- Media: `docs/LEGACY_MEDIA_MIGRATION.md`
