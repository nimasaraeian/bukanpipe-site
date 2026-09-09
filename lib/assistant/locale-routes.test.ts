import { describe, expect, it } from "vitest";
import { assistantIntents } from "@/data/assistant/intents";
import { ASSISTANT_STATIC_PATHS, isAssistantPathAllowed } from "@/data/assistant/routes";
import { buildLeadHandoffMessages } from "./router";
import { withLocale } from "@/lib/i18n/path";
import type { Locale } from "@/lib/i18n/config";

function collectNavigatePaths(): string[] {
  const paths = new Set<string>();
  for (const intent of assistantIntents) {
    const action = intent.action("fa");
    if (action.type === "navigate") {
      paths.add(action.path);
    }
    if (action.type === "message" && action.navigate) {
      paths.add(action.navigate.path);
    }
  }
  return [...paths];
}

describe("assistant locale-aware routes", () => {
  it("allowlists every static assistant destination", () => {
    for (const path of ASSISTANT_STATIC_PATHS) {
      expect(isAssistantPathAllowed(path)).toBe(true);
    }
  });

  it("prefixes FA navigation with /fa", () => {
    for (const path of collectNavigatePaths()) {
      expect(withLocale(path, "fa")).toMatch(/^\/fa(\/|$)/);
      expect(withLocale(path, "fa")).not.toMatch(/^\/en\//);
    }
  });

  it("prefixes EN navigation with /en", () => {
    for (const path of collectNavigatePaths()) {
      expect(withLocale(path, "en")).toMatch(/^\/en(\/|$)/);
      expect(withLocale(path, "en")).not.toMatch(/^\/fa\//);
    }
  });

  it("commercial handoff omits callback quick reply when backend is disabled", () => {
    const messages = buildLeadHandoffMessages("fa");
    const replies = messages[0]?.quickReplies ?? [];
    expect(replies.some((r) => r.intentId === "LEAD_CALLBACK")).toBe(false);
    expect(replies.some((r) => r.path === "/request-quote")).toBe(true);
    expect(replies.some((r) => r.path === "/contact")).toBe(true);
  });

  it("resolves path quick replies to locale-prefixed navigate messages", () => {
    const locales: Locale[] = ["fa", "en"];
    for (const locale of locales) {
      const messages = buildLeadHandoffMessages(locale);
      const quoteReply = messages[0]?.quickReplies?.find((r) => r.path === "/request-quote");
      expect(quoteReply).toBeDefined();
    }
  });
});
