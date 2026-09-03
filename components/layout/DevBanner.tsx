import { siteConfig } from "@/lib/config/site";

export function DevBanner() {
  return (
    <p
      className="border-b border-line bg-banner px-4 py-2 text-center text-sm text-banner-text"
      role="status"
    >
      شِل توسعه. این وب‌سایت نهایی <bdi>{siteConfig.brandNameFa}</bdi> نیست و ادعای
      صنعتی تأییدنشده‌ای منتشر نمی‌کند.
    </p>
  );
}
