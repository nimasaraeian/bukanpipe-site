import Link from "next/link";
import { routes } from "@/lib/config/routes";
import { siteConfig } from "@/lib/config/site";

const columns = [
  {
    title: "Products",
    links: [
      { label: "Pipe systems", href: routes.products.path },
      { label: "Fittings", href: routes.products.path },
      { label: "Applications", href: routes.applications.path },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: routes.about.path },
      { label: "Quality", href: routes.laboratory.path },
      { label: "Contact", href: routes.contact.path },
    ],
  },
] as const;

export function CorporateFooter() {
  return (
    <footer className="premium-footer">
      <div className="premium-container py-20 lg:py-24">
        <div className="flex flex-col gap-16 lg:flex-row lg:justify-between">
          <div>
            <p className="premium-logo-wordmark text-neutral-950" dir="ltr">
              BUKAN
            </p>
            <p className="mt-4 max-w-xs text-sm leading-7 text-neutral-500">
              {siteConfig.brandNameFa} — HDPE pipe systems.
            </p>
          </div>

          <div className="grid gap-12 sm:grid-cols-2 sm:gap-20">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="premium-kicker">{col.title}</p>
                <ul className="mt-6 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="premium-footer-link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-8 text-xs text-neutral-400">
          <p dir="ltr">
            © {new Date().getFullYear()} {siteConfig.brandName}
          </p>
          <p>{siteConfig.brandNameFa}</p>
        </div>
      </div>
    </footer>
  );
}
