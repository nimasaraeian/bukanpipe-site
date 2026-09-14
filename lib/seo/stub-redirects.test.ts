import { describe, expect, it } from "vitest";
import { getStubPermanentRedirects, STUB_REDIRECTS } from "@/lib/seo/stub-redirects";

describe("confirmed stub 308s", () => {
  it("covers both locales of the four confirmed stubs only", () => {
    const redirects = getStubPermanentRedirects();
    expect(redirects).toHaveLength(8);
    expect(redirects.every((rule) => rule.permanent)).toBe(true);

    const sources = redirects.map((rule) => rule.source).sort();
    expect(sources).toEqual([
      "/en/engineering",
      "/en/knowledge",
      "/en/standards",
      "/en/tools",
      "/fa/engineering",
      "/fa/knowledge",
      "/fa/standards",
      "/fa/tools",
    ]);
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
