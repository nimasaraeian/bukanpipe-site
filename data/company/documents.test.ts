import { describe, expect, it } from "vitest";
import {
  companyDocuments,
  licensedCapacities,
  publishedDocuments,
  withheldDocuments,
  totalLicensedTonnesPerYear,
} from "@/data/company/documents";
import { getContentCatalog } from "@/lib/content/registry";
import type { ContentBlock } from "@/content/models/content-document";

/**
 * The registry is transcribed from the factory's own documents, so the tests
 * guard the two things a transcription can get wrong: a number that drifts
 * from the document, and — the expensive one — a lapsed certificate reaching
 * a public page. A supplier's site claiming an accreditation it no longer
 * holds is worse than claiming nothing.
 */
describe("company documents", () => {
  it("gives every document an issuer and a scope in both locales", () => {
    const incomplete = companyDocuments.filter(
      (doc) =>
        !doc.issuer.fa.trim() ||
        !doc.issuer.en.trim() ||
        !doc.scope.fa.trim() ||
        !doc.scope.en.trim(),
    );
    expect(incomplete.map((doc) => doc.id)).toEqual([]);
  });

  it("uses unique ids", () => {
    const ids = companyDocuments.map((doc) => doc.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("never publishes a document without saying who issued it", () => {
    for (const doc of publishedDocuments()) {
      expect(doc.issuer.fa.length).toBeGreaterThan(3);
    }
  });

  it("gives every withheld document a reason", () => {
    const silent = withheldDocuments().filter((doc) => !doc.note);
    expect(silent.map((doc) => doc.id)).toEqual([]);
  });

  it("withholds exactly the documents whose validity is not established", () => {
    expect(withheldDocuments().map((doc) => doc.id).sort()).toEqual([
      "gas-vendor-qualification",
      "naci-17025",
    ]);
  });

  it("keeps the three mandatory standard marks published", () => {
    const marks = publishedDocuments("standard-mark");
    expect(marks.map((doc) => doc.id).sort()).toEqual([
      "standard-mark-gas",
      "standard-mark-irrigation",
      "standard-mark-water",
    ]);
  });

  it("names the standard each mark covers", () => {
    const scopes = publishedDocuments("standard-mark").map((doc) => doc.scope.fa);
    expect(scopes.some((s) => s.includes("۱۴۴۲۷-۲"))).toBe(true);
    expect(scopes.some((s) => s.includes("۱۱۲۳۳-۲"))).toBe(true);
    expect(scopes.some((s) => s.includes("۷۶۰۷"))).toBe(true);
  });

  it("withholds the gas mark's licence number rather than inventing one", () => {
    const gas = companyDocuments.find((doc) => doc.id === "standard-mark-gas")!;
    expect(gas.reference).toBeUndefined();
    expect(gas.note?.fa).toContain("خوانا");
  });

  it("carries the four licensed capacities and their sum", () => {
    expect(licensedCapacities).toHaveLength(4);
    expect(totalLicensedTonnesPerYear).toBe(14000);
    expect(licensedCapacities.map((row) => row.tonnesPerYear)).toEqual([
      6375, 4775, 2550, 300,
    ]);
  });
});

describe("certifications page", () => {
  function blocksOf(path: string): readonly ContentBlock[] {
    const doc = getContentCatalog("fa").find((d) => d.path === path);
    expect(doc, `${path} should exist`).toBeDefined();
    return doc!.sections;
  }

  it("renders every document group plus the capacity table", () => {
    const tables = blocksOf("/certifications")
      .filter((b): b is Extract<ContentBlock, { type: "document-table" }> =>
        b.type === "document-table",
      )
      .map((b) => b.table);

    expect(tables).toEqual([
      "standard-mark",
      "management-system",
      "sector-approval",
      "registration",
      "capacity",
    ]);
  });

  it("gives every document table a caption", () => {
    for (const locale of ["fa", "en"] as const) {
      for (const doc of getContentCatalog(locale)) {
        for (const block of doc.sections) {
          if (block.type === "document-table") {
            expect(block.caption.trim().length, `${doc.path}`).toBeGreaterThan(3);
          }
        }
      }
    }
  });

  it("does not name a withheld document anywhere in published content", () => {
    const withheldRefs = withheldDocuments()
      .map((doc) => doc.reference)
      .filter((ref): ref is string => Boolean(ref));

    const hits: string[] = [];
    for (const locale of ["fa", "en"] as const) {
      for (const doc of getContentCatalog(locale)) {
        const text = JSON.stringify(doc);
        for (const ref of withheldRefs) {
          if (text.includes(ref)) hits.push(`${doc.path} names ${ref}`);
        }
      }
    }
    expect(hits).toEqual([]);
  });
});
