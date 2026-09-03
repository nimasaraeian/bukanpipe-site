import Image from "next/image";
import { brandAssets } from "@/lib/media/brand-assets";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { routes } from "@/lib/config/routes";
import { siteConfig } from "@/lib/config/site";

export function CenterStageHero() {
  return (
    <section className="hero-stage relative min-h-[100dvh] overflow-hidden pt-24 sm:pt-28">
      <div className="hero-stage-bg" aria-hidden="true" />
      <div className="hero-stage-grid" aria-hidden="true" />
      <div className="hero-stage-orb hero-stage-orb-a" aria-hidden="true" />
      <div className="hero-stage-orb hero-stage-orb-b" aria-hidden="true" />

      <Container className="relative flex min-h-[calc(100dvh-6rem)] flex-col items-center justify-center pb-16 text-center">
        <p className="hero-kicker">Industrial Digital Platform</p>

        <div className="hero-3d-stage mt-6 w-full max-w-[min(92vw,34rem)] sm:max-w-[min(88vw,42rem)]">
          <div className="hero-3d-plinth" aria-hidden="true" />
          <div className="hero-3d-float">
            <Image
              src={brandAssets.logo3d}
              alt={`${siteConfig.brandName} — ${siteConfig.brandNameFa}`}
              width={brandAssets.logo3dWidth}
              height={brandAssets.logo3dHeight}
              priority
              className="hero-3d-logo mx-auto h-auto w-full max-w-md object-contain sm:max-w-lg lg:max-w-xl"
              sizes="(min-width: 1024px) 480px, 80vw"
            />
          </div>
        </div>

        <h1 className="display-hero mt-8 max-w-3xl text-3xl text-ink sm:text-4xl lg:text-5xl">
          {siteConfig.brandNameFa}
        </h1>
        <p className="mt-3 text-lg font-medium text-accent sm:text-xl" dir="ltr">
          {siteConfig.brandName}
        </p>
        <p className="mt-5 max-w-xl text-base leading-8 text-muted sm:text-lg">
          {siteConfig.taglineFa}
        </p>
        <p className="mt-2 text-sm text-muted/90" dir="ltr">
          {siteConfig.taglineEn}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href={routes.products.path} size="lg">
            کشف محصولات
          </ButtonLink>
          <ButtonLink href={routes.requestQuote.path} variant="secondary" size="lg">
            درخواست پیش‌فاکتور
          </ButtonLink>
        </div>

        <p className="mt-8 text-[11px] text-muted/80">
          پیش‌نمایش طراحی — visual مرکزی از لوگوی برند
        </p>
      </Container>
    </section>
  );
}
