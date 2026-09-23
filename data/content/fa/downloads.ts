import type { ContentDocument } from "@/content/models/content-document";

export type DownloadItem = {
  id: string;
  title: string;
  description: string;
  category:
    | "company-catalogue"
    | "water-standards"
    | "gas-standards"
    | "irrigation-standards"
    | "technical-publications"
    | "laboratory-resources";
  /** Public download URL — item hidden until set. */
  fileUrl?: string;
  fileType?: string;
  verificationStatus: "verified" | "verify-before-production" | "missing-source";
};

/** Only items with a hosted fileUrl are shown on the public site. */
export const faDownloadsPublic: readonly DownloadItem[] = [];

export const faDownloadsInternalQueue: readonly DownloadItem[] = [
  {
    id: "catalogue-fa",
    title: "کاتالوگ شرکت",
    description: "کاتالوگ معرفی محصولات — نسخه به‌روز پس از تأیید طراحی.",
    category: "company-catalogue",
    fileType: "PDF",
    verificationStatus: "verify-before-production",
  },
  {
    id: "water-ins-14427",
    title: "INSO 14427 — لوله آبرسانی",
    description: "مرجع استاندارد آبرسانی.",
    category: "water-standards",
    verificationStatus: "missing-source",
  },
  {
    id: "gas-ins-11233",
    title: "INSO 11233 — لوله گاز",
    description: "مرجع استاندارد گاز.",
    category: "gas-standards",
    verificationStatus: "missing-source",
  },
  {
    id: "irrigation-ins-13477",
    title: "INSO 13477 — آبیاری",
    description: "مرجع استاندارد آبیاری.",
    category: "irrigation-standards",
    verificationStatus: "missing-source",
  },
  {
    id: "welding-guide",
    title: "راهنمای جوش PE",
    description: "انتشار PDF فنی مرتبط با مقاله جوش.",
    category: "technical-publications",
    verificationStatus: "missing-source",
  },
  {
    id: "lab-scope-pdf",
    title: "دامنه آزمون آزمایشگاه",
    description: "PDF دامنه آزمون.",
    category: "laboratory-resources",
    verificationStatus: "verify-before-production",
  },
];

export const faDownloadsHub: ContentDocument = {
  id: "downloads-hub",
  slug: "downloads",
  path: "/downloads",
  locale: "fa",
  kind: "hub",
  title: "مرکز دانلود",
  seoTitle: "دانلود کاتالوگ و استاندارد | بوکان پایپ",
  seoDescription: "دانلود کاتالوگ لوله پلی اتیلن بوکان پایپ و منابع فنی — کاتالوگ محصول، مراجع استاندارد آبرسانی، گاز و آبیاری، و مدارک آزمایشگاه.",
  description: "منابع قابل دانلود.",
  primaryKeyword: "دانلود کاتالوگ لوله پلی اتیلن",
  secondaryKeywords: [],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-03",
  breadcrumbs: [
    { label: "خانه", path: "/" },
    { label: "دانلود", path: "/downloads" },
  ],
  sections: [
    {
      type: "paragraph",
      text: "فایل‌های کاتالوگ و استاندارد پس از آماده‌سازی و تأیید حق انتشار در این بخش قرار می‌گیرند. اما بیشتر چیزی که معمولاً برای دانلود دنبالش می‌گردید، همین حالا و بدون فایل روی سایت منتشر شده است.",
    },
    { type: "heading", level: 2, text: "آنچه همین حالا در دسترس است" },
    {
      type: "internal-links",
      title: "منتشرشده روی سایت",
      links: [
        {
          label: "جدول سایز، ضخامت و SDR",
          path: "/technical-center/polyethylene-pipe-dimensions-table",
          hint: "همان جدول کاتالوگ، به‌صورت متن قابل جست‌وجو",
        },
        {
          label: "گواهی‌ها و مجوزها",
          path: "/certifications",
          hint: "شماره پروانه استاندارد، ISO و مرجع صادرکننده",
        },
        {
          label: "مرکز فنی",
          path: "/technical-center",
          hint: "راهنماهای انتخاب، فشار، جوش و نصب",
        },
        {
          label: "ماشین‌حساب طراحی خط لوله",
          path: "/calculator/pipeline-design",
        },
      ],
    },
    {
      type: "paragraph",
      text: "جدول ابعاد کاتالوگ را عمداً به‌صورت جدول HTML منتشر کرده‌ایم و نه تصویر یا PDF: اعداد قابل انتخاب و کپی‌اند، در جست‌وجوی داخل صفحه پیدا می‌شوند و روی موبایل هم خوانا می‌مانند.",
    },
    { type: "heading", level: 2, text: "آنچه باید درخواست کنید" },
    {
      type: "paragraph",
      text: "برخی مدارک ذاتاً قابل انتشار عمومی نیستند، چون به محموله یا پروژه شما گره خورده‌اند:",
    },
    {
      type: "list",
      items: [
        "گزارش آزمون بچ تولیدی که به شما تحویل می‌شود — از واحد آزمایشگاه: lab@bukanpipe.com",
        "تصویر گواهی و پروانه برای پیوست به اسناد مناقصه — از واحد فروش",
        "پیش‌فاکتور و مشخصات فنی پروژه — از فرم استعلام قیمت",
      ],
    },
    {
      type: "paragraph",
      text: "متن استانداردهای ملی (۱۴۴۲۷-۲، ۱۱۲۳۳-۲ و ۷۶۰۷) حق انتشار دارند و باید از سازمان ملی استاندارد ایران تهیه شوند؛ ما نسخه آن‌ها را بازنشر نمی‌کنیم. آنچه در مرکز فنی منتشر شده، توضیح الزامات آن‌هاست، نه متنشان.",
    },
    {
      type: "internal-links",
      title: "درخواست",
      links: [
        { label: "استعلام قیمت", path: "/request-quote" },
        { label: "تماس با کارخانه", path: "/contact" },
      ],
    },
  ],
  faqs: [
    {
      question: "کاتالوگ لوله پلی اتیلن را از کجا دانلود کنم؟",
      answer:
        "جدول ابعاد کاتالوگ — قطر، ضخامت جداره و SDR برای آبرسانی، گاز و آبیاری قطره‌ای — همین حالا در مرکز فنی منتشر شده است، به‌صورت جدول متنی قابل کپی. نسخه PDF کاتالوگ پس از تأیید طراحی در همین صفحه قرار می‌گیرد.",
    },
    {
      question: "گزارش آزمون محصول را چطور بگیرم؟",
      answer:
        "گزارش آزمون به بچ تولید گره خورده است و برای هر محموله جداگانه صادر می‌شود، پس قابل انتشار عمومی نیست. از واحد آزمایشگاه با ایمیل lab@bukanpipe.com درخواست کنید.",
    },
    {
      question: "متن استاندارد ۱۴۴۲۷ را دارید؟",
      answer:
        "متن استانداردهای ملی حق انتشار دارد و باید از سازمان ملی استاندارد ایران تهیه شود. در مرکز فنی الزامات این استانداردها توضیح داده شده، اما متنشان بازنشر نمی‌شود.",
    },
  ],
  related: { products: ["water-supply-pipe", "gas-pipe"] },
};

