import { buildSeoProductDocument } from "@/lib/content/seo-content-model";
import { faSeoProductSeeds } from "@/data/content/fa/seo-product-seeds";

export const faProducts = faSeoProductSeeds.map((seed) => buildSeoProductDocument("fa", seed));
