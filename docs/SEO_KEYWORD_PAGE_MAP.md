# Keyword → Page Map

**Status:** Phase 002 architectural map  
**Metrics:** monthly volume, CPC, keyword difficulty, rankings = **UNKNOWN / REQUIRES EXTERNAL KEYWORD DATA**  
**Competition class:** UNKNOWN unless a project source already named a competitor class  
**Supersedes destinations in:** `docs/07-keyword-map.md`

Commercial value is a **business judgment** from funnel stage (not search-volume data).

Status values:

- **PLANNED** — owner URL assigned; commercial page not built
- **NEEDS RESEARCH** — keyword data and/or factory verification still required before committing content
- **VERIFIED** — not used here; no ranking/volume measurement exists yet

---

## Commercial / transactional

| Keyword / topic | Persian intent | Funnel | Target page | Page type | Primary / secondary | Commercial value | Competition | Status | Cannibalization notes |
|---|---|---|---|---|---|---|---|---|---|
| لوله پلی اتیلن | Mixed commercial | Consideration | `/products` | Product hub | Primary | High | UNKNOWN | PLANNED | Home supports manufacturer frame; products owns category |
| قیمت لوله پلی اتیلن | Transactional price | Decision | `/pricing` | Pricing hub | Primary | High | UNKNOWN | PLANNED | No knowledge/engineering article may target this |
| خرید لوله پلی اتیلن | Transactional buy | Decision | `/products` | Product hub | Primary | High | UNKNOWN | PLANNED | CTA to `/request-quote`; RFQ is conversion URL, not this SERP owner |
| تولید کننده لوله پلی اتیلن | Commercial investigation | Consideration | `/` | Home | Primary | High | UNKNOWN | PLANNED | `/about` secondary for identity |
| کارخانه لوله پلی اتیلن | Commercial investigation | Consideration | `/about` | About | Primary | Medium | UNKNOWN | PLANNED | Home secondary |
| لوله پلی اتیلن PE100 | Product | Consideration | `/products/pe100` | Product family | Primary | High | UNKNOWN | NEEDS RESEARCH | Engineering comparison is secondary; do not publish family until PE100 is verified |
| درخواست پیش فاکتور لوله پلی اتیلن | Conversion | Conversion | `/request-quote` | RFQ | Primary | High | UNKNOWN | PLANNED | Brand/navigational more than category |

---

## Product intent

| Keyword / topic | Persian intent | Funnel | Target page | Page type | Primary / secondary | Commercial value | Competition | Status | Cannibalization notes |
|---|---|---|---|---|---|---|---|---|---|
| لوله پلی اتیلن آبرسانی | Product / application mix | Consideration | `/products/water-pipe` | Product family | Primary | High | UNKNOWN | NEEDS RESEARCH | `/applications/water-supply` secondary (use-case) |
| لوله پلی اتیلن گازرسانی | Product | Consideration | `/products/gas-pipe` | Product family | Primary | High | UNKNOWN | NEEDS RESEARCH | Application page must not rank as the product URL |
| لوله پلی اتیلن کشاورزی | Application-led commercial | Consideration | `/applications/agriculture` | Application | Primary | High | UNKNOWN | NEEDS RESEARCH | Product irrigation family secondary once verified |
| لوله آبیاری تحت فشار | Application method | Consideration | `/applications/irrigation` | Application | Primary | Medium | UNKNOWN | NEEDS RESEARCH | Merge into agriculture if content is thin |
| لوله فاضلاب پلی اتیلن | Product / application | Consideration | `/products/sewer-pipe` | Product family | Primary | Medium | UNKNOWN | NEEDS RESEARCH | Do not build until product verified |
| لوله زهکشی | Application | Consideration | `/applications/sewage` | Application | Primary | Low | UNKNOWN | NEEDS RESEARCH | Same verification gate as sewer product |

---

## Technical / engineering

| Keyword / topic | Persian intent | Funnel | Target page | Page type | Primary / secondary | Commercial value | Competition | Status | Cannibalization notes |
|---|---|---|---|---|---|---|---|---|---|
| SDR چیست | Informational | Awareness | `/engineering/sdr` | Engineering guide | Primary | Medium | UNKNOWN | PLANNED | Knowledge must not duplicate |
| PN چیست | Informational | Awareness | `/engineering/pn` | Engineering guide | Primary | Medium | UNKNOWN | PLANNED | Includes فشار کاری; no extra `/engineering/pressure` |
| فشار کاری | Informational | Awareness | `/engineering/pn` | Engineering guide | Primary | Medium | UNKNOWN | PLANNED | — |
| PE80 یا PE100 | Comparison | Consideration | `/engineering/pe80-vs-pe100` | Engineering guide | Primary | High | UNKNOWN | PLANNED | `/products/pe100` owns commercial PE100 |
| انتخاب قطر لوله پلی اتیلن | Informational | Consideration | `/engineering/pipe-sizing` | Engineering guide | Primary | Medium | UNKNOWN | PLANNED | Tool owns calculator wording |
| محاسبه قطر لوله | Tool | Decision | `/tools/pipe-sizing` | Tool | Primary | Medium | UNKNOWN | PLANNED | Engineering page is informational twin |
| افت فشار لوله پلی اتیلن | Informational | Consideration | `/engineering/pressure-loss` | Engineering guide | Primary | Medium | UNKNOWN | PLANNED | — |
| محاسبه افت فشار | Tool | Decision | `/tools/pressure-loss` | Tool | Primary | Medium | UNKNOWN | PLANNED | — |
| جوش پلی اتیلن | Informational | Awareness | `/engineering/welding` | Engineering guide | Primary | Medium | UNKNOWN | PLANNED | Butt Fusion and Electrofusion are H2s, not rival URLs |
| Butt Fusion | Informational | Awareness | `/engineering/welding` | Engineering guide | Primary | Low | UNKNOWN | PLANNED | — |
| Electrofusion | Informational | Awareness | `/engineering/welding` | Engineering guide | Primary | Low | UNKNOWN | PLANNED | — |
| استاندارد لوله پلی اتیلن | Informational / commercial | Consideration | `/standards` | Standards hub | Primary | Medium | UNKNOWN | NEEDS RESEARCH | Product pages list applicable codes; hub owns the cluster |

