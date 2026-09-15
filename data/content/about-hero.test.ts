import { describe, expect, it } from "vitest";
import { getAboutHeroContent } from "@/data/content/about-hero";

describe("about hero content", () => {
  it("provides premium EN copy and stats", () => {
    const en = getAboutHeroContent("en");
    expect(en.eyebrow).toBe("BUKAN PIPE");
    expect(en.primaryCta).toMatch(/quote/i);
    expect(en.stats).toHaveLength(3);
    expect(en.stats[0]?.value).toBe("1997");
    expect(en.stats[0]?.label).toBe("Established");
  });

  it("provides native FA copy and stats", () => {
    const fa = getAboutHeroContent("fa");
    expect(fa.eyebrow).toContain("۱۳۷۶");
    expect(fa.title).toBe("تأسیس ۱۳۷۶");
    expect(fa.secondaryCta).toBe("درباره شرکت");
    expect(fa.stats[0]?.value).toBe("۱۳۷۶");
    expect(fa.stats[0]?.label).toBe("تأسیس");
  });
});
