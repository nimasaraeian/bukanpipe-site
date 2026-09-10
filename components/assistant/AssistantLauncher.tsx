"use client";

type AssistantLauncherProps = {
  label: string;
  ariaLabel: string;
  open: boolean;
  onClick: () => void;
  launcherRef: React.RefObject<HTMLButtonElement | null>;
};

export function AssistantLauncher({
  label,
  ariaLabel,
  open,
  onClick,
  launcherRef,
}: AssistantLauncherProps) {
  return (
    <button
      ref={launcherRef}
      type="button"
      className="bpg-guide-launcher"
      aria-label={ariaLabel}
      aria-expanded={open}
      aria-haspopup="dialog"
      aria-controls="bpg-guide-panel"
      onClick={onClick}
    >
      <span className="bpg-guide-launcher__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
          <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M12 5.5v2.25M12 16.25V18.5M5.5 12h2.25M16.25 12H18.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path d="M12 8.2 14.6 14.4 12 13.15 9.4 14.4 12 8.2Z" fill="currentColor" />
        </svg>
      </span>
      <span className="bpg-guide-launcher__label">{label}</span>
    </button>
  );
}
