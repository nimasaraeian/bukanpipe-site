import { describe, expect, it } from "vitest";
import { createPageMetadata } from "@/lib/seo/metadata";

describe("createPageMetadata", () => {
  it("sets canonical URLs and keeps pages noindex until launch is approved", () => {
    const metadata = createPageMetadata({
      title: "محصولات",
      description: "مسیر توسعه محصولات.",
      path: "/products",
    });

    expect(metadata.alternates?.canonical).toBe("http://localhost:3000/products");
    expect(metadata.robots).toEqual({ index: false, follow: false });
    expect(metadata.openGraph?.url).toBe("http://localhost:3000/products");
  });
});
