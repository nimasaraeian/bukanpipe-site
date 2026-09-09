export type AssistantAnalyticsEvent =
  | "assistant_opened"
  | "assistant_closed"
  | "assistant_quick_action"
  | "assistant_query"
  | "assistant_intent_matched"
  | "assistant_no_match"
  | "assistant_navigation"
  | "assistant_quote_intent"
  | "assistant_lead_started"
  | "assistant_lead_submitted";

export type AssistantAnalyticsPayload = {
  intentId?: string;
  flowId?: string;
  path?: string;
  /** Never include raw user query, phone, or email. */
  queryLength?: number;
};

/** No-op analytics adapter — wire to GTM/Plausible when available. */
export function trackAssistantEvent(
  _event: AssistantAnalyticsEvent,
  _payload?: AssistantAnalyticsPayload,
): void {
  if (process.env.NODE_ENV === "development") {
    console.debug("[assistant]", _event, _payload);
  }
}
