import { describe, expect, it } from "vitest";
import { pipeSizeDocuments, pipeSizeFacts, pipeSizes } from "@/data/content/pipe-sizes";
import raw from "../../bukanpipe-dimension-tables.json";
import { getAllPublishedPaths } from "@/lib/content/registry";

/**
 * These pages exist to answer "لوله پلی اتیلن ۱۱۰" — the way a contractor
 * actually searches when ready to order. Their whole value is that the numbers
 * are the factory's, so the tests check them against the catalogue JSON rather
 * than against a copy of themselves.
 */
const water = raw.tables.waterSupply;

describe("pipe size pages", () => {
  it("covers every catalogue diameter and nothing else", () => {
    expect([...pipeSizes]).toEqual(water.rows.map((r) => r.dnMm));
  });

  it("publishes an index plus one page per diameter, in both locales", () => {
    for (const locale of ["fa", "en"] as const) {
      const docs = pipeSizeDocuments(locale);
      expect(docs).toHaveLength(water.rows.length + 1);
      expect(docs[0]!.path).toBe("/pipe-size");
    }
  });

  it("reproduces the catalogue wall thickness for every diameter and SDR", () => {
    for (const row of water.rows) {
      const facts = pipeSizeFacts(row.dnMm)!;
      const expected = row.wallThicknessMm
        .map((wall, i) => (wall === null ? null : { sdr: water.columns[i]!.sdr, wallMm: wall }))
        .filter((x): x is NonNullable<typeof x> => x !== null);
      expect(facts.classes.map((c) => ({ sdr: c.sdr, wallMm: c.wallMm }))).toEqual(expected);
    }
  });

  it("never invents a pressure rating the catalogue does not state", () => {
    // SDR 6 carries a PE80 figure and no PE100 figure. A page that filled that
    // gap in would be publishing a number the factory never published.
    const sdr6 = water.columns.find((c) => c.sdr === 6)!;
    expect(sdr6.pnPe100).toBeNull();

    for (const dn of pipeSizes) {
      const facts = pipeSizeFacts(dn)!;
      for (const c of facts.classes) {
        const col = water.columns.find((x) => x.sdr === c.sdr)!;
        expect(c.pnPe80).toBe(col.pnPe80);
        expect(c.pnPe100).toBe(col.pnPe100);
      }
    }
  });

  it("marks gas availability only for diameters in the gas table", () => {
    const gasSizes = new Set(raw.tables.gasSupply.rows.map((r) => r.nominalSizeMm));
    for (const dn of pipeSizes) {
      expect(Boolean(pipeSizeFacts(dn)!.gas)).toBe(gasSizes.has(dn));
    }
  });

  it("takes supply form from the catalogue packaging rules", () => {
    // 16 mm is coil-only; 630 mm cannot be coiled at any class.
    expect(pipeSizeFacts(630)!.supply.every((s) => s.packageType === "branch")).toBe(true);
    const small = pipeSizeFacts(32)!;
    expect(small.supply.some((s) => s.packageType === "coil")).toBe(true);
  });

  it("gives every page a unique primary keyword carrying its diameter", () => {
    const docs = pipeSizeDocuments("fa").slice(1);
    const keys = docs.map((d) => d.primaryKeyword);
    expect(new Set(keys).size).toBe(keys.length);
    for (const doc of docs) {
      expect(doc.primaryKeyword).toContain(doc.slug);
    }
  });

  it("registers every size page as published", () => {
    for (const locale of ["fa", "en"] as const) {
      const published = new Set(getAllPublishedPaths(locale));
      expect(published.has("/pipe-size")).toBe(true);
      for (const dn of pipeSizes) {
        expect(published.has(`/pipe-size/${dn}`), `${locale} ${dn}`).toBe(true);
      }
    }
  });
});

describe("FAQ parity", () => {
  it("gives every size page FAQs in both locales", () => {
    // The EN pages shipped without FAQs while FA had them, so half the new
    // pages emitted no FAQPage schema. This keeps the two locales level.
    for (const locale of ["fa", "en"] as const) {
      const missing = pipeSizeDocuments(locale).filter((d) => (d.faqs?.length ?? 0) === 0);
      expect(missing.map((d) => d.path), locale).toEqual([]);
    }
  });
});
