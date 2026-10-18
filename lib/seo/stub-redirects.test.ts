import { describe, expect, it } from "vitest";
import { getStubPermanentRedirects, STUB_REDIRECTS } from "@/lib/seo/stub-redirects";

describe("confirmed stub 308s", () => {
  it("covers both slash forms in both locales of the nine confirmed stubs only", () => {
    const redirects = getStubPermanentRedirects();
    expect(redirects).toHaveLength(36);
    expect(redirects.every((rule) => rule.permanent)).toBe(true);

    const sources = redirects.map((rule) => rule.source).sort();
    const stubs = [
      "dealers",
      "engineering",
      "knowledge",
      "polyethylene-pipe",
      "pricing",
      "projects",
      "standards",
      "tools",
      "verify",
    ];
    expect(sources).toEqual(
      ["en", "fa"].flatMap((l) => stubs.flatMap((s) => [`/${l}/${s}`, `/${l}/${s}/`])),
    );
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
    expect(STUB_REDIRECTS.find((rule) => rule.from === "/polyethylene-pipe")?.to).toBe(
      "/technical-center/polyethylene-pipe-complete-guide",
    );
  });

  it("sends the retired placeholder routes to the live page with the same intent", () => {
    const to = (from: string) => STUB_REDIRECTS.find((rule) => rule.from === from)?.to;
    expect(to("/projects")).toBe("/gallery");
    expect(to("/pricing")).toBe("/request-quote");
    expect(to("/dealers")).toBe("/contact");
    expect(to("/verify")).toBe("/certifications");
  });
});
