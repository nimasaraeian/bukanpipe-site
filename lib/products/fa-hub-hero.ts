import type { HeroCallout, HeroFeature } from "@/lib/products/en-hub-hero";

export const faProductsHeroCopy = {
  eyebrowBrand: "BUKAN PIPE",
  eyebrowSuffix: "لوله‌های پلی‌اتیلن بوکان پایپ",
  titleLine1: "تولید لوله پلی‌اتیلن",
  titleLine2: "برای شبکه‌های زیرساختی",
  lead:
    "لوله‌های پلی‌اتیلن برای آبرسانی، گازرسانی، آبیاری و انتقال سیالات؛ با مشخصات متناسب با کاربرد، فشار و شرایط پروژه.",
  features: [
    { id: "corrosion", label: "مقاوم در برابر خوردگی", icon: "shield" },
    { id: "service-life", label: "عمر مفید طولانی", icon: "clock" },
    { id: "recyclable", label: "قابل بازیافت", icon: "recycle" },
    { id: "leak-free", label: "قابلیت اتصال جوشی یکپارچه", icon: "links" },
  ] satisfies readonly HeroFeature[],
  callouts: [
    {
      id: "pe100-material",
      label: "گرید PE100",
      detail: "ترکیب PE100 با استحکام بالا",
      anchor: { x: 56, y: 28 },
      labelAt: { x: 18, y: 18 },
    },
    {
      id: "wall-structure",
      label: "ساختار یکنواخت دیواره",
      detail: "کنترل ضخامت در خط تولید",
      anchor: { x: 54, y: 42 },
      labelAt: { x: 18, y: 36 },
    },
    {
      id: "internal-bore",
      label: "سطح داخلی صاف",
      detail: "کاهش مقاومت در برابر جریان",
      anchor: { x: 52, y: 56 },
      labelAt: { x: 18, y: 54 },
    },
    {
      id: "uv-exterior",
      label: "مقاومت در برابر فرابنفش",
      detail: "وابسته به ترکیب و شرایط کاربرد",
      anchor: { x: 58, y: 72 },
      labelAt: { x: 18, y: 72 },
    },
  ] satisfies readonly HeroCallout[],
  ctaPrimary: "استعلام قیمت",
  ctaSecondary: "کاتالوگ و مدارک",
  trustLabel: "شاخص‌های تولید",
  trustItems: [
    { title: "آزمایشگاه QC", subtitle: "کنترل کیفیت در خط و آزمایشگاه" },
    { title: "PE100", subtitle: "گرید با استحکام بلندمدت بالاتر" },
    { title: "۱۶ تا ۶۳۰ میلی‌متر", subtitle: "دامنه قطر کاتالوگ آبرسانی" },
    { title: "از سال ۱۳۷۶", subtitle: "تولید لوله PE در بوکان" },
  ],
} as const;
