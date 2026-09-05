"use client";

import { IndustrialPageHero } from "@/components/industrial/IndustrialPageHero";
import { IndustrialButton } from "@/components/industrial/IndustrialPrimitives";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { getDirection } from "@/lib/i18n/config";
import { getIndustrialPageHeroImageProps, getPageHeroImage } from "@/data/media/page-hero-images";
import { routes } from "@/lib/config/routes";

export function NotFoundContent() {
  const { locale, t, path } = useLocale();
  const direction = getDirection(locale);
  const hero = getPageHeroImage(routes.about.path, direction);

  return (
    <IndustrialPageHero
      kicker={t.notFound.kicker}
      title={t.notFound.title}
      description={t.notFound.description}
      {...getIndustrialPageHeroImageProps(hero)}
      breadcrumb={[
        { label: t.common.home, href: path(routes.home.path) },
        { label: t.notFound.breadcrumb },
      ]}
    >
      <IndustrialButton href={path(routes.home.path)}>{t.cta.backHome}</IndustrialButton>
      <IndustrialButton href={path(routes.products.path)} variant="secondary">
        {t.cta.viewProducts}
      </IndustrialButton>
    </IndustrialPageHero>
  );
}
