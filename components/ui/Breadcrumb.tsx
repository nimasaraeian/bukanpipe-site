import Link from "next/link";

export type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: readonly Crumb[] }) {
  return (
    <nav aria-label="مسیر صفحه">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="hover:text-accent hover:underline underline-offset-4"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={last ? "text-ink font-medium" : undefined}>
                  {item.label}
                </span>
              )}
              {last ? null : (
                <span aria-hidden="true" className="text-line-strong">
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
