"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { industrialSlides } from "@/data/media/page-hero-images";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type IndustrialPageHeroProps = {
  kicker?: string;
  title: string;
  description?: string;
  imageSrc?: string;
  imagePosition?: string;
  breadcrumb?: BreadcrumbItem[];
  children?: React.ReactNode;
};

export function IndustrialPageHero({
  kicker,
  title,
  description,
  imageSrc = industrialSlides.extrusion,
  imagePosition = "58% center",
  breadcrumb,
  children,
}: IndustrialPageHeroProps) {
  const { t } = useLocale();
  const displayKicker = kicker ?? t.common.brandKicker;

  return (
    <section className="ind-page-hero industrial-font">
      <div className="ind-page-hero-scene" aria-hidden="true">
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          className="ind-page-hero-photo"
          sizes="100vw"
          style={{ objectPosition: imagePosition }}
        />
        <div className="ind-page-hero-shade-left" />
        <div className="ind-page-hero-shade-top" />
        <div className="ind-page-hero-shade-bottom" />
        <div className="ind-page-hero-scene-glow" />
      </div>

      <div className="ind-container ind-page-hero-content">
        {breadcrumb && breadcrumb.length > 0 ? (
          <nav className="ind-page-hero-breadcrumb mb-6" aria-label="Breadcrumb">
            {breadcrumb.map((item, index) => (
              <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                {item.href ? (
                  <Link href={item.href}>{item.label}</Link>
                ) : (
                  <span>{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : null}

        <div className="ind-kicker-row">
          <span className="ind-kicker">{displayKicker}</span>
          <span className="ind-kicker-line" aria-hidden="true" />
        </div>
        <h1 className="ind-display ind-display-lg ind-page-hero-title mt-5 max-w-[16ch]">{title}</h1>
        {description ? <p className="ind-lead ind-page-hero-lead mt-5 max-w-2xl">{description}</p> : null}
        {children ? <div className="ind-page-hero-actions mt-8 flex flex-wrap gap-3">{children}</div> : null}
      </div>
    </section>
  );
}
