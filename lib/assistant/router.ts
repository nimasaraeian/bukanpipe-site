import {
  getAssistantCopy,
  getChooseProductOptions,
  getFallbackQuickActions,
  getPrimaryQuickActions,
} from "@/data/assistant";
import { getContextQuickActions } from "@/data/assistant/context-actions";
import { assistantIntents } from "@/data/assistant/intents";
import { routes } from "@/lib/config/routes";
import type { Locale } from "@/lib/i18n/config";
import { isLeadBackendEnabled } from "./lead";
import { matchAssistantQuery } from "./matcher";
import type {
  AssistantAction,
  AssistantFlowId,
  AssistantIntentId,
  AssistantMessage,
  AssistantQuickReply,
} from "./types";

let messageCounter = 0;

export function nextMessageId(): string {
  messageCounter += 1;
  return `msg-${messageCounter}`;
}

export function createAssistantMessage(
  role: AssistantMessage["role"],
  text: string,
  extras?: Pick<AssistantMessage, "quickReplies" | "navigate">,
): AssistantMessage {
  return {
    id: nextMessageId(),
    role,
    text,
    ...extras,
  };
}

export function getWelcomeMessages(locale: Locale, barePath: string): AssistantMessage[] {
  const copy = getAssistantCopy(locale);
  const contextActions = getContextQuickActions(barePath, locale);
  const quickReplies = contextActions ?? getPrimaryQuickActions(locale);

  return [
    createAssistantMessage("assistant", copy.greeting, { quickReplies }),
  ];
}

function findIntentAction(intentId: AssistantIntentId, locale: Locale): AssistantAction | null {
  const def = assistantIntents.find((i) => i.id === intentId);
  return def ? def.action(locale) : null;
}

export function resolveIntent(
  intentId: AssistantIntentId,
  locale: Locale,
): { action: AssistantAction; intentId: AssistantIntentId } | null {
  const action = findIntentAction(intentId, locale);
  if (!action) {
    return null;
  }
  return { action, intentId };
}

export function resolveFlowStart(flowId: AssistantFlowId, locale: Locale): AssistantMessage[] {
  const copy = getAssistantCopy(locale);

  if (flowId === "choose_product") {
    return [
      createAssistantMessage("assistant", copy.chooseProductQuestion, {
        quickReplies: getChooseProductOptions(locale),
      }),
    ];
  }

  if (flowId === "lead_handoff") {
    return buildLeadHandoffMessages(locale);
  }

  return [];
}

export function buildLeadHandoffMessages(locale: Locale): AssistantMessage[] {
  const copy = getAssistantCopy(locale);
  const quotePath = routes.requestQuote.path;
  const contactPath = routes.contact.path;

  if (!isLeadBackendEnabled()) {
    return [
      createAssistantMessage("assistant", copy.leadIntro, {
        quickReplies: [
          { id: "lead-quote", label: copy.leadQuoteButton, path: quotePath },
          { id: "lead-contact", label: copy.contactSales, path: contactPath },
        ],
      }),
    ];
  }

  return [
    createAssistantMessage("assistant", copy.leadIntro, {
      quickReplies: [
        { id: "lead-quote", label: copy.leadQuoteButton, path: quotePath },
        { id: "lead-callback", label: copy.leadCallbackButton, intentId: "LEAD_CALLBACK" },
        { id: "lead-contact", label: copy.contactSales, path: contactPath },
      ],
    }),
  ];
}

export function buildLowConfidenceMessages(locale: Locale): AssistantMessage[] {
  const copy = getAssistantCopy(locale);
  return [
    createAssistantMessage("assistant", copy.lowConfidence, {
      quickReplies: getFallbackQuickActions(locale),
    }),
  ];
}

export function resolveQuery(query: string, locale: Locale): {
  match: ReturnType<typeof matchAssistantQuery>;
  messages: AssistantMessage[];
} {
  const match = matchAssistantQuery(query, locale);
  if (!match) {
    return { match: null, messages: buildLowConfidenceMessages(locale) };
  }

  const messages = actionToMessages(match.action, locale);
  return { match, messages };
}

export function actionToMessages(action: AssistantAction, locale: Locale): AssistantMessage[] {
  const copy = getAssistantCopy(locale);

  if (action.type === "navigate") {
    return [
      createAssistantMessage("assistant", `${copy.navigatePrefix}\n${action.label}`, {
        navigate: action,
      }),
    ];
  }

  if (action.type === "flow") {
    return resolveFlowStart(action.flowId, locale);
  }

  if (action.type === "lead_handoff") {
    return buildLeadHandoffMessages(locale);
  }

  if (action.type === "message") {
    return [
      createAssistantMessage("assistant", action.body, {
        quickReplies: action.quickReplies,
        navigate: action.navigate,
      }),
    ];
  }

  return buildLowConfidenceMessages(locale);
}

export function resolveQuickReply(
  reply: AssistantQuickReply,
  locale: Locale,
): { messages: AssistantMessage[]; intentId?: AssistantIntentId } {
  if (reply.path) {
    const copy = getAssistantCopy(locale);
    const label =
      reply.path === routes.requestQuote.path
        ? copy.leadQuoteButton
        : reply.path === routes.contact.path
          ? copy.contactSales
          : reply.label;
    return {
      messages: [
        createAssistantMessage("assistant", `${copy.navigatePrefix}\n${label}`, {
          navigate: { type: "navigate", path: reply.path, label },
        }),
      ],
    };
  }

  if (reply.flowId) {
    return { messages: resolveFlowStart(reply.flowId, locale) };
  }

  if (reply.intentId) {
    const resolved = resolveIntent(reply.intentId, locale);
    if (resolved) {
      return {
        messages: actionToMessages(resolved.action, locale),
        intentId: resolved.intentId,
      };
    }
  }

  return { messages: buildLowConfidenceMessages(locale) };
}
