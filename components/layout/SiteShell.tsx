"use client";

import { usePathname } from "next/navigation";
import { ScrollRevealRoot } from "@/components/motion/ScrollRevealRoot";
import { IndustrialFooter } from "@/components/layout/IndustrialFooter";
import { PremiumHeroHeader } from "@/components/layout/PremiumHeroHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { stripLocale } from "@/lib/i18n/path";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const { pathname: barePath } = stripLocale(pathname);
  const isImmersiveHero = barePath === "/" || barePath === "/about";

  return (
    <div
      className={
        isImmersiveHero
          ? "industrial-site industrial-font industrial-site--immersive-hero flex min-h-svh flex-col"
          : "industrial-site industrial-font flex min-h-svh flex-col"
      }
    >
      <ScrollRevealRoot />
      <SkipLink />
      <PremiumHeroHeader immersiveHero={isImmersiveHero} />
      <main id="main-content" className={isImmersiveHero ? "flex-1" : "flex-1 pt-[4.5rem] lg:pt-[4.75rem]"}>
        {children}
      </main>
      <IndustrialFooter />
    </div>
  );
}
