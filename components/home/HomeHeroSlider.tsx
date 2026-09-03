"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { IndustrialNav } from "@/components/layout/IndustrialHeader";
import { ButtonLink } from "@/components/ui/Button";
import { routes } from "@/lib/config/routes";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/cn";

type Slide = {
  id: string;
  image: string;
  kicker: string;
  title: string;
  body: string;
};

type HomeHeroSliderProps = {
  slides: readonly Slide[];
};

export function HomeHeroSlider({ slides }: HomeHeroSliderProps) {
  const [index, setIndex] = useState(0);
  const total = slides.length;

  const go = useCallback(
    (next: number) => {
      setIndex((next + total) % total);
    },
    [total],
  );

  useEffect(() => {
    const timer = window.setInterval(() => go(index + 1), 9000);
    return () => window.clearInterval(timer);
  }, [go, index]);

  const slide = slides[index]!;

  return (
    <section className="brand-hero relative min-h-[min(94vh,920px)] overflow-hidden">
      <IndustrialNav variant="overlay" />

      {slides.map((item, i) => (
        <div
          key={item.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-out",
            i === index ? "opacity-100" : "opacity-0",
          )}
          aria-hidden={i !== index}
        >
          <Image
            src={item.image}
            alt=""
            fill
            priority={i === 0}
            className="object-cover scale-105"
            sizes="100vw"
          />
        </div>
      ))}

      <div className="brand-hero-overlay absolute inset-0" aria-hidden="true" />
      <div className="brand-hero-grain absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[min(94vh,920px)] max-w-[1400px] flex-col justify-center px-4 pb-24 pt-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="brand-hero-kicker">{slide.kicker}</p>
          <h1 className="brand-hero-title mt-4">
            <span className="block text-gradient-brand">{siteConfig.brandNameFa}</span>
            <span className="mt-2 block text-[0.55em] font-bold leading-tight text-cinematic-ink">
              {slide.title}
            </span>
          </h1>
          <p className="brand-hero-lead mt-6 max-w-lg">{slide.body}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={routes.products.path} className="industrial-btn-primary">
              مشاهده محصولات
            </ButtonLink>
            <ButtonLink href={routes.contact.path} className="industrial-btn-ghost">
              تماس با ما
            </ButtonLink>
          </div>
          <ul className="brand-hero-trust mt-10 flex flex-wrap gap-x-6 gap-y-2">
            <li>لوله پلی‌اتیلن</li>
            <li>مهندسی فنی</li>
            <li>کنترل کیفیت</li>
          </ul>
        </div>
      </div>

      <button
        type="button"
        className="industrial-hero-arrow industrial-hero-arrow-start hidden sm:flex"
        aria-label="اسلاید قبلی"
        onClick={() => go(index - 1)}
      >
        ‹
      </button>
      <button
        type="button"
        className="industrial-hero-arrow industrial-hero-arrow-end hidden sm:flex"
        aria-label="اسلاید بعدی"
        onClick={() => go(index + 1)}
      >
        ›
      </button>

      <div className="industrial-hero-dots" role="tablist" aria-label="اسلایدها">
        {slides.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`اسلاید ${i + 1}`}
            className={cn(
              "industrial-hero-dot border-0 transition-all",
              i === index && "industrial-hero-dot-active",
            )}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
