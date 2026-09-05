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
  seoTitle: "مرکز فنی لوله پلی اتیلن | SDR، PN، جوش و استاندارد | بوکان پایپ",
  seoDescription:
    "راهنمای فنی لوله پلی اتیلن: HDPE، PE100، SDR، PN، استاندارد، جوش و نصب — منابع مهندسی بوکان پایپ.",
  description: "منابع فنی برای طراحی، انتخاب و نصب لوله PE.",
  primaryKeyword: "راهنمای لوله پلی اتیلن",
  secondaryKeywords: [
    "مشخصات فنی لوله پلی اتیلن",
    "SDR لوله پلی اتیلن",
    "PN لوله پلی اتیلن",
    "استاندارد لوله پلی اتیلن",
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
        { label: "راهنمای جامع انتخاب لوله پلی اتیلن", path: "/technical-center/polyethylene-pipe-complete-guide" },
        { label: "راهنمای فنی لوله آبرسانی", path: "/technical-center/water-supply-polyethylene-pipe-guide" },
        { label: "استاندارد و تولید لوله گازرسانی", path: "/technical-center/gas-polyethylene-pipe-guide" },
        { label: "لوله HDPE چیست؟", path: "/technical-center/hdpe-pipe-what-is" },
        { label: "تفاوت PE80 و PE100", path: "/technical-center/pe80-vs-pe100" },
        { label: "مشخصات فنی لوله", path: "/technical-center/polyethylene-pipe-specifications" },
        { label: "استاندارد لوله پلی اتیلن", path: "/technical-center/polyethylene-pipe-standards" },
        { label: "راهنمای جامع (pillar)", path: "/polyethylene-pipe" },
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
  seoTitle: "لوله پلی اتیلن چیست؟ | HDPE، PE100، SDR، PN و راهنمای خرید",
  seoDescription:
    "لوله پلی اتیلن چیست؟ راهنمای HDPE و PE100، SDR، PN، استاندارد، کاربرد آب و گاز — از تولیدکننده بوکان پایپ.",
  description: "راهنمای جامع برای خریداران صنعتی، پیمانکاران و مهندسان.",
  primaryKeyword: "لوله پلی اتیلن",
  secondaryKeywords: [
    "لوله HDPE چیست",
    "SDR لوله پلی اتیلن",
    "PN لوله پلی اتیلن",
    "تفاوت PE80 و PE100",
    "خرید لوله پلی اتیلن",
    "تولید کننده لوله پلی اتیلن",
  ],
  status: "published",
  evidenceStatus: "candidate",
  verificationStatus: "legacy-claim",
  lastReviewed: "2026-09-03",
  references: ["https://bukanpipe.com/about_us/"],
  breadcrumbs: [
    { label: "خانه", path: "/" },
    { label: "لوله پلی‌اتیلن", path: "/polyethylene-pipe" },
  ],
  sections: [
    {
      type: "paragraph",
      text: "لوله پلی‌اتیلن (PE) از پرکاربردترین مصالح برای شبکه‌های آب، گاز، فاضلاب، زهکشی و کشاورزی است. بوکان پایپ از سال ۱۳۷۶ در تولید لوله پلی‌اتیلن تک‌جداره تا قطر ۶۳۰ میلی‌متر فعالیت دارد.",
    },
    { type: "heading", level: 2, text: "انواع کاربردی" },
    {
      type: "list",
      items: [
        "آبرسانی شهری و روستایی (INSO 14427-2)",
        "گازرسانی انشعاب و توزیع (INSO 11233، EN 1555)",
        "آبیاری فشار قوی و کشاورزی",
        "فاضلاب و زهکشی",
        "پوشش کابل و خطوط صنعتی",
      ],
    },
    { type: "heading", level: 2, text: "PE80 و PE100" },
    {
      type: "paragraph",
      text: "درجه مواد (PE80، PE100) MRS و طراحی فشار را تعیین می‌کند. PE100 در همان SDR ضخامت جداره کمتری دارد و برای فشار بالاتر رایج است. صفحه محصول PE100 مرجع خرید این خانواده است.",
    },
    { type: "heading", level: 2, text: "SDR و PN" },
    {
      type: "paragraph",
      text: "SDR نسبت قطر خارجی به ضخامت جداره است. PN فشار اسمی درج‌شده روی لوله است که برای دمای ۲۰ درجه سانتی‌گراد تعریف شده. در دمای بالاتر باید MOP با ضریب دمایی محاسبه شود.",
    },
    { type: "heading", level: 2, text: "اتصال و نصب" },
    {
      type: "paragraph",
      text: "اتصال معمولاً با butt fusion (لب به لب) در آبرسانی و electrofusion در گاز انجام می‌شود. کیفیت جوش به مهارت اپراتور، دستگاه و بازرسی بستگی دارد.",
    },
    { type: "heading", level: 2, text: "راهنمای انتخاب" },
    {
      type: "list",
      items: [
        "کاربرد و سیال (آب، گاز، فاضلاب)",
        "فشار طراحی و دمای کاربرد",
        "استاندارد پروژه و تأیید مهندس ناظر",
        "روش اتصال و تجهیزات جانبی (شیر هوا، یک‌طرفه)",
      ],
    },
    {
      type: "spec-cta",
      text: "برای جدول قطر، SDR، PN و پیش‌فاکتور پروژه، فرم استعلام قیمت را تکمیل کنید یا با واحد فروش تماس بگیرید.",
    },
    {
      type: "internal-links",
      title: "ادامه مطالعه",
      links: [
        { label: "لوله HDPE چیست؟", path: "/technical-center/hdpe-pipe-what-is" },
        { label: "تفاوت PE80 و PE100", path: "/technical-center/pe80-vs-pe100" },
        { label: "مشخصات فنی", path: "/technical-center/polyethylene-pipe-specifications" },
        { label: "استاندارد لوله", path: "/technical-center/polyethylene-pipe-standards" },
        { label: "خرید از کارخانه", path: "/products" },
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
      question: "قیمت لوله پلی اتیلن چطور محاسبه می‌شود؟",
      answer:
        "قیمت به قطر، SDR، PN، گرید PE80/PE100، متراژ و محل تحویل بستگی دارد. برای قیمت روز از کارخانه، استعلام بگیرید.",
    },
    {
      question: "تفاوت لوله آبرسانی و گاز چیست؟",
      answer:
        "استاندارد تولید، کلاس فشار و روش اتصال متفاوت است. صفحات محصول آبرسانی و گاز هر کدام intent جدا دارند.",
    },
    {
      question: "چگونه از تولیدکننده لوله پلی اتیلن خرید کنیم؟",
      answer:
        "مشخصات پروژه را به واحد فروش بوکان پایپ اعلام کنید یا فرم استعلام قیمت را پر کنید.",
    },
  ],
};

export const faTechnicalArticles: readonly ContentDocument[] = [
  buildSeoArticleDocument("fa", faHdpePillarArticle),
  buildSeoArticleDocument("fa", faWaterPillarArticle),
  buildSeoArticleDocument("fa", faGasPillarArticle),
  faTechnicalHub,
  faPillarPolyethylene,
  article(
    "polyethylene-pipe-welding",
    "جوش لوله‌های پلی‌اتیلن",
    "جوش لوله پلی اتیلن | بات فیوژن و الکتروفیوژن",
    "راهنمای butt fusion و electrofusion برای لوله PE — استاندارد INSO 18648.",
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
    "نقش شیر هوا در جلوگیری از خلا، کاهش دبی و کتابی شدن لوله.",
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
    "ضریب دمایی و محاسبه MOP — INSO 14427 و INSO 14563-1.",
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
    "نقش لوله PE در شبکه آبیاری زیرسطحی و کاهش تبخیر.",
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
