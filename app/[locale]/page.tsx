import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustrialHomePage } from "@/components/home/IndustrialHomePage";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/config/routes";
import { siteConfig } from "@/lib/config/site";
import { createPageMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) {
    return {};
  }

  const locale = localeParam as Locale;
  const t = getDictionary(locale);

  return {
    ...createPageMetadata({
      title: siteConfig.defaultTitle,
      description: t.routes.home.seoDescription,
      path: routes.home.path,
      locale,
    }),
    title: {
      absolute: siteConfig.defaultTitle,
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) {
    notFound();
  }

  return <IndustrialHomePage />;
}
