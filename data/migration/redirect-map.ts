// GENERATED FILE — do not edit.
// Source: redirect-map-draft.csv
// Regenerate: node scripts/build-redirect-map.mjs
// Verified in sync by lib/migration/redirect-map.test.ts.

export type ExactRedirect = { source: string; destination: string };
export type PatternRedirect = { source: string; regex: string; destination: string | null };
export type QueryRedirect = {
  path: string;
  param: string;
  /** null matches any value. */
  value: string | null;
  destination: string | null;
};
export type QueryFallback = { path: string; destination: string | null };
export type SkippedRow = { source: string; reason: string };

/** Exact path → destination. Sources are normalized: decoded, no trailing slash. */
export const EXACT_REDIRECTS: readonly ExactRedirect[] = [
  {
    "source": "/about.htm",
    "destination": "/fa/about"
  },
  {
    "source": "/eabout.htm",
    "destination": "/en/about"
  },
  {
    "source": "/contact.htm",
    "destination": "/fa/contact"
  },
  {
    "source": "/contact.php",
    "destination": "/fa/contact"
  },
  {
    "source": "/econtact.htm",
    "destination": "/en/contact"
  },
  {
    "source": "/econtact.php",
    "destination": "/en/contact"
  },
  {
    "source": "/index.htm",
    "destination": "/fa"
  },
  {
    "source": "/index.php",
    "destination": "/fa"
  },
  {
    "source": "/pe100.htm",
    "destination": "/fa/polyethylene-pipe"
  },
  {
    "source": "/pe80.htm",
    "destination": "/fa/technical-center/pe80-vs-pe100"
  },
  {
    "source": "/pe63.htm",
    "destination": "/fa/polyethylene-pipe"
  },
  {
    "source": "/epe100.htm",
    "destination": "/en/polyethylene-pipe"
  },
  {
    "source": "/epe80.htm",
    "destination": "/en/polyethylene-pipe"
  },
  {
    "source": "/epe63.htm",
    "destination": "/en/polyethylene-pipe"
  },
  {
    "source": "/project.php",
    "destination": "/fa/applications"
  },
  {
    "source": "/fa/about-us",
    "destination": "/fa/about"
  },
  {
    "source": "/fa/contact-us",
    "destination": "/fa/contact"
  },
  {
    "source": "/fa/contact_us",
    "destination": "/fa/contact"
  },
  {
    "source": "/fa/contact-us/نظرسنجی-مشتریان",
    "destination": "/fa/contact"
  },
  {
    "source": "/fa/gas-pipe",
    "destination": "/fa/products/gas-pipe"
  },
  {
    "source": "/fa/water-pipe",
    "destination": "/fa/products/water-supply-pipe"
  },
  {
    "source": "/fa/products/water-pipe",
    "destination": "/fa/products/water-supply-pipe"
  },
  {
    "source": "/fa/home-fa/certs",
    "destination": "/fa/certifications"
  },
  {
    "source": "/fa/home-fa/honors",
    "destination": "/fa/certifications"
  },
  {
    "source": "/fa/home-fa/map",
    "destination": "/fa/contact"
  },
  {
    "source": "/fa/home-fa/policy",
    "destination": "/fa/quality"
  },
  {
    "source": "/fa/lab-scope",
    "destination": "/fa/laboratory/iso-17025"
  },
  {
    "source": "/fa/qc",
    "destination": "/fa/laboratory"
  },
  {
    "source": "/fa/qc/qc-intro",
    "destination": "/fa/laboratory"
  },
  {
    "source": "/fa/qc/test",
    "destination": "/fa/laboratory/services"
  },
  {
    "source": "/fa/qc/tech",
    "destination": "/fa/technical-center"
  },
  {
    "source": "/fa/qc/tech/15-pe-introduce",
    "destination": "/fa/technical-center/polyethylene-pipe-complete-guide"
  },
  {
    "source": "/fa/qc/tech/16-pe-production",
    "destination": "/fa/technical-center/polyethylene-pipe-complete-guide"
  },
  {
    "source": "/fa/qc/tech/25-accuracy",
    "destination": "/fa/technical-center/polyethylene-pipe-specifications"
  },
  {
    "source": "/fa/qc/tech/14-sds",
    "destination": "/fa/technical-center"
  },
  {
    "source": "/fa/qc/survey",
    "destination": "/fa/contact"
  },
  {
    "source": "/fa/qc/survey/ثبت-شکایت-از-خدمات-آزمایشگاه",
    "destination": "/fa/contact"
  },
  {
    "source": "/fa/qc/vote",
    "destination": "/fa/contact"
  },
  {
    "source": "/fa/news",
    "destination": "/fa/technical-center"
  },
  {
    "source": "/en/2-moarefi/18-history-and-introduction",
    "destination": "/en/about"
  },
  {
    "source": "/en/contact-us",
    "destination": "/en/contact"
  },
  {
    "source": "/en/news",
    "destination": "/en/technical-center"
  },
  {
    "source": "/en/index.php",
    "destination": "/en"
  },
  {
    "source": "/ar",
    "destination": "/en"
  },
  {
    "source": "/ar/contact-us",
    "destination": "/en/contact"
  },
  {
    "source": "/index.php/fa",
    "destination": "/fa"
  },
  {
    "source": "/index.php/en",
    "destination": "/en"
  },
  {
    "source": "/index.php/ar",
    "destination": "/en"
  },
  {
    "source": "/index.php/fa/about-us",
    "destination": "/fa/about"
  },
  {
    "source": "/index.php/fa/contact-us",
    "destination": "/fa/contact"
  },
  {
    "source": "/index.php/en/contact-us",
    "destination": "/en/contact"
  },
  {
    "source": "/index.php/ar/contact-us",
    "destination": "/en/contact"
  },
  {
    "source": "/index.php/fa/products",
    "destination": "/fa/products"
  },
  {
    "source": "/index.php/fa/products/irrigation-pipe",
    "destination": "/fa/products/irrigation-pipe"
  },
  {
    "source": "/index.php/fa/home1/gallery-2",
    "destination": "/fa/gallery"
  },
  {
    "source": "/index.php/fa/blog",
    "destination": "/fa/technical-center"
  },
  {
    "source": "/آزمایشگاه-لوله-بوکان",
    "destination": "/fa/laboratory"
  },
  {
    "source": "/آزمون-لوله-پلیمری",
    "destination": "/fa/laboratory/services"
  },
  {
    "source": "/اطلاعات-فنی",
    "destination": "/fa/technical-center"
  },
  {
    "source": "/معرفی-آزمایشگاه",
    "destination": "/fa/laboratory"
  },
  {
    "source": "/واحد-کنترل-کیفیت-و-آزمایشگاه",
    "destination": "/fa/laboratory"
  },
  {
    "source": "/ثبت-شکایت-آزمایشگاه",
    "destination": "/fa/contact"
  },
  {
    "source": "/نظرسنجی-خدمات‌-آزمایشگاه",
    "destination": "/fa/contact"
  },
  {
    "source": "/لوله-آبرسانی",
    "destination": "/fa/products/water-supply-pipe"
  },
  {
    "source": "/لوله-گاز-رسانی",
    "destination": "/fa/products/gas-pipe"
  },
  {
    "source": "/لوله-آبیاری-قطره-ای",
    "destination": "/fa/products/irrigation-pipe"
  },
  {
    "source": "/محصولات-شرکت",
    "destination": "/fa/products"
  },
  {
    "source": "/تصاویر-محصولات",
    "destination": "/fa/gallery"
  },
  {
    "source": "/تصاویر-واحد-تولید",
    "destination": "/fa/gallery"
  },
  {
    "source": "/تصاویر-واحد-کنترل-کیفی",
    "destination": "/fa/gallery"
  },
  {
    "source": "/گالری-تصاویر",
    "destination": "/fa/gallery"
  },
  {
    "source": "/محوطه-و-سایر-واحدها",
    "destination": "/fa/gallery"
  },
  {
    "source": "/پرسنل",
    "destination": "/fa/gallery"
  },
  {
    "source": "/تقدیرنامه-ها",
    "destination": "/fa/certifications"
  },
  {
    "source": "/گواهینامه-ها",
    "destination": "/fa/certifications"
  },
  {
    "source": "/case-study/familiarity-with-polyethylene",
    "destination": "/fa/technical-center/polyethylene-pipe-complete-guide"
  },
  {
    "source": "/case-study/heavy-polyethylene",
    "destination": "/fa/technical-center/polyethylene-pipe-complete-guide"
  },
  {
    "source": "/case-study/آشنایی-با-دبی",
    "destination": "/fa/technical-center"
  },
  {
    "source": "/case-study-category/technical-information",
    "destination": "/fa/technical-center"
  },
  {
    "source": "/portfolio-category/gas-delivery",
    "destination": "/fa/products/gas-pipe"
  },
  {
    "source": "/portfolio-category/irrigation-pipe",
    "destination": "/fa/products/irrigation-pipe"
  },
  {
    "source": "/portfolio-category/water-supply",
    "destination": "/fa/products/water-supply-pipe"
  },
  {
    "source": "/portfolio-category/products",
    "destination": "/fa/products"
  },
  {
    "source": "/portfolio/gas",
    "destination": "/fa/products/gas-pipe"
  },
  {
    "source": "/portfolio/irrigation-products",
    "destination": "/fa/products/irrigation-pipe"
  },
  {
    "source": "/portfolio/أبياري",
    "destination": "/fa/products/irrigation-pipe"
  },
  {
    "source": "/portfolio/water-supply",
    "destination": "/fa/products/water-supply-pipe"
  },
  {
    "source": "/portfolio/محصولات-ما",
    "destination": "/fa/products"
  },
  {
    "source": "/service-category/gas-pipe",
    "destination": "/fa/products/gas-pipe"
  },
  {
    "source": "/service-category/irrigation-pipe",
    "destination": "/fa/products/irrigation-pipe"
  },
  {
    "source": "/service-category/water-pipe",
    "destination": "/fa/products/water-supply-pipe"
  },
  {
    "source": "/service-category/products",
    "destination": "/fa/products"
  },
  {
    "source": "/service/gas-supply-pipe",
    "destination": "/fa/products/gas-pipe"
  },
  {
    "source": "/service/water-supply-pipe",
    "destination": "/fa/products/water-supply-pipe"
  },
  {
    "source": "/service/drip-irrigation-pipe",
    "destination": "/fa/products/irrigation-pipe"
  },
  {
    "source": "/service/sales-advisor",
    "destination": "/fa/contact"
  },
  {
    "source": "/service-category/bukanpipe",
    "destination": "/fa/about"
  },
  {
    "source": "/آبیاری-قطره‌ای-روشی-برای-آبیاری-موضعی-localized",
    "destination": "/fa/products/irrigation-pipe"
  },
  {
    "source": "/product-category/آزمون-لوله-pe",
    "destination": "/fa/laboratory/services"
  },
  {
    "source": "/product-category/gas",
    "destination": "/fa/products/gas-pipe"
  },
  {
    "source": "/product-category/water",
    "destination": "/fa/products/water-supply-pipe"
  },
  {
    "source": "/product-category/products",
    "destination": "/fa/products"
  },
  {
    "source": "/product-tag/لوله-آبیاری-قطره-ای",
    "destination": "/fa/products/irrigation-pipe"
  },
  {
    "source": "/product-tag/لوله-2-اینچ",
    "destination": "/fa/products"
  },
  {
    "source": "/product/آبرسانی-63-میلیمتر-دو-اینچ",
    "destination": "/fa/products/water-supply-pipe"
  },
  {
    "source": "/product/لوله-آبیاری-قطره-ای",
    "destination": "/fa/products/irrigation-pipe"
  },
  {
    "source": "/product/لوله-پلی-اتیلن-گازرسانی-sdr11-63",
    "destination": "/fa/products/gas-pipe"
  }
];

