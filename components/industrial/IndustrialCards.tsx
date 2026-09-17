import Image from "next/image";
import Link from "next/link";

type IndustrialPanelCardProps = {
  href: string;
  kicker: string;
  title: string;
  image: string;
};

export function IndustrialPanelCard({ href, kicker, title, image }: IndustrialPanelCardProps) {
  return (
    <Link href={href} className="ind-panel-card group">
      <div className="ind-panel-card-media">
        <Image
          src={image}
          alt=""
          fill
          quality={82}
          className="ind-panel-card-img"
          sizes="(min-width: 1024px) 33vw, 100vw"
        />
        <div className="ind-panel-card-shade" aria-hidden="true" />
      </div>
      <div className="ind-panel-card-copy">
        <p className="ind-kicker">{kicker}</p>
        <h3 className="ind-panel-card-title">{title}</h3>
      </div>
    </Link>
  );
}

type IndustrialProductCardProps = {
  href: string;
  kicker: string;
  title: string;
  image: string;
  imageAlt: string;
};

export function IndustrialProductCard({ href, kicker, title, image, imageAlt }: IndustrialProductCardProps) {
  return (
    <Link href={href} className="ind-product-card group">
      <div className="ind-product-card-media">
        <Image
          src={image}
          alt={imageAlt}
          fill
          quality={82}
          className="ind-product-card-img"
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="ind-product-card-footer">
        <div>
          <p className="ind-kicker">{kicker}</p>
          <h3 className="ind-product-card-title">{title}</h3>
        </div>
        <span className="ind-product-card-arrow" aria-hidden="true">
          →
        </span>
      </div>
    </Link>
  );
}
