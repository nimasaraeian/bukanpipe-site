"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { industrialSlides, type PageHeroImage } from "@/data/media/page-hero-images";
import { cn } from "@/lib/cn";

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
  imagePositionRtl?: string;
  imageMobilePositionLtr?: string;
  imageMobilePositionRtl?: string;
  imageVariant?: PageHeroImage["variant"];
  imageSceneModifier?: PageHeroImage["sceneModifier"];
  imageAlt?: string;
  breadcrumb?: BreadcrumbItem[];
  children?: React.ReactNode;
};

export function IndustrialPageHero({
  kicker,
  title,
  description,
  imageSrc = industrialSlides.extrusion,
  imagePosition = "58% center",
  imagePositionRtl,
  imageMobilePositionLtr,
  imageMobilePositionRtl,
  imageVariant = "default",
  imageSceneModifier,
  imageAlt = "",
  breadcrumb,
  children,
}: IndustrialPageHeroProps) {
  const { locale, t } = useLocale();
  const displayKicker = kicker ?? t.common.brandKicker;
  const isBrandPhoto = imageVariant === "brand";
  const isProductPhoto = imageVariant === "product";
  const resolvedPosition =
    locale === "fa" && imagePositionRtl ? imagePositionRtl : imagePosition;

  return (
    <section
      className={cn(
        "ind-page-hero industrial-font",
        isBrandPhoto && "ind-page-hero--brand-photo",
        isProductPhoto && "ind-page-hero--product-photo",
        imageSceneModifier === "applications" && "ind-page-hero--brand-applications",
        imageSceneModifier === "about" && "ind-page-hero--brand-about",
        imageSceneModifier === "calculator" && "ind-page-hero--brand-calculator",
        (imageSceneModifier === "laboratory" || imageSceneModifier === "quality") &&
          "ind-page-hero--brand-laboratory",
        imageSceneModifier === "downloads" && "ind-page-hero--brand-downloads",
        imageSceneModifier === "technical" && "ind-page-hero--brand-technical",
      )}
      style={
        {
          "--ind-hero-object-position": resolvedPosition,
          ...(imageMobilePositionLtr
            ? { "--ind-hero-object-position-mobile-ltr": imageMobilePositionLtr }
            : {}),
          ...(imageMobilePositionRtl
            ? { "--ind-hero-object-position-mobile-rtl": imageMobilePositionRtl }
            : {}),
        } as React.CSSProperties
      }
    >
      <div className="ind-page-hero-scene" aria-hidden="true">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          unoptimized
          className="ind-page-hero-photo"
          sizes="100vw"
        />
        <div className="ind-page-hero-shade-left" />
        <div className="ind-page-hero-shade-top" />
        <div className="ind-page-hero-shade-bottom" />
        <div className="ind-page-hero-scene-glow" />
      </div>

      <div className="ind-container ind-page-hero-content">
        <div className={cn("ind-page-hero-copy-stack", isBrandPhoto && "ind-page-hero-copy-stack--brand")}>
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
        <h1
          className={cn(
            "ind-display ind-display-lg ind-page-hero-title ind-title-shine mt-5",
          )}
        >
          {title}
        </h1>
        {description ? (
          <p
            className={cn(
              "ind-lead ind-page-hero-lead mt-5",
              !isBrandPhoto && "max-w-2xl",
            )}
          >
            {description}
          </p>
        ) : null}
        {children ? <div className="ind-page-hero-actions mt-8 flex flex-wrap gap-3">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
