import tables from "../../bukanpipe-dimension-tables.json";

/**
 * Factory dimension tables, transcribed verbatim from the Bukan Pipe
 * catalogue. Nothing here is computed — a `null` is a dash in the catalogue,
 * meaning that diameter is not offered in that SDR.
 *
 * The catalogue publishes no kg/m figures, so no row carries
 * `weightKgPerMApprox` and `flags.showWeightColumn` stays false. See
 * `shouldShowWeightColumn()`.
 */
export type WaterColumn = {
  sdr: number;
  pnPe80: number | null;
  pnPe100: number | null;
};

export type WaterRow = {
  dnMm: number;
  wallThicknessMm: readonly (number | null)[];
  weightKgPerMApprox?: readonly (number | null)[];
};

export type GasThickness = { min: number; tolerancePlus: number };

export type GasRow = {
  nominalSizeMm: number;
  maxExternalDiameterMm: number;
  maxDoubleWidthBranchMm: number;
  eMinSdr11Mm: GasThickness | null;
  eMinSdr13_6Mm: GasThickness | null;
  packageTypes: readonly string[];
  packingLengthM: readonly string[];
  yellowBarWidthDepthMm: string;
  weightKgPerMApprox?: number | null;
};

export type IrrigationColumn = {
  series: string;
  sdr: number;
  pnPe32: number | null;
  pnPe40: number | null;
};

export type IrrigationRow = {
  nominalSizeMm: number;
  wallThicknessMm: readonly (number | null)[];
  weightKgPerMApprox?: readonly (number | null)[];
};

export const dimensionSource = tables.source;

export const waterSupplyTable = tables.tables.waterSupply as {
  id: string;
  standard: string;
  materials: readonly string[];
  measure: string;
  unit: string;
  legend: Record<string, string>;
  columns: readonly WaterColumn[];
  rows: readonly WaterRow[];
};

export const gasSupplyTable = tables.tables.gasSupply as {
  id: string;
  standard: string;
  measure: string;
  unit: string;
  note: string;
  rows: readonly GasRow[];
};

export const dripIrrigationTable = tables.tables.dripIrrigation as {
  id: string;
  standard: string;
  materials: readonly string[];
  measure: string;
  unit: string;
  catalogueNotes: readonly string[];
  columns: readonly IrrigationColumn[];
  rows: readonly IrrigationRow[];
};

export type PackagingRow = {
  sdr: string;
  nominalPressureAtm: string;
  sizeFromMm: number;
  sizeToMm: number;
  packageType: "coil" | "branch";
  packingLengthM: readonly string[];
  /** The catalogue marks only the three lightest-wall SDRs for sewerage. */
  use: "water-supply" | "water-supply-sewerage";
};

export type CoilRow = {
  pipeSizesMm: readonly string[];
  packageType: "coil" | "branch";
  packingLengthM: readonly string[];
  coilOuterDiameterM: string | null;
};

export const packagingTable = tables.tables.packaging as {
  id: string;
  note: string;
  rows: readonly PackagingRow[];
};

export const coilDimensionsTable = tables.tables.coilDimensions as {
  id: string;
  note: string;
  rows: readonly CoilRow[];
};

/** The SDRs the catalogue lists for sewerage, not just water supply. */
export function sewerageSdrRows(): readonly PackagingRow[] {
  return packagingTable.rows.filter((row) => row.use === "water-supply-sewerage");
}

/**
 * The weight column stays off until the factory confirms kg/m values.
 * Flipping `flags.showWeightColumn` in the JSON is not enough on its own —
 * the rows have to carry the numbers too, which today they do not.
 */
export function shouldShowWeightColumn(): boolean {
  return tables.flags.showWeightColumn === true;
}

/** Non-empty wall-thickness cells — what the row-count tests assert. */
export function countFilledCells(
  rows: readonly { wallThicknessMm: readonly (number | null)[] }[],
): number {
  return rows.reduce(
    (total, row) => total + row.wallThicknessMm.filter((v) => v !== null).length,
    0,
  );
}
