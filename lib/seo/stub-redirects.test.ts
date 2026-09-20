import { describe, expect, it } from "vitest";
import { getStubPermanentRedirects, STUB_REDIRECTS } from "@/lib/seo/stub-redirects";

describe("confirmed stub 308s", () => {
  it("covers both slash forms in both locales of the four confirmed stubs only", () => {
    const redirects = getStubPermanentRedirects();
    expect(redirects).toHaveLength(16);
    expect(redirects.every((rule) => rule.permanent)).toBe(true);

    const sources = redirects.map((rule) => rule.source).sort();
    expect(sources).toEqual([
      "/en/engineering",
      "/en/engineering/",
      "/en/knowledge",
      "/en/knowledge/",
      "/en/standards",
      "/en/standards/",
      "/en/tools",
      "/en/tools/",
      "/fa/engineering",
      "/fa/engineering/",
      "/fa/knowledge",
      "/fa/knowledge/",
      "/fa/standards",
      "/fa/standards/",
      "/fa/tools",
      "/fa/tools/",
    ]);
  });

  it("sends both slash forms to the same slashless destination", () => {
    const bySource = new Map(
      getStubPermanentRedirects().map((rule) => [rule.source, rule.destination]),
    );

    expect(bySource.get("/fa/engineering/")).toBe("/fa/technical-center");
    expect(bySource.get("/fa/engineering/")).toBe(bySource.get("/fa/engineering"));
    expect([...bySource.values()].every((destination) => !destination.endsWith("/"))).toBe(true);
  });

  it("points engineering and knowledge at technical-center", () => {
    expect(STUB_REDIRECTS.find((rule) => rule.from === "/engineering")?.to).toBe("/technical-center");
    expect(STUB_REDIRECTS.find((rule) => rule.from === "/knowledge")?.to).toBe("/technical-center");
  });

  it("keeps tools and standards on their existing canonical hubs", () => {
    expect(STUB_REDIRECTS.find((rule) => rule.from === "/tools")?.to).toBe("/calculator");
    expect(STUB_REDIRECTS.find((rule) => rule.from === "/standards")?.to).toBe("/downloads");
  });
});
