import { faProducts } from "@/data/content/fa/products";
import { faApplications } from "@/data/content/fa/applications";
import { faLaboratoryPages } from "@/data/content/fa/laboratory";
import { faTechnicalArticles } from "@/data/content/fa/technical";
import { faCompanyPages } from "@/data/content/fa/company";
import {
  faDownloadsHub,
  faCalculatorHub,
  faCalculatorIndex,
} from "@/data/content/fa/downloads";
import type { ContentDocument } from "@/content/models/content-document";
import { pipeSizeDocuments } from "@/data/content/pipe-sizes";

export const faProductsHub: ContentDocument = {
  id: "products-hub",
  slug: "products",
  path: "/products",
  locale: "fa",
  kind: "hub",
  title: "محصولات لوله پلی اتیلن",
  seoTitle: "خرید لوله پلی اتیلن از کارخانه | محصولات HDPE | بوکان پایپ",
  seoDescription:
    "خرید لوله پلی اتیلن مستقیم از کارخانه بوکان پایپ: آبرسانی، گاز، آبیاری کشاورزی، صنعتی و PE100 — تولید HDPE از سایز ۱۶ تا ۶۳۰ میلی‌متر، فشار کاری ۲.۵ تا ۲۵ بار.",
  description: "کاتالوگ تولیدکننده لوله پلی اتیلن — خرید و تأمین از کارخانه.",
  primaryKeyword: "خرید لوله پلی اتیلن از کارخانه",
  secondaryKeywords: [
    "تامین کننده لوله پلی اتیلن",
    "تولید کننده لوله HDPE",
    "لوله پلی اتیلن PE100",
  ],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-05",
  breadcrumbs: [
    { label: "خانه", path: "/" },
    { label: "محصولات", path: "/products" },
  ],
  sections: [
    {
      type: "definition",
      term: "تأمین از کارخانه",
      text: "بوکان پایپ به‌عنوان تولیدکننده لوله پلی اتیلن، هر خانواده محصول را با مشخصات فنی، QC و پشتیبانی فروش مستقیم عرضه می‌کند.",
    },
    {
      type: "paragraph",
      text: "برای انتخاب لوله، کاربرد شبکه را همراه با قطر، فشار و گرید ماده در نظر بگیرید. لوله‌های آبرسانی، گازرسانی، آبیاری و صنعتی از نظر استاندارد، کنترل کیفیت و نشانه‌گذاری الزامات متفاوتی دارند.",
    },
    {
      type: "internal-links",
      title: "محصولات اصلی",
      links: [
        { label: "لوله پلی اتیلن آبرسانی", path: "/products/water-supply-pipe" },
        { label: "لوله پلی اتیلن گاز", path: "/products/gas-pipe" },
        { label: "لوله آبیاری پلی اتیلن", path: "/products/irrigation-pipe" },
        { label: "لوله پلی اتیلن صنعتی", path: "/products/industrial-pipe" },
        { label: "لوله پلی اتیلن PE100", path: "/products/pe100-pipe" },
      ],
    },
    { type: "heading", level: 2, text: "برای استعلام، چه چیزی را باید مشخص کنید" },
    {
      type: "paragraph",
      text: "برای دریافت پیشنهاد دقیق، قطر را همراه با رده فشار، گرید ماده و کاربرد اعلام کنید. اگر مشخصات کامل در دسترس نیست، واحد فنی می‌تواند در تکمیل اطلاعات استعلام راهنمایی کند:",
    },
    {
      type: "list",
      items: [
        "کاربرد: آبرسانی، گاز، آبیاری، فاضلاب یا صنعتی — این تعیین می‌کند کدام استاندارد حاکم است",
        "قطر خارجی بر حسب میلی‌متر",
        "کلاس فشار: SDR یا PN — و اگر خط گرم کار می‌کند، دمای کارکرد را هم بنویسید",
        "گرید ماده: PE80 یا PE100",
        "متراژ، شکل تحویل (شاخه یا کلاف) و محل تحویل",
      ],
    },
    { type: "heading", level: 2, text: "چطور چند پیشنهاد قیمت را با هم مقایسه کنیم" },
    {
      type: "paragraph",
      text: "پیشنهادهای قیمت را با مشخصات یکسان مقایسه کنید: قطر خارجی، SDR، گرید، استاندارد و شرایط تحویل. وزن واحد طول و نتایج کنترل ابعادی نیز باید بررسی شوند؛ قیمت کمتر به‌تنهایی نشان‌دهنده کیفیت پایین‌تر یا پیشنهاد بهتر نیست.",
    },
    {
      type: "list",
      items: [
        "قیمت هر متر یا کیلوگرم را همراه با مشخصات فنی و وزن واحد طول مقایسه کنید",
        "ضخامت جداره اعلام‌شده را با جدول ابعاد کاتالوگ برای همان قطر و SDR بسنجید",
        "علامت‌گذاری روی لوله را بخوانید: تولیدکننده، قطر، SDR یا PN، گرید ماده و استاندارد باید روی خود لوله چاپ شده باشد",
        "برای خط آب شرب و گاز، گواهی و تأییدیه مربوط به همان کاربرد را بخواهید — نه گواهی یک محصول دیگر همان کارخانه",
        "گزارش آزمون همان بچ تولید را درخواست کنید",
      ],
    },
    {
      type: "internal-links",
      title: "راهنما و استعلام",
      links: [
        {
          label: "راهنمای کامل لوله پلی اتیلن",
          path: "/technical-center/polyethylene-pipe-complete-guide",
          hint: "انتخاب گرید، SDR، استاندارد و خرید",
        },
        {
          label: "سایزهای لوله پلی اتیلن",
          path: "/pipe-size",
          hint: "مشخصات کاتالوگ برای هر قطر",
        },
        { label: "استعلام قیمت", path: "/request-quote" },
        {
          label: "جدول سایز، ضخامت و SDR",
          path: "/technical-center/polyethylene-pipe-dimensions-table",
          hint: "کنترل ضخامت جداره پیش از سفارش",
        },
        { label: "مرکز فنی", path: "/technical-center" },
        { label: "آزمایشگاه", path: "/laboratory" },
        { label: "گواهی‌ها", path: "/certifications" },
        { label: "کارخانه تولید", path: "/about" },
        { label: "گالری کارخانه", path: "/gallery" },
      ],
    },
  ],
  faqs: [
    {
      question: "برای خرید لوله پلی اتیلن چه اطلاعاتی لازم است؟",
      answer:
        "کاربرد خط، قطر خارجی بر حسب میلی‌متر، کلاس فشار (SDR یا PN)، گرید ماده (PE80 یا PE100)، متراژ و شکل تحویل. رده فشار بر وزن و قیمت اثر دارد؛ اگر آن را نمی‌دانید، برای تکمیل مشخصات از واحد فنی راهنمایی بگیرید.",
    },
    {
      question: "خرید از کارخانه چه تفاوتی با خرید از واسطه دارد؟",
      answer:
        "در خرید مستقیم، بچ تولید قابل ردیابی است، گزارش آزمون همان بچ در دسترس است و پرسش فنی به خط تولید می‌رسد. در هر دو حالت، همان مدارک را بخواهید: علامت‌گذاری روی لوله، گواهی متناسب با کاربرد و گزارش آزمون.",
    },
    {
      question: "لوله پلی اتیلن را چطور از نظر کیفیت بررسی کنم؟",
      answer:
        "سه چیز را بسنجید: ضخامت جداره در برابر جدول ابعاد برای همان قطر و SDR، علامت‌گذاری چاپ‌شده روی لوله، و گزارش آزمون. قیمت هر متر معیار کیفیت نیست — لوله سبک‌تر در همان قطر و کلاس، جداره نازک‌تری دارد.",
    },
    {
      question: "بوکان پایپ تا چه قطری تولید می‌کند؟",
      answer:
        "از سایز ۱۶ تا ۶۳۰ میلی‌متر، فشار کاری ۲.۵ تا ۲۵ بار (بسته به گرید و SDR)، در گریدهای PE80 و PE100. جدول کامل قطر، ضخامت جداره و SDR کاتالوگ کارخانه در مرکز فنی منتشر شده است.",
    },
  ],
  related: {
    products: ["water-supply-pipe", "gas-pipe", "irrigation-pipe", "industrial-pipe", "pe100-pipe"],
    articles: ["pe100-technical-guide", "hdpe-installation-guide", "polyethylene-pipe-complete-guide"],
  },
};

