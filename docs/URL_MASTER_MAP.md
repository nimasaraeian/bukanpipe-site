# URL Master Map

**Status:** Phase 002  
**Canonical host (approved production target):** `https://bukanpipe.com`  
Host/www/HTTP consolidations are documented in `docs/HOST_CANONICAL_POLICY.md` and are **not** activated.  
**Trailing slash:** none except origin `/` (ADR-012)  
**Indexing now:** blocked (`NEXT_PUBLIC_ALLOW_INDEXING=false`). Preview/staging must stay noindex.

Status values:

- **LIVE FOUNDATION** — App Router page exists as a development shell
- **PLANNED** — Specified; not built
- **DEFERRED** — Must not be implemented yet

Sitemap rule: only **LIVE FOUNDATION** URLs with `includeInSitemap: true` appear in `app/sitemap.ts`. PLANNED and DEFERRED URLs are excluded even though they are specified here.

Indexability at launch assumes real content has replaced the shell and launch indexing has been approved.

| URL | Page type | Status | Search intent | Parent | Index at launch | Primary CTA | Business verification required | Notes |
|---|---|---|---|---|---|---|---|---|
| `/` | Hub | LIVE FOUNDATION | Brand / manufacturer mixed | — | Yes | REQUEST_QUOTE | Claims on homepage | Position → proof → route → convert |
| `/products` | Hub | LIVE FOUNDATION | Commercial category | `/` | Yes | REQUEST_QUOTE | Product master | No family listed until verified |
| `/products/gas-pipe` | Product family | PLANNED | Product | `/products` | Yes, if verified | REQUEST_QUOTE | **Yes** — production, standards, approvals | Legacy `/gas-pipe/` exists |
| `/products/water-pipe` | Product family | PLANNED | Product | `/products` | Yes, if verified | REQUEST_QUOTE | **Yes** | Candidate |
| `/products/irrigation-pipe` | Product family | PLANNED | Product | `/products` | Yes, if verified | REQUEST_QUOTE | **Yes** | Candidate |
| `/products/pe100` | Product family | PLANNED | Product | `/products` | Yes, if verified | REQUEST_QUOTE | **Yes** — PE100 actually produced | Do not launch as fact yet |
| `/products/sewer-pipe` | Product family | PLANNED | Product | `/products` | Only if verified | REQUEST_QUOTE | **Yes** | Do not build otherwise |
| `/applications` | Hub | LIVE FOUNDATION | Application cluster | `/` | Yes | VIEW_PRODUCT | Sector relevance | Independent of catalog |
| `/applications/water-supply` | Application | PLANNED | Application | `/applications` | Yes, if verified | VIEW_PRODUCT | **Yes** | Not a spec sheet |
| `/applications/agriculture` | Application | PLANNED | Application | `/applications` | Yes, if verified | VIEW_PRODUCT | **Yes** | Regional vertical |
| `/applications/irrigation` | Application | PLANNED | Application | `/applications` | Conditional | VIEW_PRODUCT | **Yes** | Merge if thin |
| `/applications/gas-distribution` | Application | PLANNED | Application | `/applications` | Yes, if verified | VIEW_PRODUCT | **Yes** | Product URL owns SKU intent |
| `/applications/industrial` | Application | PLANNED | Application | `/applications` | Only if verified | VIEW_PRODUCT | **Yes** | |
| `/applications/sewage` | Application | PLANNED | Application | `/applications` | Only if verified | VIEW_PRODUCT | **Yes** | |
| `/engineering` | Hub | LIVE FOUNDATION | Technical | `/` | Yes | VIEW_PRODUCT | Sources for guides | Evergreen |
| `/engineering/sdr` | Guide | PLANNED | Informational | `/engineering` | Yes | VIEW_PRODUCT | Cite sources | |
| `/engineering/pn` | Guide | PLANNED | Informational | `/engineering` | Yes | VIEW_PRODUCT | Cite sources | Owns فشار کاری |
| `/engineering/pe80-vs-pe100` | Guide | PLANNED | Comparison | `/engineering` | Yes | VIEW_PRODUCT | Cite sources | Not the PE100 product URL |
| `/engineering/pipe-sizing` | Guide | PLANNED | Informational | `/engineering` | Yes | USE_TOOL | Cite sources | Twin of sizing tool |
| `/engineering/pressure-loss` | Guide | PLANNED | Informational | `/engineering` | Yes | USE_TOOL | Cite sources | Twin of loss tool |
| `/engineering/welding` | Guide | PLANNED | Informational | `/engineering` | Yes | VIEW_PRODUCT | Cite sources | Includes fusion methods |
| `/engineering/installation` | Guide | PLANNED | Informational | `/engineering` | Yes | VIEW_PRODUCT | Cite sources | |
| `/laboratory` | Hub | LIVE FOUNDATION | Quality / lab | `/` | Yes | REQUEST_LAB_TEST | Accreditation + scope | Dual trust/service |
| `/laboratory/services` | Service | PLANNED | Service | `/laboratory` | Yes, if offered | REQUEST_LAB_TEST | **Yes** | External work |
| `/laboratory/tests` | Index | PLANNED | Technical / service | `/laboratory` | Yes, if scope known | REQUEST_LAB_TEST | **Yes** | No fake test list |
| `/laboratory/tests/[slug]` | Test | PLANNED | Technical / service | `/laboratory/tests` | Per verified test | REQUEST_LAB_TEST | **Yes — each test** | Do not prebuild OIT/MFI/etc. |
| `/laboratory/accreditation` | Proof | PLANNED | Trust | `/laboratory` | Yes, if current cert | REQUEST_LAB_TEST | **Yes** | |
| `/laboratory/request-test` | Conversion | PLANNED | Conversion | `/laboratory` | Yes, if service real | REQUEST_LAB_TEST | **Yes** | |
| `/projects` | Hub | LIVE FOUNDATION | Trust | `/` | Yes | REQUEST_QUOTE | Permission + facts | Empty until evidence |
| `/projects/[slug]` | Case study | PLANNED | Trust | `/projects` | Per verified record | REQUEST_QUOTE | **Yes** | No invented cases |
| `/standards` | Hub | LIVE FOUNDATION | Trust / technical | `/` | Yes | VIEW_STANDARD | Code list | |
| `/standards/[code]` | Standard | PLANNED | Technical | `/standards` | Per verified code | VIEW_PRODUCT | **Yes** | |
| `/knowledge` | Hub | LIVE FOUNDATION | Informational support | `/` | Yes | VIEW_PRODUCT | Editorial quality | Must not steal core intents |
| `/knowledge/[slug]` | Article | PLANNED | Informational | `/knowledge` | Per quality article | VIEW_PRODUCT | Source + unique value | |
| `/pricing` | Hub | LIVE FOUNDATION | Transactional price | `/` | Yes | REQUEST_QUOTE | No prices without policy | No tables of numbers |
| `/tools` | Hub | LIVE FOUNDATION | Tool | `/` | Yes | USE_TOOL | Calculator accuracy later | P2 |
| `/tools/pipe-sizing` | Tool | PLANNED | Tool | `/tools` | Yes when built | REQUEST_QUOTE | Method disclosure | |
| `/tools/pressure-loss` | Tool | PLANNED | Tool | `/tools` | Yes when built | REQUEST_QUOTE | Method disclosure | |
| `/request-quote` | Conversion | LIVE FOUNDATION | Conversion | `/` | Yes | REQUEST_QUOTE | Form fields later | No backend now |
| `/dealers` | Directory | LIVE FOUNDATION | Brand / local | `/` | Yes | VERIFY_DEALER | Official list | |
| `/verify` | Utility | LIVE FOUNDATION | Brand protection | `/` | Yes | VERIFY_DEALER | Verification data | Foundation only; no logic |
| `/about` | Identity | LIVE FOUNDATION | Brand / factory | `/` | Yes | CONTACT_SALES | Legal name, history | |
| `/contact` | Utility | LIVE FOUNDATION | Navigational | `/` | Yes | CONTACT_SALES | Current channels | Do not copy legacy numbers yet |
| `/export` | Hub | DEFERRED | Export | `/` | No | — | Export capability | Not in sitemap |
| `/export/iraq` | Landing | DEFERRED | Export | `/export` | No | — | Iraq commercial proof | Not a translation |

Diameter landing URLs are **not listed**. They remain uncommitted to avoid architecture churn.
