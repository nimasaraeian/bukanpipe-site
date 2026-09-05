# نقشه کلمات کلیدی فارسی — بوکان پایپ

**هدف:** مرجع semantic SEO برای تیم محتوا — بدون keyword stuffing.  
**منبع داده:** `data/seo/fa-keyword-map.ts`

---

## خوشه تجاری (اولویت ۱)

| URL | کلمه اصلی | کلمات ثانویه | Intent |
|-----|-----------|--------------|--------|
| `/` | تولید کننده لوله پلی اتیلن | کارخانه تولید، HDPE، PE100 | commercial |
| `/about` | کارخانه تولید لوله پلی اتیلن | تولیدکننده، تأمین‌کننده، خرید از کارخانه | commercial |
| `/products` | خرید لوله پلی اتیلن از کارخانه | تأمین‌کننده، HDPE، PE100 | commercial |
| `/request-quote` | قیمت لوله پلی اتیلن | خرید، سفارش، استعلام | transactional |
| `/solutions` | تأمین کننده لوله پلی اتیلن | راهکار خط لوله HDPE | commercial |

---

## خوشه محصول / کاربرد (اولویت ۲)

| URL | کلمه اصلی | کلمات ثانویه | Intent |
|-----|-----------|--------------|--------|
| `/products/water-supply-pipe` | لوله پلی اتیلن آبرسانی | انتقال آب، HDPE آبرسانی | commercial |
| `/products/gas-pipe` | لوله پلی اتیلن گاز | گازرسانی، INSO 11233 | commercial |
| `/products/irrigation-pipe` | لوله آبیاری پلی اتیلن | کشاورزی، خط اصلی | commercial |
| `/products/industrial-pipe` | لوله پلی اتیلن صنعتی | HDPE صنعتی | commercial |
| `/products/pe100-pipe` | لوله پلی اتیلن PE100 | تولیدکننده PE100 | commercial |
| `/applications/water-transfer` | لوله انتقال آب پلی اتیلن | آبرسانی | informational |
| `/applications/agriculture-irrigation` | لوله پلی اتیلن کشاورزی | آبیاری | informational |
| `/applications/gas-distribution` | لوله گازرسانی پلی اتیلن | شبکه گاز | informational |
| `/applications/industrial` | لوله پلی اتیلن صنعتی | HDPE صنعتی | informational |

---

## خوشه فنی (اولویت ۳ — topical authority)

| URL | کلمه اصلی | کلمات ثانویه | Intent |
|-----|-----------|--------------|--------|
| `/polyethylene-pipe` | لوله پلی اتیلن | HDPE چیست، SDR، PN، خرید | informational + commercial bridge |
| `/technical-center/hdpe-pipe-what-is` | لوله HDPE چیست | PE، تفاوت با PVC | informational |
| `/technical-center/pe80-vs-pe100` | تفاوت PE80 و PE100 | MRS، انتخاب گرید | informational |
| `/technical-center/polyethylene-pipe-specifications` | مشخصات فنی لوله پلی اتیلن | SDR، PN، جدول قطر | informational |
| `/technical-center/polyethylene-pipe-standards` | استاندارد لوله پلی اتیلن | INSO، EN 1555 | informational |
| `/technical-center/pe100-technical-guide` | لوله پلی اتیلن PE100 | SDR، PN | informational |
| `/technical-center/hdpe-installation-guide` | نصب لوله پلی اتیلن | جوش، آزمون فشار | informational |

---

## اصول semantic linking

```
کارخانه (/about) → محصولات → استعلام قیمت
        ↓                ↓
   مرکز فنی ← pillar (/polyethylene-pipe)
        ↓
   مقالات SDR / PE100 / استاندارد
```

- **یک URL = یک intent اصلی** — از cannibalization بین محصول و کاربرد جلوگیری شده.
- **H1** = عنوان انسانی؛ **seoTitle** = کلمه تجاری + برند (≤ ~۶۰ کاراکتر).
- **FAQ** = سوالات واقعی مشتری صنعتی، نه تکرار keyword.

---

## پیاده‌سازی در کد

| لایه | فایل |
|------|------|
| نقشه | `data/seo/fa-keyword-map.ts` |
| محصولات FA | `data/content/fa/seo-product-seeds.ts` |
| مقالات FA | `data/content/fa/seo-article-seeds.ts` |
| کارخانه / تماس | `data/content/fa/company.ts` |
| metadata مسیرها | `messages/fa.ts` → `routes.*` |

**توجه:** معماری SEO انگلیسی (`data/content/en/*`) دست‌نخورده است.
