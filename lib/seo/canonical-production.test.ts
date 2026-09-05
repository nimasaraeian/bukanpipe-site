import { describe, expect, it } from "vitest";
import { canonicalUrl } from "@/lib/seo/canonical";
import { buildLanguageAlternates } from "@/lib/i18n/locale-availability";

describe("production canonical URL readiness", () => {
  it("builds absolute URLs from configured site origin", () => {
    expect(canonicalUrl("/fa/products/gas-pipe")).toMatch(
      /^https?:\/\/[^/]+\/fa\/products\/gas-pipe$/,
    );
    expect(canonicalUrl("/")).toMatch(/^https?:\/\/[^/]+\/$/);
  });

  it("hreflang alternates use the same origin as canonical URLs", () => {
    const languages = buildLanguageAlternates("/products/gas-pipe");
    const origin = canonicalUrl("/").replace(/\/$/, "");

    expect(languages?.fa).toBe(`${origin}/fa/products/gas-pipe`);
    expect(languages?.en).toBe(`${origin}/en/products/gas-pipe`);
    expect(languages?.["x-default"]).toBe(`${origin}/fa/products/gas-pipe`);
  });

  it("does not emit vercel deployment host when NEXT_PUBLIC_SITE_URL is set", () => {
    const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
    if (!configured) {
      return;
    }

    expect(canonicalUrl("/fa")).toBe(`${configured}/fa`);
    expect(canonicalUrl("/fa")).not.toMatch(/\.vercel\.app/);
  });
});
