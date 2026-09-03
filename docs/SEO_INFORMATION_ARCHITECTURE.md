# SEO Information Architecture

**Status:** Phase 002 specification  
**Canonical domain (approved target):** `https://bukanpipe.com`  
**Public language:** Persian (`fa`), RTL  
**Supersedes for IA tree and page ownership:** `docs/08-information-architecture.md` and destination column of `docs/07-keyword-map.md`

Search volume, CPC, keyword difficulty and rankings are **UNKNOWN / REQUIRES EXTERNAL KEYWORD DATA**.

No industrial claim in this document is a publishable factory fact. Product and laboratory URLs are architectural capacity, not confirmation of current manufacturing or accreditation.

---

## 1. Executive IA principles

1. Every indexable page must connect **search intent → page → content purpose → internal links → CTA**.
2. North-star metric remains **qualified RFQs from organic search**.
3. Do not create a page only because a competitor has one.
4. Products answer “what do you make?” Applications answer “what is it for?” Engineering answers “how do I choose correctly?” Knowledge supports those owners and must not cannibalize them.
5. Unverified capabilities stay out of the public graph. Candidate URLs may be reserved; they are not launched as facts.
6. One canonical URL per primary intent. Secondary URLs support, not compete.
7. Stable Latin slugs, no trailing slash (ADR-012), no query-string indexable content.
8. Thin city pages, mass AI articles, stale price tables and unmanaged `.com`/`.ir` duplication are forbidden by default.

---

## 2. User-intent model

Functional needs only. No invented demographics.

| User group | Needs from the site | Primary IA destinations |
|---|---|---|
| Procurement managers | Specs, standards, documents, quote path, vendor credibility | Products, standards, pricing, request-quote, about |
| Contractors | Availability, installation/welding, risk reduction, RFQ | Products, engineering, projects, request-quote |
| Consulting engineers | SDR/PN/grade selection, datasheets, lab evidence | Engineering, products, laboratory, standards, tools |
| Infrastructure owners | Compliance, project proof, commercial response | Projects, laboratory, about, request-quote |
| Agricultural customers | Irrigation/water transfer, sizing, regional delivery confidence | Applications (agriculture/irrigation), products, tools, request-quote |
| Water-sector buyers | Water-supply suitability, standards, projects | Applications (water), products, standards, projects |
| Gas-sector buyers | Gas product identity, applicable standards, approvals | Product (gas) *if verified*, application (gas), laboratory, standards |
| Distributors / dealers | Official list, authorization, brand protection | Dealers, verify, contact |
| Laboratory customers | Scope, turnaround, how to request a test | Laboratory services/tests/request-test |
| Technical researchers | Evergreen definitions and methods | Engineering, standards, knowledge |
| Future export buyers | Capability, packing, documents, English/Arabic later | `/export` **deferred** |

Funnel stages used in the keyword map: **awareness / consideration / decision / conversion**.

---

## 3. Top-level architecture

