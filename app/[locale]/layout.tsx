import { notFound } from "next/navigation";
import { uiFontByLocale } from "@/lib/fonts";
import { SiteShell } from "@/components/layout/SiteShell";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDirection, isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { organizationSchema, webSiteSchema } from "@/lib/schema/builders";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);
  const direction = getDirection(locale);
  const uiFont = uiFontByLocale[locale];

  return (
    <html
      className={`${uiFont.variable} industrial-root`}
      dir={direction}
      lang={locale}
      suppressHydrationWarning
    >
      <body className={`${uiFont.className} industrial-font industrial-body antialiased`}>
        <JsonLd data={[organizationSchema(), webSiteSchema()]} />
        <LocaleProvider locale={locale} dictionary={dictionary}>
          <SiteShell>{children}</SiteShell>
        </LocaleProvider>
      </body>
    </html>
  );
}
