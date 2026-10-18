import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { awards } from "@/data/company/awards";
import { trophies, trophyImage } from "@/data/company/trophies";
import { awardsPageSchema } from "@/lib/schema/awards-schema";
import { getSitemapPathsForLocale } from "@/lib/sitemap/paths";
import { getFooterColumns, getPrimaryNavStructure } from "@/lib/i18n/nav-items";
import { locales, type Locale } from "@/lib/i18n/config";
import { dictionaryFa } from "@/messages/fa";
import { dictionaryEn } from "@/messages/en";

const dictionaries = { fa: dictionaryFa, en: dictionaryEn } as const;
const ROOT = path.resolve(__dirname, "../..");

describe("trophy archive", () => {
  it("has twenty trophies with unique ids and slugs", () => {
    expect(trophies).toHaveLength(20);
    expect(new Set(trophies.map((t) => t.id)).size).toBe(20);
    expect(new Set(trophies.map((t) => t.slug)).size).toBe(20);
  });

  it("ships all three renditions of every photograph", () => {
    for (const t of trophies) {
      const img = trophyImage(t);
      for (const src of [img.thumb, img.card, img.full]) {
        expect(existsSync(path.join(ROOT, "public", src)), src).toBe(true);
      }
    }
  });

  it("points every awardId at a plaque record that exists", () => {
    const ids = new Set(awards.map((a) => a.id));
    for (const t of trophies) {
      if (t.awardId) expect(ids.has(t.awardId), `${t.id} → ${t.awardId}`).toBe(true);
    }
  });

  it("never invents a year: a dated trophy has a four-digit year, an undated one has none", () => {
    for (const t of trophies) {
      expect(t.year === "" || /^\d{4}$/.test(t.year), t.id).toBe(true);
    }
    expect(trophies.filter((t) => t.year === "")).toHaveLength(2);
  });

  it("lists the 1399 cooperative trophy as provincial, matching its plaque record", () => {
    const t = trophies.find((x) => x.slug === "coop-provincial-1399")!;
    expect(t.level).toBe("provincial");
    expect(awards.find((a) => a.id === t.awardId)?.level).toBe("استانی");
  });

  it("claims exactly three national titles", () => {
    expect(trophies.filter((t) => t.level === "national")).toHaveLength(3);
  });
});

describe("awards page", () => {
  it.each(locales)("is in the %s sitemap, navigation and footer", (locale) => {
    expect(getSitemapPathsForLocale(locale as Locale)).toContain("/awards");
    const t = dictionaries[locale as Locale];
    const p = (x: string) => `/${locale}${x}`;
    const nav = getPrimaryNavStructure(locale as Locale, t, p).flatMap((e) =>
      e.kind === "group" ? e.items.map((i) => i.href) : [e.href],
    );
    expect(nav).toContain(p("/awards"));
    const footer = getFooterColumns(locale as Locale, t, p).flatMap((c) => c.links.map((l) => l.href));
    expect(footer).toContain(p("/awards"));
  });

  it.each(locales)("describes every photograph it lists in the %s schema graph", (locale) => {
    const [doc] = awardsPageSchema(locale as Locale) as { "@graph": Record<string, unknown>[] }[];
    const graph = doc!["@graph"];
    const gallery = graph.find((n) => n["@type"] === "ImageGallery") as { image: { "@id": string }[] };
    const described = new Set(
      graph.filter((n) => n["@type"] === "ImageObject").map((n) => n["@id"] as string),
    );
    expect(gallery.image).toHaveLength(20);
    for (const ref of gallery.image) expect(described.has(ref["@id"]), ref["@id"]).toBe(true);
    expect(graph.some((n) => n["@type"] === "BreadcrumbList")).toBe(true);
    expect(graph.some((n) => n["@type"] === "CollectionPage")).toBe(true);
  });
});
