import { describe, expect, it } from "vitest";
import {
  calculatePipelineOptions,
  recommendDiameter,
} from "@/lib/calculator/pipeline-design";

describe("pipeline-design calculator", () => {
  const baseInputs = {
    wellDepthM: 20,
    verticalLiftM: 150,
    flowM3h: 10,
    pipeLengthM: 200,
    grade: "PE100" as const,
    sdr: 11,
    pn: 16,
    externalDiametersMm: [110, 125, 140],
    motorReservePercent: 15,
    hazenWilliamsC: 145,
  };

  it("computes internal diameter from external and SDR (ISO 4427 convention)", () => {
    const options = calculatePipelineOptions(baseInputs);
    const row = options[0]!;
    // De=110, SDR=11 → Di = 110*(1-2/11) ≈ 90
    expect(row.internalDiameterMm).toBeCloseTo(90, 0);
    expect(row.wallThicknessMm).toBeCloseTo(110 / 22, 1);
  });

  it("increases friction loss for smaller diameters", () => {
    const options = calculatePipelineOptions(baseInputs);
    const small = options.find((o) => o.externalDiameterMm === 110)!;
    const large = options.find((o) => o.externalDiameterMm === 140)!;
    expect(small.frictionLossM).toBeGreaterThan(large.frictionLossM);
    expect(small.velocityMs).toBeGreaterThan(large.velocityMs);
  });

  it("total head equals vertical lift plus friction", () => {
    const options = calculatePipelineOptions(baseInputs);
    const row = options[0]!;
    expect(row.totalHeadM).toBeCloseTo(baseInputs.verticalLiftM + row.frictionLossM, 5);
  });

  it("applies motor reserve to power", () => {
    const without = calculatePipelineOptions({ ...baseInputs, motorReservePercent: 0 });
    const withReserve = calculatePipelineOptions({ ...baseInputs, motorReservePercent: 15 });
    const idx = 1;
    expect(withReserve[idx]!.motorPowerKw).toBeGreaterThan(without[idx]!.motorPowerKw);
  });

  it("recommendDiameter prefers ok velocity band", () => {
    const options = calculatePipelineOptions({
      ...baseInputs,
      externalDiametersMm: [63, 200, 315],
    });
    const rec = recommendDiameter(options);
    expect(rec?.status).toBe("ok");
  });

  it("handles zero flow gracefully", () => {
    const options = calculatePipelineOptions({ ...baseInputs, flowM3h: 0 });
    expect(options[0]!.velocityMs).toBe(0);
    expect(options[0]!.frictionLossM).toBe(0);
  });
});
