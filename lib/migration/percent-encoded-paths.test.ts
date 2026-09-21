import { beforeAll, describe, expect, it } from "vitest";
import { resolveLegacyRequest } from "@/lib/migration/legacy-resolver";
import { resetLegacyRedirectLookup } from "@/lib/migration/redirects";
import { normalizeLegacyPath } from "@/lib/migration/normalize";

/** Production runs the inventory base layer on. */
beforeAll(() => {
  process.env.ENABLE_LEGACY_REDIRECTS = "true";
  resetLegacyRedirectLookup();
});

/**
 * Persian permalinks reach the edge percent-encoded — a browser or crawler
 * never sends the raw UTF-8 bytes in the request line. The map stores them
 * decoded, so matching has to decode first or every Persian legacy URL falls
 * through to the locale hop and 404s.
 *
 * All four are real CSV rows.
 */
const PERSIAN_REDIRECTS = [
  // From the CSV additions.
  { decoded: "/آزمون-لوله-پلیمری", destination: "/fa/laboratory/services" },
  { decoded: "/لوله-آبرسانی", destination: "/fa/products/water-supply-pipe" },
  { decoded: "/معرفی-آزمایشگاه", destination: "/fa/laboratory" },
  { decoded: "/fa/qc/survey/ثبت-شکایت-از-خدمات-آزمایشگاه", destination: "/fa/contact" },
  // From the inventory base layer, which the CSV agrees with.
  { decoded: "/لوله-های-پلی-اتیلن-آبرسانی", destination: "/fa/products/water-supply-pipe" },
] as const;

/** Persian rows that are 410 rather than redirects. */
const PERSIAN_GONE = ["/بدون-سایدبار", "/ساید-بار-راست", "/2018/12/25/جلسه-هم-اندیشی"] as const;

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

  it("keeps a conflicting Persian path on its inventory destination", () => {
    // The CSV wants /fa/quality here; the inventory serves /fa/laboratory and
    // wins until that conflict is decided. Encoding must not change that.
    for (const variant of ["/خط-مشی-کیفیت-آزمایشگاه", encodeURI("/خط-مشی-کیفیت-آزمایشگاه")]) {
      const outcome = resolveLegacyRequest(variant);
      expect(outcome?.kind, variant).toBe("redirect");
      expect((outcome as { destination: string }).destination, variant).toBe("/fa/laboratory");
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
