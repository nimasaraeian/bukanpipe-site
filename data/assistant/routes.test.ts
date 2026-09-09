import { describe, expect, it } from "vitest";
import { assistantIntents } from "./intents";
import { ASSISTANT_STATIC_PATHS, getAssistantAllowlist, isAssistantPathAllowed } from "./routes";

describe("assistant route allowlist", () => {
  it("includes core public routes", () => {
    for (const path of [
      "/products",
      "/products/gas-pipe",
      "/laboratory",
      "/request-quote",
      "/gallery",
    ]) {
      expect(isAssistantPathAllowed(path)).toBe(true);
    }
  });

  it("rejects arbitrary user paths", () => {
    expect(isAssistantPathAllowed("/admin")).toBe(false);
    expect(isAssistantPathAllowed("/en/products")).toBe(false);
    expect(isAssistantPathAllowed("https://evil.example")).toBe(false);
  });

  it("maps every navigate intent to an allowlisted path", () => {
    const faPaths = new Set(getAssistantAllowlist("fa"));
    const enPaths = new Set(getAssistantAllowlist("en"));

    for (const intent of assistantIntents) {
      const faAction = intent.action("fa");
      const enAction = intent.action("en");
      for (const action of [faAction, enAction]) {
        if (action.type === "navigate") {
          expect(faPaths.has(action.path) || enPaths.has(action.path)).toBe(true);
        }
      }
    }
  });

  it("has static paths documented", () => {
    expect(ASSISTANT_STATIC_PATHS.length).toBeGreaterThan(10);
  });
});