/** Exact paths that answer 410. */
export const EXACT_GONE: readonly string[] = [
  "/2021/10/08/onlajn-pinap-kazino-veb-resurs-dlja-aktivnyh",
  "/2021/10/17/piabet-sitesinde-canli-casino-oynayin",
  "/2021/10/18/1xbet-canli-bahis-sitesi-casino",
  "/2022/01/20/oficialnyj-sajt-pinap-s-bonusami-za-registraciju-7789",
  "/2022/01/20/vulkan-stars-privetstvuet-vseh-ljubitelej-igrovyh-7789",
  "/2022/02/10/antivirus-for-iphone-those-that-are-the-best",
  "/2022/03/01/korean-home-theater-devices",
  "/fa/qc/tech/24-market-2017",
  "/fa/9",
  "/ar/news",
  "/bukanpipe-news",
  "/2018/12/25/جلسه-هم-اندیشی",
  "/2021/09/27/title",
  "/2022/01/13/hello-world",
  "/author/admin",
  "/author/bukanpipe",
  "/category/symposium",
  "/category/uncategorized",
  "/elementor-6492",
  "/shop-wishlist",
  "/shortcode",
  "/faq",
  "/careers",
  "/portfolio-grid",
  "/portfolio-masonry",
  "/portfolio/chan-agency",
  "/portfolio/court-imperial",
  "/portfolio/data-analytics",
  "/portfolio/digital-analysis",
  "/case-study/accuracy-and-layout",
  "/case-study/developing-a-program-to-be-alleviate-poverty",
  "/service-category/consulting",
  "/about-v-2",
  "/about-v-3",
  "/about-v-4",
  "/contact-v-2",
  "/contact-v-3",
  "/contact-v-4",
  "/services-v-1",
  "/services-v-2",
  "/pricing",
  "/pricing-v-2",
  "/team",
  "/team-details",
  "/team-v-2",
  "/team-v-3",
  "/team-v-4",
  "/testimonials",
  "/testimonials-v-2",
  "/testimonials-v-3",
  "/testimonials-v-4",
  "/blog-carousel",
  "/blog-grid-2-columns-sidebar-left",
  "/blog-grid-2-columns-sidebar-right",
  "/blog-grid-3-columns",
  "/blog-standard-left-sidebar",
  "/blog-standard-without-sidebar",
  "/ساید-بار-راست",
  "/ساید-بار-چپ-2",
  "/کاملاً-واکنشگرا-با-هر-اندازه-صفحه-نمای",
  "/sitemap.html"
];

