import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RequestQuotePageContent } from "@/components/pages/RequestQuotePageContent";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { createPageMetadata } from "@/lib/seo/metadata";
import { routes } from "@/lib/config/routes";
import { getDictionary } from "@/lib/i18n/dictionary";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const t = getDictionary(localeParam as Locale);
  return createPageMetadata({
    title: localeParam === "fa" ? "استعلام قیمت | بوکان پایپ" : t.routes.requestQuote.title,
    description:
      localeParam === "fa"
        ? "درخواست پیش‌فاکتور و استعلام لوله پلی‌اتیلن — تماس با واحد فروش بوکان پایپ."
        : t.routes.requestQuote.seoDescription,
    path: routes.requestQuote.path,
    locale: localeParam as Locale,
  });
}

export default async function RequestQuotePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  return <RequestQuotePageContent />;
}
