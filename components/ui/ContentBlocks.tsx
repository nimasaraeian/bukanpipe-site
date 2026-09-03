import { cn } from "@/lib/cn";
import { demoCopy } from "@/lib/design/copy";

export function StatBlock({
  label,
  value,
  note,
  onDark = false,
}: {
  label: string;
  value: string;
  note?: string;
  onDark?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl p-5 ring-1",
        onDark
          ? "bg-white/5 ring-white/10"
          : "bg-paper/80 ring-line",
      )}
    >
      <p
        className={cn(
          "text-xs font-semibold",
          onDark ? "text-cinematic-muted" : "text-muted",
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          "tabular-nums mt-2 text-3xl font-semibold tracking-tight",
          onDark ? "text-cinematic-ink" : "text-ink",
        )}
        dir="ltr"
      >
        {value}
      </p>
      <p
        className={cn(
          "mt-2 text-xs leading-6",
          onDark ? "text-cinematic-muted" : "text-muted",
        )}
      >
        {note ?? demoCopy.unverified}
      </p>
    </div>
  );
}

export function Callout({
  title,
  children,
  tone = "note",
}: {
  title: string;
  children: React.ReactNode;
  tone?: "note" | "warning";
}) {
  return (
    <aside
      className={cn(
        "rounded-2xl p-5 ring-1",
        tone === "warning"
          ? "bg-[color-mix(in_srgb,var(--color-danger)_8%,white)] ring-danger/20"
          : "bg-accent-soft/70 ring-accent/15",
      )}
    >
      <p className="text-sm font-semibold">{title}</p>
      <div className="mt-2 text-sm leading-7 text-ink-soft">{children}</div>
    </aside>
  );
}

export function MediaFrame({
  caption,
  children,
}: {
  caption?: string;
  children?: React.ReactNode;
}) {
  return (
    <figure>
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-accent/25 via-canvas-elevated to-bronze/20 ring-1 ring-line">
        <div
          className="aspect-[16/10] min-h-40"
          aria-hidden={children ? undefined : true}
        >
          {children}
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.45),transparent_40%)]"
          aria-hidden="true"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function DownloadCard({
  title,
  meta,
}: {
  title: string;
  meta: string;
}) {
  return (
    <article className="surface-paper flex items-center justify-between gap-4 rounded-2xl p-4">
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-1 text-xs text-muted">{meta}</p>
      </div>
      <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
        PDF
      </span>
    </article>
  );
}
