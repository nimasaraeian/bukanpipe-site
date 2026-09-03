import { cn } from "@/lib/cn";

type BadgeTone = "neutral" | "accent" | "bronze" | "demo" | "onDark";

const tones: Record<BadgeTone, string> = {
  neutral: "bg-canvas-elevated text-ink-soft ring-line",
  accent: "bg-accent-soft text-accent ring-accent/15",
  bronze: "bg-[color-mix(in_srgb,var(--color-bronze)_14%,white)] text-[color:var(--color-bronze)] ring-bronze/20",
  demo: "bg-canvas text-muted ring-line",
  onDark: "bg-white/8 text-cinematic-ink ring-white/15",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
