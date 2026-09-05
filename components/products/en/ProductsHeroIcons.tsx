type IconProps = {
  className?: string;
};

export function HeroFeatureIcon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "shield":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3.5 18 6.5v5.8c0 4.1-2.6 7.2-6 8.7-3.4-1.5-6-4.6-6-8.7V6.5L12 3.5Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "clock":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M12 7.5v5l3 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "recycle":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M7 7.5 4.5 12H9l1.5-4.5M17 7.5 19.5 12H15l-1.5-4.5M12 19.5V14"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 16.5 6 19.5h4.5M15.5 16.5 18 19.5H13.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "links":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M9.5 8.5a3.5 3.5 0 0 1 5 0l1 1M14.5 15.5a3.5 3.5 0 0 1-5 0l-1-1M10 14l4-4"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "droplet":
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 4.5c2.8 3.2 4.5 5.8 4.5 8a4.5 4.5 0 1 1-9 0c0-2.2 1.7-4.8 4.5-8Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export type { IconProps };
