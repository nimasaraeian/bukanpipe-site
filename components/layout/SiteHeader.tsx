"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { brandAssets } from "@/lib/media/brand-assets";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/config/routes";
import { siteConfig } from "@/lib/config/site";

const navItems = [
  routes.products,
  routes.applications,
  routes.laboratory,
  routes.engineering,
  routes.about,
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5">
      <div className="nav-premium pointer-events-auto mx-auto flex max-w-5xl items-center gap-2 rounded-full border border-white/70 bg-paper/78 px-2 py-2 shadow-[var(--shadow-nav)] backdrop-blur-2xl sm:gap-3 sm:px-3">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-full py-1 pe-2 ps-1 transition hover:bg-white/50"
        >
          <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-line/80">
            <Image
              src={brandAssets.logo3d}
              alt=""
              width={40}
              height={40}
              className="h-8 w-8 object-contain"
              aria-hidden
            />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block text-sm font-bold tracking-tight text-ink">
              {siteConfig.brandNameFa}
            </span>
            <span className="block text-[10px] text-muted" dir="ltr">
              {siteConfig.brandName}
            </span>
          </span>
        </Link>

        <nav
          aria-label="ناوبری اصلی"
          className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 md:flex"
        >
          {navItems.map((route) => {
            const active = pathname === route.path;
            return (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "nav-pill",
                  active && "nav-pill-active",
                )}
              >
                {route.title}
              </Link>
            );
          })}
        </nav>

        <div className="ms-auto flex shrink-0 items-center gap-1.5">
          <ButtonLink
            href={routes.contact.path}
            variant="ghost"
            size="sm"
            className="hidden rounded-full px-3 lg:inline-flex"
          >
            تماس
          </ButtonLink>
          <ButtonLink
            href={routes.requestQuote.path}
            size="sm"
            className="rounded-full px-4 shadow-[0_10px_28px_-12px_rgba(12,92,102,0.9)]"
          >
            پیش‌فاکتور
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
