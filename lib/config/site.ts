import { env } from "@/lib/config/env";

/**
 * Central site configuration.
 *
 * Business facts that still require factory verification must stay out of this
 * file. Legal name, address, certificates, social profiles, and production
 * domain ownership are not assumed here.
 */
export const siteConfig = {
  brandName: "Bukan Pipe",
  taglineEn: "Engineering Trust for Infrastructure",
  taglineFa: "زیرساختی برای جریان فردا",
  siteUrl: env.siteUrl,
  defaultLocale: "fa",
  defaultDirection: "rtl",
  openGraphLocale: "fa_IR",
  allowIndexing: env.allowIndexing,
  defaultTitle: "Bukan Pipe",
  defaultDescription:
    "سکوی دیجیتال صنعتی Bukan Pipe. این نسخه، بنیاد توسعه است و هنوز محتوای تجاری تأییدشده منتشر نمی‌کند.",
  /**
   * Current public locale only. Future locales are recorded so routing can be
   * added later without restructuring the application.
   */
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
