# Legacy Redirect Map

**Status:** Phase 003 inventory — **path redirects are not activated**  
**New URL policy:** no trailing slash except origin `/` (ADR-012)  
**Canonical host (target):** `https://bukanpipe.com` — see `docs/HOST_CANONICAL_POLICY.md`  
**Machine-readable source:** `data/migration/legacy-urls.ts`

Host/www/HTTP consolidations are **not** Next.js path rules. `ENABLE_LEGACY_REDIRECTS` must stay false until destination pages exist, Search Console is reviewed, and domain control is confirmed.

Do not blanket-redirect leftover URLs to the homepage. Theme demos, WooCommerce leftovers, and surveys are `IGNORE_NONINDEXABLE` (prefer **410** at launch, not `/`).

---

## Evidence basis

Preferred sources used, in order:

1. Legacy sitemap — **failed** (`/sitemap.xml` HTTP 500; `wp-sitemap.xml` 404)
2. WordPress REST published pages (43), posts (12), categories (5), PDF media (4)
3. Navigation/theme leftovers visible as published pages
4. Project research (`research/SOURCES.md`)
5. Read-only host probes

HTTP status **200** on HTML records means the resource is a published WordPress object with a public `link`. Live HEAD from some networks timed out; do not treat that as a 404.

Backlinks: **UNKNOWN** on every record. External link analysis is mandatory before production cutover.

---

## Action definitions

| Action | Meaning | Next.js redirect? |
|---|---|---|
| KEEP | Preserve the old path on the new site | No |
| REBUILD | Same intent rebuilt; 301 only if the path changes | Yes, if path changes |
| REDIRECT_301 | One-to-one move to a new IA path | Yes (disabled) |
| MERGE | Many-to-one onto an existing owner URL | Yes (disabled) |
| REVIEW | Decision blocked (assets, hosts, broken sitemap) | No |
| IGNORE_NONINDEXABLE | Not a public content destination | No — do not 301 to `/` |

Never use DELETE without saying why. IGNORE is the closest instruction: drop indexability, return 410, do not send equity to the homepage.

---

## Classification summary

Counts are unique inventory records in `legacy-urls.ts` (including four PDF files, five archives, feed, sitemap, and the `.ir` host row).

| Action | Count (approx.) | Typical examples |
|---|---|---|
| KEEP | 2 | `/`, `/standards` |
| REBUILD | 1 | `/articles/` → `/knowledge` |
| REDIRECT_301 | 12 | `/gas-pipe/` → `/products/gas-pipe` |
| MERGE | 35 | Timeline/team/certs/categories → owner hubs |
| REVIEW | 6 | PDFs, broken sitemap, `https://bukanpipe.ir/` |
| IGNORE_NONINDEXABLE | 15 | Shop, theme demos, polls, RSS |

---

## Same-URL vs 301 (high-value)

Do not move a URL only because the new tree is tidier.

| Legacy | Decision | Why |
|---|---|---|
| `/` | **KEEP** | Brand/home equity. Rebuild content; same path. |
| `/standards/` | **KEEP** | Already matches the new hub slug. Moving would discard a clean URL for no IA gain. |
| `/gas-pipe/` | **301** `/products/gas-pipe` | Product family belongs in the catalog. Legacy slug is valuable but inconsistent with `/products/{family}`. One hop, only after that page exists and gas production is verified. |
| `/qc-and-laboratory/` | **301** `/laboratory` | Awkward slug; `/laboratory` is the approved owner. |
| `/about_us/` | **301** `/about` | Underscore slug is poor; `/about` is the IA owner. |
| `/contact-us/` | **301** `/contact` | Hyphenated contact slug → shorter IA path. |
| `/welding/` | **301** `/engineering/welding` | Engineering owns educational welding intent. |
| `/temp-cooficient/` | **301** `/engineering/pn` | Misspelled slug; educational PN/temperature, **not** a tool. |
| `/pipeline_design/` | **301** `/tools` | Calculator intent. Hub until specific tools ship. |
| `/lab-scope/` | **301** `/laboratory/tests` | Test catalog. Do not copy Rial prices. |
| `/iso-iec17025/` | **MERGE** `/laboratory/accreditation` | Explainer + implied cert; not proof of current 17025. |
| `/air-vent-valve/` | **301** `/knowledge/air-vent-valve` | Supporting article; Knowledge leftover intent. |
| Water/sewer/drainage post | **301** `/products/water-pipe` | Primary recoverable intent is water. Sewer remains unverified — do not treat this as sewer-product confirmation. |
| Drip irrigation post | **301** `/products/irrigation-pipe` | Product family candidate. |
| Subsurface irrigation post | **301** `/applications/irrigation` | Application intent. **Not** `/applications/agriculture`. |

