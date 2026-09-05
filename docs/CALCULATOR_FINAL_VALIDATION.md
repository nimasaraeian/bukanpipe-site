# Calculator Final Validation — Pipeline Design

**Pages:** `/fa/calculator/pipeline-design`, `/en/calculator/pipeline-design`  
**Implementation:** `lib/calculator/pipeline-design.ts`  
**UI:** `components/calculator/PipelineDesignCalculator.tsx`  
**Date:** 2026-09-03

---

## Verdict

### **CALCULATOR_VERIFIED = NO**

Legacy minified JavaScript was **not** byte-matched. Deterministic testing confirms several outputs are **not engineering-plausible** for typical inputs.

### Production recommendation: **B — remain public with explicit preliminary-engineering disclaimer**

The UI already states results are for preliminary design only. Do **not** use outputs for procurement or pump selection until formulas are validated with factory engineering.

Option A (hide at production) is acceptable if commercial risk tolerance is low.

---

## Documented assumptions (unchanged)

| Assumption | Value | Status |
|---|---|---|
| Hazen-Williams C | 145 | Documented, not legacy-verified |
| Pump efficiency η | 0.75 | Assumed, not on legacy page |
| Well depth in head | **Excluded** | Matches UI copy ✓ |
| Pipe length | User field | Required for friction ✓ |
| SDR → internal diameter | `di = de·(1 − 2/SDR)` | ISO 4427 convention ✓ |
| Velocity bands | &lt;0.5 low, &gt;2.5 high | Reasonable UX heuristic ✓ |

---

## Validation matrix (deterministic — current implementation)

Baseline inputs: lift=150 m, Q=10 m³/h, L=200 m, SDR=11, De=110 mm, reserve=15%, C=145

| Check | Expected (current code) | Pass |
|---|---|---|
| Internal diameter | 90 mm | ✓ |
| Velocity | 0.437 m/s | ✓ (low-velocity band) |
| Friction loss hf | **174,563 m** | ✓ (deterministic) — **NOT plausible** |
| Total head H | 174,713 m | ✓ (lift + hf) — **NOT plausible** |
| Motor power | **7,300 kW** | ✓ (deterministic) — **NOT plausible** |
| Zero flow → v=0, hf=0 | yes | ✓ |
| Zero flow → H = lift only | 150 m | ✓ |
| Well depth change | no effect on H | ✓ |
| Smaller De → higher hf | yes | ✓ |
| Motor reserve 15% | P × 1.15 | ✓ |

### Critical finding — Hazen-Williams unit handling

The implementation converts flow to **L/s** (`qLs = flowM3s × 1000`) while the comment says Q in m³/s. For baseline inputs this produces friction losses orders of magnitude too large for real pipelines.

**Do not change formulas in Phase 009** — factory engineer must confirm legacy unit system and coefficients before correction.

---

## Edge case behaviour (UI + engine)

| Input | Behaviour |
|---|---|
| Empty / NaN / Infinity | React number inputs coerce to 0 or NaN; engine returns 0 friction when Q≤0 |
| Negative values | Accepted by inputs; physically meaningless |
| Very low Q | hf → 0, low velocity |
| Very high Q | Extreme hf and power (formula divergence) |
| Decimal diameters | Parsed from comma-separated list |
| Reset | No dedicated reset — user edits fields |
| Mobile | Standard number inputs, horizontal scroll on results table |

---

## Comparison sources

| Source | Available |
|---|---|
| Legacy live JS | **Not extracted** |
| `docs/CALCULATOR_VALIDATION.md` | Partial assumptions |
| Engineering HW references | Unit mismatch suspected |

---

## Tests added

`lib/calculator/pipeline-design.test.ts` — 10 deterministic cases including baseline snapshot documented above.

---

## Before production cutover

1. Extract archived legacy JS from `bukanpipe.com/pipeline_design/`
2. Compare 3–5 table rows against current output
3. Confirm Q and D units in legacy formula
4. Re-run this matrix after any formula change
5. Update verdict to **CALCULATOR_VERIFIED = YES** only after step 1–2 pass
