import { describe, expect, it } from "vitest";
import { getAssistantCopy, getPrimaryQuickActions } from "@/data/assistant";
import { buildLeadHandoffMessages, getWelcomeMessages, resolveQuery, resolveQuickReply } from "./router";

describe("assistant router locale safety", () => {
  it("uses Persian copy only for FA", () => {
    const copy = getAssistantCopy("fa");
    expect(copy.name).toBe("راهنمای بوکان پایپ");
    expect(getPrimaryQuickActions("fa")[0]?.label).toMatch(/[\u0600-\u06FF]/);
  });

  it("uses English copy only for EN", () => {
    const copy = getAssistantCopy("en");
    expect(copy.name).toBe("Bukan Pipe Guide");
    expect(getPrimaryQuickActions("en")[0]?.label).not.toMatch(/[\u0600-\u06FF]/);
  });

  it("returns low-confidence fallback for unknown queries", () => {
    const { messages } = resolveQuery("xyzzy unknown phrase here", "en");
    expect(messages[0]?.text).toContain("not sure");
  });

  it("starts choose-product flow from quick reply", () => {
    const reply = getPrimaryQuickActions("fa").find((r) => r.flowId === "choose_product");
    expect(reply).toBeDefined();
    const { messages } = resolveQuickReply(reply!, "fa");
    expect(messages[0]?.text).toContain("کاربرد");
  });

  it("welcome messages include greeting", () => {
    const messages = getWelcomeMessages("en", "/products/gas-pipe");
    expect(messages[0]?.text).toContain("Hello");
    expect(messages[0]?.quickReplies?.length).toBeGreaterThan(0);
  });

  it("routes commercial intents to quote, contact, and callback handoff", () => {
    const { messages } = resolveQuery("request quote", "en");
    expect(messages[0]?.text).toContain("quotation");
    const replies = messages[0]?.quickReplies ?? [];
    expect(replies.some((r) => r.path === "/request-quote")).toBe(true);
    expect(replies.some((r) => r.intentId === "LEAD_CALLBACK")).toBe(true);
  });

  it("navigates quote quick reply to request-quote path", () => {
    const quoteReply = buildLeadHandoffMessages("en")[0]?.quickReplies?.find((r) => r.path === "/request-quote");
    expect(quoteReply).toBeDefined();
    const { messages } = resolveQuickReply(quoteReply!, "en");
    expect(messages[0]?.navigate?.path).toBe("/request-quote");
  });
});
