import { afterEach, describe, expect, it, vi } from "vitest";
import { isLeadUiEnabled } from "./public-config";

describe("isLeadUiEnabled", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("is enabled by default", () => {
    vi.stubEnv("NEXT_PUBLIC_LEADS_SUBMISSION_READY", "");
    expect(isLeadUiEnabled()).toBe(true);
  });

  it("stays enabled when set to true", () => {
    vi.stubEnv("NEXT_PUBLIC_LEADS_SUBMISSION_READY", "true");
    expect(isLeadUiEnabled()).toBe(true);
  });

  it("is an explicit kill-switch when false", () => {
    vi.stubEnv("NEXT_PUBLIC_LEADS_SUBMISSION_READY", "false");
    expect(isLeadUiEnabled()).toBe(false);
  });
});
