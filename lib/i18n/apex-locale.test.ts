import { describe, expect, it } from "vitest";
import { apexFallbackLocale, localeForUnprefixedPath } from "@/lib/i18n/apex-locale";

describe("apex homepage locale", () => {
  it("sends cookie-less / to FA to match hreflang x-default", () => {
    expect(apexFallbackLocale).toBe("fa");
    expect(localeForUnprefixedPath("/", undefined)).toBe("fa");
  });

  it("honors an explicit locale cookie on /", () => {
    expect(localeForUnprefixedPath("/", "en")).toBe("en");
    expect(localeForUnprefixedPath("/", "fa")).toBe("fa");
  });

  it("does not change unprefixed non-home paths when no cookie is set", () => {
    expect(localeForUnprefixedPath("/unknown", undefined)).toBe("en");
  });
});
