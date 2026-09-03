import { cn } from "@/lib/cn";

type DemoVisualNoticeProps = {
  className?: string;
  compact?: boolean;
  subtle?: boolean;
};

/** Marks a temporary design-development visual. Not official Bukan Pipe photography. */
export function DemoVisualNotice({
  className,
  compact = false,
  subtle = false,
}: DemoVisualNoticeProps) {
  if (subtle) {
    return (
      <div
        className={cn(
          "pointer-events-none absolute end-3 top-3 z-10 rounded-full bg-cinematic/55 px-2 py-0.5 text-[9px] font-semibold tracking-wide text-cinematic-muted ring-1 ring-white/10 backdrop-blur-sm",
          className,
        )}
        aria-hidden="true"
      >
        DEMO
      </div>
    );
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute z-10 flex flex-col gap-1",
        compact ? "start-2 top-2" : "start-3 top-3 sm:start-4 sm:top-4",
        className,
      )}
      aria-hidden="true"
    >
      <span className="inline-flex w-fit rounded-full bg-cinematic/85 px-2.5 py-1 text-[10px] font-bold tracking-wide text-glow ring-1 ring-white/15">
        DEMO VISUAL
      </span>
      {!compact ? (
        <span className="max-w-[11rem] rounded-md bg-cinematic/75 px-2 py-1 text-[9px] font-semibold leading-4 text-cinematic-muted ring-1 ring-white/10">
          REPLACE WITH OFFICIAL FACTORY ASSET
        </span>
      ) : null}
    </div>
  );
}

export const demoVisualStatusLabel = {
  demo: "DEMO VISUAL",
  replace: "REPLACE WITH OFFICIAL FACTORY ASSET",
} as const;
