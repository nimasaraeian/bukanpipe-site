import { describe, expect, it } from "vitest";
import { searchWebsiteGuide } from "./search";

describe("searchWebsiteGuide", () => {
  it("returns real PE100 navigation pages", () => {
    const hits = searchWebsiteGuide("PE100", "en");
    const paths = hits.map((hit) => hit.path);
    expect(paths).toContain("/products/pe100-pipe");
    expect(paths).toContain("/technical-center/pe100-technical-guide");
    expect(paths).toContain("/standards");
    expect(hits.length).toBeGreaterThanOrEqual(3);
  });

  it("returns Persian PE100 pages", () => {
    const hits = searchWebsiteGuide("PE100", "fa");
    const paths = hits.map((hit) => hit.path);
    expect(paths).toContain("/products/pe100-pipe");
    expect(paths).toContain("/technical-center/pe100-technical-guide");
  });

  it("does not invent answers for unknown queries", () => {
    expect(searchWebsiteGuide("xyzzy unknown phrase", "en")).toEqual([]);
    expect(searchWebsiteGuide("   ", "fa")).toEqual([]);
  });

  it("finds sales destinations", () => {
    const hits = searchWebsiteGuide("quote", "en");
    expect(hits.some((hit) => hit.path === "/request-quote")).toBe(true);
  });
});
