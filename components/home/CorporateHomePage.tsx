import Image from "next/image";
import Link from "next/link";
import { PremiumHeroSection } from "@/components/home/PremiumHeroSection";
import { routes } from "@/lib/config/routes";

const showcases = [
  {
    category: "Water",
    title: "Water infrastructure",
    href: routes.applications.path,
    image: "/media/demo/bukan-slide-03-product.webp",
  },
  {
    category: "Agriculture",
    title: "Irrigation networks",
    href: routes.applications.path,
    image: "/media/demo/bukan-slide-04-inventory.webp",
  },
  {
    category: "Industry",
    title: "Industrial systems",
    href: routes.applications.path,
    image: "/media/demo/bukan-slide-02-extrusion.webp",
  },
] as const;

const products = [
  { kicker: "Pipe", title: "HDPE pipe", href: routes.products.path, image: "/media/demo/bukan-slide-03-product.webp" },
  { kicker: "Fittings", title: "Fittings", href: routes.products.path, image: "/media/demo/bukan-slide-03-product.webp" },
  { kicker: "Coils", title: "Coils", href: routes.products.path, image: "/media/demo/bukan-slide-04-inventory.webp" },
  { kicker: "Systems", title: "Systems", href: routes.products.path, image: "/media/demo/bukan-slide-01-yard.webp" },
] as const;

export function CorporateHomePage() {
  return (
    <div className="premium-home bg-white text-neutral-950">
      <PremiumHeroSection />

      {/* Showcase cards */}
      <section className="premium-section">
        <div className="premium-container mb-16 lg:mb-24">
          <p className="premium-kicker">Applications</p>
          <h2 className="premium-display mt-4 max-w-[12ch]">Solutions</h2>
        </div>

        <div className="premium-container grid gap-6 lg:grid-cols-3 lg:gap-8">
          {showcases.map((item) => (
            <Link key={item.title} href={item.href} className="premium-showcase group">
              <div className="premium-showcase-media">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
                <div className="premium-showcase-gradient" aria-hidden="true" />
              </div>
              <div className="premium-showcase-copy">
                <p className="premium-kicker premium-kicker-light">{item.category}</p>
                <h3 className="premium-showcase-title">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="premium-section premium-section-muted">
        <div className="premium-container">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="premium-kicker">Products</p>
              <h2 className="premium-display mt-4">Products</h2>
            </div>
            <Link href={routes.products.path} className="premium-text-cta shrink-0">
              View catalog
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            {products.map((item) => (
              <Link key={item.title} href={item.href} className="premium-product group">
                <div className="premium-product-media">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.02]"
                    sizes="320px"
                  />
                </div>
                <div className="mt-6 flex items-baseline justify-between gap-4 border-t border-neutral-200 pt-6">
                  <div>
                    <p className="premium-kicker">{item.kicker}</p>
                    <h3 className="premium-product-title">{item.title}</h3>
                  </div>
                  <span className="premium-product-arrow" aria-hidden="true">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering */}
      <section className="premium-section">
        <div className="premium-container grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-24">
          <div className="premium-editorial-media relative aspect-[4/5] overflow-hidden lg:aspect-[5/6]">
            <Image
              src="/media/demo/bukan-slide-01-yard.webp"
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </div>
          <div className="lg:py-12">
            <p className="premium-kicker">Engineering</p>
            <h2 className="premium-display mt-6 max-w-[11ch]">
              Precision
              <br />
              in production
            </h2>
            <p className="premium-lead mt-10 max-w-sm text-neutral-500">
              Process-controlled extrusion. Laboratory validation. System-level reliability.
            </p>
            <ul className="premium-engineering-list mt-14 space-y-6">
              {["ISO-aligned production", "In-line quality control", "Technical documentation"].map(
                (item) => (
                  <li key={item} className="premium-engineering-item">
                    {item}
                  </li>
                ),
              )}
            </ul>
            <Link href={routes.engineering.path} className="premium-text-cta mt-14 inline-flex">
              Engineering hub
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="premium-cta-band">
        <div className="premium-container flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
          <h2 className="premium-display max-w-[16ch]">Partner with us.</h2>
          <Link href={routes.contact.path} className="premium-btn-dark">
            Contact
          </Link>
        </div>
      </section>
    </div>
  );
}
