import { describe, expect, it } from "vitest";
import {
  buildLanguageAlternates,
  isPathAvailableInLocale,
} from "@/lib/i18n/locale-availability";
import { getAllPublishedPaths } from "@/lib/content/registry";

describe("locale availability", () => {
  it("does not advertise EN alternates for FA-only pages", () => {
    expect(isPathAvailableInLocale("/about", "fa")).toBe(true);
    expect(isPathAvailableInLocale("/about", "en")).toBe(false);
    expect(buildLanguageAlternates("/about")).toBeUndefined();
  });

  it("advertises hreflang only for bilingual product pages", () => {
    expect(isPathAvailableInLocale("/products/gas-pipe", "fa")).toBe(true);
    expect(isPathAvailableInLocale("/products/gas-pipe", "en")).toBe(true);
    const languages = buildLanguageAlternates("/products/gas-pipe");
    expect(languages?.fa).toContain("/fa/products/gas-pipe");
    expect(languages?.en).toContain("/en/products/gas-pipe");
  });

  it("includes home in both locales", () => {
    const languages = buildLanguageAlternates("/");
    expect(languages?.fa).toBeDefined();
    expect(languages?.en).toBeDefined();
  });

  it("lists all FA published paths as available in FA", () => {
    for (const path of getAllPublishedPaths("fa")) {
      expect(isPathAvailableInLocale(path, "fa")).toBe(true);
    }
  });
});
