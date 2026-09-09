"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { routes } from "@/lib/config/routes";
import { submitLead, validateLeadPhone, sanitizeLeadText } from "@/lib/assistant/lead";
import type { AssistantIntentId, LeadPayload } from "@/lib/assistant/types";
import type { Locale } from "@/lib/i18n/config";

type AssistantLeadFormProps = {
  locale: Locale;
  copy: {
    leadPhoneLabel: string;
    leadPhonePlaceholder: string;
    leadNameLabel: string;
    leadSubmit: string;
    leadQuoteButton: string;
    leadNotConfigured: string;
    leadValidationPhone: string;
  };
  pageUrl: string;
  intentId?: AssistantIntentId;
  localePath: (path: string) => string;
  onSubmitted: () => void;
};

export function AssistantLeadForm({
  locale,
  copy,
  pageUrl,
  intentId,
  localePath,
  onSubmitted,
}: AssistantLeadFormProps) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!validateLeadPhone(phone)) {
      setError(copy.leadValidationPhone);
      return;
    }

    setPending(true);
    const payload: LeadPayload = {
      phone: sanitizeLeadText(phone, 32),
      name: name ? sanitizeLeadText(name, 80) : undefined,
      requestType: "callback",
      locale,
      pageUrl,
      assistantIntent: intentId,
      createdAt: new Date().toISOString(),
    };

    const result = await submitLead(payload);
    setPending(false);

    if (!result.ok) {
      setError(copy.leadNotConfigured);
      return;
    }

    onSubmitted();
    setPhone("");
    setName("");
  };

  return (
    <div className="bpg-guide-lead">
      <Link href={localePath(routes.requestQuote.path)} className="bpg-guide-lead__quote-link">
        {copy.leadQuoteButton}
      </Link>
      <form className="bpg-guide-lead__form" onSubmit={handleSubmit} noValidate>
        <label className="bpg-guide-lead__label" htmlFor="bpg-guide-lead-phone">
          {copy.leadPhoneLabel}
        </label>
        <input
          id="bpg-guide-lead-phone"
          type="tel"
          inputMode="tel"
          className="bpg-guide-lead__input"
          placeholder={copy.leadPhonePlaceholder}
          value={phone}
          maxLength={32}
          autoComplete="tel"
          disabled={pending}
          onChange={(event) => setPhone(event.target.value)}
        />
        <label className="bpg-guide-lead__label" htmlFor="bpg-guide-lead-name">
          {copy.leadNameLabel}
        </label>
        <input
          id="bpg-guide-lead-name"
          type="text"
          className="bpg-guide-lead__input"
          value={name}
          maxLength={80}
          autoComplete="name"
          disabled={pending}
          onChange={(event) => setName(event.target.value)}
        />
        {error ? <p className="bpg-guide-lead__error">{error}</p> : null}
        <button type="submit" className="bpg-guide-lead__submit" disabled={pending}>
          {copy.leadSubmit}
        </button>
      </form>
    </div>
  );
}
