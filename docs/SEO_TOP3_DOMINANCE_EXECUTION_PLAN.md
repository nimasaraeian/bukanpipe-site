# Bukan Pipe — SEO Top-3 Dominance Execution Plan

Date: 2026-09-17
Property: https://bukanpipe.com/
Primary market: Persian / Iran
Secondary market: English / export discovery

## Objective

Build a measurable path toward top-3 organic visibility for the highest-value Bukan Pipe search intents without creating cannibalization, duplicate landing pages, unverified technical claims, or thin SEO routes.

Top-3 positions are a target, not a guarantee. Execution is based on existing site architecture and Search Console evidence.

## Current GSC baseline

Settled Search Console window used: 2026-08-18 through 2026-09-14.

- Sitemap URLs: 94
- Sitemap URLs with impressions: 22
- Brand query `لوله پلی اتیلن بوکان`: avg position ~2.1
- `لوله پلی اتیلن`: avg position ~68 on `/fa/polyethylene-pipe`
- `لوله های پلی اتیلن`: avg position ~134 on `/fa/polyethylene-pipe`
- `SDR در لوله پلی اتیلن`: avg position ~60 on `/fa/technical-center/polyethylene-pipe-specifications`
- `استاندارد لوله پلی اتیلن`: avg position ~70.5 on `/fa/technical-center/polyethylene-pipe-standards`
- `استاندارد لوله های پلی اتیلن`: avg position ~85.7 on same Standards owner
- `لوله پلی اتیلن فاضلابی`: avg position ~62 on `/fa/applications/sewage`
- `لیست قیمت لوله پلی اتیلن بوکان`: avg position ~7 on the legacy/root result set
- `کارخانه تولید لوله پلی اتیلن`: avg position ~70.5 on root
- `کارخانه لوله پلی اتیلن`: mixed legacy/root results, including strong brand-biased positions
- English `hdpe pipe temperature derating`: avg position ~17.5
- English `hdpe pipe temperature derating formula`: avg position ~19
- English `pe100 pipe dimensions`: avg position ~49-50

Wave A was deployed after much of this settled window; these numbers must not be used to judge Wave A impact yet.

## Non-negotiable keyword ownership map

| Priority | Search intent / keyword family | Canonical owner | Role |
|---|---|---|---|
| P0 | لوله پلی اتیلن / لوله های پلی اتیلن | `/fa/polyethylene-pipe` | Main Persian pillar |
| P0 | تولید کننده لوله پلی اتیلن / کارخانه تولید لوله پلی اتیلن | `/fa` | Manufacturer / factory entity |
| P0 | لوله PE100 / لوله پلی اتیلن PE100 | `/fa/products/pe100-pipe` | Commercial PE100 owner |
| P0 | SDR در لوله پلی اتیلن / مشخصات فنی لوله پلی اتیلن / PN | `/fa/technical-center/polyethylene-pipe-specifications` | Technical specs owner |
| P0 | استاندارد لوله پلی اتیلن | `/fa/technical-center/polyethylene-pipe-standards` | Standards owner |
| P0 | لوله پلی اتیلن آبرسانی | `/fa/products/water-supply-pipe` | Water commercial owner |
| P0 | لوله پلی اتیلن گاز | `/fa/products/gas-pipe` | Gas commercial owner |
| P0 | لوله پلی اتیلن آبیاری | `/fa/products/irrigation-pipe` | Irrigation commercial owner |
| P1 | لوله پلی اتیلن فاضلابی | `/fa/products/sewage-pipe` | Sewage commercial owner |
| P1 | جوش لوله پلی اتیلن | `/fa/technical-center/polyethylene-pipe-welding` | Welding technical owner |
| P1 | PE80 vs PE100 / PE80 چیست | `/fa/technical-center/pe80-vs-pe100` | Comparison owner |
| P1 | PE100 چیست | `/fa/technical-center/pe100-technical-guide` | Technical education owner |
| P1 | قیمت / استعلام لوله پلی اتیلن | `/fa/request-quote` | RFQ intent owner |

No new URL may target any of these intents unless a documented SERP split proves that the existing owner cannot satisfy the distinct intent.

## Execution sequence

### Sprint 0 — Legacy authority recovery (P0)

Current repository already contains a legacy URL inventory and redirect mapping in `data/migration/legacy-urls.ts`, but legacy redirects are feature-gated.

Required before activation:

1. Verify every `REDIRECT_301`, `MERGE`, and eligible `REBUILD` destination returns 200 in the current production IA.
2. Prioritize legacy URLs with proven GSC impressions/rankings:
   - `/contact-us/` -> `/fa/contact`
   - `/air-vent-valve/` -> `/fa/technical-center/air-vent-valve`
   - `/welding/` -> `/fa/technical-center/polyethylene-pipe-welding`
   - `/temp-cooficient/` -> `/fa/technical-center/polyethylene-pipe-temperature-pressure`
   - `/gas-pipe/` -> `/fa/products/gas-pipe`
   - legacy Persian water-supply URL -> `/fa/products/water-supply-pipe`
3. Do not send legacy technical URLs to Home.
4. Do not activate ambiguous/unsupported redirects until destination intent is verified.
5. Once validated, activate legacy redirects in production and monitor old/new URL impressions for 28 days.

### Sprint 1 — Wave A consolidation (P0)

Owners already enhanced:

- `/fa/polyethylene-pipe`
- `/fa/products/pe100-pipe`
- `/fa/technical-center/polyethylene-pipe-specifications`

Actions:

1. Preserve ownership and avoid competing pages.
2. Ensure strong contextual links among all three.
3. Link from relevant existing technical/application pages into these owners with natural Persian anchors.
4. Re-check GSC only after enough settled post-deploy data exists.

