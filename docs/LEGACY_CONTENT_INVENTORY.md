# Legacy Content Inventory

**Status:** Phase 003 — classify only; do not rewrite or migrate copy into commercial pages  
**Rule:** Legacy copy is a **claim source**, not verified fact. Content value ≠ factual reliability.

Machine-readable URL actions: `data/migration/legacy-urls.ts`.

Content classes used below:

| Class | Meaning |
|---|---|
| KEEP & REFRESH | Worth keeping; rewrite against verified facts |
| MERGE | Absorb into an owner page |
| REWRITE | Intent is valuable; current copy is not reusable as-is |
| MIGRATE AS REFERENCE | Keep internally as research; do not publish unchanged |
| ARCHIVE | Do not republish; retain for history |
| REVIEW | Blocked on business/legal/asset decisions |

---

## Product pages

| Asset | Value | Reliability | Class | Future owner |
|---|---|---|---|---|
| `/gas-pipe/` gas product article | **High** — first family to verify | Unverified production, standards, approvals, superlatives | KEEP & REFRESH | `/products/gas-pipe` |
| Water/sewer/drainage combined post | Medium — mixed intents | Sewer/drainage unconfirmed | REWRITE | `/products/water-pipe` (sewer stays unverified) |
| Drip irrigation post | Medium | Product line unconfirmed | REWRITE | `/products/irrigation-pipe` |
| Subsurface irrigation post | Medium — application | Unconfirmed | REWRITE | `/applications/irrigation` |
| WooCommerce shop/cart/checkout/account | None | n/a | ARCHIVE | 410; RFQ replaces shop |

Do not build `/applications/agriculture` or `/applications/irrigation` in this phase. Irrigation application mapping is destination-only.

No PE100 product URL was found. `/products/pe100` remains research-gated.

---

## Engineering articles

See also the article → owner table below. Do not delete useful technical articles because they are old.

| Asset | Search intent | Usefulness | Uniqueness | Class | Owner |
|---|---|---|---|---|---|
| `/welding/` | How to join PE pipe | High | Method overview; refresh with sources | KEEP & REFRESH | `/engineering/welding` |
| `/temp-cooficient/` | Temperature vs working pressure | High | Educational PN; misspelled slug | KEEP & REFRESH | `/engineering/pn` |
| `/pipeline_design/` | Calculator | High as **tool** | Interactive, not a guide | REWRITE as tool | `/tools` (later specific calculators) |
| `/air-vent-valve/` | Installation accessory | Medium | Supporting; not a core IA owner | KEEP & REFRESH | `/knowledge/air-vent-valve` |
| `/standards/` | Standards list | High | Aligns with hub URL | KEEP & REFRESH | `/standards` (same path) |
| `/iso-iec17025/` | What 17025 is | Medium | Generic explainer + implied cert | MERGE | `/laboratory/accreditation` |

**Tool vs engineering:** `/pipeline_design/` must not become `/engineering/pipe-sizing` copy. Calculators own action intent; engineering pages own explanation.

---

## Laboratory

| Asset | Value | Reliability | Class | Owner |
|---|---|---|---|---|
| `/qc-and-laboratory/` | High hub | 17025/NACI/collaborator claims unverified | KEEP & REFRESH | `/laboratory` |
| `/lab-scope/` | **Very high** test catalog | Prices and scope are LEGACY CLAIMS | MIGRATE AS REFERENCE | `/laboratory/tests` — **do not copy prices** |
| Lab quality policy page | Low–medium | Unverified | MERGE | `/laboratory` |
| `/training/` | Medium if service is real | Unverified external training | REVIEW | `/laboratory` until services confirmed |
| `/lab-poll/` | None | n/a | ARCHIVE | 410 |
| Certificates on QC/certs pages | High if valid | **REQUIRES VALIDITY VERIFICATION** | REVIEW | `/laboratory/accreditation` and/or `/about` |

Lab-scope listed tests (all LEGACY CLAIM FOUND, not a publishable scope): hydrostatic, burst, tensile, OIT, carbon black / dispersion, ESCR, Izod/Charpy, MFR, Vicat, DCM, density, volatiles, ash, opacity, thermal reversion, impact, ring stiffness, PVC/PP thermal effect, dimensions, PE system performance, electrofusion decohesion; plus implied PVC/PP/telecom and gas fittings/valves work. Confirm each test, customer availability, and method standard before any `/laboratory/tests/[slug]` page.

---

## Company history, awards, people

