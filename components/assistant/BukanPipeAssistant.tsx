"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { getAssistantCopy } from "@/data/assistant";
import { trackAssistantEvent } from "@/lib/assistant/analytics";
import { isLeadBackendEnabled } from "@/lib/assistant/lead";
import {
  createAssistantMessage,
  getWelcomeMessages,
  resolveQuery,
  resolveQuickReply,
} from "@/lib/assistant/router";
import { readAssistantOpenPreference, writeAssistantOpenPreference } from "@/lib/assistant/session";
import type { AssistantIntentId, AssistantMessage, AssistantQuickReply } from "@/lib/assistant/types";
import { stripLocale } from "@/lib/i18n/path";
import { AssistantLauncher } from "./AssistantLauncher";
import { AssistantPanel } from "./AssistantPanel";

export function BukanPipeAssistant() {
  const { locale, path: localePath } = useLocale();
  const pathname = usePathname();
  const { pathname: barePath } = stripLocale(pathname);
  const copy = getAssistantCopy(locale);

  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const prevLocaleRef = useRef(locale);

  const [open, setOpen] = useState(() => readAssistantOpenPreference());
  const [messages, setMessages] = useState<AssistantMessage[]>(() => getWelcomeMessages(locale, barePath));
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadIntentId, setLeadIntentId] = useState<AssistantIntentId | undefined>();

  const resetConversation = useCallback(() => {
    setMessages(getWelcomeMessages(locale, barePath));
    setShowLeadForm(false);
    setLeadIntentId(undefined);
  }, [locale, barePath]);

  useEffect(() => {
    if (prevLocaleRef.current !== locale) {
      prevLocaleRef.current = locale;
      resetConversation();
      setOpen(false);
    }
  }, [locale, resetConversation]);

  useEffect(() => {
    writeAssistantOpenPreference(open);
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        trackAssistantEvent("assistant_closed");
        launcherRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      panelRef.current?.focus();
    }
  }, [open]);

  const appendMessages = (next: AssistantMessage[]) => {
    setMessages((current) => [...current, ...next]);
  };

  const handleToggle = () => {
    setOpen((current) => {
      const next = !current;
      trackAssistantEvent(next ? "assistant_opened" : "assistant_closed");
      return next;
    });
  };

  const handleClose = () => {
    setOpen(false);
    trackAssistantEvent("assistant_closed");
    launcherRef.current?.focus();
  };

  const handleQuickAction = (reply: AssistantQuickReply) => {
    trackAssistantEvent("assistant_quick_action", {
      intentId: reply.intentId,
      flowId: reply.flowId,
    });

    if (reply.intentId === "LEAD_CALLBACK" && isLeadBackendEnabled()) {
      setShowLeadForm(true);
      setLeadIntentId("LEAD_CALLBACK");
      trackAssistantEvent("assistant_lead_started", { intentId: "LEAD_CALLBACK" });
      return;
    }

    const userLabel = reply.label;
    appendMessages([createAssistantMessage("user", userLabel)]);

    const { messages: assistantMessages, intentId } = resolveQuickReply(reply, locale);
    processAssistantMessages(assistantMessages, intentId);
  };

  const processAssistantMessages = (assistantMessages: AssistantMessage[], intentId?: AssistantIntentId) => {
    for (const message of assistantMessages) {
      if (message.navigate) {
        trackAssistantEvent("assistant_navigation", { path: message.navigate.path, intentId });
      }
    }

    if (isLeadBackendEnabled() && (intentId === "QUOTE" || intentId === "PRICE" || intentId === "BUY")) {
      trackAssistantEvent("assistant_quote_intent", { intentId });
      setShowLeadForm(true);
      setLeadIntentId(intentId);
      trackAssistantEvent("assistant_lead_started", { intentId });
    }

    appendMessages(assistantMessages);
  };

  const handleQuery = (query: string) => {
    trackAssistantEvent("assistant_query", { queryLength: query.length });
    appendMessages([createAssistantMessage("user", query)]);

    const { match, messages: assistantMessages } = resolveQuery(query, locale);

    if (match) {
      trackAssistantEvent("assistant_intent_matched", { intentId: match.intentId });
      if (
        isLeadBackendEnabled() &&
        (match.action.type === "lead_handoff" ||
          match.intentId === "QUOTE" ||
          match.intentId === "PRICE" ||
          match.intentId === "BUY")
      ) {
        setShowLeadForm(true);
        setLeadIntentId(match.intentId);
        trackAssistantEvent("assistant_lead_started", { intentId: match.intentId });
      } else if (match.action.type === "navigate") {
        trackAssistantEvent("assistant_navigation", { path: match.action.path, intentId: match.intentId });
      }
    } else {
      trackAssistantEvent("assistant_no_match");
    }

    appendMessages(assistantMessages);
  };

  const handleLeadSubmitted = () => {
    trackAssistantEvent("assistant_lead_submitted", { intentId: leadIntentId });
  };

  return (
    <div className="bpg-guide-root" data-locale={locale}>
      <AssistantLauncher
        label={copy.launcherLabel}
        ariaLabel={copy.launcherAria}
        open={open}
        onClick={handleToggle}
        launcherRef={launcherRef}
      />
      <AssistantPanel
        open={open}
        locale={locale}
        messages={messages}
        showLeadForm={showLeadForm}
        leadIntentId={leadIntentId}
        pageUrl={typeof window !== "undefined" ? window.location.href : pathname}
        localePath={localePath}
        onClose={handleClose}
        onReset={resetConversation}
        onQuickAction={handleQuickAction}
        onQuery={handleQuery}
        onLeadSubmitted={handleLeadSubmitted}
        panelRef={panelRef}
      />
    </div>
  );
}
