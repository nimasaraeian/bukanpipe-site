import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolutionsPageContent } from "@/components/pages/SolutionsPageContent";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/config/routes";
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

  return createPageMetadata({
    title: t.routes.solutions.seoTitle,
    description: t.routes.solutions.seoDescription,
    path: routes.solutions.path,
    locale,
    titleAbsolute: t.routes.solutions.seoTitle.includes("|"),
  });
}

export default async function SolutionsPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) {
    notFound();
  }

  return <SolutionsPageContent />;
}