/** Wildcard rows, longest source first. A null destination means 410. */
export const PATTERN_RULES: readonly PatternRedirect[] = [
  {
    "source": "/index.php/fa/home1/2018-*",
    "regex": "^/index\\.php/fa/home1/2018-[^/]*$",
    "destination": null
  },
  {
    "source": "/index.php/fa/blog/item/*",
    "regex": "^/index\\.php/fa/blog/item/[^/]+(?:/.*)?$",
    "destination": null
  },
  {
    "source": "/index.php/fa/products/*",
    "regex": "^/index\\.php/fa/products/[^/]+(?:/.*)?$",
    "destination": "/fa/products"
  },
  {
    "source": "/index.php/*/component/*",
    "regex": "^/index\\.php/[^/]+/component/[^/]+(?:/.*)?$",
    "destination": null
  },
  {
    "source": "/index.php/fa/2016-*",
    "regex": "^/index\\.php/fa/2016-[^/]*$",
    "destination": null
  },
  {
    "source": "/index.php/fa/2018-*",
    "regex": "^/index\\.php/fa/2018-[^/]*$",
    "destination": null
  },
  {
    "source": "/fa/news/itemlist/*",
    "regex": "^/fa/news/itemlist/[^/]+(?:/.*)?$",
    "destination": null
  },
  {
    "source": "/ar/2-moarefi/19-*",
    "regex": "^/ar/2-moarefi/19-[^/]*$",
    "destination": "/en/about"
  },
  {
    "source": "/fa/news/item/*",
    "regex": "^/fa/news/item/[^/]+(?:/.*)?$",
    "destination": null
  },
  {
    "source": "/fa/component/*",
    "regex": "^/fa/component/[^/]+(?:/.*)?$",
    "destination": null
  },
  {
    "source": "/ar/news/item/*",
    "regex": "^/ar/news/item/[^/]+(?:/.*)?$",
    "destination": null
  },
  {
    "source": "/ct-mega-menu/*",
    "regex": "^/ct-mega-menu/[^/]+(?:/.*)?$",
    "destination": null
  },
  {
    "source": "/footer/*",
    "regex": "^/footer/[^/]+(?:/.*)?$",
    "destination": null
  }
];

