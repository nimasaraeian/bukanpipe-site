import type { ContentDocument } from "@/content/models/content-document";
import { buildSeoArticleDocument } from "@/lib/content/seo-content-model";
import { faHdpePillarArticle } from "@/data/content/fa/pillar-hdpe-article";
import { faWaterPillarArticle } from "@/data/content/fa/pillar-water-article";
import { faGasPillarArticle } from "@/data/content/fa/pillar-gas-article";
import {
  faHdpeInstallationGuideSeed,
  faHdpePipeWhatIsSeed,
  faPe100TechnicalGuideSeed,
  faPe80VsPe100Seed,
  faPolyethylenePipeSpecificationsSeed,
  faPolyethylenePipeStandardsSeed,
} from "@/data/content/fa/seo-article-seeds";

function article(
  slug: string,
  title: string,
  seoTitle: string,
  seoDescription: string,
  description: string,
  primaryKeyword: string,
  secondaryKeywords: readonly string[],
  sections: ContentDocument["sections"],
  related: ContentDocument["related"],
  references?: readonly string[],
  faqs?: ContentDocument["faqs"],
): ContentDocument {
  return {
    id: `article-${slug}`,
    slug,
    path: `/technical-center/${slug}`,
    locale: "fa",
    kind: "article",
    title,
    seoTitle,
    seoDescription,
    description,
    primaryKeyword,
    secondaryKeywords,
    status: "published",
    evidenceStatus: "candidate",
    verificationStatus: "legacy-claim",
    lastReviewed: "2026-09-03",
    references,
    breadcrumbs: [
      { label: "خانه", path: "/" },
      { label: "مرکز فنی", path: "/technical-center" },
      { label: title, path: `/technical-center/${slug}` },
    ],
    sections,
    related,
    faqs,
  };
}

export const faTechnicalHub: ContentDocument = {
  id: "technical-center-hub",
  slug: "technical-center",
  path: "/technical-center",
  locale: "fa",
  kind: "hub",
  title: "مرکز فنی لوله پلی اتیلن",
  seoTitle: "مرکز فنی لوله پلی اتیلن | راهنماهای مهندسی | بوکان پایپ",
  seoDescription:
    "فهرست راهنماهای مهندسی لوله پلی اتیلن: انتخاب، جوش، نصب، فشار کاری و ارجاع به مشخصات فنی. جدا از کاتالوگ خرید و صفحه معرفی چیست.",
  description: "فهرست منابع فنی برای طراحی، انتخاب و نصب لوله PE.",
  primaryKeyword: "مرکز فنی لوله پلی اتیلن",
  secondaryKeywords: [
    "راهنمای مهندسی لوله PE",
    "جوش و نصب لوله پلی اتیلن",
  ],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-03",
  breadcrumbs: [
    { label: "خانه", path: "/" },
    { label: "مرکز فنی", path: "/technical-center" },
  ],
  sections: [
    {
      type: "paragraph",
      text: "مقالات این بخش برای تصمیم‌های مهندسی، انتخاب گرید ماده، استاندارد و نصب شبکه لوله PE تهیه شده‌اند. برای خرید و استعلام قیمت به محصولات و فرم پیش‌فاکتور مراجعه کنید.",
    },
    {
      type: "internal-links",
      title: "راهنماهای پرتقاضا",
      links: [
        {
          label: "جدول سایز، ضخامت و SDR لوله پلی اتیلن",
          path: "/technical-center/polyethylene-pipe-dimensions-table",
          hint: "جدول کامل کاتالوگ برای آبرسانی، گاز و آبیاری قطره‌ای",
        },
        { label: "لوله پلی اتیلن چیست؟", path: "/polyethylene-pipe" },
        { label: "راهنمای انتخاب لوله پلی اتیلن", path: "/technical-center/polyethylene-pipe-complete-guide" },
        { label: "مشخصات فنی، SDR و PN", path: "/technical-center/polyethylene-pipe-specifications" },
        { label: "استاندارد لوله پلی اتیلن", path: "/technical-center/polyethylene-pipe-standards" },
        { label: "راهنمای فنی لوله آبرسانی", path: "/technical-center/water-supply-polyethylene-pipe-guide" },
        { label: "استاندارد و تولید لوله گاز", path: "/technical-center/gas-polyethylene-pipe-guide" },
        { label: "تفاوت PE80 و PE100", path: "/technical-center/pe80-vs-pe100" },
        { label: "استعلام قیمت", path: "/request-quote" },
      ],
    },
  ],
  related: {
    articles: [
      "hdpe-pipe-what-is",
      "pe80-vs-pe100",
      "polyethylene-pipe-specifications",
      "polyethylene-pipe-standards",
      "pe100-technical-guide",
      "hdpe-installation-guide",
      "polyethylene-pipe-welding",
      "polyethylene-pipe-temperature-pressure",
    ],
    products: ["water-supply-pipe", "gas-pipe", "irrigation-pipe", "industrial-pipe", "pe100-pipe"],
  },
};