| Section | Purpose | Audience | Primary intent | Commercial role | SEO role | Primary CTA | Child architecture | Priority |
|---|---|---|---|---|---|---|---|---|
| `/` | Position, proof, route, convert | Mixed commercial investigation | Brand + “تولیدکننده / کارخانه” mixed | Frame value beyond commodity price | Brand + manufacturer SERPs | REQUEST_QUOTE | None | P0 |
| `/products` | Catalog hub | Buyers, engineers, procurement | Commercial / product | Product discovery | Category authority for لوله پلی‌اتیلن | REQUEST_QUOTE | Family pages after verification | P0 |
| `/applications` | Use-case hubs | Sector buyers | Application | Match problem to product | Application clusters | VIEW_PRODUCT | Sector pages after verification | P0 |
| `/laboratory` | Trust + possible B2B tests | All buyers; lab customers | Quality / lab | Proof and service leads | Lab/quality cluster | REQUEST_LAB_TEST | services, tests, accreditation, request-test | P0 |
| `/projects` | Evidence | Owners, procurement, engineers | Trust | Risk reduction | Trust SERPs | REQUEST_QUOTE | `[slug]` after permission | P1 |
| `/engineering` | Decision guides | Engineers, contractors | Technical | Help choose → product/RFQ | Technical cluster owners | VIEW_PRODUCT | sdr, pn, pe80-vs-pe100, sizing, welding, … | P1 |
| `/standards` | Compliance library | Procurement, engineers | Trust / technical | Reduce vendor risk | Standards cluster | VIEW_STANDARD | `[code]` after verification | P1 |
| `/knowledge` | Supporting articles | Mixed | Informational leftover | Only if search, sales, or trust | Must not own core intents | VIEW_PRODUCT | `[slug]` after editorial rules | P1 |
| `/pricing` | Price intelligence | Procurement, buyers | Transactional price | Explain drivers → RFQ | Owns قیمت لوله پلی‌اتیلن | REQUEST_QUOTE | No child price tables | P1 |
| `/tools` | Calculators | Engineers, contractors | Tool | Capture sizing/loss intent | Owns calculator queries | USE_TOOL | pipe-sizing, pressure-loss later | P2 |
| `/request-quote` | Structured RFQ | All commercial users | Conversion | Sales engine | Indexable conversion URL | REQUEST_QUOTE | None | P0 |
| `/dealers` | Official channels | Buyers, dealers | Brand / local commercial | Stop impersonation | نماینده / نمایندگی | VERIFY_DEALER | None until official list | P1 |
| `/verify` | Authorization check | Buyers checking a seller | Brand protection | Trust | راستی‌آزمایی نماینده | VERIFY_DEALER | No children in v1 | P1 |
| `/about` | Identity | Commercial investigation | Brand / factory | Proof of existence | کارخانه / about | CONTACT_SALES | None | P0 |
| `/contact` | Reach sales/lab | All | Navigational | Response path | Brand + contact | CONTACT_SALES | None | P0 |
| `/export` | Future export | Export buyers | Export | Later revenue | Later | — | `/export/iraq` later | DEFERRED |

Internal linking among hubs is defined in section 16. Implementation status is in `lib/config/routes.ts` and `docs/URL_MASTER_MAP.md`.

---

## 4. Products architecture

**Hub:** `/products`  
**Child pattern:** `/products/{family-slug}`  
**Detail records:** one URL per verified product family, not per diameter, until size-page value is proven.

### Evidence classes

| Class | Meaning | Launch rule |
|---|---|---|
| VERIFIED | Factory/document evidence in this program | May publish as fact |
| CANDIDATE | Strategy and/or legacy URL, not current master data | Reserve URL; do not publish specs |
| REQUIRES BUSINESS VERIFICATION | Mentioned only as a possibility | Do not build until confirmed |

No product is VERIFIED in Phase 002.

| Candidate / reserved family | Class | Why reserved | Do not claim |
|---|---|---|---|
| `/products/gas-pipe` | CANDIDATE | Legacy `https://bukanpipe.com/gas-pipe/` confirmed by read-only inspection | Current production, approvals, “first in NW”, IGS/EN listings |
| `/products/water-pipe` | CANDIDATE | Legacy about page lists water transfer; keyword strategy | Diameter/PN range, PE grade |
| `/products/irrigation-pipe` | CANDIDATE | Regional agriculture strategy; listed as irrigation on legacy about | That Bukan Pipe currently sells irrigation pipe |
| `/products/pe100` | REQUIRES VERIFICATION | Keyword destination in strategy | That PE100 is produced |
| `/products/sewer-pipe` | REQUIRES VERIFICATION | IA draft said only if verified; legacy about lists drainage | Sewage/drainage product line |

Oil-product lines, cable ducts and other legacy about-page bullets are **not** reserved URLs until the factory confirms them. Copying the legacy application list as a sitemap is forbidden.

### Product page anatomy (future, when verified)

