"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { siteConfig } from "@/lib/config/site";
import { routes } from "@/lib/config/routes";

export function IndustrialFooter() {
  const { t, path } = useLocale();

  const columns = [
    {
      title: t.footer.columns.solutions.title,
      links: [
        { label: t.footer.columns.solutions.links.systemSolutions, href: path(routes.solutions.path) },
        { label: t.footer.columns.solutions.links.waterInfrastructure, href: path(routes.industries.path) },
        { label: t.footer.columns.solutions.links.industrialSystems, href: path(routes.industries.path) },
      ],
    },
    {
      title: t.footer.columns.products.title,
      links: [
        { label: t.footer.columns.products.links.hdpeSystems, href: path(routes.products.path) },
        { label: t.footer.columns.products.links.fittingsCoils, href: path(routes.products.path) },
        { label: t.footer.columns.products.links.engineeringHub, href: path(routes.engineering.path) },
      ],
    },
    {
      title: t.footer.columns.company.title,
      links: [
        { label: t.footer.columns.company.links.about, href: path(routes.about.path) },
        { label: t.footer.columns.company.links.quality, href: path(routes.laboratory.path) },
        { label: t.footer.columns.company.links.contact, href: path(routes.contact.path) },
      ],
    },
  ] as const;

  return (
    <footer className="ind-footer industrial-font">
      <div className="ind-container py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/media/demo/logo.png"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
                aria-hidden
              />
              <p className="text-sm font-bold tracking-[0.16em] text-white" dir="ltr">
                BUKAN PIPE
              </p>
            </div>
            <p className="ind-lead mt-5 max-w-sm text-sm">
              {t.footer.tagline}. {t.footer.description}
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="ind-footer-col-title">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="ind-footer-link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-8 text-xs text-[#8a929e]">
          <p dir="ltr">
            © {new Date().getFullYear()} {siteConfig.brandName}
          </p>
          <p>{t.footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
