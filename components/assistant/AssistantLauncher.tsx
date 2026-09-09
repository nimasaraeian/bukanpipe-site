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
      aria-controls="bpg-guide-panel"
      onClick={onClick}
    >
      <span className="bpg-guide-launcher__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
          <path
            d="M12 3a7 7 0 0 0-4 12.7V19a1 1 0 0 0 1 1h1.5v1.5a1.5 1.5 0 0 0 3 0V20H15a1 1 0 0 0 1-1v-3.3A7 7 0 0 0 12 3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9.5 10.5h5M9.5 13h3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="bpg-guide-launcher__label">{label}</span>
    </button>
  );
}
