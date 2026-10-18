import Image from "next/image";
import Link from "next/link";
import { editorialPhotos } from "@/data/media/editorial-photos";
import { PremiumHeroSection } from "@/components/home/PremiumHeroSection";
import {
  IndustrialCtaBand,
  IndustrialSectionHeader,
  IndustrialTextLink,
  IndustrialButton,
} from "@/components/industrial/IndustrialPrimitives";
import { IndustrialPanelCard, IndustrialProductCard } from "@/components/industrial/IndustrialCards";
import {
  enHomeApplications,
  enHomeArticles,
  enHomeProducts,
} from "@/data/content/en/home";
import {
  faHomeApplications,
  faHomeArticles,
  faHomeProducts,
} from "@/data/content/fa/home";
import { routes } from "@/lib/config/routes";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { withLocale } from "@/lib/i18n/path";

const industryImages = [
  "/media/demo/bukan-slide-03-product.webp",
  "/media/demo/bukan-slide-04-inventory.webp",
  "/media/demo/bukan-slide-02-extrusion.webp",
] as const;

const fallbackProductCard = {
  src: "/media/brand/bukan-pipe-hdpe-water-supply-pipe.webp",
  altFa: "لوله پلی اتیلن آبرسانی HDPE با نوار آبی روی خط تولید بوکان پایپ",
  altEn: "Bukan Pipe HDPE water supply pipe with blue stripe on the extrusion line",
} as const;

const productCardsByPath: Record<string, { src: string; altFa: string; altEn: string }> = {
  "/products/water-supply-pipe": fallbackProductCard,
  "/products/gas-pipe": {
    src: "/media/brand/bukan-pipe-hdpe-gas-pipe.webp",
    altFa: "لوله پلی اتیلن گاز HDPE با نوار و درپوش زرد تولید بوکان پایپ",
    altEn: "Bukan Pipe HDPE gas pipe with yellow stripe and end caps",
  },
  "/products/irrigation-pipe": {
    src: "/media/brand/bukan-pipe-hdpe-irrigation-coil-pipe.webp",
    altFa: "کلاف لوله پلی اتیلن آبیاری HDPE روی کویلر کارخانه بوکان پایپ",
    altEn: "Bukan Pipe HDPE irrigation coil pipe on the factory coiler",
  },
  "/products/industrial-pipe": {
    src: "/media/brand/bukan-pipe-hdpe-industrial-pipe-stack.webp",
    altFa: "لوله پلی اتیلن صنعتی HDPE چیده شده در محوطه کارخانه بوکان پایپ",
    altEn: "Bukan Pipe industrial HDPE pipe stack at the factory",
  },
  "/products/pe100-pipe": {
    src: "/media/brand/bukan-pipe-hdpe-pe100-pipe.webp",
    altFa: "لوله پلی اتیلن PE100 روی خط اکستروژن کارخانه بوکان پایپ",
    altEn: "Bukan Pipe PE100 HDPE pipe on the extrusion line",
  },
};

type IndustrialHomePageProps = {
  locale: Locale;
};

