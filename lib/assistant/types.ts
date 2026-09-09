import type { Locale } from "@/lib/i18n/config";

export type AssistantIntentId =
  | "QUOTE"
  | "PRICE"
  | "BUY"
  | "CONTACT"
  | "PRODUCTS"
  | "GAS_PIPE"
  | "WATER_PIPE"
  | "IRRIGATION"
  | "SEWAGE"
  | "DRAINAGE"
  | "PE100"
  | "INDUSTRIAL"
  | "TECHNICAL"
  | "LABORATORY"
  | "QUALITY"
  | "CERTIFICATIONS"
  | "CALCULATOR"
  | "PIPELINE_DESIGN"
  | "DOWNLOADS"
  | "CATALOG"
  | "ABOUT"
  | "GALLERY"
  | "APPLICATIONS"
  | "CHOOSE_PRODUCT"
  | "PRODUCT_FLOW_WATER"
  | "PRODUCT_FLOW_GAS"
  | "PRODUCT_FLOW_IRRIGATION"
  | "PRODUCT_FLOW_INDUSTRIAL"
  | "PRODUCT_FLOW_UNSURE"
  | "LEAD_CALLBACK"
  | "UNKNOWN";

export type AssistantMessageRole = "assistant" | "user";

export type AssistantQuickReply = {
  id: string;
  label: string;
  intentId?: AssistantIntentId;
  flowId?: AssistantFlowId;
  /** Allowlisted locale-neutral path — resolved via localePath at click time. */
  path?: string;
};

export type AssistantFlowId = "choose_product" | "lead_handoff";

export type AssistantNavigateAction = {
  type: "navigate";
  path: string;
  label: string;
};

export type AssistantFlowAction = {
  type: "flow";
  flowId: AssistantFlowId;
};

export type AssistantLeadAction = {
  type: "lead_handoff";
};

export type AssistantMessageAction = {
  type: "message";
  body: string;
  quickReplies?: AssistantQuickReply[];
  navigate?: AssistantNavigateAction;
};

export type AssistantAction =
  | AssistantNavigateAction
  | AssistantFlowAction
  | AssistantLeadAction
  | AssistantMessageAction;

export type AssistantMessage = {
  id: string;
  role: AssistantMessageRole;
  text: string;
  quickReplies?: AssistantQuickReply[];
  navigate?: AssistantNavigateAction;
};

export type AssistantIntentDefinition = {
  id: AssistantIntentId;
  keywords: readonly string[];
  phrases: readonly string[];
  negativeKeywords?: readonly string[];
  minScore: number;
  action: (locale: Locale) => AssistantAction;
};

export type AssistantMatchResult = {
  intentId: AssistantIntentId;
  score: number;
  action: AssistantAction;
};

export type AssistantSessionState = {
  open: boolean;
  messages: AssistantMessage[];
  activeFlow: AssistantFlowId | null;
};

export type LeadRequestType = "quote" | "callback" | "consultation";

export type LeadPayload = {
  phone: string;
  email?: string;
  name?: string;
  requestType: LeadRequestType;
  product?: string;
  message?: string;
  locale: Locale;
  pageUrl: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  assistantIntent?: AssistantIntentId;
  createdAt: string;
};

export type LeadSubmitResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "validation" | "network" };
