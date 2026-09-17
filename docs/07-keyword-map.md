# Keyword Map — Live Ownership Baseline

Date: 2026-09-17
Source: live site architecture + Google Search Console settled through 2026-09-14.

This file is the canonical Persian keyword ownership map. Do not create a competing landing page for an owned intent without documenting a distinct SERP intent first.

| Priority | Keyword family | Intent | Canonical owner | Current GSC signal | Status |
|---|---|---|---|---|---|
| P0 | لوله پلی اتیلن / لوله های پلی اتیلن | Generic / mixed | `/fa/polyethylene-pipe` | ~68 / ~134 | Wave A enhanced; monitor post-deploy |
| P0 | تولید کننده لوله پلی اتیلن / کارخانه تولید لوله پلی اتیلن / کارخانه لوله پلی اتیلن | Manufacturer | `/fa` | generic factory query ~70; brand variants much stronger | Needs manufacturer-authority reinforcement |
| P0 | لوله PE100 / لوله پلی اتیلن PE100 | Commercial product | `/fa/products/pe100-pipe` | little/no mature visibility yet | Wave A enhanced |
| P0 | SDR در لوله پلی اتیلن / مشخصات فنی / PN | Technical | `/fa/technical-center/polyethylene-pipe-specifications` | SDR ~60 | Wave A enhanced |
| P0 | استاندارد لوله پلی اتیلن / استاندارد لوله های پلی اتیلن | Technical | `/fa/technical-center/polyethylene-pipe-standards` | ~70-86 | Needs technical depth |
| P0 | لوله پلی اتیلن آبرسانی | Commercial product | `/fa/products/water-supply-pipe` | weak / immature | Wave B |
| P0 | لوله پلی اتیلن گاز / لوله گازرسانی پلی اتیلن | Commercial product | `/fa/products/gas-pipe` | weak / immature | Wave B |
| P0 | لوله پلی اتیلن آبیاری / لوله پلی اتیلن کشاورزی | Commercial product | `/fa/products/irrigation-pipe` | weak / immature | Wave B |
| P1 | لوله پلی اتیلن فاضلابی | Commercial product | `/fa/products/sewage-pipe` | application page currently ~62 | Ownership cleanup required |
| P1 | جوش لوله پلی اتیلن / جوش پلی اتیلن | Technical | `/fa/technical-center/polyethylene-pipe-welding` | weak / immature | Technical authority wave |
| P1 | PE80 vs PE100 / لوله پلی اتیلن PE80 چیست | Comparison | `/fa/technical-center/pe80-vs-pe100` | PE80 query ~82 on broader content | Technical authority wave |
| P1 | PE100 چیست | Education | `/fa/technical-center/pe100-technical-guide` | broader PE100 educational query ~75 | Technical authority wave |
| P1 | قیمت لوله پلی اتیلن / لیست قیمت لوله پلی اتیلن بوکان / استعلام قیمت | Transactional | `/fa/request-quote` | brand price query ~7 on legacy/root set | RFQ intent refinement |
| P2 | محاسبه قطر / طراحی خط لوله / افت فشار | Tool | `/fa/calculator/pipeline-design` | early/limited | Keep tool intent separate from product/spec pages |

## English opportunity owners

| Keyword family | Canonical owner | Current signal |
|---|---|---|
| HDPE pipe temperature derating / formula | `/en/technical-center/polyethylene-pipe-temperature-pressure` | ~17.5-19 |
| HDPE installation / trench installation | `/en/technical-center/hdpe-installation-guide` | ~47-57 |
| PE100 pipe dimensions | `/en/technical-center/pe100-technical-guide` | ~49-50 |

## Ownership rules

1. Product pages own commercial product intent.
2. Technical Center pages own engineering/informational intent.
3. Application pages support product owners; they do not duplicate commercial titles/H1s.
4. Home owns manufacturer/factory identity.
5. Request Quote owns price/RFQ intent; no stale price-list route.
6. Supporting content must link to its owner with natural contextual anchors.
7. No new route is justified by keyword variation alone.
8. All technical claims require verified sources; no invented dimensions, pressure ratings, certificates, capacity or prices.

## Measurement cadence

Review settled Search Console data every 7-14 days. Track clicks, impressions, CTR, average position, query count and multiple-page cannibalization for each owner.
