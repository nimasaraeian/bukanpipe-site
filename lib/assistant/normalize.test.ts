import { describe, expect, it } from "vitest";
import { normalizeAssistantQuery, normalizeDigits } from "./normalize";

describe("normalizeAssistantQuery", () => {
  it("normalizes Arabic y/k to Persian", () => {
    expect(normalizeAssistantQuery("ازمايشگاه")).toBe("ازمایشگاه");
    expect(normalizeAssistantQuery("كاتالوگ")).toBe("کاتالوگ");
  });

  it("normalizes Persian and Arabic digits", () => {
    expect(normalizeAssistantQuery("قیمت لوله ۱۱۰")).toBe("قیمت لوله 110");
    expect(normalizeDigits("٠٩١")).toBe("091");
  });

  it("folds English case and collapses whitespace", () => {
    expect(normalizeAssistantQuery("  Gas   PIPE  ")).toBe("gas pipe");
    expect(normalizeAssistantQuery("PE100")).toBe("pe100");
  });

  it("handles half-space and ZWNJ", () => {
    expect(normalizeAssistantQuery("لوله\u200cگاز")).toBe("لوله گاز");
  });
});
