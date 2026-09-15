import type { HeroCallout, HeroFeature } from "@/lib/products/en-hub-hero";

export const faProductsHeroCopy = {
  eyebrowBrand: "BUKAN PIPE",
  eyebrowSuffix: "سیستم‌های لوله PE100",
  titleLine1: "مهندسی‌شده",
  titleLine2: "از درون به بیرون",
  lead:
    "سیستم‌های لوله HDPE (PE100) با عملکرد بالا برای آب، گاز، آبیاری، فاضلاب، زهکشی و زیرساخت‌های حیاتی.",
  features: [
    { id: "corrosion", label: "مقاوم در برابر خوردگی", icon: "shield" },
    { id: "service-life", label: "عمر مفید طولانی", icon: "clock" },
    { id: "recyclable", label: "پایدار و قابل بازیافت", icon: "recycle" },
    { id: "leak-free", label: "عملکرد بدون نشتی", icon: "links" },
  ] satisfies readonly HeroFeature[],
  callouts: [
    {
      id: "pe100-material",
      label: "جنس PE100",
      detail: "ترکیب PE100 با استحکام بالا",
      anchor: { x: 56, y: 28 },
      labelAt: { x: 18, y: 18 },
    },
    {
      id: "wall-structure",
      label: "ساختار یکنواخت دیواره",
      detail: "ضخامت پایدار برای فشار مطمئن",
      anchor: { x: 54, y: 42 },
      labelAt: { x: 18, y: 36 },
    },
    {
      id: "internal-bore",
      label: "باطن صاف داخلی",
      detail: "اصطکاک پایین، بازده جریان بالا",
      anchor: { x: 52, y: 56 },
      labelAt: { x: 18, y: 54 },
    },
    {
      id: "uv-exterior",
      label: "روکش مقاوم UV",
      detail: "حفاظت در محیط‌های سخت",
      anchor: { x: 58, y: 72 },
      labelAt: { x: 18, y: 72 },
    },
  ] satisfies readonly HeroCallout[],
  ctaPrimary: "استعلام قیمت",
  ctaSecondary: "دانلود",
  trustLabel: "شاخص‌های تولید",
  trustItems: [
    { title: "آزمایشگاه QC", subtitle: "کنترل کیفیت در خط و آزمایشگاه" },
    { title: "PE100", subtitle: "طراحی فشار با MRS بالاتر" },
    { title: "۶۳۰ mm", subtitle: "حداکثر قطر خارجی منتشرشده" },
    { title: "از سال ۱۳۷۶", subtitle: "تولید لوله PE در بوکان" },
  ],
} as const;