| Asset | Value | Reliability | Class |
|---|---|---|---|
| `/about_us/` | High identity | History, capacity, awards unverified | KEEP & REFRESH → `/about` |
| Timeline fragment pages (1376, 1386, 1389, 1390, 1393, 1400 / 7 lines / 14000 t) | Medium narrative | LEGACY CLAIMS | MERGE → `/about`; MIGRATE AS REFERENCE |
| `/certs/` gallery | High if authentic | Unverified marks | REVIEW; MERGE URL to `/about` |
| Quality policy (`/policy/`) | Medium | Contains unverified legal-style name | MERGE; legal review |
| Team bios / “مدیر …” pages | Low public SEO | People may have left | ARCHIVE quotes; MERGE URLs to `/about` |
| Amini testimonial page | Low | No permission | ARCHIVE — do not republish |
| Slogan/theme modules | None | n/a | ARCHIVE |

---

## Projects / FAQs / calculators

| Asset | Class | Notes |
|---|---|---|
| “پروژه های آبرسانی/گازرسانی” theme posts | ARCHIVE / MERGE URL to `/projects` | No permitted case study |
| Surveys (`customer-poll`, `lab-poll`) | ARCHIVE | 410 |
| Pipe/pump calculator | REWRITE as tool | `/tools` |
| FAQs | None discovered as a dedicated FAQ URL | Do not invent an FAQ hub |

---

## Downloadable catalogs / certificates / standards

See PDF table in this file and `docs/LEGACY_MEDIA_MIGRATION.md`. All certificates: **REQUIRES VALIDITY VERIFICATION**. Articles page also *cites* INSO 7607, gas IGS PDF, and publication 139 — those files were **not** in the PDF media filter and are not inventoried as URLs.

| File | Title (media) | Host | Future value | Verification | Future destination |
|---|---|---|---|---|---|
| `/wp-content/uploads/lana-downloads/2022/10/14427-2-1400.pdf` | ۱۴۴۲۷-۲-۱۴۰۰ | `.com` | High if current INSO 14427-2 | REQUIRES VALIDITY VERIFICATION | Re-host; link from `/standards` |
| `/wp-content/uploads/lana-downloads/2022/10/article_286.pdf` | article_286 | `.com` | Medium technical | REQUIRES VALIDITY VERIFICATION | `/standards` or knowledge reference |
| `/wp-content/uploads/2022/10/article_204.pdf` | article_204 | `.com` | Medium technical | REQUIRES VALIDITY VERIFICATION | `/standards` or knowledge |
| `/wp-content/uploads/2022/10/Bukan-Pipe-Company.pdf` | Bukan-Pipe-Company | `.com` | Catalog/brochure | REQUIRES VALIDITY VERIFICATION — not assumed current | `/about` or `/products` only if still accurate |

Attachment HTML pages (`/14427-2-1400/`, `/article_286/`, `/article_204/`, `/about_us/bukan-pipe-company/`) MERGE to `/standards` or `/about`. Direct PDF URLs stay REVIEW until asset hosting is chosen (do not drop useful files).

---

## Images

Do not bulk-download the media library. Classes to preserve later: factory, production line, laboratory, product, project (with permission), certificate (if valid), logo, catalog media. Cross-host `.ir` video enclosure is documented in the media migration doc.

---

## LEGACY ARTICLE → FUTURE OWNER

Do not rewrite article copy in this phase.

| Legacy article | Intent | Owner page | Update path | Consolidation |
|---|---|---|---|---|
| `/welding/` | Educational joining methods | `/engineering/welding` | Refresh with cited fusion standards | Keep one welding URL in Engineering |
| `/temp-cooficient/` | Temperature vs PN | `/engineering/pn` | Repair slug via 301; refresh derating explanation | Do not also create `/engineering/temperature` |
| `/standards/` | Standards hub | `/standards` | Rebuild hub; children `/standards/[code]` later | Keep path |
| `/iso-iec17025/` | 17025 explainer | `/laboratory/accreditation` | Merge; cert must be current | Do not keep a parallel explainer URL |
| `/air-vent-valve/` | Accessory guidance | `/knowledge/air-vent-valve` | Editorial refresh | Must not steal installation intent from `/engineering/installation` |
| `/gas-pipe/` | Product | `/products/gas-pipe` | Commercial rebuild after verification | Application gas stays `/applications/gas-distribution` |
| Water/sewer/drainage post | Mixed product | `/products/water-pipe` | Split sewer only if verified | Do not merge irrigation here |
| Drip irrigation post | Product | `/products/irrigation-pipe` | Verify SKU | Distinct from application irrigation |
| Subsurface irrigation post | Application | `/applications/irrigation` | Verify distinct from agriculture hub | Do not collapse into `/applications/agriculture` |
| `/articles/` downloads hub | Library | `/knowledge` + `/standards` | Rebuild index of verified docs | Not a second blog |

Theme leftover “articles” that are slogans or layout demos are not articles; they MERGE or IGNORE as URL policy, not editorial pieces.
