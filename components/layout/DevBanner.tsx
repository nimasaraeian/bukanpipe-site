import { siteConfig } from "@/lib/config/site";

export function DevBanner() {
  return (
    <p
      className="border-b border-white/10 bg-banner px-4 py-2 text-center text-xs text-banner-text sm:text-sm"
      role="status"
    >
      شِل توسعه — این وب‌سایت نهایی <bdi>{siteConfig.brandNameFa}</bdi> نیست و
      ادعای صنعتی تأییدنشده‌ای منتشر نمی‌کند.
    </p>
  );
}
