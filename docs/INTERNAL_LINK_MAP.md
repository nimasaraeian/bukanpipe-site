# Internal Link Map (Phase 005)

## Hub → children

| From | To |
|---|---|
| `/` | `/products/*`, `/applications/*`, `/polyethylene-pipe`, `/technical-center/*`, `/calculator/pipeline-design`, `/laboratory`, `/about`, `/contact`, `/request-quote` |
| `/polyethylene-pipe` | all 6 products, 5 applications, 3 articles |
| `/products` | 6 product pages |
| `/applications` | 7 application pages |
| `/technical-center` | 4 articles |
| `/laboratory` | 5 subpages |

## Product → outbound (contextual)

| Product | Applications | Articles | Products | Lab |
|---|---|---|---|---|
| gas-pipe | gas-distribution | welding, temp-pressure | pe100, water | services, test-scope |
| water-supply-pipe | water-transfer | temp-pressure, air-vent | pe100, irrigation | services, test-scope |
| sewage-pipe | sewage | — | drainage | services |
| drainage-pipe | drainage | — | sewage | — |
| irrigation-pipe | agriculture-irrigation | subsurface-drip | water-supply | — |
| pe100-pipe | water-transfer, industrial | temp-pressure, air-vent | water, gas | services |

## Application → products

Each application links 1–2 products (see `data/content/fa/applications.ts`).

## Article → products/applications

| Article | Products | Applications |
|---|---|---|
| welding | water, gas | — |
| air-vent | water, pe100 | water-transfer |
| temp-pressure | pe100, water | — |
| subsurface-drip | irrigation | agriculture-irrigation |

## Legacy stub redirects (in-app)

| Old route | New |
|---|---|
| `/engineering` | `/technical-center` |
| `/knowledge` | `/technical-center` |
| `/tools` | `/calculator` |
| `/standards` | `/downloads` |

## Orphan check

All 6 products receive links from: home, `/products` hub, `/polyethylene-pipe`, ≥1 application, ≥0 articles.

Pillar `/polyethylene-pipe` linked from home hero secondary CTA path.

No product page is orphan.
