import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { DimensionTableBlock } from "@/components/content/DimensionTables";
import {
  DESIGN_COEFFICIENT,
  GAS_SDRS,
  gasPressureRows,
  maxOperatingPressureBar,
} from "@/data/dimensions/gas-pressure";
import { gasSupplyTable } from "@/data/dimensions";
import { getContentByPath } from "@/lib/content/registry";
import { buildLanguageAlternates } from "@/lib/i18n/locale-availability";

const GUIDE = "/technical-center/gas-polyethylene-pipe-guide";
const FA_TABLE = "/technical-center/polyethylene-pipe-dimensions-table";
const EN_TABLE = "/technical-center/hdpe-pipe-dimensions-chart";

function guide(locale: "fa" | "en") {
  const doc = getContentByPath(locale, GUIDE);
  expect(doc, `${locale} gas guide`).toBeDefined();
  return doc!;
}

function tablesOn(locale: "fa" | "en") {
  return guide(locale)
    .sections.filter((b) => b.type === "dimension-table")
    .map((b) => (b as { table: string }).table);
}

describe("gas guide tables", () => {
  it("renders the shared gas table with all 9 rows, from the page's own block", () => {
    for (const locale of ["fa", "en"] as const) {
      expect(tablesOn(locale)).toEqual(["gas-supply", "gas-pressure"]);
      const html = renderToStaticMarkup(<DimensionTableBlock table="gas-supply" locale={locale} />);
      const body = html.slice(html.indexOf("<tbody"));
      expect((body.match(/<tr/g) ?? []).length).toBe(9);
      expect(gasSupplyTable.rows).toHaveLength(9);
    }
  });

  it("shows the yellow strip width for every gas row", () => {
    const html = renderToStaticMarkup(<DimensionTableBlock table="gas-supply" locale="en" />);
    expect(html).toContain("Yellow strip width");
    for (const row of gasSupplyTable.rows) expect(html).toContain(row.yellowBarWidthDepthMm!);
  });

  it("computes MOP from the ISO 4437 relation with C = 2 for gas", () => {
    expect(DESIGN_COEFFICIENT).toEqual({ gas: 2, water: 1.25 });
    expect(GAS_SDRS).toEqual([11, 13.6]);
    expect(maxOperatingPressureBar(10, 2, 11)).toBe(10);
    const byGrade = Object.fromEntries(gasPressureRows.map((r) => [r.grade, r]));
    expect(byGrade.PE80!.mopBar).toEqual([8, 6.3]);
    expect(byGrade.PE100!.mopBar).toEqual([10, 7.9]);
    // the water contrast is the catalogue's PN, not a recomputed figure
    expect(byGrade.PE80!.waterPnBar).toEqual([12.5, 10]);
    expect(byGrade.PE100!.waterPnBar).toEqual([16, 12.5]);
  });

  it("renders the pressure table with its formula as the source line", () => {
    const html = renderToStaticMarkup(<DimensionTableBlock table="gas-pressure" locale="fa" />);
    expect(html).toContain("MOP = 20 × MRS ÷ (C × (SDR − 1))");
    expect(html).not.toContain("منبع: کاتالوگ رسمی بوکان پایپ");
    expect((html.slice(html.indexOf("<tbody")).match(/<tr/g) ?? []).length).toBe(2);
  });
});

describe("gas guide content", () => {
  it("keeps its address and carries the requested titles and short descriptions", () => {
    expect(guide("fa").seoTitle).toBe("لوله پلی اتیلن گازرسانی | جدول SDR، ضخامت و استاندارد ۱۱۲۲۳ | بوکان پایپ");
    expect(guide("en").seoTitle).toBe("HDPE Gas Pipe | SDR Chart, Wall Thickness & ISO 4437 | Bukan Pipe");
    for (const locale of ["fa", "en"] as const) {
      expect(guide(locale).path).toBe(GUIDE);
      expect(guide(locale).seoDescription.length).toBeLessThan(160);
    }
  });

  it("no longer says it gives no pressure table or acceptance limits", () => {
    const fa = JSON.stringify(guide("fa"));
    const en = JSON.stringify(guide("en"));
    expect(fa).not.toContain("جدول عددی انتخاب فشار گاز ارائه نمی‌شود");
    expect(fa).not.toContain("حدود پذیرش عددی عمومی تعیین نمی‌کند");
    expect(en).not.toContain("does not provide a numerical gas pressure selection table");
    expect(en).not.toContain("does not set generic numerical acceptance limits");
  });

  it("calls the gas licence an incentive one and keeps the sections that were to stay", () => {
    const fa = JSON.stringify(guide("fa").sections);
    expect(fa).toContain("پروانه کاربرد علامت استاندارد تشویقی گاز ۱۱۲۲۳ از سال ۱۳۹۱");
    expect(fa).not.toMatch(/اجباری[^"]{0,20}۱۱۲۲۳/);
    for (const heading of [
      "مدیریت تغییر و نگهداری اطلاعات شبکه",
      "نمونه بررسی یک مغایرت پیش از مصرف محموله",
      "راهنمای خرید و ارزیابی تولید کننده لوله گاز",
      "آزمون و تحویل؛ مرز مسئولیت‌ها",
    ]) {
      expect(fa, heading).toContain(heading);
    }
    expect(JSON.stringify(guide("en").sections)).toContain("Incentive (voluntary) standard mark licence for gas to INSO 11223");
  });

  it("has FAQs and breadcrumbs for the schema", () => {
    for (const locale of ["fa", "en"] as const) {
      expect(guide(locale).faqs!.length).toBeGreaterThanOrEqual(8);
      expect(guide(locale).breadcrumbs.length).toBe(3);
    }
  });
});

describe("gas guide links", () => {
  it("is an hreflang pair", () => {
    const languages = buildLanguageAlternates(GUIDE)!;
    expect(languages.fa).toContain(`/fa${GUIDE}`);
    expect(languages.en).toContain(`/en${GUIDE}`);
  });

  it("links both ways with the dimensions page", () => {
    expect(JSON.stringify(guide("fa"))).toContain(FA_TABLE);
    expect(JSON.stringify(guide("en"))).toContain(EN_TABLE);
    expect(JSON.stringify(getContentByPath("fa", FA_TABLE)!.sections)).toContain(GUIDE);
    expect(JSON.stringify(getContentByPath("en", EN_TABLE)!.sections)).toContain(GUIDE);
  });

  it("is linked from the gas product page in both locales", () => {
    for (const locale of ["fa", "en"] as const) {
      expect(JSON.stringify(getContentByPath(locale, "/products/gas-pipe")), locale).toContain(GUIDE);
    }
  });
});
