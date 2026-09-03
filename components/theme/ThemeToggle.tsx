"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/cn";

type ThemeToggleProps = {
  className?: string;
  variant?: "header" | "drawer";
};

export function ThemeToggle({ className, variant = "header" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLocale();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      className={cn(
        variant === "header" ? "engine-header-theme" : "engine-header-theme engine-header-theme-drawer",
        className,
      )}
      onClick={toggleTheme}
      aria-label={isLight ? t.common.themeDark : t.common.themeLight}
      aria-pressed={isLight}
    >
      <span className="engine-header-theme-icon" aria-hidden="true">
        {isLight ? (
          <svg viewBox="0 0 20 20" fill="none">
            <path
              d="M10 3.5a.75.75 0 0 1 .75.75v1.25a.75.75 0 0 1-1.5 0V4.25A.75.75 0 0 1 10 3.5Zm0 10.5a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Zm5.25-2.25a.75.75 0 0 1 .75.75v.25a.75.75 0 0 1-1.5 0v-.25a.75.75 0 0 1 .75-.75ZM4 10a.75.75 0 0 1-.75.75h-.25a.75.75 0 0 1 0-1.5h.25A.75.75 0 0 1 4 10Zm11.78 4.53a.75.75 0 0 1 1.06 0l.18.18a.75.75 0 1 1-1.06 1.06l-.18-.18a.75.75 0 0 1 0-1.06ZM4.94 5.06a.75.75 0 0 1 1.06 0l.18.18a.75.75 0 1 1-1.06 1.06l-.18-.18a.75.75 0 0 1 0-1.06Zm9.12 0a.75.75 0 0 1 0 1.06l-.18.18a.75.75 0 1 1-1.06-1.06l.18-.18a.75.75 0 0 1 1.06 0ZM5.12 14.94a.75.75 0 0 1 0 1.06l-.18.18a.75.75 0 1 1-1.06-1.06l.18-.18a.75.75 0 0 1 1.06 0ZM14.5 10a.75.75 0 0 1 .75-.75h.25a.75.75 0 0 1 0 1.5h-.25A.75.75 0 0 1 14.5 10Z"
              fill="currentColor"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 20 20" fill="none">
            <path
              d="M10 4.25a5.75 5.75 0 1 0 5.75 5.75A4.25 4.25 0 0 1 10 4.25Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </button>
  );
}
