"use client";

import { useEffect, useRef } from "react";
import { getAssistantCopy } from "@/data/assistant";
import type { Locale } from "@/lib/i18n/config";
import type { AssistantMessage, AssistantQuickReply } from "@/lib/assistant/types";
import { AssistantComposer } from "./AssistantComposer";
import { isLeadBackendEnabled } from "@/lib/assistant/lead";
import { AssistantLeadForm } from "./AssistantLeadForm";
import { AssistantMessage as AssistantMessageView } from "./AssistantMessage";
import { AssistantQuickActions } from "./AssistantQuickActions";

type AssistantPanelProps = {
  open: boolean;
  locale: Locale;
  messages: AssistantMessage[];
  showLeadForm: boolean;
  leadIntentId?: string;
  pageUrl: string;
  localePath: (path: string) => string;
  onClose: () => void;
  onReset: () => void;
  onQuickAction: (reply: AssistantQuickReply) => void;
  onQuery: (query: string) => void;
  onLeadSubmitted: () => void;
  panelRef: React.RefObject<HTMLDivElement | null>;
};

export function AssistantPanel({
  open,
  locale,
  messages,
  showLeadForm,
  leadIntentId,
  pageUrl,
  localePath,
  onClose,
  onReset,
  onQuickAction,
  onQuery,
  onLeadSubmitted,
  panelRef,
}: AssistantPanelProps) {
  const copy = getAssistantCopy(locale);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [open, messages.length, showLeadForm]);

  if (!open) {
    return null;
  }

  return (
    <>
      <button type="button" className="bpg-guide-backdrop" aria-label={copy.closeAria} onClick={onClose} />
      <div
        ref={panelRef}
        id="bpg-guide-panel"
        className="bpg-guide-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bpg-guide-title"
        tabIndex={-1}
      >
        <header className="bpg-guide-panel__header">
          <div>
            <p className="bpg-guide-panel__kicker">BUKAN PIPE</p>
            <h2 id="bpg-guide-title" className="bpg-guide-panel__title">
              {copy.name}
            </h2>
          </div>
          <div className="bpg-guide-panel__header-actions">
            <button type="button" className="bpg-guide-panel__icon-btn" onClick={onReset} aria-label={copy.resetAria}>
              ↺
            </button>
            <button type="button" className="bpg-guide-panel__icon-btn" onClick={onClose} aria-label={copy.closeAria}>
              ✕
            </button>
          </div>
        </header>

        <div ref={scrollRef} className="bpg-guide-panel__body">
          {messages.map((message) => (
            <div key={message.id} className="bpg-guide-panel__message-block">
              <AssistantMessageView message={message} localePath={localePath} />
              {message.quickReplies && message.role === "assistant" ? (
                <AssistantQuickActions replies={message.quickReplies} onSelect={onQuickAction} />
              ) : null}
            </div>
          ))}

          {showLeadForm && isLeadBackendEnabled() ? (
            <AssistantLeadForm
              locale={locale}
              copy={copy}
              pageUrl={pageUrl}
              intentId={leadIntentId as import("@/lib/assistant/types").AssistantIntentId | undefined}
              localePath={localePath}
              onSubmitted={onLeadSubmitted}
            />
          ) : null}
        </div>

        <footer className="bpg-guide-panel__footer">
          <AssistantComposer
            placeholder={copy.composerPlaceholder}
            submitLabel={copy.composerSubmit}
            maxLength={copy.composerMaxLength}
            onSubmit={onQuery}
          />
        </footer>
      </div>
    </>
  );
}