export const faCalculatorHub: ContentDocument = {
  id: "calculator-pipeline-design",
  slug: "pipeline-design",
  path: "/calculator/pipeline-design",
  locale: "fa",
  kind: "calculator",
  title: "ماشین‌حساب طراحی خط لوله",
  seoTitle: "ماشین‌حساب طراحی خط لوله آب | بوکان پایپ",
  seoDescription: "محاسبه قطر لوله، سرعت جریان، افت فشار و توان پمپ برای خط انتقال آب — بر پایه هیزن-ویلیامز با ضریب ۱۴۵ برای پلی‌اتیلن.",
  description: "ابزار پیش‌طراحی شبکه آب.",
  primaryKeyword: "محاسبه قطر لوله",
  secondaryKeywords: ["افت فشار لوله پلی اتیلن", "سرعت جریان لوله"],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-03",
  references: ["https://bukanpipe.com/pipeline_design/"],
  breadcrumbs: [
    { label: "خانه", path: "/" },
    { label: "ماشین‌حساب", path: "/calculator" },
    { label: "طراحی خط لوله", path: "/calculator/pipeline-design" },
  ],
  sections: [
    {
      type: "paragraph",
      text: "این ابزار برای پیش‌طراحی خط انتقال آب از چاه به مقصد (استخر، شبکه و غیره) است. نتیجه جایگزین محاسبه مهندسی با پروفیل ارتفاعی واقعی و منحنی پمپ نیست.",
    },
    { type: "heading", level: 2, text: "ورودی‌ها چه هستند" },
    {
      type: "list",
      items: [
        "دبی — حجم آبی که باید در واحد زمان منتقل شود",
        "طول مسیر — طول واقعی لوله، نه فاصله مستقیم روی نقشه",
        "اختلاف ارتفاع — ارتفاعی که پمپ باید آب را بالا ببرد",
        "SDR و PN — کلاس لوله، که ضخامت جداره و در نتیجه قطر داخلی را تعیین می‌کند",
      ],
    },
    { type: "heading", level: 2, text: "محاسبه بر چه پایه‌ای است" },
    {
      type: "paragraph",
      text: "افت فشار اصطکاکی با رابطه هیزن-ویلیامز حساب می‌شود و ضریب زبری C برای پلی‌اتیلن ۱۴۵ گرفته شده است — سطح داخلی صاف PE همین عدد بالا را توجیه می‌کند. هد کل برابر اختلاف ارتفاع به‌علاوه افت اصطکاکی است و توان موتور از هد کل و دبی با احتساب درصد رزرو به دست می‌آید.",
    },
    { type: "heading", level: 2, text: "چرا سرعت جریان مهم است" },
    {
      type: "paragraph",
      text: "ابزار برای هر قطر کاندید سرعت را حساب می‌کند و بیرون از بازه ۰٫۵ تا ۲٫۵ متر بر ثانیه هشدار می‌دهد. زیر ۰٫۵ ریسک ته‌نشینی ذرات معلق و رسوب‌گذاری وجود دارد. بالای ۲٫۵ افت فشار به‌سرعت بالا می‌رود، انرژی پمپاژ گران می‌شود و ریسک ضربه قوچ هنگام بسته‌شدن سریع شیر جدی‌تر می‌شود. قطر پیشنهادی، کوچک‌ترین قطری است که سرعت را داخل این بازه نگه دارد.",
    },
    { type: "heading", level: 2, text: "این ابزار چه چیزی را حساب نمی‌کند" },
    {
      type: "list",
      items: [
        "پروفیل ارتفاعی واقعی مسیر و نقاط بلند بین مبدأ و مقصد",
        "منحنی پمپ و نقطه کار واقعی آن",
        "ضربه قوچ و فشار گذرا",
        "افت موضعی اتصالات، شیرها و زانوها",
        "ضریب کاهش دما اگر دمای کارکرد از ۲۰ درجه بالاتر باشد",
      ],
    },
    { type: "heading", level: 2, text: "از نتیجه تا سفارش" },
    {
      type: "paragraph",
      text: "خروجی، قطر داخلی مؤثر و کلاس لوله است. برای استعلام، قطر خارجی و SDR را از جدول ابعاد کاتالوگ بردارید و همان را در درخواست بنویسید. اگر دمای کارکرد بالاتر از ۲۰ درجه است، پیش از نهایی کردن SDR ضریب دما را اعمال کنید.",
    },
    {
      type: "internal-links",
      title: "ادامه مسیر",
      links: [
        {
          label: "جدول سایز، ضخامت و SDR",
          path: "/technical-center/polyethylene-pipe-dimensions-table",
          hint: "قطر خارجی و ضخامت جداره کاتالوگ کارخانه",
        },
        {
          label: "ضریب دما در فشار مجاز",
          path: "/technical-center/polyethylene-pipe-temperature-pressure",
        },
        {
          label: "لوله پلی اتیلن آبرسانی",
          path: "/products/water-supply-pipe",
        },
        { label: "استعلام قیمت", path: "/request-quote" },
      ],
    },
  ],
  faqs: [
    {
      question: "افت فشار لوله پلی اتیلن با چه رابطه‌ای حساب می‌شود؟",
      answer:
        "این ابزار از هیزن-ویلیامز با ضریب زبری C برابر ۱۴۵ برای پلی‌اتیلن استفاده می‌کند. برای محاسبات دقیق‌تر یا سیالات غیرآب، دارسی-ویسباخ با ضریب اصطکاک محاسبه‌شده مناسب‌تر است.",
    },
    {
      question: "چرا برای یک دبی چند قطر پیشنهاد می‌شود؟",
      answer:
        "چون انتخاب قطر یک معامله است: قطر بزرگ‌تر افت فشار و هزینه انرژی پمپاژ را کم می‌کند ولی قیمت لوله را بالا می‌برد. ابزار همه گزینه‌ها را با سرعت و افت هرکدام نشان می‌دهد تا این معامله را ببینید.",
    },
    {
      question: "توان پمپ محاسبه‌شده همان توان موتور خریدنی است؟",
      answer:
        "خیر. عدد خروجی برآورد توان بر پایه هد کل و دبی با درصد رزرو است. انتخاب نهایی موتور باید بر پایه منحنی پمپ، راندمان واقعی در نقطه کار و شرایط راه‌اندازی انجام شود.",
    },
    {
      question: "آیا این ابزار ضربه قوچ را بررسی می‌کند؟",
      answer:
        "خیر. ضربه قوچ محاسبه جداگانه‌ای لازم دارد و به سرعت بسته‌شدن شیر، طول خط و سرعت جریان بستگی دارد. در خطوط بلند یا سرعت‌های بالا حتماً جداگانه بررسی شود.",
    },
  ],
};

