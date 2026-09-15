import { notFound } from "next/navigation";
import type { Viewport } from "next";
import { loadUiFont } from "@/lib/fonts";
import { SiteShell } from "@/components/layout/SiteShell";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeBlockingScript } from "@/components/theme/ThemeScript";
import { THEME_COLOR_DARK } from "@/lib/theme/config";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDirection, isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { organizationSchema, manufacturingBusinessSchema, webSiteSchema } from "@/lib/schema/builders";
import { createRootMetadata } from "@/lib/seo/metadata";
import "../globals.css";

export const metadata = createRootMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: THEME_COLOR_DARK,
  colorScheme: "dark",
};

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
  const uiFont = await loadUiFont(locale);

  return (
    <html
      className={`${uiFont.variable} industrial-root`}
      data-theme="dark"
      dir={direction}
      lang={locale}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <head>
        <ThemeBlockingScript />
      </head>
      <body className={`${uiFont.className} industrial-font industrial-body antialiased`}>
        <JsonLd data={[organizationSchema(), manufacturingBusinessSchema(), webSiteSchema(locale)]} />
        <LocaleProvider locale={locale} dictionary={dictionary}>
          <ThemeProvider>
            <SiteShell>{children}</SiteShell>
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
