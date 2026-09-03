import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/config/routes";
import { siteConfig } from "@/lib/config/site";

const applications = [
  {
    title: "آبرسانی",
    note: "شبکه‌های شهری و انتقال آب",
    href: routes.applications.path,
    image: "/media/demo/bukan-slide-03-product.png",
    offset: 0,
  },
  {
    title: "کشاورزی",
    note: "آبیاری فشرده و شبکه مزرعه",
    href: routes.applications.path,
    image: "/media/demo/bukan-slide-04-inventory.png",
    offset: 1,
  },
  {
    title: "صنعت",
    note: "خطوط فرآیند و زیرساخت",
    href: routes.applications.path,
    image: "/media/demo/bukan-slide-02-extrusion.png",
    offset: 2,
  },
] as const;

const products = [
  { title: "لوله PE", spec: "Ø 16–1200 mm", href: routes.products.path, image: "/media/demo/bukan-slide-03-product.png", wide: true },
  { title: "اتصالات", spec: "جوشی · کمپرسی", href: routes.products.path, image: "/media/demo/bukan-slide-03-product.png", wide: false },
  { title: "کلاف", spec: "استاندارد PE", href: routes.products.path, image: "/media/demo/bukan-slide-04-inventory.png", wide: false },
  { title: "سیستم", spec: "راهکار یکپارچه", href: routes.products.path, image: "/media/demo/bukan-slide-01-yard.png", wide: false },
] as const;

export function DepthHomeExperience() {
  return (
    <div className="depth-home">
      {/* Hero: split — text never on image */}
      <section className="depth-hero">
        <div className="depth-hero-copy">
          <p className="depth-eyebrow">HDPE · Engineering</p>
          <h1 className="depth-hero-title">
            {siteConfig.brandNameFa}
            <span className="depth-hero-accent">لوله با عمق مهندسی</span>
          </h1>
          <p className="depth-hero-lead">
            تولید لوله پلی‌اتیلن برای زیرساخت، آب و صنعت — با تمرکز بر کیفیت فرآیند و
            پشتیبانی فنی.
          </p>
          <div className="depth-hero-actions">
            <Link href={routes.products.path} className="depth-btn depth-btn-fill">
              محصولات
            </Link>
            <Link href={routes.engineering.path} className="depth-btn depth-btn-line">
              مهندسی
            </Link>
          </div>
        </div>
        <div className="depth-hero-visual" aria-hidden="true">
          <div className="depth-visual-stack">
            <div className="depth-visual-ghost" />
            <div className="depth-visual-frame">
              <Image
                src="/media/demo/bukan-slide-02-extrusion.png"
                alt=""
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Applications — staggered depth cards, text below image */}
      <section className="depth-section">
        <div className="depth-wrap depth-section-head">
          <p className="depth-eyebrow depth-eyebrow-dark">Applications</p>
          <h2 className="depth-section-title">کاربردها</h2>
        </div>

        <div className="depth-wrap depth-stagger-grid">
          {applications.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={cn("depth-stack-card", item.offset === 1 && "depth-stack-card-mid")}
            >
              <div className="depth-stack-card-shadow" aria-hidden="true" />
              <div className="depth-stack-card-body">
                <div className="depth-stack-card-media">
                  <Image src={item.image} alt="" fill className="object-cover" sizes="400px" />
                </div>
                <div className="depth-stack-card-copy">
                  <h3>{item.title}</h3>
                  <p>{item.note}</p>
                  <span className="depth-more">ادامه ←</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Products bento — image + text separated */}
      <section className="depth-section depth-section-alt">
        <div className="depth-wrap">
          <div className="depth-plate depth-plate-raised">
            <div className="depth-section-head depth-section-head-inline">
              <div>
                <p className="depth-eyebrow depth-eyebrow-dark">Products</p>
                <h2 className="depth-section-title">خانواده محصول</h2>
              </div>
              <Link href={routes.products.path} className="depth-text-link">
                کاتالوگ ←
              </Link>
            </div>

            <div className="depth-bento">
              {products.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cn("depth-bento-item", item.wide && "depth-bento-wide")}
                >
                  <div className="depth-bento-media">
                    <Image src={item.image} alt="" fill className="object-cover" sizes="480px" />
                  </div>
                  <div className="depth-bento-copy">
                    <h3>{item.title}</h3>
                    <p>{item.spec}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Engineering split — solid copy | framed image */}
      <section className="depth-section">
        <div className="depth-wrap depth-split">
          <div className="depth-split-copy">
            <p className="depth-eyebrow depth-eyebrow-dark">Manufacturing</p>
            <h2 className="depth-section-title">خط تولید، کنترل‌شده</h2>
            <p className="depth-body">
              اکسترود، آزمون و مستندسازی — برای پروژه‌هایی که به دوام و تکرارپذیری
              وابسته‌اند.
            </p>
            <ul className="depth-checklist">
              <li>کنترل کیفیت در خط</li>
              <li>آزمایشگاه و اعتبارسنجی</li>
              <li>پشتیبانی مهندسی پروژه</li>
            </ul>
            <Link href={routes.laboratory.path} className="depth-btn depth-btn-dark depth-btn-inline">
              کیفیت و آزمایشگاه
            </Link>
          </div>

          <div className="depth-split-visual">
            <div className="depth-visual-stack depth-visual-stack-end">
              <div className="depth-visual-ghost depth-visual-ghost-teal" />
              <div className="depth-visual-frame depth-visual-frame-tall">
                <Image
                  src="/media/demo/bukan-slide-01-yard.png"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="560px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA on solid surface */}
      <section className="depth-cta">
        <div className="depth-wrap depth-cta-inner">
          <h2 className="depth-cta-title">برای پروژه بعدی آماده‌اید؟</h2>
          <Link href={routes.requestQuote.path} className="depth-btn depth-btn-fill depth-btn-lg">
            درخواست پیش‌فاکتور
          </Link>
        </div>
      </section>
    </div>
  );
}
