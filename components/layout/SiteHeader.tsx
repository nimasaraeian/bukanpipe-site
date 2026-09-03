import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { publicRoutes, routes } from "@/lib/config/routes";
import { siteConfig } from "@/lib/config/site";

const primaryPaths: ReadonlySet<string> = new Set([
  routes.products.path,
  routes.applications.path,
  routes.laboratory.path,
  routes.engineering.path,
  routes.knowledge.path,
  routes.about.path,
]);

export function SiteHeader() {
  const primary = publicRoutes.filter((route) => primaryPaths.has(route.path));
  const more = publicRoutes.filter(
    (route) =>
      !primaryPaths.has(route.path) && route.path !== routes.home.path,
  );

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-canvas/80 backdrop-blur-md">
      <Container>
        <div className="flex items-center justify-between gap-4 py-4">
          <p className="min-w-0">
            <Link href="/" className="group block">
              <span className="block text-lg font-semibold tracking-tight">
                <span dir="ltr">{siteConfig.brandName}</span>
                <span className="mx-2 text-bronze" aria-hidden="true">
                  /
                </span>
                <span>{siteConfig.brandNameFa}</span>
              </span>
              <span className="mt-0.5 block text-xs text-muted">
                بنیاد توسعه صنعتی
              </span>
            </Link>
          </p>
          <div className="hidden items-center gap-2 sm:flex">
            <ButtonLink href={routes.contact.path} variant="ghost" size="sm">
              {routes.contact.titleFa}
            </ButtonLink>
            <ButtonLink href={routes.requestQuote.path} size="sm">
              {routes.requestQuote.titleFa}
            </ButtonLink>
          </div>
        </div>
        <nav
          aria-label="ناوبری اصلی"
          className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line/70 py-3 text-sm"
        >
          {primary.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className="text-ink-soft underline-offset-8 hover:text-accent hover:underline"
            >
              {route.titleFa}
            </Link>
          ))}
          <details className="relative">
            <summary className="cursor-pointer text-ink-soft hover:text-accent">
              مسیرهای دیگر
            </summary>
            <ul className="absolute end-0 z-50 mt-2 min-w-52 rounded-xl bg-paper p-3 shadow-[var(--shadow-card)] ring-1 ring-line">
              {more.map((route) => (
                <li key={route.path}>
                  <Link
                    href={route.path}
                    className="block rounded-lg px-2 py-1.5 hover:bg-accent-soft hover:text-accent"
                  >
                    {route.titleFa}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </nav>
      </Container>
    </header>
  );
}
