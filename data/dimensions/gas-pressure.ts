import { gasSupplyTable, waterSupplyTable } from "@/data/dimensions";

/**
 * Maximum operating pressure of PE gas pipe, from the ISO 4437 / ISO 12162
 * design relation:
 *
 *   MOP (bar) = 20 × MRS (MPa) ÷ (C × (SDR − 1))
 *
 * MRS is the material's minimum required strength at 20 °C over 50 years
 * (PE80 = 8 MPa, PE100 = 10 MPa). C is the overall service (design)
 * coefficient: at least 2 for gas, against 1.25 for water, which is why a gas
 * pipe of the same SDR is rated well below the PN printed on a water pipe.
 *
 * The figures are the upper bound the standard allows at 20 °C. The gas
 * operator's own specification may set a lower MOP, and fittings, valves and
 * temperature can limit a section further; the page says so beside the table.
 */

export const MRS_MPA = { PE80: 8, PE100: 10 } as const;
export type PeGrade = keyof typeof MRS_MPA;

/** Minimum design coefficient for gas (ISO 4437) and the usual one for water. */
export const DESIGN_COEFFICIENT = { gas: 2, water: 1.25 } as const;

/** The SDR series the gas table is produced in, read from the table itself. */
export const GAS_SDRS: readonly number[] = [
  ...(gasSupplyTable.rows.some((row) => row.eMinSdr11Mm !== null) ? [11] : []),
  ...(gasSupplyTable.rows.some((row) => row.eMinSdr13_6Mm !== null) ? [13.6] : []),
];

export function maxOperatingPressureBar(mrsMpa: number, coefficient: number, sdr: number): number {
  return (20 * mrsMpa) / (coefficient * (sdr - 1));
}

/** Rounded down to 0.1 bar, so a rounded figure never overstates the limit. */
export function roundDownTenth(value: number): number {
  return Math.floor(value * 10 + 1e-9) / 10;
}

export type GasPressureRow = {
  grade: PeGrade;
  mrsMpa: number;
  /** MOP per SDR in GAS_SDRS order, gas coefficient. */
  mopBar: readonly number[];
  /**
   * The PN the catalogue's water table gives the same SDR and grade, for
   * contrast — read from the table, not computed, because PN is rounded to
   * the standard series (PE80 SDR 11 is PN 12.5, not the formula's 12.8).
   */
  waterPnBar: readonly (number | null)[];
};

export const gasPressureRows: readonly GasPressureRow[] = (Object.keys(MRS_MPA) as PeGrade[]).map(
  (grade) => ({
    grade,
    mrsMpa: MRS_MPA[grade],
    mopBar: GAS_SDRS.map((sdr) =>
      roundDownTenth(maxOperatingPressureBar(MRS_MPA[grade], DESIGN_COEFFICIENT.gas, sdr)),
    ),
    waterPnBar: GAS_SDRS.map((sdr) => {
      const column = waterSupplyTable.columns.find((col) => col.sdr === sdr);
      if (!column) return null;
      return grade === "PE80" ? column.pnPe80 : column.pnPe100;
    }),
  }),
);
