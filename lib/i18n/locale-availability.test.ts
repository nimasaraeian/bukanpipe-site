import { describe, expect, it } from "vitest";
import {
  buildLanguageAlternates,
  isPathAvailableInLocale,
} from "@/lib/i18n/locale-availability";
import { getAllPublishedPaths } from "@/lib/content/registry";

describe("locale availability", () => {
  it("advertises bidirectional hreflang for bilingual company pages", () => {
    expect(isPathAvailableInLocale("/about", "fa")).toBe(true);
    expect(isPathAvailableInLocale("/about", "en")).toBe(true);
    const languages = buildLanguageAlternates("/about");
    expect(languages?.fa).toContain("/fa/about");
    expect(languages?.en).toContain("/en/about");
    expect(languages?.["x-default"]).toContain("/fa/about");
  });

  it("advertises hreflang for bilingual product pages", () => {
    expect(isPathAvailableInLocale("/products/gas-pipe", "fa")).toBe(true);
    expect(isPathAvailableInLocale("/products/gas-pipe", "en")).toBe(true);
    const languages = buildLanguageAlternates("/products/gas-pipe");
    expect(languages?.fa).toContain("/fa/products/gas-pipe");
    expect(languages?.en).toContain("/en/products/gas-pipe");
  });

  it("includes home in both locales with x-default", () => {
    const languages = buildLanguageAlternates("/");
    expect(languages?.fa).toBeDefined();
    expect(languages?.en).toBeDefined();
    expect(languages?.["x-default"]).toBeDefined();
  });

  it("lists all FA published paths as available in FA", () => {
    for (const path of getAllPublishedPaths("fa")) {
      expect(isPathAvailableInLocale(path, "fa")).toBe(true);
    }
  });

  it("lists all EN published paths as available in EN", () => {
    for (const path of getAllPublishedPaths("en")) {
      expect(isPathAvailableInLocale(path, "en")).toBe(true);
    }
  });
});