H1 → proposition → applications → diameter range → PE grade → PN/SDR → standards → HTML spec tables → QC/tests → projects → articles → FAQ → datasheet → RFQ.

Optional fields already exist on `Product` in `content/models/product.ts`. Values stay empty until verified.

### Diameter / size URLs

**DEFERRED.** Do not create `/products/dn-110` or similar until (1) that size is in the verified range, (2) search demand is measured, (3) the page has unique value beyond a table row. Prefer HTML tables on the family page.

---

## 5. Applications architecture

**Hub:** `/applications`  
Applications are **job-to-be-done pages**, not duplicate spec sheets.

| Planned URL | Class | Distinct intent vs product |
|---|---|---|
| `/applications/water-supply` | CANDIDATE | Network/project context for water; product owns SKU/specs |
| `/applications/agriculture` | CANDIDATE | Sector hub (farms, regional use, projects) |
| `/applications/irrigation` | CANDIDATE | Method “آبیاری تحت فشار”; merge into agriculture if thin |
| `/applications/gas-distribution` | CANDIDATE | How PE is used in gas networks; **not** the product SKU page |
| `/applications/industrial` | REQUIRES VERIFICATION | Only if real industrial supply exists |
| `/applications/sewage` | REQUIRES VERIFICATION | Only if product exists |

**Intent split (mandatory):**

- Product: commercial investigation (“buy / specify this pipe family”).
- Application: problem/sector (“pipe for water / gas / farms”) plus selection narrative and project proof.
- If a query is clearly a product name (e.g. لوله گازرسانی as SKU), the **product URL owns it** once verified. The application URL targets use-case modifiers (شبکه گازرسانی، استاندارد گاز، نصب در شبکه).

---

## 6. Engineering architecture

**Hub:** `/engineering`  
Evergreen decision pages. One canonical URL per concept.

| Planned URL | Owns | Does not own |
|---|---|---|
| `/engineering/sdr` | SDR چیست | Product SDR tables |
| `/engineering/pn` | PN چیست and فشار کاری | Pricing; product PN lists |
| `/engineering/pe80-vs-pe100` | Comparison intent | Commercial PE100 category |
| `/engineering/pipe-sizing` | How to choose diameter | Calculator SERP |
| `/engineering/pressure-loss` | What pressure loss is / how to think | Calculator SERP |
| `/engineering/welding` | جوش، Butt Fusion، Electrofusion as sections | Product pages |
| `/engineering/installation` | Installation / handling / storage cluster | Laboratory test methods |

Do **not** create `/engineering/testing` (laboratory owns tests) or `/engineering/pressure` (owned by PN page).

Guides may be drafted from public engineering knowledge with cited sources. They must not insert unverified Bukan Pipe specs.

---

## 7. Laboratory architecture

**Hub:** `/laboratory`  
Dual role: (A) trust for pipe sales, (B) possible independent B2B service line.

| Planned URL | Role | Verification gate before content |
|---|---|---|
| `/laboratory/accreditation` | Proof | Current certificate ID, issuer (e.g. NACI), standard version, validity dates, scope PDF |
| `/laboratory/services` | B2B offer | Which services are actually sold externally |
| `/laboratory/tests` | Index of tests | Only tests in verified scope |
| `/laboratory/tests/{slug}` | Individual method page | **That test** is in current scope and may be offered |
| `/laboratory/request-test` | Conversion | External testing is available |

Candidate methods discussed in strategy (OIT, hydrostatic, MFI, carbon black, density, dimensional) remain **unpublished as Bukan Pipe capabilities** until each is checked against the current scope. Legacy page claims (ISO/IEC 17025:2017, collaborator of National Standard and National Gas, external tests, training) are **unverified** until documents are current.

---

## 8. Standards architecture

**Hub:** `/standards`  
Product/process standards and certificates that procurement asks for.

- Child URLs: `/standards/{code-slug}` only for verified codes (example legacy *claims* such as EN 1555 / INSO 11233 / IGS-M-PL-014-1 are not approved for publication yet).
- Laboratory accreditation lives under `/laboratory/accreditation`, not as a duplicate standards page.
- Company awards live on `/about` only with dated evidence; they are not SEO award farms.