`/products/pe100` has **no discovered legacy URL**. It stays PLANNED / REQUIRES RESEARCH. Do not invent a redirect onto it.

---

## Proposed path redirects (disabled)

Derived at runtime by `lib/migration/redirects.ts` from REDIRECT_301, MERGE, and path-changing REBUILD. Both `/slug` and `/slug/` sources map to the **same** final destination (no slash chain).

### Products / applications

| Old path | New path |
|---|---|
| `/gas-pipe/` | `/products/gas-pipe` |
| `/لوله-های-پلی-اتیلن-آبرسانی/` | `/products/water-pipe` |
| `/آبیاری-قطرهای-روشهای-آبیاری-موضعی-localized/` | `/products/irrigation-pipe` |
| `/آبیاری-زیرسطحی/` | `/applications/irrigation` |
| `/category/محصولات/` | `/products` |

### Laboratory / standards / tools / knowledge

| Old path | New path |
|---|---|
| `/qc-and-laboratory/` | `/laboratory` |
| `/lab-scope/` | `/laboratory/tests` |
| `/iso-iec17025/` | `/laboratory/accreditation` |
| `/training/` | `/laboratory` |
| `/خط-مشی-کیفیت-آزمایشگاه/` | `/laboratory` |
| `/pipeline_design/` | `/tools` |
| `/articles/` | `/knowledge` |
| `/welding/` | `/engineering/welding` |
| `/temp-cooficient/` | `/engineering/pn` |
| `/air-vent-valve/` | `/knowledge/air-vent-valve` |
| `/category/blog/` | `/knowledge` |
| `/category/مقالات/` | `/knowledge` |

### Identity

| Old path | New path |
|---|---|
| `/about_us/` | `/about` |
| `/contact-us/` | `/contact` |
| `/policy/` | `/about` |
| `/certs/` | `/about` |
| Timeline, team, slogan, testimonial pages | `/about` |
| Project teasers | `/projects` |

Exact Persian paths live in `data/migration/legacy-urls.ts`. Do not retype them by memory in implementation.

---

## Trailing slash, query, chains

- Legacy WordPress: trailing slash. New app: none.
- Each mapping emits both source variants → one destination (one hop).
- Query parameters are **not** preserved by default. Future `?p={wordpressId}` maps can use the `wordpressId` field; not activated.
- Validator rejects redirect-to-self, duplicate sources, conflicting destinations, chains among known mappings, loops, invalid destinations, and homepage dumps.

---

## Activation prerequisites

1. Destination URLs exist as real pages (not only planned strings). Planned children such as `/products/gas-pipe` are **not** App Router routes yet — enabling redirects now would 404.
2. `ENABLE_LEGACY_REDIRECTS=true` only on the production cutover plan, never on preview while indexing is off and destinations are shells.
3. Host policy implemented at DNS/CDN, not by pointing this app at two public hosts.
4. Search Console + crawl of leftovers complete (`docs/SEO_MIGRATION_LAUNCH_CHECKLIST.md`).

---

## Tool vs engineering (permanent)

A **tool page** owns calculator/action intent (example: `/tools/pressure-loss`).  
An **engineering page** owns educational intent (example: `/engineering/pressure-loss`).  
They may link to each other. They must not duplicate primary content. Same split for pipe sizing, flow, weight, SDR/PN helpers, and future calculators.

Current planned tool slugs remain `/tools/pipe-sizing` and `/tools/pressure-loss` (not `*-calculator`).

---

## PE100

No legacy permalink for PE100 was discovered. `/products/pe100` stays **PLANNED / REQUIRES RESEARCH**. Do not 301 anything there until the factory confirms relevant PE100 products and a standalone URL will not cannibalize family pages.
