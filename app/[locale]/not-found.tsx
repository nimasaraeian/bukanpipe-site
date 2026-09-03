"use client";

import { IndustrialPageHero } from "@/components/industrial/IndustrialPageHero";
import { IndustrialButton } from "@/components/industrial/IndustrialPrimitives";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { getDirection } from "@/lib/i18n/config";
import { getPageHeroImage } from "@/data/media/page-hero-images";
import { routes } from "@/lib/config/routes";

export default function NotFound() {
  const { locale, t, path } = useLocale();
  const direction = getDirection(locale);
  const hero = getPageHeroImage(routes.about.path, direction);

  return (
    <IndustrialPageHero
      kicker={t.notFound.kicker}
      title={t.notFound.title}
      description={t.notFound.description}
      imageSrc={hero.src}
      imagePosition={hero.position}
      breadcrumb={[
        { label: t.common.home, href: path(routes.home.path) },
        { label: t.notFound.breadcrumb },
      ]}
    >
      <IndustrialButton href={path(routes.home.path)}>{t.cta.backHome}</IndustrialButton>
      <IndustrialButton href={path(routes.contact.path)} variant="secondary">
        {t.cta.contact}
      </IndustrialButton>
    </IndustrialPageHero>
  );
}
