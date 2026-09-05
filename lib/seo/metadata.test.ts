import { describe, expect, it } from "vitest";
import { createPageMetadata } from "@/lib/seo/metadata";

describe("createPageMetadata", () => {
  it("sets canonical URLs and keeps pages noindex until launch is approved", () => {
    const metadata = createPageMetadata({
      title: "Products",
      description: "Products development route.",
      path: "/products",
    });

    expect(metadata.alternates?.canonical).toBe("http://localhost:3000/products");
    expect(metadata.robots).toEqual({ index: false, follow: false });
    expect(metadata.openGraph?.url).toBe("http://localhost:3000/products");
    expect(metadata.openGraph?.images).toHaveLength(1);
    expect(metadata.twitter?.card).toBe("summary_large_image");
  });

  it("marks stub routes as noindex", () => {
    const metadata = createPageMetadata({
      title: "Projects",
      description: "Stub.",
      path: "/projects",
    });
    expect(metadata.robots).toEqual({ index: false, follow: false });
  });
});
