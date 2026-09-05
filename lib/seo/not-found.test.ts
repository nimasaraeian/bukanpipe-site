import { describe, expect, it } from "vitest";
import type { Metadata } from "next";

describe("404 metadata contract", () => {
  it("404 pages must stay noindex without product or article schema", async () => {
    const mod = await import("@/app/[locale]/not-found");
    const metadata = mod.metadata as Metadata;

    expect(metadata.robots).toEqual({ index: false, follow: false });
    expect(metadata.title).toBe("404");
  });
});