export const faPillarPolyethylene: ContentDocument = {
  id: "pillar-polyethylene-pipe",
  slug: "polyethylene-pipe",
  path: "/polyethylene-pipe",
  locale: "fa",
  kind: "pillar",
  title: "لوله پلی‌اتیلن چیست؟",
  seoTitle: "لوله پلی اتیلن چیست؟ | معرفی HDPE و کاربردها | بوکان پایپ",
  seoDescription:
    "لوله پلی اتیلن چیست؟ معرفی لوله HDPE، ساخت اکستروژن تک‌جداره، کاربرد آب و گاز و کشاورزی، و مسیر ادامه به محصول و مشخصات فنی.",
  description: "معرفی عمومی لوله پلی‌اتیلن برای آشنایی اولیه — نه صفحه خرید و نه جدول SDR.",
  primaryKeyword: "لوله پلی اتیلن چیست",
  secondaryKeywords: [
    "معرفی لوله پلی اتیلن",
    "کاربرد لوله پلی اتیلن",
    "مزایای لوله پلی اتیلن",
  ],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-16",
  references: ["https://bukanpipe.com/about_us/"],
  breadcrumbs: [
    { label: "خانه", path: "/" },
    { label: "لوله پلی‌اتیلن", path: "/polyethylene-pipe" },
  ],
  imageAlt: "لوله پلی‌اتیلن HDPE تولید کارخانه بوکان پایپ — معرفی عمومی محصول",
  sections: [
    {
      type: "paragraph",
      text: "لوله پلی‌اتیلن لوله پلیمری برای انتقال سیال در شبکه آب، گاز، کشاورزی و برخی خطوط صنعتی است. در اسناد فنی ایران اغلب همان خانواده را HDPE می‌نامند. این صفحه می‌گوید لوله پلی اتیلن چیست و از کجا باید ادامه داد. جدول قطر و SDR اینجا نیست؛ انتخاب گرید برای یک مناقصه اینجا نیست؛ خرید از کارخانه در کاتالوگ محصولات است. کارخانه بودن بوکان پایپ موضوع صفحه اصلی است.",
    },
    {
      type: "paragraph",
      text: "خریدار صنعتی معمولاً با سه پرسش وارد می‌شود: این ماده چیست، برای چه خدمتی مناسب است، و بعد از آشنایی باید به کدام صفحه برود. پاسخ کوتاه به پرسش اول همین معرفی است. پاسخ دوم بدون فشار، دما و استاندارد پروژه کامل نمی‌شود؛ برای آن باید خانواده محصول و سپس مشخصات ابعادی را باز کرد. پاسخ سوم را در انتهای صفحه با پیوندهای جداگانه گذاشته‌ایم تا یک عبارت واحد به همه مقصدها اشاره نکند.",
    },
    { type: "heading", level: 2, text: "لوله پلی‌اتیلن و HDPE" },
    {
      type: "paragraph",
      text: "پلی‌اتیلن نام خانواده ماده است. HDPE به پلی‌اتیلن با چگالی بالا اشاره دارد که در قالب لوله فشار تک‌جداره اکسترود می‌شود. در مکاتبات روزمره این دو نام اغلب جای هم به کار می‌روند. آنچه سفارش را مشخص می‌کند گرید ترکیب (مانند PE100)، قطر خارجی، ضخامت یا SDR، و استاندارد کاربرد است، نه انتخاب بین دو برچسب بازاری. اگر تفاوت نام‌گذاری برایتان مسئله اصلی است، مقاله «لوله HDPE چیست؟» همان موضوع را جداگانه باز می‌کند تا این صفحه معرفی عمومی بماند.",
    },
    { type: "heading", level: 2, text: "چگونه ساخته می‌شود؟" },
    {
      type: "paragraph",
      text: "ساخت رایج لوله فشار در کارخانه، اکستروژن تک‌جداره است: ترکیب پلیمری ذوب و از قالب عبور می‌کند، ابعاد تنظیم می‌شود و پس از خنک‌کاری محصول قابل اندازه‌گیری به‌دست می‌آید. کیفیت به یک دستگاه محدود نیست؛ پایداری تغذیه، کنترل فرآیند و جدا کردن محصول خارج از حد پذیرش اهمیت دارد. بوکان پایپ از سال ۱۳۷۶ در بوکان، آذربایجان غربی، همین خانواده تک‌جداره HDPE را تولید می‌کند. سقف قطر خارجی برای تولید آب و عمومی ۶۳۰ میلی‌متر است. تعداد خط تولید و ظرفیت سالانه در این متن نمی‌آید؛ آن اعداد بدون تأیید جاری کارخانه قابل استناد نیستند.",
    },
    { type: "heading", level: 2, text: "انواع لوله پلی‌اتیلن در این سایت" },
    {
      type: "paragraph",
      text: "انواع را از روی خدمت شبکه بخوانید، نه از روی رنگ کاتالوگ. آبرسانی لوله فشار برای آب است. گازرسانی محصول جدا با استاندارد و اتصال متفاوت است. آبیاری در وب‌سایت بوکان پایپ خطوط اصلی فشار قوی است، نه نوار قطره‌ای ۱۶ میلی‌متر مگر آن‌که کارخانه بعداً آن خانواده را تأیید کند. صنعتی برای سیال فرآیند است اگر سازگاری تأیید شود. فاضلاب و زهکشی دو کاربرد جدا هستند و نباید در یک مشخصات مخلوط شوند. PE100 گرید ماده است که روی چند خانواده می‌نشیند، نه یک نوع چهارم در کنار آب و گاز.",
    },
    {
      type: "list",
      items: [
        "لوله آبرسانی — تأمین آب و انتقال؛ صفحه محصول آبرسانی",
        "لوله گاز — فقط با مشخصات گاز همان پروژه؛ صفحه محصول گاز",
        "لوله آبیاری — خطوط اصلی تحت فشار؛ صفحه محصول آبیاری",
        "لوله صنعتی — سیال سازگار با مشخصات سفارش",
        "گرید PE100 — صفحه محصول PE100 برای تأمین گرید",
      ],
    },
    { type: "heading", level: 2, text: "PE100 در یک نگاه" },
    {
      type: "paragraph",
      text: "PE100 طبقه استحکام ترکیب با MRS ده مگاپاسکال در شرایط مرجع است. PE80 هشت مگاپاسکال است. این طبقه‌بندی فشار صد بار یا عمر تضمینی نیست؛ قرارداد طراحی هیدرواستاتیک بلندمدت ماده است. اگر پروژه صریحاً PE100 خواسته، مسیر تجاری صفحه محصول PE100 است و مسیر محاسباتی راهنمای فنی همان گرید. این صفحه معرفی را در حد تشخیص نام نگه می‌دارد تا با آن دو URL رقابت نکند.",
    },
    { type: "heading", level: 2, text: "کاربردهای رایج" },
    {
      type: "paragraph",
      text: "شبکه آب شهری و روستایی، انتقال آب خام یا تصفیه‌شده، انشعاب و توزیع گاز، خطوط اصلی آبیاری مزرعه، و انتقال سیال سازگار در صنعت، جاهایی هستند که لوله پلی‌اتیلن دیده می‌شود. هر کاربرد صفحه خودش را دارد: کاربرد توضیح می‌دهد مسئله شبکه چیست؛ محصول مسیر تأمین است. فاضلاب بهداشتی و زهکشی سطحی را یکی نکنید. حفاظت کابل را در این معرفی به‌عنوان خط تجاری قطعی تبلیغ نمی‌کنیم.",
    },
    {
      type: "list",
      items: [
        "آبرسانی شهری و روستایی — محصول آبرسانی",
        "گازرسانی انشعاب و توزیع — محصول گاز",
        "خطوط اصلی آبیاری فشار قوی — محصول آبیاری",
        "برخی شبکه‌های فاضلاب یا زهکشی — فقط با مشخصات همان خانواده",
        "انتقال سیال صنعتی سازگار — محصول صنعتی",
      ],
    },
    { type: "heading", level: 2, text: "چرا در شبکه دفنی انتخاب می‌شود؟" },
    {
      type: "paragraph",
      text: "در خاک، خوردگی فلزی مسئله اصلی لوله پلیمری نیست. وزن کمتر نسبت به بسیاری از لوله‌های فلزی حمل و خواباندن را ساده‌تر می‌کند. اتصال جوشی در اجرای صحیح یکپارچگی خط را بالا می‌برد. انعطاف به جابه‌جایی محدود خاک کمک می‌کند اما بستر نامناسب یا سنگ تیز را توجیه نمی‌کند. این‌ها مزایای عمومی‌اند؛ جایگزین محاسبه افت فشار، دمای سیال یا استاندارد گاز نمی‌شوند. اگر جایی از «عمر پنجاه ساله» صحبت می‌شود، آن قرارداد طراحی MRS است نه ضمانت بازرگانی کارخانه.",
    },
    { type: "heading", level: 2, text: "اتصال و اجرا — سطح معرفی" },
    {
      type: "paragraph",
      text: "دو روش رایج اتصال، جوش لب‌به‌لب و الکتروفیوژن است. در بسیاری از مشخصات گاز ایران الکتروفیوژن روش مورد تأکید است؛ در آبرسانی جوش لب‌به‌لب فراوان‌تر دیده می‌شود. پارامتر جوش را از دستور تأییدشده پروژه بخوانید، نه از یک مقاله معرفی. راهنمای جوش و راهنمای نصب در مرکز فنی جدا هستند تا این صفحه تبدیل به دستور کارگاه نشود.",
    },
    { type: "heading", level: 2, text: "عوامل انتخاب — بدون جایگزینی راهنمای تصمیم" },
    {
      type: "paragraph",
      text: "پس از آن‌که دانستید لوله چیست، انتخاب ردیف خرید به سیال، فشار و دمای طراحی، استاندارد کاربرد، گرید، قطر و SDR یا PN، و مدارک پذیرش بستگی دارد. فهرست کامل پرسش‌ها و ارزیابی پیشنهاد در راهنمای انتخاب لوله پلی اتیلن است. اگر فقط ابعاد را می‌خواهید بخوانید، مقاله مشخصات فنی مرجع SDR و PN است. قاطی کردن این سه نقش همان مشکلی است که قبلاً در نتایج جستجو تداخل می‌ساخت.",
    },
    { type: "heading", level: 2, text: "استاندارد و آزمون — سطح معرفی" },
    {
      type: "paragraph",
      text: "هر کاربرد استاندارد محصول خود را دارد؛ شماره استاندارد روی کاتالوگ به‌تنهایی همه محموله‌ها را پوشش نمی‌دهد. آزمون ماده، ابعاد و عملکرد در آزمایشگاه تعریف می‌شود و کنترل فرآیند روی خط تولید موضوع صفحه کیفیت است. اسکن گواهی به‌معنای اعتبار جاری همه نشان‌ها در سال جاری نیست. برای فهرست INSO و EN به مقاله استاندارد بروید؛ برای خدمات آزمون به آزمایشگاه.",
    },
    {
      type: "spec-cta",
      text: "پس از انتخاب خانواده محصول، برای قیمت روز قطر، کلاس فشار یا SDR، کاربرد و مقدار را در فرم استعلام بنویسید. فهرست قیمت عمومی منتشر نمی‌شود.",
    },
    {
      type: "internal-links",
      title: "از معرفی به محصول و مرجع فنی",
      links: [
        {
          label: "جدول سایز، ضخامت و SDR لوله پلی اتیلن",
          path: "/technical-center/polyethylene-pipe-dimensions-table",
          hint: "جدول کامل کاتالوگ برای آبرسانی، گاز و آبیاری قطره‌ای",
        },
        { label: "لوله پلی اتیلن PE100", path: "/products/pe100-pipe" },
        { label: "لوله پلی اتیلن آبرسانی", path: "/products/water-supply-pipe" },
        { label: "لوله پلی اتیلن گاز", path: "/products/gas-pipe" },
        { label: "لوله پلی اتیلن آبیاری", path: "/products/irrigation-pipe" },
        { label: "کاتالوگ محصولات", path: "/products" },
        { label: "مشخصات فنی، SDR و PN", path: "/technical-center/polyethylene-pipe-specifications" },
        { label: "راهنمای انتخاب لوله پلی اتیلن", path: "/technical-center/polyethylene-pipe-complete-guide" },
        { label: "لوله HDPE چیست؟", path: "/technical-center/hdpe-pipe-what-is" },
        { label: "آزمایشگاه لوله پلی اتیلن", path: "/laboratory" },
        { label: "کنترل کیفیت تولید", path: "/quality" },
        { label: "استعلام قیمت", path: "/request-quote" },
      ],
    },
  ],
  related: {
    products: [
      "water-supply-pipe",
      "gas-pipe",
      "irrigation-pipe",
      "industrial-pipe",
      "sewage-pipe",
      "drainage-pipe",
      "pe100-pipe",
    ],
    applications: [
      "water-transfer",
      "gas-distribution",
      "agriculture-irrigation",
      "industrial",
      "sewage",
      "drainage",
    ],
    articles: [
      "hdpe-pipe-what-is",
      "pe80-vs-pe100",
      "polyethylene-pipe-specifications",
      "polyethylene-pipe-standards",
      "pe100-technical-guide",
      "polyethylene-pipe-welding",
      "polyethylene-pipe-temperature-pressure",
      "air-vent-valve",
    ],
  },
  faqs: [
    {
      question: "لوله پلی اتیلن چیست؟",
      answer:
        "لوله پلیمری از خانواده پلی‌اتیلن که در شبکه‌های فشار یا ثقلی برای انتقال سیال به کار می‌رود. در صنعت لوله اغلب HDPE نامیده می‌شود. خرید با قطر، SDR یا PN، گرید و استاندارد کاربرد کامل می‌شود.",
    },
    {
      question: "تفاوت لوله پلی‌اتیلن و HDPE چیست؟",
      answer:
        "در عمل اغلب یک خانواده محصولاند. HDPE نوع چگالی ماده است. جزئیات نام‌گذاری در مقاله لوله HDPE چیست آمده است.",
    },
    {
      question: "PE100 یعنی چه؟",
      answer:
        "گرید ترکیب با استحکام مرجع بالاتر از PE80. برای تأمین به صفحه محصول PE100 و برای محاسبه به راهنمای فنی همان گرید بروید.",
    },
    {
      question: "تفاوت این صفحه با مشخصات فنی چیست؟",
      answer:
        "این صفحه معرفی عمومی است. قطر، SDR، PN و نحوه خواندن برگه مشخصات در مقاله مشخصات فنی آمده است.",
    },
    {
      question: "قیمت لوله پلی اتیلن را از کجا بپرسیم؟",
      answer:
        "از فرم استعلام قیمت. قیمت به قطر، کلاس فشار یا SDR، کاربرد، مقدار و الزامات پروژه بستگی دارد و فهرست عمومی منتشر نمی‌شود.",
    },
  ],
};

