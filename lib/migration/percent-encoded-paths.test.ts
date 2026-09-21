import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  resetLegacyRedirectLookup,
  resolveLegacyRedirect,
} from "@/lib/migration/redirects";
import { normalizeLegacyPath } from "@/lib/migration/normalize";

/**
 * Persian WordPress permalinks reach the edge percent-encoded — a browser or
 * crawler never sends the raw UTF-8 bytes in the request line. The inventory
 * stores them decoded, so matching has to decode first or every Persian
 * legacy URL silently falls through to the locale hop and 404s.
 */
const PERSIAN_LEGACY_CASES = [
  {
    decoded: "/لوله-های-پلی-اتیلن-آبرسانی",
    destination: "/fa/products/water-supply-pipe",
  },
  {
    decoded: "/خط-مشی-کیفیت-آزمایشگاه",
    destination: "/fa/laboratory",
  },
] as const;

describe("percent-encoded Persian legacy paths", () => {
  beforeEach(() => {
    process.env.ENABLE_LEGACY_REDIRECTS = "true";
    resetLegacyRedirectLookup();
  });

  afterEach(() => {
    delete process.env.ENABLE_LEGACY_REDIRECTS;
    resetLegacyRedirectLookup();
  });

  it("resolves the encoded form of a Persian path to the same destination as the decoded form", () => {
    for (const { decoded, destination } of PERSIAN_LEGACY_CASES) {
      const encoded = encodeURI(decoded);

      // Guard the premise: these really are two different strings.
      expect(encoded, `${decoded} should encode`).not.toBe(decoded);
      expect(encoded).toMatch(/%[0-9A-F]{2}/);

      expect(resolveLegacyRedirect(encoded), `encoded ${decoded}`).toBe(destination);
      expect(resolveLegacyRedirect(decoded), `decoded ${decoded}`).toBe(destination);
    }
  });

  it("resolves the encoded form with a WordPress trailing slash in one hop", () => {
    for (const { decoded, destination } of PERSIAN_LEGACY_CASES) {
      const encodedWithSlash = `${encodeURI(decoded)}/`;

      expect(resolveLegacyRedirect(encodedWithSlash)).toBe(destination);
      // Single hop: the destination is final, not another mapped source.
      expect(resolveLegacyRedirect(destination)).toBeNull();
    }
  });

  it("encodes component-wise the same way, so %D8 casing does not matter", () => {
    for (const { decoded, destination } of PERSIAN_LEGACY_CASES) {
      const lowerHex = encodeURI(decoded).replace(
        /%[0-9A-F]{2}/g,
        (match) => match.toLowerCase(),
      );

      expect(resolveLegacyRedirect(lowerHex)).toBe(destination);
    }
  });

  it("leaves a malformed percent sequence alone instead of throwing", () => {
    expect(() => normalizeLegacyPath("/%E0%A4%A")).not.toThrow();
    expect(resolveLegacyRedirect("/%E0%A4%A")).toBeNull();
  });
});
