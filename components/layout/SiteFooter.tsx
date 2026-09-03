import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { routes } from "@/lib/config/routes";
import { siteConfig } from "@/lib/config/site";

const footerGroups = [
  {
    title: "کشف",
    links: [routes.products, routes.applications, routes.laboratory, routes.projects],
  },
  {
    title: "مرجع",
    links: [routes.engineering, routes.standards, routes.knowledge, routes.tools],
  },
  {
    title: "تجاری",
    links: [routes.pricing, routes.requestQuote, routes.dealers, routes.verify, routes.contact],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-canvas-elevated/50">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-base font-semibold">
            <span dir="ltr">{siteConfig.brandName}</span>
            <span className="mx-2 text-bronze" aria-hidden="true">
              /
            </span>
            {siteConfig.brandNameFa}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-7 text-muted">
            سکوی دیجیتال صنعتی. محتوای تجاری، ظرفیت، گواهی و پروژه فقط پس از
            تأیید کارخانه منتشر می‌شود.
          </p>
        </div>
        {footerGroups.map((group) => (
          <div key={group.title}>
            <p className="text-xs font-semibold tracking-wide text-accent">
              {group.title}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {group.links.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-ink-soft hover:text-accent"
                  >
                    {link.titleFa}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <Container className="flex flex-wrap items-center justify-between gap-3 border-t border-line py-5 text-xs text-muted">
        <p>
          نمایش برند: <bdi>{siteConfig.brandName}</bdi> / {siteConfig.brandNameFa}.
          نام حقوقی هنوز راستی‌آزمایی نشده است.
        </p>
        <Link href="/design-system" className="hover:text-accent">
          سیستم طراحی (داخلی)
        </Link>
      </Container>
    </footer>
  );
}
