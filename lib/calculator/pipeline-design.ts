/**
 * Pipeline design calculator — ported UX from legacy bukanpipe.com/pipeline_design/
 * Formulas use Hazen-Williams (C≈145 for PE per legacy note) until factory validates exact coefficients.
 */

export type PeGrade = "PE80" | "PE100";

export type PipeOption = {
  externalDiameterMm: number;
  sdr: number;
  pn: number;
  wallThicknessMm: number;
  internalDiameterMm: number;
  velocityMs: number;
  frictionLossM: number;
  totalHeadM: number;
  motorPowerKw: number;
  status: "ok" | "high-velocity" | "low-velocity";
};

export type PipelineInputs = {
  wellDepthM: number;
  verticalLiftM: number;
  flowM3h: number;
  pipeLengthM: number;
  grade: PeGrade;
  sdr: number;
  pn: number;
  externalDiametersMm: readonly number[];
  motorReservePercent: number;
  hazenWilliamsC?: number;
};

const DEFAULT_C = 145;
const RHO = 1000;
const G = 9.81;
const PUMP_EFFICIENCY = 0.75;

function internalDiameterMm(externalMm: number, sdr: number): number {
  return externalMm * (1 - 2 / sdr);
}

function wallThicknessMm(externalMm: number, sdr: number): number {
  return externalMm / (2 * sdr);
}

/** Hazen-Williams head loss (m) — Q in m³/s, D in m, L in m */
function hazenWilliamsHeadLoss(
  flowM3s: number,
  diameterM: number,
  lengthM: number,
  c: number,
): number {
  if (diameterM <= 0 || flowM3s <= 0 || lengthM <= 0) return 0;
  const qLs = flowM3s * 1000;
  return 10.67 * lengthM * Math.pow(qLs / c, 1.852) * Math.pow(diameterM, -4.871);
}

function motorPowerKw(headM: number, flowM3s: number, reservePercent: number): number {
  const base = (RHO * G * headM * flowM3s) / (PUMP_EFFICIENCY * 1000);
  return base * (1 + reservePercent / 100);
}

function velocityStatus(velocityMs: number): PipeOption["status"] {
  if (velocityMs > 2.5) return "high-velocity";
  if (velocityMs < 0.5) return "low-velocity";
  return "ok";
}

export function calculatePipelineOptions(inputs: PipelineInputs): PipeOption[] {
  const c = inputs.hazenWilliamsC ?? DEFAULT_C;
  const flowM3s = inputs.flowM3h / 3600;

  return inputs.externalDiametersMm.map((de) => {
    const di = internalDiameterMm(de, inputs.sdr);
    const diM = di / 1000;
    const area = Math.PI * Math.pow(diM / 2, 2);
    const velocity = area > 0 ? flowM3s / area : 0;
    const friction = hazenWilliamsHeadLoss(flowM3s, diM, inputs.pipeLengthM, c);
    const totalHead = inputs.verticalLiftM + friction;
    const power = motorPowerKw(totalHead, flowM3s, inputs.motorReservePercent);

    return {
      externalDiameterMm: de,
      sdr: inputs.sdr,
      pn: inputs.pn,
      wallThicknessMm: wallThicknessMm(de, inputs.sdr),
      internalDiameterMm: di,
      velocityMs: velocity,
      frictionLossM: friction,
      totalHeadM: totalHead,
      motorPowerKw: power,
      status: velocityStatus(velocity),
    };
  });
}

export function recommendDiameter(options: readonly PipeOption[]): PipeOption | null {
  const ok = options.filter((o) => o.status === "ok");
  if (ok.length === 0) return options[0] ?? null;
  return ok.reduce((best, cur) => (cur.velocityMs < best.velocityMs ? cur : best));
}
