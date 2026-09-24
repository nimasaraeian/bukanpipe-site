import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  countFilledCells,
  dripIrrigationTable,
  gasSupplyTable,
  shouldShowWeightColumn,
  waterSupplyTable,
} from "@/data/dimensions";
import {
  DripIrrigationDimensionTable,
  GasSupplyDimensionTable,
  WaterSupplyDimensionTable,
} from "@/components/content/DimensionTables";
import { getContentByPath } from "@/lib/content/registry";
import { buildLanguageAlternates, counterpartPath } from "@/lib/i18n/locale-availability";
import raw from "../../bukanpipe-dimension-tables.json";

const FA_PATH = "/technical-center/polyethylene-pipe-dimensions-table";
const EN_PATH = "/technical-center/hdpe-pipe-dimensions-chart";

/** Count `<td>` and row-header `<th>` cells in rendered markup. */
function countBodyCells(html: string): { rows: number; dataCells: number } {
  const body = html.slice(html.indexOf("<tbody"));
  return {
    rows: (body.match(/<tr/g) ?? []).length,
    dataCells: (body.match(/<td/g) ?? []).length,
  };
}

describe("catalogue figures match the source JSON", () => {
  it("water supply: 25 diameters x 11 SDR columns, 238 filled cells", () => {
    expect(waterSupplyTable.rows).toHaveLength(25);
    expect(waterSupplyTable.columns).toHaveLength(11);
    for (const row of waterSupplyTable.rows) {
      expect(row.wallThicknessMm, `DN${row.dnMm}`).toHaveLength(11);
    }
    expect(countFilledCells(waterSupplyTable.rows)).toBe(238);
  });

  it("gas supply: 9 rows", () => {
    expect(gasSupplyTable.rows).toHaveLength(9);
  });

  it("drip irrigation: 23 filled cells across 5 sizes and 6 columns", () => {
    expect(dripIrrigationTable.rows).toHaveLength(5);
    expect(dripIrrigationTable.columns).toHaveLength(6);
    expect(countFilledCells(dripIrrigationTable.rows)).toBe(23);
  });

  it("carries no invented weight data", () => {
    expect(shouldShowWeightColumn()).toBe(false);
    expect(raw.flags.showWeightColumn).toBe(false);

    // No row carries the field. The flag alone is not the guarantee — the
    // catalogue publishes no kg/m figures, so there is nothing to show.
    const everyRow = [
      ...raw.tables.waterSupply.rows,
      ...raw.tables.gasSupply.rows,
      ...raw.tables.dripIrrigation.rows,
    ];
    for (const row of everyRow) {
      expect(Object.keys(row)).not.toContain("weightKgPerMApprox");
    }
  });
});

describe("rendered tables match the JSON row for row", () => {
  /*
   * 238, not the 236 the catalogue scan gave: the factory's spreadsheet fills
   * DN 25 at SDR 21 and SDR 17, where the scan printed dashes.
   */
  it("water table renders every diameter and every cell", () => {
    const html = renderToStaticMarkup(<WaterSupplyDimensionTable locale="fa" />);
    const { rows, dataCells } = countBodyCells(html);

    expect(rows).toBe(waterSupplyTable.rows.length);
    // Every column is rendered, filled or dashed.
    expect(dataCells).toBe(waterSupplyTable.rows.length * waterSupplyTable.columns.length);
    // The dashes are exactly the nulls.
    const dashes = (html.slice(html.indexOf("<tbody")).match(/—/g) ?? []).length;
    expect(dataCells - dashes).toBe(238);
  });

  /*
   * The scan had the site publishing SDR 11 walls for DN 110-225. The factory's
   * own sheet marks those as not produced, so they must stay null: a filled
   * cell here is the site offering pipe the factory does not make.
   */
  it("offers gas pipe in SDR 11 only up to DN 90", () => {
    const sdr11 = new Map(
      gasSupplyTable.rows.map((row) => [row.nominalSizeMm, row.eMinSdr11Mm]),
    );

    for (const dn of [25, 32, 63, 90]) expect(sdr11.get(dn)).not.toBeNull();
    for (const dn of [110, 125, 160, 200, 225]) expect(sdr11.get(dn)).toBeNull();
  });

  it("carries an e max for every irrigation e min", () => {
    // The scan had no maxima at all; the sheet gives one per filled cell.
    for (const row of dripIrrigationTable.rows) {
      expect(row.wallThicknessMaxMm).toHaveLength(row.wallThicknessMm.length);
      row.wallThicknessMm.forEach((min, i) => {
        const max = row.wallThicknessMaxMm[i];
        if (min === null) expect(max).toBeNull();
        else expect(max).toBeGreaterThan(min);
      });
    }
  });

  it("gas table renders all 9 rows", () => {
    const html = renderToStaticMarkup(<GasSupplyDimensionTable locale="fa" />);
    expect(countBodyCells(html).rows).toBe(9);
    expect(countBodyCells(html).rows).toBe(gasSupplyTable.rows.length);
  });

  it("irrigation table renders 5 sizes and 23 filled cells", () => {
    const html = renderToStaticMarkup(<DripIrrigationDimensionTable locale="en" />);
    const { rows, dataCells } = countBodyCells(html);
    const dashes = (html.slice(html.indexOf("<tbody")).match(/—/g) ?? []).length;

    expect(rows).toBe(5);
    expect(dataCells - dashes).toBe(23);
  });

  it("renders a real table with a caption and scoped headers, not an image", () => {
    const html = renderToStaticMarkup(<WaterSupplyDimensionTable locale="fa" />);

    expect(html).toContain("<table");
    expect(html).toContain("<caption");
    expect(html).toContain('scope="col"');
    expect(html).toContain('scope="row"');
    expect(html).not.toContain("<img");
  });

  it("keeps digits Latin and left-to-right inside the RTL page", () => {
    const html = renderToStaticMarkup(<WaterSupplyDimensionTable locale="fa" />);

    expect(html).toContain('dir="ltr"');
    // No Persian-Indic digits anywhere in the numbers.
    expect(html.slice(html.indexOf("<tbody"))).not.toMatch(/[۰-۹]/);
    expect(html).toContain("630");
  });

  it("only renders the rows an excerpt asks for", () => {
    const html = renderToStaticMarkup(
      <WaterSupplyDimensionTable locale="fa" only={new Set([63, 110])} />,
    );
    expect(countBodyCells(html).rows).toBe(2);
  });
});