/** Query-string rows. Matched on path + parameter. */
export const QUERY_RULES: readonly QueryRedirect[] = [
  {
    "path": "/fa/user/temp.php",
    "param": "irantech_cms",
    "value": "11801",
    "destination": "/fa/laboratory/services"
  },
  {
    "path": "/en/user/temp.php",
    "param": "irantech_cms",
    "value": "11801",
    "destination": "/en/laboratory"
  },
  {
    "path": "/fa/user/temp.php",
    "param": "irantech_cms",
    "value": "1141",
    "destination": "/fa/gallery"
  },
  {
    "path": "/en/user/temp.php",
    "param": "irantech_cms",
    "value": "1141",
    "destination": "/en/gallery"
  },
  {
    "path": "/fa/user/product2/detail.php",
    "param": "ID",
    "value": null,
    "destination": "/fa/products"
  },
  {
    "path": "/en/user/product2/detail.php",
    "param": "ID",
    "value": null,
    "destination": "/en/products"
  },
  {
    "path": "/",
    "param": "download",
    "value": "catalog",
    "destination": "/fa/products"
  }
];

/** Applied when a QUERY_RULES path is hit but no rule above matched it. */
export const QUERY_FALLBACKS: readonly QueryFallback[] = [
  {
    "path": "/fa/user/temp.php",
    "destination": null
  },
  {
    "path": "/en/user/temp.php",
    "destination": null
  }
];

