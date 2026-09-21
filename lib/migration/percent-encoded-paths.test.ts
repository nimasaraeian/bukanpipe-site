import { describe, expect, it } from "vitest";
import { resolveLegacyRequest } from "@/lib/migration/legacy-resolver";
import { normalizeLegacyPath } from "@/lib/migration/normalize";

/**
 * Persian permalinks reach the edge percent-encoded — a browser or crawler
 * never sends the raw UTF-8 bytes in the request line. The map stores them
 * decoded, so matching has to decode first or every Persian legacy URL falls
 * through to the locale hop and 404s.
 *
 * All four are real CSV rows.
 */
const PERSIAN_REDIRECTS = [
  { decoded: "/لوله-های-پلی-اتیلن-آبرسانی", destination: "/fa/products/water-supply-pipe" },
  { decoded: "/خط-مشی-کیفیت-آزمایشگاه", destination: "/fa/quality" },
  { decoded: "/گواهینامه-ها", destination: "/fa/certifications" },
  { decoded: "/آزمون-لوله-پلیمری", destination: "/fa/laboratory/services" },
] as const;

/** Persian rows that are 410 rather than redirects. */
const PERSIAN_GONE = ["/بدون-سایدبار", "/مدیر-فروش", "/category/blog/برندینگ"] as const;

describe("percent-encoded Persian paths", () => {
  it("resolves the encoded form exactly like the decoded form", () => {
    for (const { decoded, destination } of PERSIAN_REDIRECTS) {
      const encoded = encodeURI(decoded);

      // Guard the premise: these really are two different strings.
      expect(encoded, `${decoded} should encode`).not.toBe(decoded);
      expect(encoded).toMatch(/%[0-9A-F]{2}/);

      for (const variant of [decoded, encoded, `${decoded}/`, `${encoded}/`]) {
        const outcome = resolveLegacyRequest(variant);
        expect(outcome?.kind, variant).toBe("redirect");
        expect((outcome as { destination: string }).destination, variant).toBe(destination);
      }
    }
  });

  it("is case-insensitive about the percent hex digits", () => {
    for (const { decoded, destination } of PERSIAN_REDIRECTS) {
      const lowerHex = encodeURI(decoded).replace(/%[0-9A-F]{2}/g, (m) => m.toLowerCase());
      expect((resolveLegacyRequest(lowerHex) as { destination: string }).destination).toBe(
        destination,
      );
    }
  });

  it("answers 410 for encoded Persian rows that are gone", () => {
    for (const decoded of PERSIAN_GONE) {
      expect(resolveLegacyRequest(decoded)?.kind, decoded).toBe("gone");
      expect(resolveLegacyRequest(encodeURI(decoded))?.kind, `encoded ${decoded}`).toBe("gone");
    }
  });

  it("handles the Arabic-script row too", () => {
    const outcome = resolveLegacyRequest(encodeURI("/portfolio/أبياري/"));
    expect(outcome?.kind).toBe("redirect");
    expect((outcome as { destination: string }).destination).toBe("/fa/products/irrigation-pipe");
  });

  it("leaves a malformed percent sequence alone instead of throwing", () => {
    expect(() => normalizeLegacyPath("/%E0%A4%A")).not.toThrow();
    expect(resolveLegacyRequest("/%E0%A4%A")).toBeNull();
  });
});
