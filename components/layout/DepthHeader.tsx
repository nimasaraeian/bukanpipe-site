"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { brandAssets } from "@/lib/media/brand-assets";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/config/routes";

const nav = [
  { label: "محصولات", href: routes.products.path },
  { label: "راهکارها", href: routes.applications.path },
  { label: "مهندسی", href: routes.engineering.path },
  { label: "کیفیت", href: routes.laboratory.path },
] as const;

export function DepthHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="depth-header">
      <div className="depth-header-bar">
        <Link href="/" className="depth-brand">
          <Image src={brandAssets.logo} alt="" width={28} height={28} className="h-7 w-7" aria-hidden />
          <span dir="ltr">BUKAN</span>
        </Link>

        <nav className="depth-nav hidden lg:flex" aria-label="ناوبری">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(pathname === item.href && "depth-nav-active")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href={routes.contact.path} className="depth-header-action hidden sm:inline-flex">
            تماس
          </Link>
          <button
            type="button"
            className="depth-menu-btn lg:hidden"
            aria-expanded={open}
            aria-label="منو"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "×" : "☰"}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="depth-mobile-nav lg:hidden" aria-label="منوی موبایل">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href={routes.contact.path} onClick={() => setOpen(false)}>
            تماس
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
