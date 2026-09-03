import Image from "next/image";
import { brandAssets } from "@/lib/media/brand-assets";

export function HeaderLogoMark() {
  return (
    <span className="engine-header-logo-wrap" aria-hidden="true">
      <span className="engine-header-logo-orbit" />
      <span className="engine-header-logo-orbit-glow" />
      <Image
        src={brandAssets.logo}
        alt=""
        width={34}
        height={34}
        priority
        className="engine-header-logo"
      />
    </span>
  );
}
