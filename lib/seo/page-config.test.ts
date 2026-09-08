import { describe, expect, it } from "vitest";
import {
  getOgImageForPath,
  isNoindexPath,
  NOINDEX_PATHS,
} from "@/lib/seo/page-config";

describe("page SEO config", () => {
  it("marks stub routes as noindex", () => {
    for (const path of NOINDEX_PATHS) {
      expect(isNoindexPath(path)).toBe(true);
    }
    expect(isNoindexPath("/products")).toBe(false);
    expect(isNoindexPath("/")).toBe(false);
  });

  it("maps hub paths to contextual OG images", () => {
    expect(getOgImageForPath("/")?.url).toContain("about-factory");
    expect(getOgImageForPath("/laboratory")?.url).toContain("01_02_13 AM (5)");
    expect(getOgImageForPath("/quality")?.url).toContain("01_02_13 AM (4)");
    expect(getOgImageForPath("/products/gas-pipe")?.url).toContain("bukan-slide-03");
  });
});
