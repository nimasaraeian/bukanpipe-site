"use client";

import Image from "next/image";
import Link from "next/link";
import { editorialPhotos } from "@/data/media/editorial-photos";
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

  const productItems = isFa ? faHomeProducts : enHomeProducts;

  const applicationItems = isFa ? faHomeApplications : enHomeApplications;

  const articleItems = isFa ? faHomeArticles : enHomeArticles;

  return (
    <div className="industrial-font">
      <PremiumHeroSection />

      <section className="ind-section ind-section-muted" aria-labelledby="products-heading">
        <div className="ind-container">
          <IndustrialSectionHeader
            kicker={isFa ? "محصولات" : "Products"}
            title={isFa ? "خانواده محصولات لوله PE" : "HDPE & PE100 pipe families"}
            description={
              isFa
                ? "لوله پلی‌اتیلن تک‌جداره برای آبرسانی، گاز، کشاورزی، فاضلاب و PE100 — تا قطر ۶۳۰ میلی‌متر."
                : "Single-wall HDPE pipe for water supply, gas, irrigation, sewerage and PE100 — up to 630 mm OD."
            }
            action={
              <IndustrialTextLink href={path("/polyethylene-pipe")}>
                {isFa ? "راهنمای لوله پلی‌اتیلن" : "HDPE pipe guide"}
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
            kicker={isFa ? "کاربردها" : "Applications"}
            title={isFa ? "کاربرد در پروژه" : "Project applications"}
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
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </div>
          <div>
            <div className="ind-kicker-row">
              <span className="ind-kicker">{isFa ? "تولید" : "Manufacturing"}</span>
              <span className="ind-kicker-line" aria-hidden="true" />
            </div>
            <h2 className="ind-display mt-5 max-w-[18ch]">
              {isFa ? "تولید لوله تک‌جداره تا قطر ۶۳۰ میلی‌متر" : "Single-wall extrusion up to 630 mm OD"}
            </h2>
            <p className="ind-lead mt-6 max-w-md">
              {isFa
                ? "بوکان پایپ از سال ۱۳۷۶ در تولید لوله پلی‌اتیلن فعالیت دارد. کنترل کیفیت در خط تولید و آزمایشگاه انجام می‌شود."
                : "Bukan Pipe has manufactured polyethylene pipe since 1997. Quality control runs in-line and in the laboratory."}
            </p>
            <ul className="ind-feature-list mt-10">
              {(isFa
                ? ["اکستروژن تک‌جداره", "کنترل کیفیت در خط", "آزمایشگاه QC"]
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
            title={isFa ? "کنترل کیفیت و آزمایشگاه" : "Quality control & laboratory"}
            description={
              isFa
                ? "QC تولید، آزمون batch و خدمات آزمایشگاه برای مشتری."
                : "Production QC, batch testing and customer laboratory services."
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

      <section className="ind-section">
        <div className="ind-container">
          <IndustrialSectionHeader
            kicker={isFa ? "منابع فنی" : "Engineering resources"}
            title={isFa ? "مرکز فنی و ابزار مهندسی" : "Technical Center & calculators"}
            description={
              isFa
                ? "مقالات جوش، فشار و دما، شیر هوا — و ماشین‌حساب پیش‌طراحی خط لوله."
                : "Welding, pressure and temperature guides, air valves — plus pipeline pre-design tools."
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
