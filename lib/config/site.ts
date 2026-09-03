import { env } from "@/lib/config/env";

/**
 * Central site configuration.
 *
 * Legal name, address, certificates, social profiles, and current factory
 * facts stay out of this file until verified.
 */
export const siteConfig = {
  brandName: "Bukan Pipe",
  brandNameFa: "Bukan Pipe",
  taglineEn: "Engineering Trust for Infrastructure",
  taglineFa: "Infrastructure for tomorrow's flow",
  productionTargetUrl: "https://bukanpipe.com",
  siteUrl: env.siteUrl,
  defaultLocale: "en",
  defaultDirection: "ltr",
  openGraphLocale: "en_US",
  allowIndexing: env.allowIndexing,
  defaultTitle: "Bukan Pipe",
  defaultDescription:
    "Bukan Pipe industrial digital platform. Premium HDPE pipe systems for water, agriculture and industrial networks.",
  activeLocales: ["en", "fa"] as const,
  plannedLocales: ["ar", "ckb"] as const,
  social: {
    instagram: undefined as string | undefined,
    linkedin: undefined as string | undefined,
  },
} as const;

export type SiteConfig = typeof siteConfig;
export type ActiveLocale = (typeof siteConfig.activeLocales)[number];
export type PlannedLocale = (typeof siteConfig.plannedLocales)[number];
