import { describe, expect, it } from "vitest";
import { createPageMetadata, createRootMetadata } from "@/lib/seo/metadata";

describe("createPageMetadata", () => {
  it("does not double-suffix absolute FA request-quote titles", () => {
    const metadata = createPageMetadata({
      title: "استعلام قیمت لوله پلی اتیلن | بوکان پایپ",
      description: "Quote form.",
      path: "/request-quote",
      locale: "fa",
      titleAbsolute: true,
    });
    expect(metadata.title).toEqual({ absolute: "استعلام قیمت لوله پلی اتیلن | بوکان پایپ" });
  });
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
    expect((metadata.twitter as { card?: string } | undefined)?.card).toBe(
      "summary_large_image",
    );
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

describe("createRootMetadata", () => {
  it("exposes square PNG favicons Google Search can read above 48px", () => {
    const metadata = createRootMetadata();
    expect(metadata.icons).toMatchObject({
      shortcut: "/icon-96.png",
      apple: "/apple-touch-icon.png",
    });
    const icons = metadata.icons as { icon?: readonly { url: string; type?: string }[] };
    expect(icons.icon?.[0]).toMatchObject({ url: "/icon-96.png", sizes: "96x96", type: "image/png" });
    expect(icons.icon?.some((icon) => icon.url === "/icon-96.png")).toBe(true);
    expect(icons.icon?.some((icon) => icon.url === "/icon-512.png" && icon.type === "image/png")).toBe(true);
    expect(icons.icon?.some((icon) => icon.url === "/icon-192.png")).toBe(true);
    expect(icons.icon?.some((icon) => icon.url === "/favicon.ico")).toBe(true);
    expect(icons.icon?.some((icon) => icon.url === "/favicon.svg")).toBe(false);
  });
});
