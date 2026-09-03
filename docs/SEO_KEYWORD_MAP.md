# SEO Keyword Map

**Phase:** Content migration  
**Metrics:** volume/CPC/KD = external data required

## Commercial cluster → pages

| Primary keyword | Owner URL | Secondary |
|---|---|---|
| لوله پلی اتیلن | `/polyethylene-pipe` | قیمت، خرید، تولید کننده، کارخانه |
| تولید کننده لوله پلی اتیلن | `/` (FA H1), `/about` | بوکان پایپ |
| خرید لوله پلی اتیلن | `/products/*`, `/request-quote` | — |

## Product cluster

| Keyword | URL |
|---|---|
| لوله پلی اتیلن آبرسانی | `/products/water-supply-pipe` |
| لوله پلی اتیلن گازرسانی | `/products/gas-pipe` |
| لوله پلی اتیلن کشاورزی | `/products/irrigation-pipe` |
| لوله پلی اتیلن فاضلاب | `/products/sewage-pipe` |
| لوله پلی اتیلن زهکشی | `/products/drainage-pipe` |
| لوله PE100 | `/products/pe100-pipe` |

## Technical cluster

| Keyword | URL |
|---|---|
| جوش لوله پلی اتیلن | `/technical-center/polyethylene-pipe-welding` |
| SDR / PN لوله پلی اتیلن | Pillar + product pages (no fake tables) |
| فشار/دمای کاری | `/technical-center/polyethylene-pipe-temperature-pressure` |
| شیر هوا | `/technical-center/air-vent-valve` |
| آبیاری زیرسطحی | `/technical-center/subsurface-drip-irrigation` |
| محاسبه قطر / افت فشار | `/calculator/pipeline-design` |

## Laboratory cluster

| Keyword | URL |
|---|---|
| آزمایشگاه لوله پلی اتیلن | `/laboratory` |
| ISO IEC 17025 | `/laboratory/iso-17025` |
| تست هیدرواستاتیک | `/laboratory/test-scope` |

## Brand

| Keyword | URL |
|---|---|
| بوکان پایپ / لوله پلی اتیلن بوکان | `/`, `/about` |

## Cannibalization rules

1. **Gas:** product owns «لوله گازرسانی»; application owns «کاربرد گاز».
2. **Welding:** article only — not on product H1.
3. **PE100:** product page owns commercial PE100; pillar owns generic «لوله پلی اتیلن».
4. **Legacy `/engineering` and `/knowledge`:** redirect to `/technical-center` — do not maintain duplicate content.

## Internal linking map (high level)

```
/polyethylene-pipe → all /products/*
/products/* → /applications/*, /technical-center/*, /laboratory/*
/applications/* → /products/*
/technical-center/* → /products/*, /calculator/pipeline-design
/laboratory/* → /products/*, /quality
/quality → /laboratory/services
/downloads → products + standards categories
```