/** Query keys that mark an injected spam URL on any path. */
export const SPAM_QUERY_PARAMS_FROM_MAP: readonly string[] = [
  "LOSS",
  "Male"
];

/** Rows deliberately not implemented — see reason. */
export const SKIPPED_ROWS: readonly SkippedRow[] = [
  {
    "source": "/fa/products/irrigation-pipe",
    "reason": "self-redirect: source and destination are the same live route (CSV L43)"
  },
  {
    "source": "/about",
    "reason": "locale redirect already reaches /fa/about in one hop (CSV L91)"
  },
  {
    "source": "/contact",
    "reason": "locale redirect already reaches /fa/contact in one hop (CSV L92)"
  },
  {
    "source": "/shop",
    "reason": "the inventory already serves this (/fa/products), which is what CSV L132 asks for"
  },
  {
    "source": "/cart",
    "reason": "the inventory already serves this (410), which is what CSV L144 asks for"
  },
  {
    "source": "/my-account",
    "reason": "the inventory already serves this (410), which is what CSV L145 asks for"
  },
  {
    "source": "/about_us",
    "reason": "the inventory already serves this (/fa/about), which is what CSV L186 asks for"
  },
  {
    "source": "/contact-us",
    "reason": "the inventory already serves this (/fa/contact), which is what CSV L187 asks for"
  },
  {
    "source": "/gas-pipe",
    "reason": "the inventory already serves this (/fa/products/gas-pipe), which is what CSV L188 asks for"
  },
  {
    "source": "/air-vent-valve",
    "reason": "the inventory already serves this (/fa/technical-center/air-vent-valve), which is what CSV L189 asks for"
  },
  {
    "source": "/temp-cooficient",
    "reason": "the inventory already serves this (/fa/technical-center/polyethylene-pipe-temperature-pressure), which is what CSV L190 asks for"
  },
  {
    "source": "/welding",
    "reason": "the inventory already serves this (/fa/technical-center/polyethylene-pipe-welding), which is what CSV L191 asks for"
  },
  {
    "source": "/training",
    "reason": "the inventory already serves this (/fa/laboratory/training), which is what CSV L192 asks for"
  },
  {
    "source": "/iso-iec17025",
    "reason": "the inventory already serves this (/fa/laboratory/iso-17025), which is what CSV L193 asks for"
  },
  {
    "source": "/lab-scope",
    "reason": "decided in favour of the inventory (/fa/laboratory/test-scope); CSV L194 wanted /fa/laboratory/iso-17025"
  },
  {
    "source": "/qc-and-laboratory",
    "reason": "the inventory already serves this (/fa/laboratory), which is what CSV L195 asks for"
  },
  {
    "source": "/standards",
    "reason": "decided in favour of the inventory (/fa/downloads); CSV L196 wanted /fa/technical-center/polyethylene-pipe-standards"
  },
  {
    "source": "/certs",
    "reason": "the inventory already serves this (/fa/certifications), which is what CSV L197 asks for"
  },
  {
    "source": "/policy",
    "reason": "the inventory already serves this (/fa/quality), which is what CSV L198 asks for"
  },
  {
    "source": "/خط-مشی-کیفیت-آزمایشگاه",
    "reason": "decided in favour of the inventory (/fa/laboratory); CSV L199 wanted /fa/quality"
  },
  {
    "source": "/articles",
    "reason": "the inventory already serves this (/fa/technical-center), which is what CSV L200 asks for"
  },
  {
    "source": "/آخرین-نوشته-ها",
    "reason": "the inventory already serves this (/fa/technical-center), which is what CSV L201 asks for"
  },
  {
    "source": "/category/مقالات",
    "reason": "the inventory already serves this (/fa/technical-center), which is what CSV L202 asks for"
  },
  {
    "source": "/category/محصولات",
    "reason": "the inventory already serves this (/fa/products), which is what CSV L203 asks for"
  },
  {
    "source": "/لوله-های-پلی-اتیلن-آبرسانی",
    "reason": "the inventory already serves this (/fa/products/water-supply-pipe), which is what CSV L204 asks for"
  },
  {
    "source": "/آبیاری-زیرسطحی",
    "reason": "decided in favour of the inventory (/fa/applications/agriculture-irrigation); CSV L205 wanted /fa/products/irrigation-pipe"
  },
  {
    "source": "/تولید-بر-اساس-دانش-و-تکنولوژی-روز",
    "reason": "the inventory already serves this (/fa/about), which is what CSV L216 asks for"
  },
  {
    "source": "/تولید-کننده-ای-با-تراز-اول-کیفیت",
    "reason": "the inventory already serves this (/fa/about), which is what CSV L217 asks for"
  },
  {
    "source": "/customer-poll",
    "reason": "decided in favour of the inventory (410); CSV L218 wanted /fa/contact"
  },
  {
    "source": "/lab-poll",
    "reason": "decided in favour of the inventory (410); CSV L219 wanted /fa/laboratory"
  },
  {
    "source": "/pipeline_design",
    "reason": "decided in favour of the inventory (/fa/calculator/pipeline-design); CSV L220 wanted /fa/technical-center"
  },
  {
    "source": "/پیمان-دادخواه",
    "reason": "the inventory already serves this (410), which is what CSV L222 asks for"
  },
  {
    "source": "/محمد-عزیزنژاد",
    "reason": "the inventory already serves this (410), which is what CSV L223 asks for"
  },
  {
    "source": "/مهندس-رحمانی",
    "reason": "the inventory already serves this (410), which is what CSV L224 asks for"
  },
  {
    "source": "/مدیر-فروش",
    "reason": "the inventory already serves this (410), which is what CSV L225 asks for"
  },
  {
    "source": "/نظر-مشتری-امینی",
    "reason": "the inventory already serves this (410), which is what CSV L226 asks for"
  },
  {
    "source": "/صفحه-اصلی/پیمایش-تک-صفحه-ای",
    "reason": "the inventory already serves this (410), which is what CSV L227 asks for"
  },
  {
    "source": "/صفحه-اصلی-2",
    "reason": "the inventory already serves this (410), which is what CSV L228 asks for"
  },
  {
    "source": "/صفحه-اصلی-3",
    "reason": "the inventory already serves this (410), which is what CSV L229 asks for"
  },
  {
    "source": "/بدون-سایدبار",
    "reason": "the inventory already serves this (410), which is what CSV L232 asks for"
  },
  {
    "source": "/بدون-سایدبار-باریک",
    "reason": "the inventory already serves this (410), which is what CSV L233 asks for"
  },
  {
    "source": "/بلوک-ریکاردو",
    "reason": "decided in favour of the inventory (/fa/projects); CSV L234 wanted 410"
  },
  {
    "source": "/الیزا-روما",
    "reason": "the inventory already serves this (410), which is what CSV L235 asks for"
  },
  {
    "source": "/استراتژی-محتوا",
    "reason": "the inventory already serves this (410), which is what CSV L236 asks for"
  },
  {
    "source": "/بازاریابی-آنلاین",
    "reason": "the inventory already serves this (410), which is what CSV L237 asks for"
  },
  {
    "source": "/بهینه-سازی-فروش",
    "reason": "the inventory already serves this (410), which is what CSV L238 asks for"
  },
  {
    "source": "/خرید،-شروع-راه-دوستی-ماست",
    "reason": "the inventory already serves this (410), which is what CSV L239 asks for"
  },
  {
    "source": "/اسلایدرهای-عالی-برای-نشان-دادن-محتوای",
    "reason": "the inventory already serves this (410), which is what CSV L240 asks for"
  },
  {
    "source": "/طرح-بندی-ها-با-ظاهر-جذاب،-همه-در-یک-قالب",
    "reason": "the inventory already serves this (410), which is what CSV L241 asks for"
  },
  {
    "source": "/صفحه-سفارشی-سازی-با-پیش-نمایش-زنده",
    "reason": "the inventory already serves this (410), which is what CSV L242 asks for"
  },
  {
    "source": "/چند-صفحه-اصلی،-بخش-نمونه-کارها-و-بخش-وبل",
    "reason": "the inventory already serves this (410), which is what CSV L244 asks for"
  },
  {
    "source": "/پشتیبانی-رایگان-از-سایت-شما-در-هر-زمان",
    "reason": "the inventory already serves this (410), which is what CSV L245 asks for"
  },
  {
    "source": "/category/تبلیغات",
    "reason": "the inventory already serves this (410), which is what CSV L246 asks for"
  },
  {
    "source": "/category/blog",
    "reason": "decided in favour of the inventory (/fa/technical-center); CSV L247 wanted 410"
  },
  {
    "source": "/category/blog/برندینگ",
    "reason": "the inventory already serves this (410), which is what CSV L248 asks for"
  }
];

export const MAP_ROW_COUNT = 248;

/** Shared paths still awaiting a ruling. Zero means the map is fully decided. */
export const CONFLICT_COUNT = 0;

/** Shared paths whose outcome has been decided and lives in the inventory. */
export const DECISION_COUNT = 52;
