# Calculator Validation — Pipeline Design

**Source:** https://bukanpipe.com/pipeline_design/  
**Implementation:** `lib/calculator/pipeline-design.ts`  
**Tests:** `lib/calculator/pipeline-design.test.ts`

## Status: PARTIALLY VERIFIED

Legacy JavaScript source was **not** extracted in this phase. Formulas are documented assumptions aligned with legacy UI text.

## Input mapping

| Legacy (observed) | New field | Units | Status |
|---|---|---|---|
| عمق چاه | wellDepthM | m | VERIFIED_LEGACY — informational only, excluded from head |
| ارتفاع عمودی تا استخر | verticalLiftM | m | VERIFIED_LEGACY — added to total head |
| دبی | flowM3h | m³/h | VERIFIED_LEGACY |
| جنس / SDR / PN | grade, sdr, pn | — | UI only; PN not used in HW formula |
| قطر خارجی (list) | externalDiametersMm | mm | VERIFIED_LEGACY |
| ضریب ذخیره توان | motorReservePercent | % | VERIFIED_LEGACY |
| — | pipeLengthM | m | **ADDED** — not visible on fetched legacy HTML; required for friction |

## Formulas

### Internal diameter (ISO 4427 SDR = de / en)

```
en = de / SDR
di = de - 2·en = de·(1 - 2/SDR)
```

**Uncertainty:** If legacy used SDR = de/(2en), formula would be di = de·(1 - 1/SDR). Confirm with factory engineer.

### Velocity

```
Q (m³/s) = Q_m3h / 3600
v = Q / (π·(di/2)²)
```

### Hazen-Williams head loss

Legacy note: C ≈ 140–150 for PE. Implementation uses **C = 145** default.

```
hf = 10.67 · L · (Q_L/s / C)^1.852 · D(m)^(-4.871)
```

**Uncertainty:** Legacy JS coefficients not byte-matched.

### Total head

```
H = verticalLiftM + hf
```

Well depth explicitly **not** included (matches legacy description).

### Motor power

```
P (kW) = ρ·g·H·Q / (η·1000) · (1 + reserve/100)
```

η = **0.75** assumed (not stated on legacy page).

## Test vectors (deterministic)

See unit tests — baseline: lift=150m, Q=10m³/h, L=200m, SDR=11, De=110mm → Di≈90mm.

## Recommendation before production

1. Extract legacy minified JS from live or archived page  
2. Compare 3–5 reference rows from legacy output table  
3. Confirm whether pipe length is implicit in legacy or user-entered elsewhere  
4. Confirm SDR definition used in legacy Di calculation

**CALCULATOR_VERIFIED = NO** until step 1–2 complete.
