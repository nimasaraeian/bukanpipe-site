import { buildSeoProductDocument } from "@/lib/content/seo-content-model";
import { enSeoProductSeeds } from "@/data/content/en/seo-product-seeds";

export const enProducts = enSeoProductSeeds.map((seed) => buildSeoProductDocument("en", seed));
