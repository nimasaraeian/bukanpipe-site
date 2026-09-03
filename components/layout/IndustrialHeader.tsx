"use client";



import Image from "next/image";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { useEffect, useState } from "react";

import { brandAssets } from "@/lib/media/brand-assets";

import { cn } from "@/lib/cn";

import { routes } from "@/lib/config/routes";

import { siteConfig } from "@/lib/config/site";



const trustItems = [
  "لوله پلی‌اتیلن با استاندارد مهندسی",
  "پشتیبانی فنی پروژه‌ای",
  "کیفیت قابل راستی‌آزمایی",
] as const;



const navItems = [

  routes.home,

  routes.about,

  routes.products,

  routes.applications,

  routes.projects,

  routes.laboratory,

  routes.engineering,

  routes.contact,

] as const;



function TrustCheck() {

  return (

    <span

      className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-glow/20 ring-1 ring-glow/50"

      aria-hidden="true"

    >

      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 fill-glow">

        <path d="M10 3L5 8.5 2 5.5l1-1 2 2 4-4 1 1z" />

      </svg>

    </span>

  );

}



export function IndustrialTopBar() {

  return (

    <div className="industrial-topbar border-b border-white/5 bg-[#080c0f] text-cinematic-ink">

      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">

        <Link href="/" className="group flex min-w-0 items-center gap-3">

          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/5 ring-1 ring-white/10 transition group-hover:ring-glow/40">

            <Image

              src={brandAssets.logo}

              alt=""

              width={44}

              height={44}

              className="h-10 w-10 object-contain drop-shadow-[0_4px_24px_rgba(60,184,196,0.35)]"

              aria-hidden

            />

          </span>

          <span>

            <span className="block text-sm font-bold tracking-wide" dir="ltr">

              {siteConfig.brandName}

            </span>

            <span className="block text-[10px] text-cinematic-muted">
              {siteConfig.brandNameFa} · راهکارهای لوله و زیرساخت
            </span>

          </span>

        </Link>



        <ul className="hidden flex-1 flex-wrap items-center justify-center gap-x-5 gap-y-2 xl:flex">

          {trustItems.map((item) => (

            <li

              key={item}

              className="flex items-center gap-2 text-[10px] font-semibold tracking-wide text-cinematic-muted"

            >

              <TrustCheck />

              {item}

            </li>

          ))}

        </ul>



        <div className="flex items-center gap-3 text-cinematic-muted">

          <Link

            href={routes.contact.path}

            className="text-[11px] font-semibold transition hover:text-glow"

          >

            تماس

          </Link>

          <span className="hidden h-4 w-px bg-white/15 sm:block" aria-hidden="true" />

          <Link

            href={routes.requestQuote.path}

            className="hidden text-[11px] font-semibold transition hover:text-glow sm:inline"

          >

            پیش‌فاکتور

          </Link>

        </div>

      </div>

    </div>

  );

}



export function IndustrialNav({

  variant = "overlay",

}: {

  variant?: "overlay" | "solid";

}) {

  const pathname = usePathname();

  const [open, setOpen] = useState(false);



  useEffect(() => {

    setOpen(false);

  }, [pathname]);



  useEffect(() => {

    document.body.style.overflow = open ? "hidden" : "";

    return () => {

      document.body.style.overflow = "";

    };

  }, [open]);



  return (

    <>

      <nav

        className={cn(

          "industrial-nav z-30 w-full",

          variant === "overlay"

            ? "absolute inset-x-0 top-0 border-b border-white/10 bg-cinematic/50 backdrop-blur-lg"

            : "relative border-b border-white/8 bg-[#0d1216] shadow-[0_8px_32px_-12px_rgba(0,0,0,0.45)]",

        )}

        aria-label="ناوبری اصلی"

      >

        <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 sm:px-6 lg:px-8">

          <button

            type="button"

            className="industrial-nav-toggle lg:hidden"

            aria-expanded={open}

            aria-controls="mobile-nav"

            aria-label={open ? "بستن منو" : "باز کردن منو"}

            onClick={() => setOpen((v) => !v)}

          >

            <span className={cn("industrial-nav-toggle-bar", open && "rotate-45 translate-y-[5px]")} />

            <span className={cn("industrial-nav-toggle-bar", open && "opacity-0")} />

            <span className={cn("industrial-nav-toggle-bar", open && "-rotate-45 -translate-y-[5px]")} />

          </button>



          <ul className="hidden min-w-0 flex-1 flex-wrap items-center lg:flex">

            {navItems.map((route) => {

              const active = pathname === route.path;

              return (

                <li key={route.path}>

                  <Link

                    href={route.path}

                    className={cn(

                      "industrial-nav-link",

                      active && "industrial-nav-link-active",

                    )}

                  >

                    {route.title}

                  </Link>

                </li>

              );

            })}

            <li>

              <button

                type="button"

                className="industrial-nav-link inline-flex items-center opacity-70"

                aria-label="جستجو (نمایشی)"

              >

                <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>

                  <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l3.55 3.55-1.42 1.42-3.54-3.56zM14 8a6 6 0 1 0-12 0 6 6 0 0 0 12 0z" />

                </svg>

              </button>

            </li>

          </ul>



          <Link href={routes.requestQuote.path} className="industrial-cta ms-auto shrink-0">

            درخواست پیش‌فاکتور

          </Link>

        </div>

      </nav>



      <div

        id="mobile-nav"

        className={cn(

          "industrial-mobile-drawer lg:hidden",

          open && "industrial-mobile-drawer-open",

        )}

        aria-hidden={!open}

      >

        <button

          type="button"

          className="industrial-mobile-backdrop"

          aria-label="بستن منو"

          onClick={() => setOpen(false)}

        />

        <div className="industrial-mobile-panel">

          <ul className="space-y-1">

            {navItems.map((route) => {

              const active = pathname === route.path;

              return (

                <li key={route.path}>

                  <Link

                    href={route.path}

                    className={cn(

                      "industrial-mobile-link",

                      active && "industrial-mobile-link-active",

                    )}

                  >

                    {route.title}

                  </Link>

                </li>

              );

            })}

          </ul>

          <Link

            href={routes.requestQuote.path}

            className="industrial-cta mt-6 w-full text-center"

          >

            درخواست پیش‌فاکتور

          </Link>

        </div>

      </div>

    </>

  );

}



export function IndustrialHeader({

  variant = "solid",

}: {

  variant?: "overlay" | "solid";

}) {

  return (

    <header className="relative z-40">

      <IndustrialTopBar />

      {variant === "solid" ? <IndustrialNav variant="solid" /> : null}

    </header>

  );

}

