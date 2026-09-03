"use client";

import Image from "next/image";
import Link from "next/link";
import { PremiumHeroSection } from "@/components/home/PremiumHeroSection";
import { useLocale } from "@/components/i18n/LocaleProvider";
import {
  IndustrialCtaBand,
  IndustrialSectionHeader,
  IndustrialTextLink,
  IndustrialButton,
} from "@/components/industrial/IndustrialPrimitives";
import { IndustrialPanelCard, IndustrialProductCard } from "@/components/industrial/IndustrialCards";
import {
  faHomeApplications,
  faHomeArticles,
  faHomeProducts,
} from "@/data/content/fa/home";
import { routes } from "@/lib/config/routes";

const industryImages = [
  "/media/demo/bukan-slide-03-product.png",
  "/media/demo/bukan-slide-04-inventory.png",
  "/media/demo/bukan-slide-02-extrusion.png",
] as const;

const productImages = [
  "/media/demo/bukan-slide-03-product.png",
  "/media/demo/bukan-slide-01-yard.png",
  "/media/demo/bukan-slide-04-inventory.png",
  "/media/demo/bukan-slide-02-extrusion.png",
] as const;

export function IndustrialHomePage() {
  const { t, path, locale } = useLocale();
  const isFa = locale === "fa";

  const productItems = isFa
    ? faHomeProducts
    : t.home.products.items.map((item) => ({ ...item, href: routes.products.path }));

  const applicationItems = isFa
    ? faHomeApplications
    : t.home.industries.items.map((item) => ({ ...item, href: routes.industries.path }));

  return (
    <div className="industrial-font">
      <PremiumHeroSection />

      <section className="ind-section ind-section-muted" aria-labelledby="products-heading">
        <div className="ind-container">
          <IndustrialSectionHeader
            kicker={isFa ? "محصولات" : t.home.products.kicker}
            title={isFa ? "خانواده محصولات لوله PE" : t.home.products.title}
            description={
              isFa
                ? "لوله پلی‌اتیلن تک‌جداره برای آبرسانی، گاز، کشاورزی، فاضلاب و PE100 — تا قطر ۶۳۰ میلی‌متر."
                : t.home.products.description
            }
            action={
              <IndustrialTextLink href={path("/polyethylene-pipe")}>
                {isFa ? "راهنمای لوله پلی‌اتیلن" : t.home.products.action}
                <span aria-hidden="true">{t.common.arrow}</span>
              </IndustrialTextLink>
            }
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {productItems.map((item, index) => (
              <IndustrialProductCard
                key={item.title}
                kicker={item.kicker}
                title={item.title}
                href={path("href" in item ? item.href : routes.products.path)}
                image={productImages[index] ?? productImages[0]}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="ind-section" aria-labelledby="applications-heading">
        <div className="ind-container">
          <IndustrialSectionHeader
            kicker={isFa ? "کاربردها" : t.home.industries.kicker}
            title={isFa ? "کاربرد در پروژه" : t.home.industries.title}
            description={
              isFa
                ? "انتخاب لوله بر اساس کاربرد پروژه — آب، گاز، کشاورزی و صنعت."
                : t.home.industries.description
            }
            action={
              <IndustrialTextLink href={path("/applications")}>
                {isFa ? "همه کاربردها" : t.home.industries.action}
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
              src="/media/demo/bukan-slide-02-extrusion.png"
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </div>
          <div>
            <div className="ind-kicker-row">
              <span className="ind-kicker">{isFa ? "تولید" : t.home.manufacturing.kicker}</span>
              <span className="ind-kicker-line" aria-hidden="true" />
            </div>
            <h2 className="ind-display mt-5 max-w-[18ch]">
              {isFa ? "تولید لوله تک‌جداره تا قطر ۶۳۰ میلی‌متر" : t.home.manufacturing.title}
            </h2>
            <p className="ind-lead mt-6 max-w-md">
              {isFa
                ? "بوکان پایپ از سال ۱۳۷۶ در تولید لوله پلی‌اتیلن فعالیت دارد. کنترل کیفیت در خط تولید و آزمایشگاه انجام می‌شود."
                : t.home.manufacturing.description}
            </p>
            <ul className="ind-feature-list mt-10">
              {(isFa
                ? ["اکستروژن تک‌جداره", "کنترل کیفیت در خط", "آزمایشگاه QC"]
                : t.home.manufacturing.features
              ).map((item) => (
                <li key={item} className="ind-feature-item">
                  {item}
                </li>
              ))}
            </ul>
            <IndustrialTextLink href={path("/about")} className="mt-10">
              {isFa ? "درباره کارخانه" : t.home.manufacturing.action}
              <span aria-hidden="true">{t.common.arrow}</span>
            </IndustrialTextLink>
          </div>
        </div>
      </section>

      <section className="ind-section ind-section-muted">
        <div className="ind-container">
          <IndustrialSectionHeader
            kicker={isFa ? "کیفیت" : t.home.quality.kicker}
            title={isFa ? "کنترل کیفیت و آزمایشگاه" : t.home.quality.title}
            description={
              isFa
                ? "QC تولید، آزمون batch و خدمات آزمایشگاه برای مشتری."
                : t.home.quality.description
            }
          />
          <div className="mt-10 flex flex-wrap gap-4">
            <IndustrialButton href={path("/quality")} variant="secondary">
              {isFa ? "سیاست کیفیت" : "Quality"}
            </IndustrialButton>
            <IndustrialButton href={path("/laboratory")} variant="secondary">
              {isFa ? "آزمایشگاه" : "Laboratory"}
            </IndustrialButton>
            <IndustrialButton href={path("/certifications")} variant="secondary">
              {isFa ? "گواهی‌ها" : "Certifications"}
            </IndustrialButton>
          </div>
        </div>
      </section>

      {isFa ? (
        <section className="ind-section">
          <div className="ind-container">
            <IndustrialSectionHeader
              kicker="منابع فنی"
              title="مرکز فنی و ابزار مهندسی"
              description="مقالات جوش، فشار و دما، شیر هوا — و ماشین‌حساب پیش‌طراحی خط لوله."
            />
            <div className="mt-10 flex flex-wrap gap-3">
              {faHomeArticles.map((article) => (
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
                ماشین‌حساب خط لوله
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <IndustrialCtaBand
        title={isFa ? "برای پروژه خود استعلام بگیرید." : t.home.cta.title}
        buttonLabel={isFa ? "درخواست پیش‌فاکتور" : t.home.cta.button}
        buttonHref={path(routes.requestQuote.path)}
      />
    </div>
  );
}
