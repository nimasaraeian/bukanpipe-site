import type { ContentDocument } from "@/content/models/content-document";
import { faProducts } from "@/data/content/fa/products";

export const contentCatalogEn: readonly ContentDocument[] = faProducts.map((doc) => ({
  ...doc,
  locale: "en" as const,
  breadcrumbs: [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: doc.title, path: doc.path },
  ],
}));
