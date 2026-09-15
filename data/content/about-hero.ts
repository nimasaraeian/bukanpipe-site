import type { Locale } from "@/lib/i18n/config";

export type AboutHeroStat = {
  value: string;
  label: string;
};

export type AboutHeroContent = {
  eyebrow: string;
  title: string;
  lead: string;
  primaryCta: string;
  secondaryCta: string;
  stats: readonly AboutHeroStat[];
  imageAlt: string;
};

const aboutHeroByLocale: Record<Locale, AboutHeroContent> = {
  en: {
    eyebrow: "BUKAN PIPE",
    title: "Engineering Reliable Flow Systems Since 1997",
    lead:
      "Single-wall HDPE and PE100 polyethylene pipe for water, gas, agriculture and industrial networks — manufactured in Bukan, West Azerbaijan.",
    primaryCta: "Request a quote",
    secondaryCta: "Explore company",
    stats: [
      { value: "1997", label: "Established" },
      { value: "PE100", label: "Production capability" },
      { value: "ISO", label: "Quality management" },
    ],
    imageAlt: "Bukan Pipe manufacturing facility aerial view — Bukan, West Azerbaijan",
  },
  fa: {
    eyebrow: "بوکان پایپ | از سال ۱۳۷۶",
    title: "تأسیس ۱۳۷۶",
    lead:
      "تولیدکننده لوله‌های HDPE و PE100 برای شبکه‌های آبرسانی، گازرسانی، آبیاری و کاربردهای صنعتی در بوکان، آذربایجان غربی.",
    primaryCta: "درخواست پیش‌فاکتور",
    secondaryCta: "درباره شرکت",
    stats: [
      { value: "۱۳۷۶", label: "تأسیس" },
      { value: "PE100", label: "تولید تخصصی" },
      { value: "ISO", label: "مدیریت کیفیت" },
    ],
    imageAlt: "نمای هوایی کارخانه تولید لوله پلی‌اتیلن بوکان — آذربایجان غربی",
  },
};

export function getAboutHeroContent(locale: Locale): AboutHeroContent {
  return aboutHeroByLocale[locale];
}
