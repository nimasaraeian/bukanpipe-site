import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { routes } from "@/lib/config/routes";

export type NavItem = {
  label: string;
  href: string;
};

export type PrimaryNavLink = {
  kind: "link";
  label: string;
  href: string;
};

export type PrimaryNavGroup = {
  kind: "group";
  id: "engineering" | "company";
  label: string;
  items: readonly NavItem[];
};

export type PrimaryNavEntry = PrimaryNavLink | PrimaryNavGroup;

export function getPrimaryNavStructure(
  _locale: Locale,
  t: Dictionary,
  path: (routePath: string) => string,
): readonly PrimaryNavEntry[] {
  const engineeringItems: readonly NavItem[] = [
    { label: t.nav.technicalCenter, href: path("/technical-center") },
    { label: t.nav.calculator, href: path("/calculator") },
    { label: t.nav.downloads, href: path("/downloads") },
  ];

  const companyItems: readonly NavItem[] = [
    { label: t.nav.about, href: path(routes.about.path) },
    { label: t.nav.gallery, href: path(routes.gallery.path) },
    { label: t.nav.laboratory, href: path(routes.laboratory.path) },
    { label: t.nav.quality, href: path("/quality") },
  ];

  return [
    { kind: "link", label: t.nav.home, href: path(routes.home.path) },
    { kind: "link", label: t.nav.products, href: path(routes.products.path) },
    { kind: "link", label: t.nav.applications, href: path("/applications") },
    { kind: "group", id: "engineering", label: t.nav.engineering, items: engineeringItems },
    { kind: "group", id: "company", label: t.nav.company, items: companyItems },
    { kind: "link", label: t.nav.contact, href: path(routes.contact.path) },
  ];
}

export function flattenPrimaryNavLinks(structure: readonly PrimaryNavEntry[]): NavItem[] {
  const links: NavItem[] = [];
  for (const entry of structure) {
    if (entry.kind === "link") {
      links.push({ label: entry.label, href: entry.href });
    } else {
      links.push(...entry.items);
    }
  }
  return links;
}

/** Flat list of all header destinations — used by link crawl tests. */
export function getPrimaryNavItems(
  locale: Locale,
  t: Dictionary,
  path: (routePath: string) => string,
): readonly NavItem[] {
  return flattenPrimaryNavLinks(getPrimaryNavStructure(locale, t, path));
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
          { label: t.footer.columns.company.links.gallery, href: path("/gallery") },
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
          { label: t.footer.columns.company.links.gallery, href: path("/gallery") },
          { label: t.footer.columns.company.links.quality, href: path("/quality") },
          { label: t.footer.columns.company.links.laboratory, href: path("/laboratory") },
          { label: t.footer.columns.company.links.contact, href: path("/contact") },
        ],
    },
  ];
}
