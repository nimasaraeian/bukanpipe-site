"use client";

import { useState, type FormEvent } from "react";

type AssistantComposerProps = {
  placeholder: string;
  submitLabel: string;
  maxLength: number;
  onSubmit: (value: string) => void;
  disabled?: boolean;
};

export function AssistantComposer({
  placeholder,
  submitLabel,
  maxLength,
  onSubmit,
  disabled,
}: AssistantComposerProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) {
      return;
    }
    onSubmit(trimmed.slice(0, maxLength));
    setValue("");
  };

  return (
    <form className="bpg-guide-composer" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="bpg-guide-input">
        {placeholder}
      </label>
      <input
        id="bpg-guide-input"
        type="text"
        className="bpg-guide-composer__input"
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete="off"
        disabled={disabled}
        onChange={(event) => setValue(event.target.value)}
      />
      <button type="submit" className="bpg-guide-composer__submit" disabled={disabled || !value.trim()}>
        {submitLabel}
      </button>
    </form>
  );
}