/**
 * Catalogue dimension tables. Every number is rendered from
 * bukanpipe-dimension-tables.json, transcribed from the factory catalogue —
 * nothing on this page is computed or estimated.
 */
export const faPipeDimensionsTable: ContentDocument = {
  id: "article-polyethylene-pipe-dimensions-table",
  slug: "polyethylene-pipe-dimensions-table",
  path: "/technical-center/polyethylene-pipe-dimensions-table",
  locale: "fa",
  kind: "article",
  title: "جدول سایز، ضخامت و SDR لوله پلی اتیلن",
  seoTitle: "جدول سایز، ضخامت و SDR لوله پلی اتیلن (PE80 و PE100) | بوکان پایپ",
  seoDescription:
    "جدول کامل قطر، ضخامت جداره و SDR لوله پلی اتیلن آبرسانی، گازرسانی و آبیاری قطره‌ای بوکان پایپ — از ۱۶ تا ۶۳۰ میلی‌متر، بر پایه کاتالوگ کارخانه.",
  description:
    "جدول ابعاد کاتالوگ بوکان پایپ برای لوله آبرسانی، گازرسانی و آبیاری قطره‌ای.",
  primaryKeyword: "جدول سایز لوله پلی اتیلن",
  secondaryKeywords: [
    "جدول ضخامت لوله پلی اتیلن",
    "SDR لوله پلی اتیلن",
    "جدول وزن لوله پلی اتیلن",
    "سایز لوله پلی اتیلن آبرسانی",
  ],
  status: "published",
  evidenceStatus: "verified",
  verificationStatus: "verified",
  lastReviewed: "2026-09-22",
  references: ["کاتالوگ شرکت لوله پلی‌اتیلن بوکان (بوکان پایپ)"],
  breadcrumbs: [
    { label: "خانه", path: "/" },
    { label: "مرکز فنی", path: "/technical-center" },
    {
      label: "جدول سایز، ضخامت و SDR",
      path: "/technical-center/polyethylene-pipe-dimensions-table",
    },
  ],
  sections: [
    {
      type: "paragraph",
      text: "این صفحه جدول‌های ابعاد کاتالوگ بوکان پایپ را همان‌طور که هست منتشر می‌کند: قطر خارجی، ضخامت جداره و SDR برای لوله آبرسانی، گازرسانی و آبیاری قطره‌ای. هیچ عددی محاسبه یا گرد نشده است و خط تیره در جدول یعنی آن قطر در آن SDR تولید نمی‌شود.",
    },
    { type: "heading", level: 2, text: "رابطه SDR، PN و ضخامت جداره" },
    {
      type: "paragraph",
      text: "SDR نسبت قطر خارجی به ضخامت جداره است؛ یعنی SDR = DN ÷ en. هرچه SDR کوچک‌تر باشد جداره نسبت به قطر ضخیم‌تر است و لوله فشار بیشتری را تحمل می‌کند. به همین دلیل در جدول آبرسانی، ستون SDR 6 ضخیم‌ترین جداره و بالاترین PN را دارد و ستون SDR 51 نازک‌ترین.",
    },
    {
      type: "paragraph",
      text: "PN فشار اسمی بر حسب بار در دمای مرجع ۲۰ درجه سانتی‌گراد است. برای یک SDR مشخص، گرید ماده هم در PN اثر می‌گذارد: PE100 با استحکام بلندمدت بالاتر، در همان SDR یک پله PN بالاتر از PE80 می‌دهد. در جدول آبرسانی همین را می‌بینید — مثلاً SDR 11 برای PE80 برابر PN 12.5 و برای PE100 برابر PN 16 است.",
    },
    {
      type: "paragraph",
      text: "اگر دمای کارکرد از ۲۰ درجه بالاتر باشد، فشار مجاز با ضریب کاهش دما اصلاح می‌شود. انتخاب نهایی SDR باید بر پایه فشار طراحی، دما و شرایط نصب انجام شود، نه فقط از روی جدول.",
    },
    { type: "heading", level: 2, text: "جدول لوله آبرسانی" },
    { type: "dimension-table", table: "water-supply" },
    { type: "heading", level: 2, text: "جدول لوله گازرسانی" },
    {
      type: "paragraph",
      text: "لوله گازرسانی در SDR 11 و SDR 13.6 تولید می‌شود و ضخامت جدول حداقل است؛ عدد داخل پرانتز رواداری مثبت کاتالوگ را نشان می‌دهد.",
    },
    { type: "dimension-table", table: "gas-supply" },
    { type: "heading", level: 2, text: "جدول لوله آبیاری قطره‌ای" },
    { type: "dimension-table", table: "drip-irrigation" },
    {
      type: "internal-links",
      title: "ادامه مسیر",
      links: [
        {
          label: "ماشین‌حساب طراحی خط لوله",
          path: "/calculator/pipeline-design",
          hint: "محاسبه قطر و افت فشار بر پایه دبی و طول مسیر",
        },
        {
          label: "راهنمای فنی PE100",
          path: "/technical-center/pe100-technical-guide",
          hint: "MRS، SDR و انتخاب گرید",
        },
        {
          label: "مقایسه PE80 و PE100",
          path: "/technical-center/pe80-vs-pe100",
        },
        { label: "لوله آبرسانی", path: "/products/water-supply-pipe" },
        { label: "لوله گازرسانی", path: "/products/gas-pipe" },
      ],
    },
  ],
  related: {
    products: ["water-supply-pipe", "gas-pipe", "pe100-pipe", "irrigation-pipe"],
    articles: ["pe100-technical-guide", "pe80-vs-pe100"],
  },
  faqs: [
    {
      question: "SDR لوله پلی اتیلن یعنی چه؟",
      answer:
        "SDR نسبت قطر خارجی لوله به ضخامت جداره آن است (SDR = DN ÷ en). SDR کوچک‌تر یعنی جداره ضخیم‌تر و تحمل فشار بیشتر.",
    },
    {
      question: "تفاوت PE80 و PE100 در جدول ابعاد چیست؟",
      answer:
        "ضخامت جداره در یک SDR برای هر دو گرید یکسان است، اما PN متفاوت می‌شود. PE100 استحکام بلندمدت بالاتری دارد، بنابراین در همان SDR فشار اسمی بالاتری می‌دهد؛ مثلاً SDR 11 برای PE80 برابر PN 12.5 و برای PE100 برابر PN 16 است.",
    },
    {
      question: "بوکان پایپ چه قطرهایی تولید می‌کند؟",
      answer:
        "جدول آبرسانی کاتالوگ قطرهای ۱۶ تا ۶۳۰ میلی‌متر را پوشش می‌دهد، لوله گازرسانی ۲۵ تا ۲۲۵ میلی‌متر و لوله آبیاری قطره‌ای ۱۲ تا ۳۲ میلی‌متر است. همه ترکیب‌های قطر و SDR موجود نیستند؛ خط تیره در جدول یعنی آن ترکیب تولید نمی‌شود.",
    },
    {
      question: "چرا ستون وزن در جدول نیست؟",
      answer:
        "کاتالوگ کارخانه عدد کیلوگرم بر متر منتشر نکرده است. تا زمانی که واحد فنی این اعداد را تأیید نکند، ستون وزن نمایش داده نمی‌شود تا عدد تأییدنشده به‌عنوان مشخصات رسمی منتشر نشود.",
    },
    {
      question: "آیا می‌توانم از روی این جدول لوله انتخاب کنم؟",
      answer:
        "جدول ابعاد نقطه شروع است، نه انتخاب نهایی. SDR مناسب باید بر پایه فشار طراحی، دمای کارکرد و شرایط نصب تعیین شود. برای محاسبه اولیه از ماشین‌حساب طراحی خط لوله استفاده کنید و برای تأیید نهایی با واحد فنی تماس بگیرید.",
    },
  ],
};

