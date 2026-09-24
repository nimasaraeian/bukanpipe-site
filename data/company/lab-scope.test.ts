import { describe, expect, it } from "vitest";
import { labScope, labTestCount, labMethodStandards } from "@/data/company/lab-scope";
import { withheldDocuments } from "@/data/company/documents";
import { getContentCatalog } from "@/lib/content/registry";

/**
 * The scope describes what the laboratory can test. The accreditation
 * certificate that the annex belongs to has lapsed on its own stated dates, so
 * the capability is published and the accreditation claim is not. These tests
 * hold that line: the scope must be complete, and the certificate number must
 * still appear nowhere.
 */
describe("laboratory scope", () => {
  it("carries all 16 tests across the three product families", () => {
    expect(labScope.map((g) => g.id)).toEqual(["polyolefin", "polyethylene", "pvc-u"]);
    expect(labScope.map((g) => g.tests.length)).toEqual([9, 3, 4]);
    expect(labTestCount).toBe(16);
  });

  it("gives every test a title in both locales and at least one method standard", () => {
    for (const group of labScope) {
      for (const test of group.tests) {
        expect(test.title.fa.trim().length, test.id).toBeGreaterThan(3);
        expect(test.title.en.trim().length, test.id).toBeGreaterThan(3);
        expect(test.references.length, test.id).toBeGreaterThan(0);
      }
    }
  });

  it("uses unique test ids", () => {
    const ids = labScope.flatMap((g) => g.tests.map((t) => t.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("reproduces the ranges the annex states", () => {
    const byId = new Map(labScope.flatMap((g) => g.tests.map((t) => [t.id, t] as const)));
    expect(byId.get("internal-pressure")!.range!.en).toContain("100 bar");
    expect(byId.get("dimensions")!.range!.en).toContain("850 mm");
    expect(byId.get("oit")!.range!.en).toContain("232");
    expect(byId.get("charpy")!.range!.en).toContain("15 J");
    expect(byId.get("ring-stiffness")!.range!.en).toContain("900 kgf");
    // Tests the annex gives no range for must not invent one.
    expect(byId.get("mfr")!.range).toBeUndefined();
    expect(byId.get("ash")!.range).toBeUndefined();
  });

  it("names both the national and the ISO reference where the annex does", () => {
    const byId = new Map(labScope.flatMap((g) => g.tests.map((t) => [t.id, t] as const)));
    expect(byId.get("mfr")!.references).toEqual(["INSO 6980-1", "ISO 1133-1"]);
    expect(byId.get("internal-pressure")!.references).toContain("ISO 1167-2");
    expect(labMethodStandards().length).toBeGreaterThan(20);
  });

  it("renders the scope table on the laboratory pages in both locales", () => {
    for (const locale of ["fa", "en"] as const) {
      const withScope = getContentCatalog(locale).filter((doc) =>
        doc.sections.some((b) => b.type === "document-table" && b.table === "lab-scope"),
      );
      expect(withScope.map((d) => d.path).sort(), locale).toEqual([
        "/laboratory",
        "/laboratory/standards",
        "/laboratory/test-scope",
      ]);
    }
  });

  it("still publishes no accreditation number anywhere", () => {
    // The annex arrived; the renewed certificate did not. NACI/Lab/269 stays
    // off every page until a current one exists.
    const naci = withheldDocuments().find((d) => d.id === "naci-17025");
    expect(naci, "NACI accreditation must stay withheld").toBeDefined();

    for (const locale of ["fa", "en"] as const) {
      for (const doc of getContentCatalog(locale)) {
        expect(JSON.stringify(doc), `${doc.path}`).not.toContain("NACI/Lab/269");
      }
    }
  });
});