describe("the two pages", () => {
  it("exist in both locales and are hreflang partners", () => {
    const fa = getContentByPath("fa", FA_PATH);
    const en = getContentByPath("en", EN_PATH);

    expect(fa, "FA dimensions page missing").toBeDefined();
    expect(en, "EN dimensions page missing").toBeDefined();
    expect(fa!.status).toBe("published");
    expect(en!.status).toBe("published");
  });

  it("pairs the two pages with hreflang despite the different slugs", () => {
    expect(counterpartPath(FA_PATH, "en")).toBe(EN_PATH);
    expect(counterpartPath(EN_PATH, "fa")).toBe(FA_PATH);

    for (const path of [FA_PATH, EN_PATH]) {
      const languages = buildLanguageAlternates(path);
      expect(languages, `no alternates for ${path}`).toBeDefined();
      expect(languages!.fa).toContain(FA_PATH);
      expect(languages!.en).toContain(EN_PATH);
      expect(languages!["x-default"]).toBe(languages!.fa);
    }
  });

  it("carries the titles that were asked for", () => {
    expect(getContentByPath("fa", FA_PATH)!.seoTitle).toBe(
      "جدول سایز، ضخامت و SDR لوله پلی اتیلن (PE80 و PE100) | بوکان پایپ",
    );
    expect(getContentByPath("en", EN_PATH)!.seoTitle).toBe(
      "HDPE Pipe Dimensions Chart (PE100/PE80, 16–630 mm) | Bukan Pipe",
    );
  });

  it("shows all three tables on each page", () => {
    for (const doc of [getContentByPath("fa", FA_PATH)!, getContentByPath("en", EN_PATH)!]) {
      const tables = doc.sections
        .filter((block) => block.type === "dimension-table")
        .map((block) => (block as { table: string }).table);
      expect(tables.sort()).toEqual(["drip-irrigation", "gas-supply", "water-supply"]);
    }
  });

  it("has FAQs and breadcrumbs for the schema, and links the calculator", () => {
    for (const doc of [getContentByPath("fa", FA_PATH)!, getContentByPath("en", EN_PATH)!]) {
      expect(doc.faqs?.length ?? 0).toBeGreaterThanOrEqual(3);
      expect(doc.breadcrumbs.length).toBe(3);
      expect(JSON.stringify(doc.sections)).toContain("/calculator/pipeline-design");
    }
  });
});

describe("pages that point at the tables", () => {
  const FA_SOURCES = ["/technical-center", "/polyethylene-pipe"];
  const EN_SOURCES = ["/technical-center", "/polyethylene-pipe"];

  it("the technical hub and the PE guide link to the table page", () => {
    for (const path of FA_SOURCES) {
      const doc = getContentByPath("fa", path);
      expect(JSON.stringify(doc!.sections), `fa ${path}`).toContain(FA_PATH);
    }
    for (const path of EN_SOURCES) {
      const doc = getContentByPath("en", path);
      expect(JSON.stringify(doc!.sections), `en ${path}`).toContain(EN_PATH);
    }
  });

  it("the four product pages carry an excerpt of their own table", () => {
    const expected: [string, string][] = [
      ["/products/water-supply-pipe", "water-supply"],
      ["/products/gas-pipe", "gas-supply"],
      ["/products/pe100-pipe", "water-supply"],
      ["/products/irrigation-pipe", "drip-irrigation"],
    ];

    for (const locale of ["fa", "en"] as const) {
      for (const [path, table] of expected) {
        const doc = getContentByPath(locale, path);
        expect(doc, `${locale} ${path}`).toBeDefined();
        const excerpt = doc!.sections.find((block) => block.type === "dimension-excerpt");
        expect(excerpt, `${locale} ${path} has no excerpt`).toBeDefined();
        expect((excerpt as { table: string }).table).toBe(table);
      }
    }
  });

  it("no longer says the table is issued per project", () => {
    for (const locale of ["fa", "en"] as const) {
      for (const path of [
        "/products/water-supply-pipe",
        "/products/gas-pipe",
        "/products/pe100-pipe",
        "/products/irrigation-pipe",
      ]) {
        const text = JSON.stringify(getContentByPath(locale, path)!.sections);
        expect(text, `${locale} ${path}`).not.toContain("برای هر پروژه صادر می‌شود");
        expect(text, `${locale} ${path}`).not.toContain("issued per project");
      }
    }
  });
});
