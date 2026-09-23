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
    "خرید لوله پلی اتیلن مستقیم از کارخانه بوکان پایپ: آبرسانی، گاز، آبیاری کشاورزی، صنعتی و PE100 — تولید HDPE تا ۶۳۰ میلی‌متر.",
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
      text: "خانواده محصول را از روی کاربرد انتخاب کنید، نه از روی قطر. لوله آبرسانی، گاز، آبیاری و صنعتی از یک ماده پایه ساخته می‌شوند اما استاندارد، الزامات کنترل کیفی و علامت‌گذاری متفاوتی دارند — و در شبکه گاز و آب شرب، این تفاوت الزام قانونی است، نه ترجیح.",
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
      text: "استعلامی که فقط «لوله ۱۱۰ می‌خواهم» می‌گوید، قابل قیمت‌گذاری نیست — چون در همان قطر، بسته به کلاس فشار، چند محصول با وزن و قیمت متفاوت وجود دارد. پنج قلم زیر، استعلام را به یک سفارش قابل اجرا تبدیل می‌کند:",
    },
    {
      type: "list",
      items: [
        "کاربرد: آبرسانی، گاز، آبیاری، فاضلاب یا صنعتی — این تعیین می‌کند کدام استاندارد حاکم است",
        "قطر خارجی بر حسب میلی‌متر (نه اینچ و نه «سایز»)",
        "کلاس فشار: SDR یا PN — و اگر خط گرم کار می‌کند، دمای کارکرد را هم بنویسید",
        "گرید ماده: PE80 یا PE100",
        "متراژ، شکل تحویل (شاخه یا کلاف) و مقصد بارگیری",
      ],
    },
    { type: "heading", level: 2, text: "چطور چند پیشنهاد قیمت را با هم مقایسه کنیم" },
    {
      type: "paragraph",
      text: "مقایسه قیمت هر متر، گمراه‌کننده‌ترین روش خرید لوله پلی اتیلن است. وزن هر متر لوله از قطر خارجی، ضخامت جداره و چگالی ماده به دست می‌آید؛ یعنی لوله‌ای که در همان قطر و همان کلاس فشار سبک‌تر است، جداره نازک‌تری دارد. ارزان‌تر بودنش تخفیف نیست، کم‌فروشی در ضخامت است و در عمر خط ظاهر می‌شود.",
    },
    {
      type: "list",
      items: [
        "قیمت را بر پایه کیلوگرم یا بر پایه ضخامت جداره مقایسه کنید، نه متر",
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
        "کاربرد خط، قطر خارجی بر حسب میلی‌متر، کلاس فشار (SDR یا PN)، گرید ماده (PE80 یا PE100)، متراژ و شکل تحویل. بدون کلاس فشار، در یک قطر چند محصول با وزن و قیمت متفاوت وجود دارد و استعلام قابل قیمت‌گذاری نیست.",
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
        "تا قطر ۶۳۰ میلی‌متر، در گریدهای PE80 و PE100. جدول کامل قطر، ضخامت جداره و SDR کاتالوگ کارخانه در مرکز فنی منتشر شده است.",
    },
  ],
  related: {
    products: ["water-supply-pipe", "gas-pipe", "irrigation-pipe", "industrial-pipe", "pe100-pipe"],
    articles: ["pe100-technical-guide", "hdpe-installation-guide", "polyethylene-pipe"],
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
    "کاربرد لوله پلی اتیلن در آبرسانی، گازرسانی، آبیاری کشاورزی، فاضلاب و صنعت — راهنمای انتخاب + لینک محصولات کارخانه.",
  description: "کاربردهای شبکه لوله HDPE و PE.",
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
      text: "لوله پلی اتیلن یک محصول واحد نیست؛ یک خانواده است که در هر کاربرد، استاندارد و منطق انتخاب متفاوتی دارد. این صفحه نشان می‌دهد هر کاربرد چه چیزی را از لوله می‌خواهد و انتخاب در آن با چه چیزی تعیین می‌شود. مشخصات فنی و خرید در صفحات محصول است.",
    },
    { type: "heading", level: 2, text: "در هر کاربرد، چه چیزی انتخاب را تعیین می‌کند" },
    {
      type: "spec-table",
      title: "منطق انتخاب در هر کاربرد",
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
        "خط جوشی پیوسته، بدون درز نشت و بدون نفوذ از اتصالات",
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
