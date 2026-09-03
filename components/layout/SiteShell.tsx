import Link from "next/link";
import { siteConfig } from "@/lib/config/site";
import { Container } from "@/components/layout/Container";
import { DevBanner } from "@/components/layout/DevBanner";
import { DevNav } from "@/components/layout/DevNav";
import { SkipLink } from "@/components/layout/SkipLink";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <SkipLink />
      <DevBanner />
      <header className="border-b border-line">
        <Container className="flex flex-col gap-4 py-5">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="text-lg font-semibold">
              <Link href="/">
                <span dir="ltr">{siteConfig.brandName}</span>
                <span className="mx-2 text-muted" aria-hidden="true">
                  /
                </span>
                <span>{siteConfig.brandNameFa}</span>
              </Link>
            </p>
            <p className="text-sm text-muted">بنیاد توسعه</p>
          </div>
          <DevNav />
        </Container>
      </header>
      <main id="main-content">
        <Container className="py-10 sm:py-14">{children}</Container>
      </main>
      <footer className="border-t border-line">
        <Container className="py-6 text-sm text-muted">
          <p>
            سکوی دیجیتال صنعتی <bdi>{siteConfig.brandName}</bdi>. محتوای تجاری فقط پس
            از تأیید کارخانه منتشر می‌شود.
          </p>
        </Container>
      </footer>
    </>
  );
}
