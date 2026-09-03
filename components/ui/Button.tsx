import Link from "next/link";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "onDark";
export type ButtonSize = "sm" | "md" | "lg";

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-paper shadow-[0_14px_36px_-14px_rgba(12,92,102,0.9)] hover:bg-accent-hover hover:shadow-[0_18px_40px_-12px_rgba(12,92,102,0.95)]",
  secondary:
    "bg-paper text-ink ring-1 ring-line hover:ring-accent/35 hover:text-accent hover:shadow-[var(--shadow-card)]",
  ghost: "bg-transparent text-ink hover:bg-accent-soft hover:text-accent",
  onDark:
    "bg-paper text-ink hover:bg-accent-soft shadow-[0_14px_36px_-16px_rgba(60,184,196,0.55)]",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

export function buttonClassName(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-300",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus",
    "disabled:pointer-events-none disabled:opacity-50",
    variantClass[variant],
    sizeClass[size],
    className,
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClassName(variant, size, className)}
      {...props}
    />
  );
}

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={buttonClassName(variant, size, className)}>
      {children}
    </Link>
  );
}

export function CtaLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 text-sm font-semibold text-accent underline-offset-8 hover:underline",
        className,
      )}
    >
      {children}
      <span aria-hidden="true">←</span>
    </Link>
  );
}