---

## 9. Projects architecture

**Hub:** `/projects`  
**Record:** `/projects/{slug}`

Capable fields (all optional): sector, location, year, product, diameter, pressure, PE grade, length, problem, solution, testing, outcome, media, `publicationPermission`.

Rules:

- No anonymous invented case studies.
- No client name without permission.
- A project with only “we did a water job” and no verifiable detail should not be a page.

---

## 10. Knowledge architecture

**Hub:** `/knowledge`  
Articles that pass the content-strategy test: search **or** sales **or** trust.

Knowledge **must not** target:

- قیمت لوله پلی‌اتیلن (pricing)
- SDR چیست / PN چیست / PE80 یا PE100 (engineering)
- لوله پلی‌اتیلن PE100 as primary (product)
- آزمایشگاه 17025 as primary (laboratory)

Typical knowledge items: installation stories that are not the canonical install guide, “how to read a datasheet”, refreshed legacy articles after KEEP/UPDATE classification.

Pillars already on `Article`: product-selection, water, agriculture, gas, laboratory, installation-welding.

---

## 11. Pricing architecture

**Hub:** `/pricing`  
Not a stale price table. Explain drivers, then RFQ.

Conceptual factors (educational, not current quotes): grade, diameter, pressure, weight, quantity, raw-material conditions, delivery.

No numbers. No PDF price list as the page body. “خرید لوله پلی‌اتیلن” is owned by `/products` with CTA to RFQ; pricing owns **price** intent only.

---

## 12. Tools architecture

**Hub:** `/tools`  
P2 calculators, after core commercial pages.

| Planned tool | Owns tool-intent | Informational twin |
|---|---|---|
| `/tools/pipe-sizing` | محاسبه قطر لوله | `/engineering/pipe-sizing` |
| `/tools/pressure-loss` | محاسبه افت فشار | `/engineering/pressure-loss` |

Optional later: SDR/PN helper, weight. Each tool page needs explanatory HTML so it is not a JS-only toy.

**Permanent SEO rule:** a tool page owns calculator/action intent; an engineering page owns educational/explanatory intent. The two may link to each other but must not contain substantially duplicated primary content. The same split applies to pipe sizing, flow, weight, SDR/PN selection, and future calculators. Planned slugs remain `/tools/pipe-sizing` and `/tools/pressure-loss` (not `*-calculator`).

---

## 13. Dealers / verification

| URL | Responsibility |
|---|---|
| `/dealers` | Official discovery list when the factory supplies it |
| `/verify` | Future check of dealer code and/or phone (fields from brand-defense strategy) |

No database and no verification logic in Phase 002. `/verify` is an implemented **route foundation** only.

QR on catalogs is a later operational layer, not a current URL.

---

## 14. Export architecture

**DEFERRED.** No public route, no sitemap entry, no hreflang, no translated pages.

Reserved conceptually:

- `/export` — English/export capability hub
- `/export/iraq` — Iraq commercial landing, not a translation

Launch conditions (all required):

1. Persian site performing (north-star RFQs)
2. Verified export capability, markets, terms, MOQ, packing, documents
3. Legal/commercial approval
4. Dedicated contacts and datasheets

Sequence from export strategy: Persian → English corporate/export → Iraq → Arabic → Sorani only if demand is validated.

---

## 15. CTA architecture

Typed in `lib/config/cta.ts`:

| CTA | Typical owners |
|---|---|
| REQUEST_QUOTE | Home, products, pricing, projects, tools |
| CONTACT_SALES | About, contact |
| VIEW_PRODUCT | Applications, engineering, knowledge |
| DOWNLOAD_DATASHEET | Product (when a real file exists) |
| VIEW_STANDARD | Products, laboratory |
| VIEW_PROJECT | Products, applications |
| USE_TOOL | Engineering |
| REQUEST_LAB_TEST | Laboratory |
| VERIFY_DEALER | Dealers, verify |