export function IndustrialHomePage({ locale }: IndustrialHomePageProps) {
  const t = getDictionary(locale);
  const path = (href: string) => withLocale(href, locale);
  const isFa = locale === "fa";

  const productItems = isFa ? faHomeProducts : enHomeProducts;

  const applicationItems = isFa ? faHomeApplications : enHomeApplications;

  const articleItems = isFa ? faHomeArticles : enHomeArticles;

  return (
    <div className="industrial-font">
      <PremiumHeroSection locale={locale} t={t} />

      <section className="ind-section ind-section-muted" aria-labelledby="products-heading">
        <div className="ind-container">
          <IndustrialSectionHeader
            kicker={isFa ? "محصولات" : "Products"}
            title={isFa ? "خرید لوله پلی اتیلن از کارخانه" : "HDPE pipe product catalog"}
            description={
              isFa
                ? "لوله پلی‌اتیلن برای شبکه‌های آبرسانی، گازرسانی، آبیاری و انتقال سیالات صنعتی. مشخصات و شرایط عرضه هر محصول را بررسی کنید و برای پروژه خود پیش‌فاکتور بگیرید."
                : "Single-wall HDPE pipe families for water supply, gas, irrigation mains, industrial transfer and PE100 — from 16 mm to 630 mm, pressure rating 2.5 to 25 bar. Each family has its own product page."
            }
            action={
              <IndustrialTextLink href={path(routes.products.path)}>
                {isFa ? "کاتالوگ محصولات" : "Product catalog"}
                <span aria-hidden="true">{t.common.arrow}</span>
              </IndustrialTextLink>
            }
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {productItems.map((item) => {
              const href = "href" in item ? item.href : routes.products.path;
              const card = productCardsByPath[href] ?? fallbackProductCard;
              return (
                <IndustrialProductCard
                  key={item.title}
                  kicker={item.kicker}
                  title={item.title}
                  href={path(href)}
                  image={card.src}
                  imageAlt={isFa ? card.altFa : card.altEn}
                />
              );
            })}
          </div>
        </div>
      </section>

      <section className="ind-section" aria-labelledby="applications-heading">
        <div className="ind-container">
          <IndustrialSectionHeader
            kicker={isFa ? "کاربردها" : "Applications"}
            title={isFa ? "انتخاب لوله برای کاربرد پروژه" : "Project applications"}
            description={
              isFa
                ? "انتخاب لوله بر اساس کاربرد پروژه — آب، گاز، کشاورزی و صنعت."
                : "Select pipe by project use case — water, gas, agriculture and industry."
            }
            action={
              <IndustrialTextLink href={path("/applications")}>
                {isFa ? "همه کاربردها" : "Explore applications"}
                <span aria-hidden="true">{t.common.arrow}</span>
              </IndustrialTextLink>
            }
          />
          <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-8">
            {applicationItems.map((item, index) => (
              <IndustrialPanelCard
                key={item.title}
                kicker={item.kicker}
                title={item.title}
                href={path("href" in item ? item.href : routes.industries.path)}
                image={industryImages[index] ?? industryImages[0]}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="ind-section ind-section-elevated">
        <div className="ind-container ind-editorial-grid">
          <div className="ind-editorial-media relative">
            <Image
              src={editorialPhotos.homeManufacturing}
              alt=""
              fill
              className="object-cover"
              style={{ objectPosition: "58% 48%" }}
              quality={82}
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </div>
          <div>
            <div className="ind-kicker-row">
              <span className="ind-kicker">{isFa ? "تولید" : "Manufacturing"}</span>
              <span className="ind-kicker-line" aria-hidden="true" />
            </div>
            <h2 className="ind-display mt-5 max-w-[18ch]">
              {isFa ? "تولید لوله تک‌جداره از سایز ۱۶ تا ۶۳۰ میلی‌متر" : "Single-wall extrusion from 16 mm to 630 mm"}
            </h2>
            <p className="ind-lead mt-6 max-w-md">
              {isFa
                ? "بوکان پایپ از سال ۱۳۷۶ در تولید لوله پلی‌اتیلن فعالیت دارد. کنترل کیفیت در خط تولید و آزمایشگاه انجام می‌شود."
                : "Bukan Pipe has manufactured polyethylene pipe since 1997. Quality control runs in-line and in the laboratory."}
            </p>
            <ul className="ind-feature-list mt-10">
              {(isFa
                ? ["اکستروژن تک‌جداره", "کنترل کیفیت در خط", "آزمون‌های آزمایشگاهی"]
                : ["Single-wall extrusion", "In-line QC", "Polymer laboratory"]
              ).map((item) => (
                <li key={item} className="ind-feature-item">
                  {item}
                </li>
              ))}
            </ul>
            <IndustrialTextLink href={path("/about")} className="mt-10">
              {isFa ? "درباره کارخانه" : "About the factory"}
              <span aria-hidden="true">{t.common.arrow}</span>
            </IndustrialTextLink>
          </div>
        </div>
      </section>

      <section className="ind-section ind-section-muted">
        <div className="ind-container">
          <IndustrialSectionHeader
            kicker={isFa ? "کیفیت" : "Quality"}
            title={isFa ? "کنترل کیفیت تولید" : "Production quality control"}
            description={
              isFa
                ? "کنترل مواد اولیه، پایش ابعاد در خط تولید و آزمون‌های آزمایشگاهی، مراحل اصلی ارزیابی کیفیت لوله‌اند. با فرآیند کنترل و خدمات آزمون آشنا شوید."
                : "In-process production QC is separate from laboratory testing services. Pipe tests and lab scope are on the laboratory page."
            }
          />
          <div className="mt-10 flex flex-wrap gap-4">
            <IndustrialButton href={path("/quality")} variant="secondary">
              {isFa ? "کنترل کیفیت تولید" : "Production quality control"}
            </IndustrialButton>
            <IndustrialButton href={path("/laboratory")} variant="secondary">
              {isFa ? "آزمایشگاه لوله پلی اتیلن" : "Polyethylene pipe laboratory"}
            </IndustrialButton>
            <IndustrialButton href={path("/certifications")} variant="secondary">
              {isFa ? "گواهی‌ها" : "Certifications"}
            </IndustrialButton>
          </div>
        </div>
      </section>

      <section className="ind-section">
        <div className="ind-container">
          <IndustrialSectionHeader
            kicker={isFa ? "منابع فنی" : "Engineering resources"}
            title={isFa ? "راهنمای انتخاب و مشخصات لوله پلی‌اتیلن" : "What polyethylene pipe is, and engineering resources"}
            description={
              isFa
                ? "از شناخت HDPE و مقایسه PE80 و PE100 تا خواندن SDR و PN؛ راهنماهای فنی به انتخاب مشخصات متناسب با پروژه کمک می‌کنند."
                : "The overview page explains what polyethylene pipe is. SDR, PN and selection guidance live in Technical Center."
            }
          />
          <div className="mt-10 flex flex-wrap gap-3">
            {articleItems.map((article) => (
              <Link
                key={article.href}
                href={path(article.href)}
                className="ind-glass px-4 py-3 text-sm font-medium transition hover:border-[color:var(--ind-accent)]"
              >
                {article.title}
              </Link>
            ))}
            <Link
              href={path("/calculator/pipeline-design")}
              className="ind-glass px-4 py-3 text-sm font-medium transition hover:border-[color:var(--ind-accent)]"
            >
              {isFa ? "ماشین‌حساب خط لوله" : "Pipeline design calculator"}
            </Link>
          </div>
        </div>
      </section>

      <IndustrialCtaBand
        title={isFa ? "برای پروژه خود استعلام بگیرید." : "Request a quote for your project."}
        buttonLabel={isFa ? "درخواست پیش‌فاکتور" : "Request a Quote"}
        buttonHref={path(routes.requestQuote.path)}
      />
    </div>
  );
}
