import { env } from "@/lib/config/env";

/**
 * Central site configuration.
 *
 * Legal name, address, certificates, social profiles, and current factory
 * facts stay out of this file until verified. The production target domain is
 * recorded here; runtime canonicals still come from NEXT_PUBLIC_SITE_URL.
 *
 * Brand lines are provisional strategic messaging, not immutable copy.
 */
export const siteConfig = {
  brandName: "Bukan Pipe",
  brandNameFa: "بوکان پایپ",
  taglineEn: "Engineering Trust for Infrastructure",
  taglineFa: "زیرساختی برای جریان فردا",
  productionTargetUrl: "https://bukanpipe.com",
  siteUrl: env.siteUrl,
  defaultLocale: "fa",
  defaultDirection: "rtl",
  openGraphLocale: "fa_IR",
  allowIndexing: env.allowIndexing,
  defaultTitle: "Bukan Pipe",
  defaultDescription:
    "سکوی دیجیتال صنعتی بوکان پایپ. این نسخه، بنیاد توسعه است و هنوز محتوای تجاری تأییدشده منتشر نمی‌کند.",
  activeLocales: ["fa"] as const,
  plannedLocales: ["en", "ar", "ckb"] as const,
  social: {
    instagram: undefined as string | undefined,
    linkedin: undefined as string | undefined,
  },
} as const;

export type SiteConfig = typeof siteConfig;
export type ActiveLocale = (typeof siteConfig.activeLocales)[number];
export type PlannedLocale = (typeof siteConfig.plannedLocales)[number];
