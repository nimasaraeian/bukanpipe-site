# نقشه راه SEO فارسی — ۶ ماه

**هدف:** تبدیل bukanpipe.com/fa به مرجع فارسی تولید و تأمین لوله پلی اتیلن  
**اولویت:** کلمات تجاری → محصول/کاربرد → فنی → اعتماد (E-E-A-T)

---

## ماه ۱ — پایه تجاری (انجام‌شده در کد)

| هفته | اقدام | URL / خروجی | KPI |
|------|--------|-------------|-----|
| ۱ | بهینه H1/Title/FAQ صفحه کارخانه | `/about` | Impression «تولید کننده لوله پلی اتیلن» |
| ۱ | Title/Description خانه و محصولات | `/`, `/products` | CTR فارسی |
| ۲ | لندینگ محصول با intent فارسی | ۵ محصول اصلی | Rank محصولات |
| ۲ | فرم استعلام — metadata transactional | `/request-quote` | Conversion استعلام |
| ۳ | ۴ مقاله فنی پایه | HDPE چیست، PE80/100، مشخصات، استاندارد | Long-tail فنی |
| ۴ | internal-link mesh | hub ↔ product ↔ technical | Crawl depth |

**خروجی فنی:** `docs/fa/PERSIAN_KEYWORD_MAP.md`, `data/seo/fa-keyword-map.ts`

---

## ماه ۲ — عمق محصول و قیمت

| اقدام | جزئیات |
|--------|---------|
| PDF جدول قطر/SDR/PN | لینک از spec-cta — **نیاز داده کارخانه** |
| صفحه «نحوه سفارش از کارخانه» | FAQ + ویدیو کوتاه خط تولید (اختیاری) |
| Rich snippet | FAQPage روی ۳ محصول پرترافیک |
| لینک‌سازی داخلی از footer FA | کارخانه، PE100، استعلام |

**KPI:** ۱۰ کلمه commercial در top 20 گوگل.fa

---

## ماه ۳ — topical authority فنی

| مقاله پیشنهادی | کلمه هدف |
|----------------|----------|
| جوش butt fusion vs electrofusion (توسعه FA) | جوش لوله پلی اتیلن |
| MOP و ضریب دما (توسعه موجود) | PN لوله پلی اتیلن |
| شیر هوا در خط PE (موجود — interlink) | شیر هوا لوله |
| انتخاب SDR برای آبرسانی | SDR لوله پلی اتیلن |

**KPI:** ۵ مقاله فنی با avg. position < 15

---

## ماه ۴ — اعتماد و E-E-A-T

| اقدام | جزئیات |
|--------|---------|
| گواهی‌ها با PDF تأییدشده | `/certifications` |
| مطالعه موردی پروژه (۱–۲) | `/projects` — برداشتن noindex پس از تأیید |
| Schema Organization + ManufacturingBusiness | تقویت logo، address |
| مصاحبه/نقل‌قول مهندس QC | بلوک expert در `/quality` |

**KPI:** Knowledge panel / sitelinks برای «بوکان پایپ»

---

## ماه ۵ — گسترش کاربرد و منطقه

| اقدام | کلمه |
|--------|------|
| لندینگ «لوله پلی اتیلن تبریز/ارومیه» (اگر logistics واقعی) | geo + commercial |
| محتوای آبیاری زیرسطحی (توسعه FA) | آبیاری قطره‌ای |
| لندینگ حفاظ کابل (در صورت SKU) | لوله حفاظ کابل |

**KPI:** ترافیک organic FA +30% نسبت به ماه ۱

---

## ماه ۶ — اندازه‌گیری و تکرار

| اقدام | ابزار |
|--------|--------|
| Audit GSC فارسی | Query, page, CTR |
| حذف/merge صفحات کم‌بازدید | Cannibalization check |
| A/B Title محصولات | GSC experiment |
| Backlink outreach | انجمن مهندسی، تأمین آب/گاز |

**KPI:** ۳ کلمه head commercial در صفحه ۱؛ نرخ تبدیل استعلام FA

---

## قوانین محتوا (همیشگی)

1. **یک intent = یک URL** — merge نکنید مگر redirect 301.
2. **تعریف قبل از فروش** — بلوک definition در هر لندینگ.
3. **FAQ طبیعی** — سوالاتی که در تماس تلفنی می‌پرسند.
4. **بدون قیمت ساختگی** — همه commercial به `/request-quote`.
5. **EN جدا** — هیچ تغییری در `data/content/en/*` برای این roadmap.

---

## وضعیت پیاده‌سازی (شهریور ۱۴۰۵)

- [x] نقشه کلمات کلیدی FA
- [x] بهینه metadata FA (home, products, about, request-quote)
- [x] ۵ لندینگ محصول FA با FAQ و internal links
- [x] ۴ مقاله فنی جدید (FA-only)
- [x] pillar + hub + applications FA
- [ ] PDF مشخصات کارخانه
- [ ] پروژه‌های منتشرشده
- [ ] لندینگ geo (ماه ۵)
