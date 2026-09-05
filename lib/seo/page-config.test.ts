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
    expect(getOgImageForPath("/laboratory")?.url).toContain("laboratory-hero");
    expect(getOgImageForPath("/products/gas-pipe")?.url).toContain("bukan-slide-03");
  });
});
