import { describe, expect, it } from "vitest";
import { matchAssistantQuery } from "./matcher";

describe("matchAssistantQuery", () => {
  it("matches quote intents in Persian and English", () => {
    expect(matchAssistantQuery("استعلام قیمت", "fa")?.intentId).toBe("QUOTE");
    expect(matchAssistantQuery("request a quote", "en")?.intentId).toBe("QUOTE");
  });

  it("matches product families", () => {
    expect(matchAssistantQuery("لوله گاز", "fa")?.intentId).toBe("GAS_PIPE");
    expect(matchAssistantQuery("water supply pipe", "en")?.intentId).toBe("WATER_PIPE");
    expect(matchAssistantQuery("لوله آبیاری", "fa")?.intentId).toBe("IRRIGATION");
  });

  it("matches laboratory with common misspellings", () => {
    expect(matchAssistantQuery("ازمایشگاه", "fa")?.intentId).toBe("LABORATORY");
    expect(matchAssistantQuery("laboratory", "en")?.intentId).toBe("LABORATORY");
  });

  it("matches calculator and downloads", () => {
    expect(matchAssistantQuery("محاسبه وزن لوله", "fa")?.intentId).toBe("CALCULATOR");
    const catalogMatch = matchAssistantQuery("catalog", "en");
    expect(catalogMatch?.intentId === "DOWNLOADS" || catalogMatch?.intentId === "CATALOG").toBe(true);
  });

  it("matches contact and buy intents", () => {
    expect(matchAssistantQuery("شماره فروش", "fa")?.intentId).toBe("CONTACT");
    expect(matchAssistantQuery("I need a quote", "en")?.intentId).toBe("QUOTE");
  });

  it("returns null for empty or unknown queries", () => {
    expect(matchAssistantQuery("   ", "en")).toBeNull();
    expect(matchAssistantQuery("xyzzy completely unknown phrase", "en")).toBeNull();
  });
});
