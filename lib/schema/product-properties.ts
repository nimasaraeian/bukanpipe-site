import type { ContentBlock } from "@/content/models/content-document";

/**
 * Product properties, taken from the spec table the page already draws.
 *
 * Structured data that a reader cannot check against the page is worse than
 * none: it is a claim with nothing behind it. So rather than keeping a second
 * list of diameters and pressure classes for machines, this reads the rows of
 * the document's own spec-table block — the table printed under "مشخصات" —
 * and turns each row into a PropertyValue. A page that stops showing a row
 * stops declaring it, in the same edit.
 */

/** Labels the spec tables use for the material grade, in both languages. */
const MATERIAL_LABELS = ["گرید ماده", "Material grade"];
/** …and for the pipe type, which names the polymer where no grade row exists. */
const TYPE_LABELS = ["نوع لوله", "Pipe type"];
/** The manufacturer row is the company, said elsewhere in the graph already. */
const SKIP_LABELS = ["تولیدکننده", "Manufacturer"];

export type SpecRow = { label: string; value: string };

export function specRowsOf(sections: readonly ContentBlock[]): readonly SpecRow[] {
  return sections.flatMap((block) =>
    block.type === "spec-table" ? block.rows.map((row) => ({ ...row })) : [],
  );
}

/**
 * schema.org/material wants what the thing is made of. The grade row says it
 * exactly ("PE100 / PE80 …"); where a product has no grade row the pipe-type
 * row still names the polymer ("single-wall HDPE"), which is the honest
 * second choice. Neither present means no material claim.
 */
export function materialOf(rows: readonly SpecRow[]): string | undefined {
  const byLabel = (labels: string[]) =>
    rows.find((row) => labels.some((label) => row.label.trim() === label))?.value;
  return byLabel(MATERIAL_LABELS) ?? byLabel(TYPE_LABELS);
}

export function additionalPropertiesOf(
  rows: readonly SpecRow[],
): readonly Record<string, unknown>[] | undefined {
  const properties = rows
    .filter((row) => !SKIP_LABELS.some((label) => row.label.trim() === label))
    .map((row) => ({
      "@type": "PropertyValue",
      name: row.label,
      value: row.value,
    }));
  return properties.length > 0 ? properties : undefined;
}
