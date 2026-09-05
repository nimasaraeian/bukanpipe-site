import type { Locale } from "@/lib/i18n/config";
import { enProductSystems, type ProductSystem, type ProductSystemIcon } from "@/lib/products/en-product-systems";
import { faProductSystems } from "@/lib/products/fa-product-systems";

export function getProductSystems(locale: Locale): readonly ProductSystem[] {
  return locale === "fa" ? faProductSystems : enProductSystems;
}

export function getProductSystem(id: ProductSystemIcon, locale: Locale = "en"): ProductSystem {
  const system = getProductSystems(locale).find((item) => item.id === id);
  if (!system) throw new Error(`Unknown product system: ${id}`);
  return system;
}