export const faCalculatorIndex: ContentDocument = {
  id: "calculator-hub",
  slug: "calculator",
  path: "/calculator",
  locale: "fa",
  kind: "hub",
  title: "ماشین‌حساب‌های مهندسی",
  seoTitle: "ماشین‌حساب لوله پلی اتیلن | بوکان پایپ",
  seoDescription:
      "ماشین‌حساب آنلاین لوله پلی اتیلن — برآورد قطر، سرعت جریان، افت فشار و توان پمپ برای خط انتقال آب، بر پایه هیزن-ویلیامز.",
  description: "ابزارهای مهندسی برای پیش‌طراحی خط لوله.",
  primaryKeyword: "ماشین حساب لوله پلی اتیلن",
  secondaryKeywords: [
      "محاسبه آنلاین قطر لوله",
      "محاسبه افت فشار لوله",
      "محاسبه توان پمپ",
    ],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-03",
  breadcrumbs: [
    { label: "خانه", path: "/" },
    { label: "ماشین‌حساب", path: "/calculator" },
  ],
  sections: [
    {
      type: "paragraph",
      text: "این بخش ابزارهای پیش‌طراحی خط لوله را جمع کرده است. هدفشان این است که پیش از تماس با واحد فنی، بازه‌ای از قطر و توان پمپ در دست داشته باشید تا استعلام روی اعداد مشخص انجام شود، نه روی حدس.",
    },
    { type: "heading", level: 2, text: "ماشین‌حساب طراحی خط لوله" },
    {
      type: "paragraph",
      text: "دبی، طول مسیر، اختلاف ارتفاع و SDR را می‌گیرد و برای هر قطر کاندید، سرعت جریان، افت فشار اصطکاکی، هد کل و توان تقریبی موتور را برمی‌گرداند. قطری را پیشنهاد می‌دهد که سرعت جریان در بازه مهندسی قابل قبول بماند.",
    },
    {
      type: "internal-links",
      title: "ابزارها",
      links: [
        {
          label: "ماشین‌حساب طراحی خط لوله",
          path: "/calculator/pipeline-design",
          hint: "قطر، سرعت، افت فشار و توان پمپ",
        },
      ],
    },
    { type: "heading", level: 2, text: "پس از محاسبه قطر چه باید کرد" },
    {
      type: "paragraph",
      text: "خروجی این ابزار قطر داخلی مؤثر است. برای سفارش، آنچه لازم دارید قطر خارجی و SDR است — چون ضخامت جداره از SDR می‌آید و قطر داخلی را تعیین می‌کند. جدول کامل قطر، ضخامت و SDR کاتالوگ کارخانه در مرکز فنی منتشر شده است.",
    },
    {
      type: "internal-links",
      title: "ادامه مسیر",
      links: [
        {
          label: "جدول سایز، ضخامت و SDR",
          path: "/technical-center/polyethylene-pipe-dimensions-table",
          hint: "قطر خارجی و ضخامت جداره کاتالوگ",
        },
        {
          label: "رابطه SDR و PN",
          path: "/technical-center/polyethylene-pipe-specifications",
        },
        {
          label: "ضریب دما در فشار مجاز",
          path: "/technical-center/polyethylene-pipe-temperature-pressure",
        },
        { label: "استعلام قیمت", path: "/request-quote" },
      ],
    },
  ],
  faqs: [
    {
      question: "قطر لوله پلی اتیلن را چطور محاسبه کنم؟",
      answer:
        "از دبی مورد نیاز و طول مسیر شروع کنید. ماشین‌حساب طراحی خط لوله برای هر قطر کاندید سرعت جریان و افت فشار را حساب می‌کند و قطری را پیشنهاد می‌دهد که سرعت در بازه قابل قبول بماند. سپس قطر خارجی و SDR متناظر را از جدول ابعاد بردارید.",
    },
    {
      question: "سرعت جریان مناسب در لوله چقدر است؟",
      answer:
        "این ابزار بازه تقریبی ۰٫۵ تا ۲٫۵ متر بر ثانیه را قابل قبول می‌گیرد. سرعت خیلی کم باعث ته‌نشینی و سرعت خیلی زیاد باعث افت فشار زیاد، سایش و ریسک ضربه قوچ می‌شود. بازه نهایی را مشخصات پروژه تعیین می‌کند.",
    },
    {
      question: "آیا می‌توانم نتیجه این ابزار را مبنای سفارش قرار دهم؟",
      answer:
        "خیر. این ابزار برای پیش‌طراحی و گرفتن بازه است. محاسبه نهایی باید با پروفیل ارتفاعی واقعی مسیر، منحنی پمپ، شرایط بهره‌برداری و بررسی ضربه قوچ انجام شود.",
    },
  ],
  related: {
    articles: [
      "polyethylene-pipe-temperature-pressure",
      "polyethylene-pipe-specifications",
    ],
  },
};
