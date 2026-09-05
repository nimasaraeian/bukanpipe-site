"use client";

import Link from "next/link";
import { useEffect, useId, useRef } from "react";
import type { NavItem } from "@/lib/i18n/nav-items";
import { cn } from "@/lib/cn";

type HeaderNavDropdownProps = {
  label: string;
  items: readonly NavItem[];
  open: boolean;
  active: boolean;
  onToggle: () => void;
  onClose: () => void;
  isActiveHref: (href: string) => boolean;
};

export function HeaderNavDropdown({
  label,
  items,
  open,
  active,
  onToggle,
  onClose,
  isActiveHref,
}: HeaderNavDropdownProps) {
  const menuId = useId();
  const rootRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) onClose();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <li ref={rootRef} className="engine-header-nav-dropdown">
      <button
        type="button"
        className={cn(
          "engine-header-nav-link engine-header-nav-trigger",
          (active || open) && "engine-header-nav-link-active",
        )}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={onToggle}
      >
        {label}
        <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" className="engine-header-chevron">
          <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>
      {open ? (
        <ul id={menuId} className="engine-header-nav-menu" role="menu">
          {items.map((item) => (
            <li key={item.href} role="none">
              <Link
                href={item.href}
                role="menuitem"
                className={cn(
                  "engine-header-nav-menu-link",
                  isActiveHref(item.href) && "engine-header-nav-menu-link-active",
                )}
                onClick={onClose}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}
