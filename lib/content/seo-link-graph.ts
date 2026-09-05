import type { Locale } from "@/lib/i18n/config";
import { seoLandingPaths } from "@/lib/content/seo-content-model";

export type SeoLinkNode = {
  path: string;
  label: { en: string; fa: string };
  relation: string;
};

/** Canonical SEO landing cluster — hub ↔ product ↔ guide links. */
export const seoLinkGraph: readonly SeoLinkNode[] = [
  {
    path: seoLandingPaths.water,
    label: { en: "Water HDPE Pipes", fa: "لوله HDPE آبرسانی" },
    relation: "supplied-by-product",
  },
  {
    path: seoLandingPaths.gas,
    label: { en: "Gas HDPE Pipes", fa: "لوله HDPE گازرسانی" },
    relation: "supplied-by-product",
  },
  {
    path: seoLandingPaths.irrigation,
    label: { en: "Irrigation HDPE Pipes", fa: "لوله HDPE آبیاری" },
    relation: "supplied-by-product",
  },
  {
    path: seoLandingPaths.industrial,
    label: { en: "Industrial HDPE Pipes", fa: "لوله HDPE صنعتی" },
    relation: "supplied-by-product",
  },
  {
    path: seoLandingPaths.pe100,
    label: { en: "PE100 HDPE Pipes", fa: "لوله PE100" },
    relation: "supplied-by-product",
  },
  {
    path: seoLandingPaths.pe100Guide,
    label: { en: "PE100 Technical Guide", fa: "راهنمای فنی PE100" },
    relation: "explained-by-engineering",
  },
  {
    path: seoLandingPaths.installGuide,
    label: { en: "HDPE Installation Guide", fa: "راهنمای نصب HDPE" },
    relation: "explained-by-engineering",
  },
  {
    path: seoLandingPaths.pillar,
    label: { en: "HDPE Pipe Guide", fa: "راهنمای لوله پلی‌اتیلن" },
    relation: "explained-by-engineering",
  },
];

export function getSeoClusterLinks(
  locale: Locale,
  currentPath: string,
  limit = 4,
): readonly { path: string; label: string }[] {
  return seoLinkGraph
    .filter((node) => node.path !== currentPath)
    .slice(0, limit)
    .map((node) => ({ path: node.path, label: node.label[locale] }));
}
