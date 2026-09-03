import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { brandAssets } from "@/lib/media/brand-assets";
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
    <footer className="site-footer mt-auto border-t border-white/8 bg-[#080c0f] text-cinematic-ink">
      <Container width="wide" className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div className="lg:col-span-1">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
              <Image
                src={brandAssets.logo}
                alt=""
                width={40}
                height={40}
                className="h-9 w-9 object-contain"
                aria-hidden
              />
            </span>
            <span>
              <span className="block text-base font-bold" dir="ltr">
                {siteConfig.brandName}
              </span>
              <span className="block text-xs text-cinematic-muted">{siteConfig.brandNameFa}</span>
            </span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-8 text-cinematic-muted">
            {siteConfig.taglineFa}. سکوی دیجیتال صنعتی با تمرکز بر اعتماد مهندسی.
          </p>
          <div className="mt-6">
            <ButtonLink href={routes.requestQuote.path} className="industrial-btn-primary">
              درخواست پیش‌فاکتور
            </ButtonLink>
          </div>
        </div>
        {footerGroups.map((group) => (
          <div key={group.title}>
            <p className="text-xs font-bold tracking-[0.12em] text-glow uppercase">
              {group.title}
            </p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {group.links.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-cinematic-muted transition hover:text-cinematic-ink"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <Container
        width="wide"
        className="flex flex-wrap items-center justify-between gap-3 border-t border-white/8 py-5 text-xs text-cinematic-muted"
      >
        <p>
          © {new Date().getFullYear()} <bdi>{siteConfig.brandName}</bdi> / {siteConfig.brandNameFa}
        </p>
        <Link href="/design-system" className="transition hover:text-glow">
          سیستم طراحی (داخلی)
        </Link>
      </Container>
    </footer>
  );
}
