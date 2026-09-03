import Link from "next/link";
import { cn } from "@/lib/cn";

type IndustrialButtonProps = {
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
  children: React.ReactNode;
};

export function IndustrialButton({
  href,
  variant = "primary",
  className,
  children,
}: IndustrialButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "ind-btn",
        variant === "primary" ? "ind-btn-primary" : "ind-btn-secondary",
        className,
      )}
    >
      {children}
    </Link>
  );
}

type IndustrialTextLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export function IndustrialTextLink({ href, className, children }: IndustrialTextLinkProps) {
  return (
    <Link href={href} className={cn("ind-text-link", className)}>
      {children}
    </Link>
  );
}

type IndustrialSectionHeaderProps = {
  kicker: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

export function IndustrialSectionHeader({
  kicker,
  title,
  description,
  action,
  className,
}: IndustrialSectionHeaderProps) {
  return (
    <div className={cn("ind-section-header-wide", className)}>
      <div className="ind-section-header">
        <div className="ind-kicker-row">
          <span className="ind-kicker">{kicker}</span>
          <span className="ind-kicker-line" aria-hidden="true" />
        </div>
        <h2 className="ind-display mt-5">{title}</h2>
        {description ? <p className="ind-lead mt-4">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

type IndustrialCtaBandProps = {
  title: string;
  buttonLabel: string;
  buttonHref: string;
};

export function IndustrialCtaBand({ title, buttonLabel, buttonHref }: IndustrialCtaBandProps) {
  return (
    <section className="ind-cta-band">
      <div className="ind-container ind-cta-band-inner">
        <h2 className="ind-display ind-display-lg max-w-[18ch]">{title}</h2>
        <IndustrialButton href={buttonHref}>{buttonLabel}</IndustrialButton>
      </div>
    </section>
  );
}
