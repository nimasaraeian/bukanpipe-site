import type { AssistantQuickReply } from "@/lib/assistant/types";

export const assistantCopyEn = {
  name: "Bukan Pipe Guide",
  launcherLabel: "Guide",
  launcherAria: "Open Bukan Pipe product guide",
  closeAria: "Close guide",
  quickAccess: "Quick access",
  minimizeAria: "Minimize guide",
  resetAria: "Clear search",
  composerPlaceholder: "Search products, guides, pages…",
  composerSubmit: "Search",
  composerMaxLength: 80,
  panelAria: "Bukan Pipe product and technical guide",
  greeting: "Choose a section to open the matching page.",
  searchEmpty: "No matching pages. Browse the sections below.",
  searchResults: "Matching pages",
  subtitle: "Products, technical references, and sales",
  lowConfidence: "I'm not sure which section you need. Please choose one of the options below:",
  leadIntro: "For a quotation or to reach our sales team, choose one of the options below:",
  leadPhoneLabel: "Phone number",
  leadPhonePlaceholder: "e.g. +98 912 345 6789",
  leadNameLabel: "Name (optional)",
  leadSubmit: "Request callback",
  leadQuoteButton: "Request a Quote",
  leadCallbackButton: "Request callback",
  leadNotConfigured: "Please use Request a Quote or contact sales directly.",
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
