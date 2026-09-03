import Link from "next/link";
import { routes } from "@/lib/config/routes";
import { siteConfig } from "@/lib/config/site";

export function DepthFooter() {
  return (
    <footer className="depth-footer">
      <div className="depth-wrap depth-footer-inner">
        <div>
          <p className="depth-brand-word" dir="ltr">
            BUKAN PIPE
          </p>
          <p className="depth-footer-tag">{siteConfig.brandNameFa}</p>
        </div>
        <div className="depth-footer-links">
          <Link href={routes.products.path}>محصولات</Link>
          <Link href={routes.applications.path}>راهکارها</Link>
          <Link href={routes.engineering.path}>مهندسی</Link>
          <Link href={routes.contact.path}>تماس</Link>
        </div>
      </div>
      <div className="depth-wrap depth-footer-copy">
        <p>© {new Date().getFullYear()} {siteConfig.brandName}</p>
      </div>
    </footer>
  );
}
