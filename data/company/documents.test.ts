import { describe, expect, it } from "vitest";
import {
  companyDocuments,
  licensedCapacities,
  publishedDocuments,
  withheldDocuments,
  totalLicensedTonnesPerYear,
} from "@/data/company/documents";
import { awards, AWARD_ARCHIVE_SIZE, awardsByCategory } from "@/data/company/awards";
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
      "awards",
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

describe("awards", () => {
  it("publishes 27 of the 48 catalogued plaques", () => {
    expect(AWARD_ARCHIVE_SIZE).toBe(48);
    expect(awards).toHaveLength(27);
  });

  it("uses unique ids", () => {
    const ids = awards.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every award a printed year and an issuer in both locales", () => {
    const incomplete = awards.filter(
      (a) => !a.year.trim() || !a.issuer.fa.trim() || !a.issuer.en.trim(),
    );
    expect(incomplete.map((a) => a.id)).toEqual([]);
  });

  it("never carries a year the archive marked as inferred", () => {
    // The archive flags these with "نام فایل" or "شعار سال". Neither is a date,
    // so no published year may contain that wording.
    const inferred = awards.filter(
      (a) => a.year.includes("نام فایل") || a.year.includes("شعار"),
    );
    expect(inferred.map((a) => a.id)).toEqual([]);
  });

  it("keeps the seven standards-organisation quality awards", () => {
    expect(awardsByCategory("quality")).toHaveLength(7);
  });

  it("claims the quality awards only between 1388 and 1397", () => {
    const years = awardsByCategory("quality").map((a) =>
      Number((a.year.match(/13\d\d/) ?? ["0"])[0]),
    );
    expect(Math.min(...years)).toBe(1388);
    expect(Math.max(...years)).toBe(1397);
  });

  it("renders the awards table on the certifications page in both locales", () => {
    for (const locale of ["fa", "en"] as const) {
      const doc = getContentCatalog(locale).find((d) => d.path === "/certifications");
      const hasAwards = doc!.sections.some(
        (b) => b.type === "document-table" && b.table === "awards",
      );
      expect(hasAwards, locale).toBe(true);
    }
  });
});