One primary CTA per template. Secondary CTAs are allowed; they must not compete with the page’s commercial job.

---

## 16. Internal linking model

Typed relations live in `lib/config/linking.ts` and optional `relatedItems[].relation` on content models.

```text
Product
  → uses-in-application → Application
  → specified-by-standard → Standard
  → verified-by-test → LaboratoryTest
  → used-in-project → Project
  → explained-by-engineering → Engineering page
  → converts-to-quote → /request-quote

Application
  → supplied-by-product → Product
  → used-in-project → Project
  → converts-to-quote → /request-quote

Engineering guide
  → supplied-by-product → relevant Product
  → calculated-by-tool → Tool
  → converts-to-quote → /request-quote when the reader is specifying

Laboratory test
  → method-of-standard → Standard
  → verified-by-test (inverse) → Product
  → requests-lab-test → /laboratory/request-test

Project
  → supplied-by-product → Product
  → uses-in-application → Application
  → specified-by-standard → Standard
  → converts-to-quote → /request-quote

Knowledge article
  → at most one canonical owner (product or engineering)
  → no generic related-posts rail
```

Hub pages link down to children and across to the next funnel step, not to every URL on the site.

---

## 17. Breadcrumb model

Visible trail matches JSON-LD `BreadcrumbList`.

- Home
- Home > Section
- Home > Products > {Family}
- Home > Engineering > {Guide}
- Home > Laboratory > Tests > {Test}
- Home > Projects > {Project}

No breadcrumb segment is an unverified product name. Utility pages (`/verify`, `/request-quote`, `/contact`) still trail from Home.

---

## 18. Navigation principles

Not a visual header. Customer jobs, not the org chart.

**Primary (desktop):** محصولات، کاربردها، آزمایشگاه، مهندسی، پروژه‌ها  
**Utility:** نمایندگان، راستی‌آزمایی، تماس  
**Persistent conversion:** درخواست پیش‌فاکتور  
**Secondary / mega-menu candidates (later, when children exist):** product families; application sectors; engineering topics + tools; laboratory services/tests/accreditation  
**About** sits in utility or footer, not as the main commercial path.  
**Pricing** can sit under محصولات or utility; it must remain one click from commercial landings.  
**Export** stays out of nav until launch conditions are met.

**Mobile information priority:** RFQ → محصولات → تماس → کاربردها → آزمایشگاه → مهندسی.

Development `DevNav` lists implemented foundations only; it is not the future header.

---

## 19. Future multilingual considerations

- Keep Persian URLs stable. Do not prefix current routes with `/fa`.
- Later locales: `en`, `ar`, `ckb` as recorded in `siteConfig.plannedLocales`.
- hreflang only when real translations exist.
- Iraq is a **market landing**, not an automatic Arabic duplicate.
- Slugs stay Latin even for Persian pages so canonicals and redirects stay simple.

---

## 20. Page-priority matrix

| Priority | What | Why |
|---|---|---|
| P0 | Home (later design), products hub + template, applications hub, laboratory hub, RFQ, about, contact | Commercial path and trust |
| P1 | Engineering core guides, standards, projects, pricing, dealers, verify, knowledge discipline, lab children after evidence | Authority and brand protection |
| P2 | Tools, product finder, individual verified tests, conditional size pages | Moat after core |
| DEFERRED | `/export`, `/export/iraq`, hreflang, city pages, diameter farms | Preconditions not met |

---

## URL slug rules

See also ADR-021.

- Lowercase Latin `[a-z0-9-]`
- Hyphen separated, no underscores (legacy `about_us` redirects in)
- No file extensions, dates, session IDs, or indexable query strings
- No trailing slash except origin `/`
- Concise family names: `gas-pipe`, `water-pipe`, `pe80-vs-pe100`
- One object in one taxonomy: a gas **product** is not also `/applications/gas-pipe`
- Do not change slugs after launch without a 301 plan
