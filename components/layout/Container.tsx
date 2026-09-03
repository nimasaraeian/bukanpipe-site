import { cn } from "@/lib/cn";

type ContainerWidth = "narrow" | "default" | "wide" | "full";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
  width?: ContainerWidth;
};

const widths: Record<ContainerWidth, string> = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
  full: "max-w-none",
};

export function Container({
  children,
  className,
  as: Component = "div",
  width = "default",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        widths[width],
        className,
      )}
    >
      {children}
    </Component>
  );
}
