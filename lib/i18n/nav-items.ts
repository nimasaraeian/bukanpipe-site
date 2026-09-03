import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { routes } from "@/lib/config/routes";

export type NavItem = {
  label: string;
  href: string;
};

export function getPrimaryNavItems(
  locale: Locale,
  t: Dictionary,
  path: (routePath: string) => string,
): readonly NavItem[] {
  if (locale === "fa") {
    return [
      { label: t.nav.home, href: path(routes.home.path) },
      { label: t.nav.products, href: path(routes.products.path) },
      { label: t.nav.applications, href: path("/applications") },
      { label: t.nav.laboratory, href: path(routes.laboratory.path) },
      { label: t.nav.technicalCenter, href: path("/technical-center") },
      { label: t.nav.downloads, href: path("/downloads") },
      { label: t.nav.calculator, href: path("/calculator") },
      { label: t.nav.about, href: path(routes.about.path) },
      { label: t.nav.contact, href: path(routes.contact.path) },
    ];
  }

  return [
    { label: t.nav.home, href: path(routes.home.path) },
    { label: t.nav.products, href: path(routes.products.path) },
  ];
}

export type FooterColumn = {
  title: string;
  links: readonly { label: string; href: string }[];
};

export function getFooterColumns(
  locale: Locale,
  t: Dictionary,
  path: (routePath: string) => string,
): readonly FooterColumn[] {
  if (locale === "fa") {
    return [
      {
        title: t.footer.columns.products.title,
        links: [
          { label: t.footer.columns.products.links.allProducts, href: path("/products") },
          { label: t.footer.columns.products.links.waterPipe, href: path("/products/water-supply-pipe") },
          { label: t.footer.columns.products.links.gasPipe, href: path("/products/gas-pipe") },
          { label: t.footer.columns.products.links.pe100, href: path("/products/pe100-pipe") },
          { label: t.footer.columns.products.links.peGuide, href: path("/polyethylene-pipe") },
        ],
      },
      {
        title: t.footer.columns.resources.title,
        links: [
          { label: t.footer.columns.resources.links.technicalCenter, href: path("/technical-center") },
          { label: t.footer.columns.resources.links.calculator, href: path("/calculator") },
          { label: t.footer.columns.resources.links.downloads, href: path("/downloads") },
          { label: t.footer.columns.resources.links.applications, href: path("/applications") },
        ],
      },
      {
        title: t.footer.columns.company.title,
        links: [
          { label: t.footer.columns.company.links.about, href: path("/about") },
          { label: t.footer.columns.company.links.quality, href: path("/quality") },
          { label: t.footer.columns.company.links.laboratory, href: path("/laboratory") },
          { label: t.footer.columns.company.links.contact, href: path("/contact") },
        ],
      },
    ];
  }

  return [
    {
      title: t.footer.columns.products.title,
      links: [{ label: t.footer.columns.products.links.allProducts, href: path("/products") }],
    },
    {
      title: t.footer.columns.company.title,
      links: [
        { label: t.footer.columns.company.links.contact, href: path("/contact") },
      ],
    },
  ];
}
