# English Internal Link Map — Phase 008

Bidirectional FA ↔ EN hreflang exists for all paths in this map where both locales publish the same path.

## Home (`/en`)

| Target | Anchor pattern | Purpose |
|--------|----------------|---------|
| `/en/products/water-supply-pipe` | HDPE Water Pipe | Product discovery |
| `/en/products/gas-pipe` | HDPE Gas Pipe | Product discovery |
| `/en/products/irrigation-pipe` | HDPE Irrigation Pipe | Product discovery |
| `/en/products/pe100-pipe` | PE100 Pipe | Product discovery |
| `/en/polyethylene-pipe` | HDPE pipe guide | Educational pillar |
| `/en/applications/*` | Explore applications | Use-case routing |
| `/en/technical-center` | Technical Center | Engineering resources |
| `/en/calculator/pipeline-design` | Pipeline design calculator | Tool conversion |
| `/en/laboratory` | Laboratory | QC credibility |
| `/en/quality`, `/en/certifications` | Quality / Certifications | Trust |
| `/en/about` | About the factory | Company story |
| `/en/request-quote` | Request a Quote | Primary CTA |

## Pillar (`/en/polyethylene-pipe`)

| Target | Context |
|--------|---------|
| All 6 product pages | Selection by application |
| 5 application pages | Use-case depth |
| 3 technical articles | SDR, welding, air valves |
| `/en/request-quote` | Spec CTA |

## Products (each `/en/products/{slug}`)

| Target | Context |
|--------|---------|
| Related products | Cross-sell same buyer |
| Related applications | Use-case context |
| Related articles | Engineering support |
| `/en/laboratory/services`, `/en/laboratory/test-scope` | QC proof |
| Spec CTA → `/en/request-quote` | Conversion |

## Applications (each `/en/applications/{slug}`)

| Target | Context |
|--------|---------|
| Related products | Procurement path |
| Related articles (where set) | Design guidance |
| No duplicate product body | Intent separation |

## Technical Center

| Hub → articles | Article → products/applications |
|----------------|--------------------------------|
| Welding, temperature, air valve | Water/gas products, water transfer app |
| Subsurface irrigation | Irrigation product, agriculture app |

## Laboratory

| Page | Links |
|------|-------|
| Hub | services, iso-17025, test-scope |
| Services | products (water, gas) |
| ISO 17025 | services, test-scope |
| Quality page | laboratory/services, test-scope, iso-17025 |

## Company

| Page | Links |
|------|-------|
| About | water, gas, irrigation products; laboratory/services |
| Contact | (standalone — tel/mailto in content blocks) |
| Certifications | laboratory/iso-17025 |

## Navigation & footer (EN)

Primary nav mirrors FA IA: Home, Products, Applications, Laboratory, Technical Center, Downloads, Calculator, About, Contact.

Footer columns: Products (hub + water + gas + PE100 + pillar), Resources (technical center, calculator, downloads, applications), Company (about, quality, laboratory, contact).

## Anchor diversity rules

- Avoid repeating exact-match "HDPE pipe manufacturer" from every section
- Product links use product titles ("HDPE Water Pipe", not "buy HDPE water pipe")
- Application links use use-case names ("Water Transfer Systems")
- Article links use topic titles ("HDPE Pipe Welding")

## Verified graph stats (automated)

`lib/content/internal-links.test.ts` crawls EN nav, footer, home cards, breadcrumbs, and `related` fields — zero broken internal links required.
