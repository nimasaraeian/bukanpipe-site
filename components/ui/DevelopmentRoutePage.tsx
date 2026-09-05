"use client";

import { JsonLd } from "@/components/seo/JsonLd";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { IndustrialGlassCard } from "@/components/industrial/IndustrialGlassCard";
import { IndustrialPageHero } from "@/components/industrial/IndustrialPageHero";
import { IndustrialButton } from "@/components/industrial/IndustrialPrimitives";
import type { Dictionary } from "@/messages/en";
import { getDirection } from "@/lib/i18n/config";
import { getIndustrialPageHeroImageProps, getPageCardImages, getPageHeroImage } from "@/data/media/page-hero-images";
import type { CtaType } from "@/lib/config/cta";
import type { RouteDefinition } from "@/lib/config/routes";
import { routes } from "@/lib/config/routes";
import { breadcrumbListSchema } from "@/lib/schema/builders";

type DemoCardDef = {
  meta: string;
  title: string;
  description: string;
  image?: string;
};

type RouteMetaKey = keyof Dictionary["routes"];

function routeMetaKey(path: string): RouteMetaKey {
  const match = Object.entries(routes).find(([, route]) => route.path === path);
  return (match?.[0] as RouteMetaKey | undefined) ?? "home";
}

function cardsForPath(path: string, t: Dictionary): DemoCardDef[] {
  const images = getPageCardImages(path);

  let cards: readonly DemoCardDef[] = t.development.cards.default;
  if (path === routes.products.path) cards = t.development.cards.products;
  if (path === routes.applications.path) cards = t.development.cards.applications;
  if (path === routes.laboratory.path) cards = t.development.cards.laboratory;
  if (path === routes.projects.path) cards = t.development.cards.projects;
  if (path === routes.engineering.path || path === routes.knowledge.path) {
    cards = t.development.cards.engineering;
  }

  return cards.map((card, index) => ({
    ...card,
    image: images[index],
  }));
}

function DemoCards({ path }: { path: string }) {
  const { t } = useLocale();
  const cards = cardsForPath(path, t);
  const columns = path === routes.projects.path ? "md:grid-cols-2" : "md:grid-cols-3";

  return (
    <div className={`grid gap-6 ${columns}`}>
      {cards.map((card) => (
        <IndustrialGlassCard key={card.title} {...card} />
      ))}
    </div>
  );
}

type DevelopmentRoutePageProps = {
  route: RouteDefinition;
  extra?: React.ReactNode;
};

export function DevelopmentRoutePage({ route, extra }: DevelopmentRoutePageProps) {
  const { locale, t, path: localePath } = useLocale();
  const direction = getDirection(locale);
  const metaKey = routeMetaKey(route.path);
  const routeMeta = t.routes[metaKey];
  const primary = route.primaryCta;
  const hero = getPageHeroImage(route.path, direction);

  const ctaHref: Record<CtaType, string> = {
    REQUEST_QUOTE: localePath(routes.requestQuote.path),
    CONTACT_SALES: localePath(routes.contact.path),
    VIEW_PRODUCT: localePath(routes.products.path),
    DOWNLOAD_DATASHEET: localePath(routes.standards.path),
    VIEW_STANDARD: localePath(routes.standards.path),
    VIEW_PROJECT: localePath(routes.projects.path),
    USE_TOOL: localePath(routes.tools.path),
    REQUEST_LAB_TEST: localePath(routes.laboratory.path),
    VERIFY_DEALER: localePath(routes.verify.path),
  };

  const ctaLabel: Record<CtaType, string> = {
    REQUEST_QUOTE: t.cta.requestQuote,
    CONTACT_SALES: t.cta.contactSales,
    VIEW_PRODUCT: t.cta.viewProducts,
    DOWNLOAD_DATASHEET: t.cta.downloadDatasheet,
    VIEW_STANDARD: t.cta.viewStandard,
    VIEW_PROJECT: t.cta.viewProject,
    USE_TOOL: t.cta.useTool,
    REQUEST_LAB_TEST: t.cta.requestLabTest,
    VERIFY_DEALER: t.cta.verifyDealer,
  };

  return (
    <>
      <JsonLd
        data={breadcrumbListSchema([
          { name: t.routes.home.title, path: localePath(routes.home.path) },
          { name: routeMeta.title, path: localePath(route.path) },
        ])}
      />

      <IndustrialPageHero
        title={routeMeta.title}
        description={routeMeta.purpose}
        {...getIndustrialPageHeroImageProps(hero)}
        breadcrumb={[
          { label: t.common.home, href: localePath(routes.home.path) },
          { label: routeMeta.title },
        ]}
      >
        <IndustrialButton href={ctaHref[primary]}>{ctaLabel[primary]}</IndustrialButton>
        <IndustrialButton href={localePath(routes.contact.path)} variant="secondary">
          {t.cta.contact}
        </IndustrialButton>
      </IndustrialPageHero>

      <section className="ind-section ind-section-muted">
        <div className="ind-container">
          <div className="ind-kicker-row">
            <span className="ind-kicker">{t.development.sectionKicker}</span>
            <span className="ind-kicker-line" aria-hidden="true" />
          </div>
          <h2 className="ind-display mt-5">{t.development.sectionTitle}</h2>
          <p className="ind-lead mt-4 max-w-2xl">{t.development.sectionDescription}</p>

          <div className="ind-glass ind-glass-strong mt-8 p-5">
            <p className="text-sm font-semibold text-[color:var(--ind-text)]">{t.development.inDevelopment}</p>
            <p className="ind-lead mt-2 text-sm">{t.development.inDevelopmentDescription}</p>
          </div>

          <div className="mt-10">
            <DemoCards path={route.path} />
          </div>
          {extra ? <div className="mt-12">{extra}</div> : null}
        </div>
      </section>
    </>
  );
}