export const faApplicationsHub: ContentDocument = {
  id: "applications-hub",
  slug: "applications",
  path: "/applications",
  locale: "fa",
  kind: "hub",
  title: "کاربرد لوله پلی اتیلن",
  seoTitle: "کاربرد لوله پلی اتیلن | آب، گاز، کشاورزی و صنعت | بوکان پایپ",
  seoDescription:
    "کاربرد لوله پلی اتیلن در آب، گاز، آبیاری، فاضلاب و صنعت؛ معیارهای انتخاب بر اساس فشار، نوع سیال و شرایط نصب و معرفی محصولات مرتبط.",
  description: "راهنمای کاربرد لوله‌های پلی‌اتیلن در شبکه‌های آب، گاز، کشاورزی و صنعت.",
  primaryKeyword: "کاربرد لوله پلی اتیلن",
  secondaryKeywords: [
    "لوله پلی اتیلن آبرسانی",
    "لوله پلی اتیلن کشاورزی",
    "لوله پلی اتیلن صنعتی",
  ],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-05",
  breadcrumbs: [
    { label: "خانه", path: "/" },
    { label: "کاربردها", path: "/applications" },
  ],
  sections: [
    {
      type: "paragraph",
      text: "کاربرد شبکه، معیارهای انتخاب لوله را تعیین می‌کند. فشار، دما، نوع سیال و شرایط نصب در هر پروژه متفاوت‌اند؛ برای بررسی ابعاد و رده‌های قابل تأمین، مشخصات محصول مرتبط را ببینید.",
    },
    { type: "heading", level: 2, text: "معیارهای انتخاب لوله بر اساس کاربرد" },
    {
      type: "spec-table",
      title: "مقایسه نیازهای شبکه",
      rows: [
        {
          label: "انتقال و توزیع آب",
          value: "کلاس فشار از خط تراز هیدرولیکی و سهم ضربه قوچ می‌آید؛ قطر از دبی و سرعت مجاز. الزام بهداشتی تماس با آب آشامیدنی حاکم است.",
        },
        {
          label: "آبیاری کشاورزی",
          value: "علاوه بر دبی، یکنواختی توزیع در کل بلوک تعیین‌کننده است و معمولاً قطر را بزرگ‌تر می‌کند. مبنای کلاس فشار، حداکثر فشار پمپ است نه فشار کاری متوسط.",
        },
        {
          label: "گازرسانی",
          value: "استاندارد و تأییدیه شرکت گاز حاکم است. روش اتصال الکتروفیوژن و ردیابی خط پس از دفن، جزء الزامات‌اند نه انتخاب.",
        },
        {
          label: "فاضلاب",
          value: "اول باید روشن شود خط ثقلی است یا تحت فشار. در خط ثقلی معیار، تحمل بار خارجی و حفظ سرعت خودشویی است؛ در خط پمپاژ، کلاس فشار.",
        },
        {
          label: "زهکشی",
          value: "تفکیک بخش مشبک از بخش بدون منفذ، و انتخاب فیلتر متناسب با بافت خاک. قطر از دبی اوج رواناب می‌آید.",
        },
        {
          label: "صنعتی",
          value: "سازگاری شیمیایی با ترکیب و غلظت واقعی سیال، و دمای کارکرد. در خطوط صنعتی، دما بیشتر از فشار عامل خرابی زودرس است.",
        },
        {
          label: "حفاظت کابل",
          value: "نسبت پرشدگی داکت به کابل، شعاع خمش مسیر و روش کابل‌کشی (کشیدن یا دمیدن) که مشخصه جداره داخلی را تعیین می‌کند.",
        },
      ],
    },
    { type: "heading", level: 2, text: "آنچه در همه کاربردها مشترک است" },
    {
      type: "list",
      items: [
        "امکان ایجاد خط پیوسته و آب‌بند با اتصال جوشی صحیح",
        "مقاومت در برابر خوردگی خاک و سیال — دلیل اصلی جایگزینی فلز و بتن",
        "انعطاف‌پذیری و سازگاری با نشست خاک، به شرط اجرای درست بستر",
        "الزام یکسان در همه پروژه‌ها: SDR و گرید ماده باید در سفارش مشخص باشد، نه فقط قطر",
      ],
    },
    {
      type: "internal-links",
      title: "کاربردهای اصلی",
      links: [
        {
          label: "راهنمای کامل لوله پلی اتیلن",
          path: "/technical-center/polyethylene-pipe-complete-guide",
          hint: "انتخاب گرید، SDR، استاندارد و خرید",
        },
        { label: "انتقال آب", path: "/applications/water-transfer" },
        { label: "آبیاری کشاورزی", path: "/applications/agriculture-irrigation" },
        { label: "گازرسانی", path: "/applications/gas-distribution" },
        { label: "فاضلاب", path: "/applications/sewage" },
        { label: "زهکشی", path: "/applications/drainage" },
        { label: "صنعتی", path: "/applications/industrial" },
        { label: "حفاظت کابل", path: "/applications/cable-protection" },
      ],
    },
  ],
  faqs: [
    {
      question: "کاربردهای اصلی لوله پلی اتیلن چیست؟",
      answer:
        "انتقال و توزیع آب شرب، آبیاری کشاورزی، شبکه توزیع گاز، جمع‌آوری فاضلاب، زهکشی، خطوط سیال صنعتی و داکت حفاظت کابل. ماده پایه در همه یکی است اما استاندارد، الزامات کنترل کیفی و منطق انتخاب فرق می‌کند.",
    },
    {
      question: "آیا یک لوله را می‌توان در چند کاربرد استفاده کرد؟",
      answer:
        "نه به‌صورت آزاد. لوله آب شرب و لوله گاز هرکدام استاندارد و تأییدیه مخصوص خود را دارند و جایگزینی آن‌ها مجاز نیست. در کاربردهای غیرالزامی مانند آبیاری یا زهکشی، استفاده از لوله با کلاس بالاتر از نظر فنی ایرادی ندارد ولی معمولاً گران‌تر از نیاز پروژه است.",
    },
    {
      question: "از کجا بفهمم کدام کاربرد به پروژه من می‌خورد؟",
      answer:
        "از سیال و شرایط خط شروع کنید: چه چیزی منتقل می‌شود، با چه فشاری، در چه دمایی، و خط ثقلی است یا تحت فشار. پاسخ این چهار پرسش، هم کاربرد و هم استاندارد حاکم را مشخص می‌کند.",
    },
  ],
  related: {
    products: ["water-supply-pipe", "gas-pipe", "irrigation-pipe", "industrial-pipe"],
    articles: ["hdpe-pipe-what-is", "polyethylene-pipe-standards"],
  },
};

export const contentCatalogFa: readonly ContentDocument[] = [
  faProductsHub,
  ...faProducts,
  faApplicationsHub,
  ...faApplications,
  ...faLaboratoryPages,
  ...faTechnicalArticles,
  ...faCompanyPages,
  faDownloadsHub,
  faCalculatorIndex,
  faCalculatorHub,
  ...pipeSizeDocuments("fa"),
];
