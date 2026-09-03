import { describe, expect, it } from "vitest";
import { canonicalUrl, normalizePath } from "@/lib/seo/canonical";

describe("normalizePath", () => {
  it("normalizes empty and root paths to /", () => {
    expect(normalizePath("")).toBe("/");
    expect(normalizePath("/")).toBe("/");
  });

  it("adds a leading slash and strips trailing slashes", () => {
    expect(normalizePath("products")).toBe("/products");
    expect(normalizePath("/products/")).toBe("/products");
    expect(normalizePath("/request-quote///")).toBe("/request-quote");
  });
});

describe("canonicalUrl", () => {
  it("keeps a single trailing slash on the origin home URL", () => {
    expect(canonicalUrl("/")).toBe("http://localhost:3000/");
  });

  it("does not add a trailing slash to nested routes", () => {
    expect(canonicalUrl("/products")).toBe("http://localhost:3000/products");
    expect(canonicalUrl("laboratory/")).toBe("http://localhost:3000/laboratory");
  });
});