export const faTechnicalArticles: readonly ContentDocument[] = [
  buildSeoArticleDocument("fa", faHdpePillarArticle),
  buildSeoArticleDocument("fa", faWaterPillarArticle),
  buildSeoArticleDocument("fa", faGasPillarArticle),
  faTechnicalHub,
  faPillarPolyethylene,
  faPipeDimensionsTable,
  article(
    "polyethylene-pipe-welding",
    "جوش لوله‌های پلی‌اتیلن",
    "جوش لوله پلی اتیلن | بات فیوژن و الکتروفیوژن",
    "جوش لوله پلی اتیلن — راهنمای بات فیوژن و الکتروفیوژن مطابق INSO 18648: مراحل اجرا، پارامترهای کنترلی و بازرسی کیفیت جوش.",
    "روش‌های استاندارد اتصال لوله PE",
    "جوش لوله پلی اتیلن",
    ["بات فیوژن", "الکتروفیوژن", "INSO 18648"],
    [
      {
        type: "paragraph",
        text: "در اجرای خطوط PE، کیفیت اتصال تعیین‌کننده دوام شبکه است. اتصال صحیح، نشتی را به حداقل می‌رساند و افت فشار و اغتشاش جریان را کنترل می‌کند.",
      },
      { type: "heading", level: 2, text: "جوش الکتروفیوژن" },
      {
        type: "paragraph",
        text: "در electrofusion، دو سر لوله داخل اتصال سوکتی با سیم‌پیچ فلزی قرار می‌گیرند. با عبور جریان، ناحیه تماس ذوب و پس از خنک‌شدن اتصال دائم تشکیل می‌شود. این روش در پروژه‌های گازرسانی روش مورد تأیید شرکت ملی گاز است و ضریب ایمنی سطح مقطع جوش بالاتری دارد.",
      },
      { type: "heading", level: 2, text: "جوش لب به لب (Butt Fusion)" },
      {
        type: "paragraph",
        text: "مطابق INSO 18648، انتهای لوله پس از تمیزکاری و تراز، روی صفحه گرم‌کن تا دمای تعیین‌شده گرم و تحت فشار به هم متصل می‌شوند. مراحل شامل تمیزکاری، مهار، رنده، هم‌محوری، ذوب، اتصال و خنک‌کاری تحت فشار است.",
      },
      { type: "heading", level: 2, text: "کنترل کیفیت جوش" },
      {
        type: "list",
        items: [
          "تأیید PQR و صلاحیت جوشکار قبل از شروع",
          "ثبت پارامترها و بازرسی ظاهری لبه جوش",
          "آزمون‌های غیرمخرب در پروژه‌های حساس",
        ],
      },
    ],
    { products: ["water-supply-pipe", "gas-pipe"], laboratory: ["test-scope"] },
    ["https://bukanpipe.com/welding/"],
    [
      {
        question: "برای خط گاز کدام روش جوش مناسب‌تر است؟",
        answer: "الکتروفیوژن روش مورد تأیید برای گازرسانی است. butt fusion در آبرسانی رایج‌تر است.",
      },
    ],
  ),
  article(
    "air-vent-valve",
    "شیر هوا در خط انتقال آب",
    "لزوم نصب شیر هوا (Air Vent Valve) در لوله PE",
    "شیر هوا لوله پلی اتیلن — چرا هوای محبوس دبی را کم می‌کند و خلأ باعث کتابی شدن لوله می‌شود، و شیر هوا کجای خط نصب می‌شود.",
    "طراحی و نصب شیر هوا",
    "شیر هوا لوله پلی اتیلن",
    ["کتابی شدن لوله", "ضربه قوچ", "شیر تخلیه هوا"],
    [
      {
        type: "paragraph",
        text: "در خطوط انتقال آب، تجمع هوا در نقاط مرتفع یا ایجاد خلا هنگام تخلیه می‌تواند عملکرد شبکه را مختل کند. شیر هوا و شیر یک‌طرفه از تجهیزات ضروری طراحی هستند.",
      },
      { type: "heading", level: 2, text: "خلا و کتابی شدن لوله" },
      {
        type: "paragraph",
        text: "در مسیر با شیب نزولی، خاموش شدن پمپ بدون شیر یک‌طرفه یا جریان برگشتی سریع می‌تواند فشار منفی ایجاد کند و دیواره لوله را به داخل فرو ببرد. با PE100 و جداره نازک‌تر، رعایت شیر هوا اهمیت بیشتری دارد.",
      },
      { type: "heading", level: 2, text: "کاهش دبی و افت توان پمپ" },
      {
        type: "paragraph",
        text: "حباب هوای محبوس در قله خط، سطح مؤثر جریان را کاهش می‌دهد و می‌تواند باعث افت شدید دبی و ضربه قوچ شود.",
      },
      { type: "heading", level: 2, text: "نصب صحیح" },
      {
        type: "list",
        items: [
          "نصب عمودی شیر در نقاط مرتفع",
          "فاصله حدود ۶۰۰ متر در خطوط افقی طولانی",
          "بازرسی و نظافت دوره‌ای (هر ۶ ماه)",
        ],
      },
    ],
    { applications: ["water-transfer"], products: ["water-supply-pipe", "pe100-pipe"] },
    ["https://bukanpipe.com/air-vent-valve/"],
  ),
  article(
    "polyethylene-pipe-temperature-pressure",
    "تأثیر دما بر فشار کاری",
    "تأثیر دما بر فشار کاری لوله پلی اتیلن | MOP",
    "فشار کاری لوله پلی اتیلن در دمای بالاتر از ۲۰ درجه — ضریب کاهش دما و محاسبه MOP مطابق INSO 14427 و INSO 14563-1.",
    "دمای کاربرد و فشار مجاز",
    "فشار کاری لوله پلی اتیلن",
    ["MOP", "PN", "ضریب دما"],
    [
      {
        type: "paragraph",
        text: "PN درج‌شده روی لوله آبرسانی برای دمای ۲۰ درجه سانتی‌گراد است. در دمای بالاتر باید حداکثر فشار کاری (MOP) با ضریب دمایی fT محاسبه شود: MOP = fT × PN.",
      },
      { type: "heading", level: 2, text: "مثال عملی" },
      {
        type: "paragraph",
        text: "اگر خط در معرض تابش مستقیم آفتاب دما تا ۴۰ درجه برسد، فشار مجاز لوله PN10 حدود ۷٫۴ bar خواهد بود؛ اعمال ۱۰ bar می‌تواند به آسیب منجر شود.",
      },
      { type: "heading", level: 2, text: "طراحی مسئولانه" },
      {
        type: "paragraph",
        text: "مهندس طراح باید تنش‌های دمایی خط، ضریب دما و ضرایب عملیاتی را در محاسبه لحاظ کند. برای برآورد اولیه قطر و پمپ از ماشین‌حساب طراحی خط لوله استفاده کنید.",
      },
    ],
    {
      products: ["pe100-pipe", "water-supply-pipe"],
      articles: ["polyethylene-pipe-welding"],
    },
    ["https://bukanpipe.com/temp-cooficient/"],
    [
      {
        question: "آیا لوله زیرزمین نیاز به ضریب دما دارد؟",
        answer:
          "دمای خاک معمولاً پایدارتر از اجرای روی زمین است، اما طراح باید شرایط واقعی پروژه را ارزیابی کند.",
      },
    ],
  ),
  article(
    "subsurface-drip-irrigation",
    "آبیاری زیرسطحی",
    "آبیاری زیرسطحی با لوله پلی اتیلن",
    "آبیاری زیرسطحی — نقش خط اصلی پلی اتیلن در شبکه قطره‌ای مدفون، کاهش تبخیر و نکات انتخاب قطر و فشار کارکرد.",
    "خطوط اصلی آبیاری زیرسطحی",
    "آبیاری زیرسطحی",
    ["آبیاری قطره‌ای", "لوله کشاورزی"],
    [
      {
        type: "paragraph",
        text: "آبیاری زیرسطحی با کاهش تبخیر سطحی به صرفه‌جویی آب کمک می‌کند. لوله PE خطوط اصلی (feeder) بین منبع آب و شبکه زیرسطحی را تشکیل می‌دهد.",
      },
      { type: "heading", level: 2, text: "طراحی شبکه" },
      {
        type: "list",
        items: [
          "انتخاب قطر و فشار متناسب با مساحت و نوع محصول",
          "فیلتراسیون و شیرآلات کنترل",
          "هماهنگی با لوله آبیاری مخصوص محصول",
        ],
      },
    ],
    { applications: ["agriculture-irrigation"], products: ["irrigation-pipe"] },
    ["https://bukanpipe.com/"],
  ),
  buildSeoArticleDocument("fa", faPe100TechnicalGuideSeed),
  buildSeoArticleDocument("fa", faHdpeInstallationGuideSeed),
  buildSeoArticleDocument("fa", faHdpePipeWhatIsSeed),
  buildSeoArticleDocument("fa", faPe80VsPe100Seed),
  buildSeoArticleDocument("fa", faPolyethylenePipeSpecificationsSeed),
  buildSeoArticleDocument("fa", faPolyethylenePipeStandardsSeed),
];
