"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { brandAssets } from "@/lib/media/brand-assets";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/config/routes";

const navItems = [
  { label: "محصولات", href: routes.products.path },
  { label: "راهکارها", href: routes.applications.path },
  { label: "مهندسی", href: routes.engineering.path },
  { label: "کیفیت", href: routes.laboratory.path },
  { label: "شرکت", href: routes.about.path },
] as const;

export function CorporateHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overlay = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "premium-header fixed inset-x-0 top-0 z-50 transition-all duration-500",
        overlay ? "premium-header-overlay" : "premium-header-solid",
      )}
    >
      <div className="premium-container flex h-20 items-center gap-8 lg:h-[88px]">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src={brandAssets.logo}
            alt=""
            width={32}
            height={32}
            className={cn("h-8 w-8 object-contain", overlay && "brightness-0 invert")}
            aria-hidden
          />
          <span
            className={cn("premium-logo-wordmark", overlay && "text-white")}
            dir="ltr"
          >
            BUKAN
          </span>
        </Link>

        <nav className="hidden flex-1 justify-center xl:flex" aria-label="ناوبری اصلی">
          <ul className="flex items-center gap-10">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "premium-nav-link",
                    overlay && "premium-nav-link-overlay",
                    pathname === item.href && "premium-nav-link-active",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ms-auto flex items-center gap-4">
          <Link
            href={routes.contact.path}
            className={cn("premium-header-cta hidden sm:inline-flex", overlay && "premium-header-cta-overlay")}
          >
            تماس
          </Link>
          <button
            type="button"
            className={cn("premium-menu-btn xl:hidden", overlay && "text-white")}
            aria-expanded={open}
            aria-label="منو"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="premium-menu-line" />
            <span className="premium-menu-line" />
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-neutral-200 bg-white px-6 py-6 xl:hidden" aria-label="منوی موبایل">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block text-lg font-medium text-neutral-900"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
