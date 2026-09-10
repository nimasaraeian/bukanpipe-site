import type { AssistantQuickReply } from "@/lib/assistant/types";

export const assistantCopyEn = {
  name: "Bukan Pipe Guide",
  launcherLabel: "Guide",
  launcherAria: "Open Bukan Pipe Guide",
  closeAria: "Close guide",
  minimizeAria: "Minimize guide",
  resetAria: "Start conversation over",
  composerPlaceholder: "Type your question…",
  composerSubmit: "Send",
  composerMaxLength: 240,
  panelAria: "Bukan Pipe website guide",
  greeting:
    "Hello 👋\nI can help you find products, technical information, quotations, calculators, and the right Bukan Pipe department.",
  lowConfidence:
    "I'm not sure which section you need. Please choose one of the options below:",
  leadIntro:
    "For a quotation or to reach our sales team, choose one of the options below:",
  leadPhoneLabel: "Phone number",
  leadPhonePlaceholder: "e.g. +98 912 345 6789",
  leadNameLabel: "Name (optional)",
  leadSubmit: "Request callback",
  leadQuoteButton: "Request a Quote",
  leadCallbackButton: "Request callback",
  leadNotConfigured:
    "Please use Request a Quote or contact sales directly.",
  leadValidationPhone: "Please enter a valid phone number.",
  chooseProductQuestion: "What application do you need the pipe for?",
  chooseProductUnsure:
    "For a precise selection, see our technical guide or contact sales for consultation.",
  navigatePrefix: "Full details are available in this section:",
  externalHint: "External link",
  resetConversation: "Start over",
  contactSales: "Contact sales",
} as const;

export const primaryQuickActionsEn: AssistantQuickReply[] = [
  { id: "qa-quote", label: "Request a Quote", intentId: "QUOTE" },
  { id: "qa-choose", label: "Choose a Product", flowId: "choose_product" },
  { id: "qa-products", label: "Products", intentId: "PRODUCTS" },
  { id: "qa-technical", label: "Technical Information", intentId: "TECHNICAL" },
  { id: "qa-lab", label: "Laboratory & Quality", intentId: "LABORATORY" },
  { id: "qa-calc", label: "Pipe Calculators", intentId: "CALCULATOR" },
  { id: "qa-downloads", label: "Downloads", intentId: "DOWNLOADS" },
  { id: "qa-contact", label: "Contact Sales", intentId: "CONTACT" },
];

export const fallbackQuickActionsEn: AssistantQuickReply[] = [
  { id: "fb-products", label: "Products", intentId: "PRODUCTS" },
  { id: "fb-quote", label: "Request a Quote", intentId: "QUOTE" },
  { id: "fb-technical", label: "Technical Information", intentId: "TECHNICAL" },
  { id: "fb-contact", label: "Contact sales", intentId: "CONTACT" },
];

export const chooseProductOptionsEn: AssistantQuickReply[] = [
  { id: "pf-water", label: "Water supply", intentId: "PRODUCT_FLOW_WATER" },
  { id: "pf-gas", label: "Gas distribution", intentId: "PRODUCT_FLOW_GAS" },
  { id: "pf-irrigation", label: "Irrigation", intentId: "PRODUCT_FLOW_IRRIGATION" },
  { id: "pf-industrial", label: "Industrial", intentId: "PRODUCT_FLOW_INDUSTRIAL" },
  { id: "pf-unsure", label: "Other / not sure", intentId: "PRODUCT_FLOW_UNSURE" },
];
