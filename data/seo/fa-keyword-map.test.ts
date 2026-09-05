import { describe, expect, it } from "vitest";
import { faKeywordMap, getFaKeywordEntry } from "@/data/seo/fa-keyword-map";
import { contentCatalogFa } from "@/data/content/fa/catalog";

describe("FA keyword map", () => {
  it("maps commercial homepage to manufacturer cluster", () => {
    const home = getFaKeywordEntry("/");
    expect(home?.primaryKeyword).toContain("تولید");
    expect(home?.intent).toBe("commercial");
  });

  it("every mapped path with a product/article exists in FA catalog or static routes", () => {
    const catalogPaths = new Set(contentCatalogFa.map((d) => d.path));
    const staticOk = new Set(["/", "/request-quote", "/solutions"]);

    for (const entry of faKeywordMap) {
      const exists = catalogPaths.has(entry.path) || staticOk.has(entry.path);
      expect(exists, `missing FA content for ${entry.path}`).toBe(true);
    }
  });
});
