type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
};

export function Container({
  children,
  className,
  as: Component = "div",
}: ContainerProps) {
  const classes = ["mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className]
    .filter(Boolean)
    .join(" ");

  return <Component className={classes}>{children}</Component>;
}