### Sprint 2 — Wave B commercial dominance (P0)

Deepen only existing pages:

- `/fa/products/water-supply-pipe`
- `/fa/products/gas-pipe`
- `/fa/products/irrigation-pipe`

Each page must include only verified material and cover:

- buyer/project intent
- use-case boundaries
- PE100/material context where verified
- SDR/PN explanation by link to Specifications owner rather than duplicating the full technical article
- QA / laboratory pathway
- order/RFQ checklist
- relevant application links
- contextual internal links to Standards, Welding, Quality/Laboratory and Request Quote
- real FAQ content where useful

Blocked claims unless source-verified:

- prices
- current certification validity
- production capacity
- gas diameter range
- unsupported pressure/dimension tables
- unsupported superlatives

### Sprint 3 — Technical authority cluster (P0/P1)

Priority order:

1. `/fa/technical-center/polyethylene-pipe-standards`
2. `/fa/technical-center/polyethylene-pipe-welding`
3. `/fa/technical-center/pe80-vs-pe100`
4. `/fa/technical-center/pe100-technical-guide`
5. `/fa/technical-center/polyethylene-pipe-temperature-pressure`

Goal: make the Technical Center the support engine for commercial pages, not a competing catalog.

Every article must:

- answer a single primary intent
- contain source-verifiable engineering information
- link back to the relevant product owner
- link laterally to closely related technical owners only when useful
- avoid generic AI-style filler
- prefer worked explanations, diagrams/tables only when verified, and real factory/lab evidence where available

### Sprint 4 — Sewage / drainage ownership cleanup (P1)

Current GSC has `لوله پلی اتیلن فاضلابی` appearing on `/fa/applications/sewage` around position ~62.

Required:

1. Decide and enforce commercial owner: `/fa/products/sewage-pipe`.
2. Keep `/fa/applications/sewage` as application/use-case support.
3. Add explicit contextual link from application -> product owner.
4. Prevent title/H1/meta overlap that causes cannibalization.

### Sprint 5 — Factory/manufacturer intent (P0)

Target family:

- تولید کننده لوله پلی اتیلن
- کارخانه تولید لوله پلی اتیلن
- کارخانه لوله پلی اتیلن
- کارخانه پلی اتیلن بوکان

Owner: `/fa`

Actions:

- strengthen factual manufacturer/entity signals on Home without keyword stuffing
- reinforce with About, Laboratory, Quality, Gallery and Contact links
- use real factory imagery and verifiable production/process evidence
- keep brand/entity naming consistent: Bukan Pipe / بوکان پایپ
- do not create a separate `manufacturer` landing page unless GSC/SERP evidence later justifies it

### Sprint 6 — RFQ / price intent (P1)

Owner: `/fa/request-quote`

Target family:

- قیمت لوله پلی اتیلن
- لیست قیمت لوله پلی اتیلن بوکان
- استعلام قیمت لوله پلی اتیلن

Do not publish stale or fabricated price tables.

Page should explain verified factors that determine quotation and provide a clear RFQ workflow.

### Sprint 7 — English opportunity expansion

Existing early signals show Google is already testing:

- HDPE temperature derating
- installation/trench queries
- PE100 dimensions

Priorities:

1. Strengthen the existing English temperature/pressure page before creating new content.
2. Strengthen installation guide around trench/install intent.
3. Strengthen PE100 technical guide for dimensions/specification intent using only verified data.
4. Add English parity for legitimate FA-only Technical Center pages after ownership is confirmed.

## Internal-link architecture

Target flow:

```text
/fa
  -> /fa/polyethylene-pipe
      -> /fa/products/pe100-pipe
      -> /fa/products/water-supply-pipe
      -> /fa/products/gas-pipe
      -> /fa/products/irrigation-pipe
      -> /fa/technical-center/polyethylene-pipe-specifications
      -> /fa/technical-center/polyethylene-pipe-standards
      -> /fa/technical-center/polyethylene-pipe-welding
      -> /fa/request-quote
```

Support pages must point upward to their commercial/pillar owner. Do not create circular keyword duplication.

## Authority layer

After the main on-site owners are strong:

1. Recover legacy backlink equity through correct 301s.
2. Build citations/profiles only on legitimate industrial/business directories.
3. Seek real links from project partners, suppliers, contractors, industry media and technical references where a genuine relationship exists.
4. Create link-worthy engineering assets only when technically validated (calculator, verified specification guide, downloadable technical reference).
5. Avoid bulk/free spam backlink campaigns.

## Measurement protocol

Track every 7-14 days using settled GSC data.

For each owner record:

- impressions
- clicks
- CTR
- avg position
- unique query count
- query-page cannibalization

Milestones:

- Stage A: page begins receiving non-brand impressions
- Stage B: average position enters top 50
- Stage C: top 20
- Stage D: top 10
- Stage E: top 3

Do not judge a page on one-day ranking noise.

## Immediate implementation order

1. Legacy redirect destination validation and activation plan
2. Wave B: Water, Gas, Irrigation
3. Standards + Welding + PE80/PE100 technical depth
4. Sewage product/application ownership cleanup
5. Home manufacturer intent reinforcement
6. RFQ/price intent refinement
7. English technical opportunity expansion
8. External authority campaign

## Guardrails

- No invented facts.
- No duplicate keyword landing pages.
- No arbitrary 3,000-5,000 word targets.
- No keyword stuffing.
- No mass AI-generated article program.
- No fake reviews, projects, certifications, lab scope, capacity, pricing or standards claims.
- No route changes unless the intent map requires them and migration implications are handled first.
