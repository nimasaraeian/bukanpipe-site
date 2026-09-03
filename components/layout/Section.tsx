import { cn } from "@/lib/cn";

type SectionTone = "default" | "paper" | "muted" | "cinematic";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  tone?: SectionTone;
  lumen?: boolean;
  id?: string;
};

const tones: Record<SectionTone, string> = {
  default: "",
  paper: "bg-paper/70",
  muted: "bg-canvas-elevated/80",
  cinematic: "surface-cinematic",
};

export function Section({
  children,
  className,
  tone = "default",
  lumen = false,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-14 sm:py-20",
        tones[tone],
        lumen && "lumen-field",
        className,
      )}
    >
      {children}
    </section>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  titleId?: string;
  align?: "start" | "center";
  onDark?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  titleId,
  align = "start",
  onDark = false,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "eyebrow-rule",
            align === "center" && "justify-center",
            onDark && "text-glow",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={titleId}
        className={cn(
          "display-title mt-3 text-3xl sm:text-4xl",
          onDark ? "text-cinematic-ink" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-8 sm:text-lg",
            onDark ? "text-cinematic-muted" : "text-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow-rule">{children}</p>;
}

type RichHeadingProps = {
  as?: "h1" | "h2" | "h3";
  children: React.ReactNode;
  className?: string;
};

export function RichHeading({
  as: Component = "h1",
  children,
  className,
}: RichHeadingProps) {
  return (
    <Component
      className={cn(
        "display-title text-4xl sm:text-5xl lg:text-[3.35rem]",
        className,
      )}
    >
      {children}
    </Component>
  );
}

export function ContentStack({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-5 text-base leading-8", className)}>
      {children}
    </div>
  );
}

export function Divider({ className }: { className?: string }) {
  return (
    <hr
      className={cn(
        "h-px w-full border-0 bg-linear-to-l from-transparent via-line-strong to-transparent",
        className,
      )}
    />
  );
}

type SurfaceProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "aside";
};

export function Surface({
  children,
  className,
  as: Component = "div",
}: SurfaceProps) {
  return (
    <Component
      className={cn("surface-paper light-edge rounded-2xl p-6 sm:p-8", className)}
    >
      {children}
    </Component>
  );
}