---

## Laboratory / quality

| Keyword / topic | Persian intent | Funnel | Target page | Page type | Primary / secondary | Commercial value | Competition | Status | Cannibalization notes |
|---|---|---|---|---|---|---|---|---|---|
| آزمایش لوله پلی اتیلن | Informational / service | Consideration | `/laboratory` | Lab hub | Primary | Medium | UNKNOWN | PLANNED | — |
| آزمایشگاه لوله پلی اتیلن | Commercial investigation | Consideration | `/laboratory` | Lab hub | Primary | Medium | UNKNOWN | PLANNED | — |
| ISO 17025 | Trust | Consideration | `/laboratory/accreditation` | Accreditation | Primary | Medium | UNKNOWN | NEEDS RESEARCH | Do not publish until current certificate is verified |
| OIT | Technical / service | Consideration | `/laboratory/tests/{slug}` | Test page | Primary | Low | UNKNOWN | NEEDS RESEARCH | Page only if test is in verified scope |
| MFI | Technical / service | Consideration | `/laboratory/tests/{slug}` | Test page | Primary | Low | UNKNOWN | NEEDS RESEARCH | Same gate |
| Hydrostatic | Technical / service | Consideration | `/laboratory/tests/{slug}` | Test page | Primary | Low | UNKNOWN | NEEDS RESEARCH | Same gate |
| Carbon Black | Technical / service | Consideration | `/laboratory/tests/{slug}` | Test page | Primary | Low | UNKNOWN | NEEDS RESEARCH | Same gate |
| درخواست آزمون آزمایشگاه | Conversion | Conversion | `/laboratory/request-test` | Lab RFQ | Primary | Medium | UNKNOWN | NEEDS RESEARCH | Only if external testing is offered |

---

## Project / trust

| Keyword / topic | Persian intent | Funnel | Target page | Page type | Primary / secondary | Commercial value | Competition | Status | Cannibalization notes |
|---|---|---|---|---|---|---|---|---|---|
| پروژه لوله پلی اتیلن | Trust | Consideration | `/projects` | Project hub | Primary | Medium | UNKNOWN | NEEDS RESEARCH | No invented case studies |
| کنترل کیفیت لوله پلی اتیلن | Trust | Consideration | `/laboratory` | Lab hub | Primary | Medium | UNKNOWN | PLANNED | About must not become a second QC hub |
| گواهینامه لوله پلی اتیلن | Trust | Consideration | `/standards` | Standards hub | Primary | Medium | UNKNOWN | NEEDS RESEARCH | Lab certificate → accreditation page |

---

## Brand

| Keyword / topic | Persian intent | Funnel | Target page | Page type | Primary / secondary | Commercial value | Competition | Status | Cannibalization notes |
|---|---|---|---|---|---|---|---|---|---|
| بوکان پایپ | Navigational | Awareness | `/` | Home | Primary | High | UNKNOWN | PLANNED | — |
| Bukan Pipe | Navigational | Awareness | `/` | Home | Primary | High | UNKNOWN | PLANNED | — |
| نمایندگی بوکان پایپ | Brand / local commercial | Decision | `/dealers` | Dealers | Primary | High | UNKNOWN | NEEDS RESEARCH | Needs official list |
| نماینده رسمی بوکان پایپ | Brand protection | Decision | `/verify` | Verification | Primary | High | UNKNOWN | PLANNED | Dealers list is discovery; verify is authorization |
| تماس بوکان پایپ | Navigational | Conversion | `/contact` | Contact | Primary | Medium | UNKNOWN | NEEDS RESEARCH | Do not publish numbers until confirmed |

---

## Export (future only)

| Keyword / topic | Persian / English intent | Funnel | Target page | Page type | Primary / secondary | Commercial value | Competition | Status | Cannibalization notes |
|---|---|---|---|---|---|---|---|---|---|
| polyethylene pipe Iraq | Export | Consideration | `/export/iraq` | Export landing | Primary | UNKNOWN | UNKNOWN | NEEDS RESEARCH | Deferred; no page now |
| PE pipe manufacturer Iran | Export | Consideration | `/export` | Export hub | Primary | UNKNOWN | UNKNOWN | NEEDS RESEARCH | Deferred |

---

## Size intent (conditional)

Strategy listed candidate diameters: 63, 90, 110, 160, 200, 250, 315, 400, 500, 630 mm.

| Topic | Target | Status | Notes |
|---|---|---|---|
| لوله پلی اتیلن {dn} میلیمتر | No URL committed | NEEDS RESEARCH | Do not publish size URLs until availability, demand and unique value are verified. Prefer tables on the family page. |

---

## Measurement still required

Before content production, capture for each primary keyword: monthly volume, difficulty, CPC/commercial proxy, current rank, SERP type, top competitors, and whether the SERP is dominated by manufacturers, distributors or publishers (`docs/04-competitive-landscape.md`).
