import type { ProductSystemIcon } from "@/lib/products/en-product-systems";

type ProductSystemIconProps = {
  name: ProductSystemIcon;
  className?: string;
};

export function ProductSystemIconSvg({ name, className }: ProductSystemIconProps) {
  switch (name) {
    case "water":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3.5c2.6 3 4.2 5.4 4.2 7.8a4.2 4.2 0 1 1-8.4 0c0-2.4 1.6-4.8 4.2-7.8Z"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinejoin="round"
          />
          <path
            d="M7.5 18.5h9"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            opacity="0.55"
          />
        </svg>
      );
    case "gas":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 8.5h12M6 12h12M6 15.5h12"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
          <circle cx="8.5" cy="8.5" r="1.1" fill="currentColor" />
          <circle cx="8.5" cy="12" r="1.1" fill="currentColor" />
          <circle cx="8.5" cy="15.5" r="1.1" fill="currentColor" />
          <rect x="4" y="5.5" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      );
    case "irrigation":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 17.5 12 6.5l8 11"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 17.5h7M10 14h4"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            opacity="0.55"
          />
        </svg>
      );
    case "sewer":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 16.5c2.5-6 4.5-9 7-9s4.5 3 7 9"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
          <ellipse cx="12" cy="16.5" rx="7" ry="2.5" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      );
    case "drainage":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M7.5 5.5 12 3l4.5 2.5v5.5c0 3.2-2 5.6-4.5 6.8C9.5 16.6 7.5 14.2 7.5 11V5.5Z"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinejoin="round"
          />
          <path
            d="M10 19.5h4"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            opacity="0.55"
          />
        </svg>
      );
    case "pe100":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.25" />
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.25" opacity="0.55" />
          <path d="M12 4.5v15M4.5 12h15" stroke="currentColor" strokeWidth="1.25" opacity="0.35" />
        </svg>
      );
    default:
      return null;
  }
}
