import Link from "next/link";
import { cn } from "@/lib/cn";

export type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumb({
  items,
  onDark = false,
  className,
}: {
  items: readonly Crumb[];
  onDark?: boolean;
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={cn(
          "flex flex-wrap items-center gap-2 text-sm",
          onDark ? "text-cinematic-muted" : "text-muted",
        )}
      >
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className={cn(
                    "underline-offset-4 hover:underline",
                    onDark ? "hover:text-glow" : "hover:text-accent",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    last && (onDark ? "font-medium text-cinematic-ink" : "font-medium text-ink"),
                  )}
                >
                  {item.label}
                </span>
              )}
              {last ? null : (
                <span
                  aria-hidden="true"
                  className={onDark ? "text-white/20" : "text-line-strong"}
                >
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
