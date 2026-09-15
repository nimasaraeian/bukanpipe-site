import type { AssistantQuickReply } from "@/lib/assistant/types";

type ContextRule = {
  prefix: string;
  actions: AssistantQuickReply[];
};

const contextRulesFa: ContextRule[] = [
  {
    prefix: "/products/gas-pipe",
    actions: [
      { id: "ctx-tech", label: "اطلاعات فنی", intentId: "TECHNICAL" },
      { id: "ctx-apps", label: "کاربردها", intentId: "APPLICATIONS" },
      { id: "ctx-quote", label: "استعلام قیمت", intentId: "QUOTE" },
      { id: "ctx-contact", label: "تماس با فروش", intentId: "CONTACT" },
    ],
  },
  {
    prefix: "/products/",
    actions: [
      { id: "ctx-specs", label: "محصولات", intentId: "PRODUCTS" },
      { id: "ctx-quote", label: "استعلام قیمت", intentId: "QUOTE" },
      { id: "ctx-contact", label: "تماس با فروش", intentId: "CONTACT" },
    ],
  },
  {
    prefix: "/laboratory",
    actions: [
      { id: "ctx-quality", label: "کنترل کیفیت و آزمایشگاه", intentId: "QUALITY" },
      { id: "ctx-cert", label: "گواهینامه‌ها", intentId: "CERTIFICATIONS" },
      { id: "ctx-contact", label: "تماس", intentId: "CONTACT" },
    ],
  },
  {
    prefix: "/calculator",
    actions: [
      { id: "ctx-guide", label: "راهنمای محاسبه", intentId: "TECHNICAL" },
      { id: "ctx-products", label: "محصولات", intentId: "PRODUCTS" },
      { id: "ctx-quote", label: "استعلام قیمت", intentId: "QUOTE" },
    ],
  },
  {
    prefix: "/gallery",
    actions: [
      { id: "ctx-about", label: "درباره کارخانه", intentId: "ABOUT" },
      { id: "ctx-products", label: "محصولات", intentId: "PRODUCTS" },
      { id: "ctx-contact", label: "تماس", intentId: "CONTACT" },
    ],
  },
];

const contextRulesEn: ContextRule[] = [
  {
    prefix: "/products/gas-pipe",
    actions: [
      { id: "ctx-tech", label: "Technical info", intentId: "TECHNICAL" },
      { id: "ctx-apps", label: "Applications", intentId: "APPLICATIONS" },
      { id: "ctx-quote", label: "Request a Quote", intentId: "QUOTE" },
      { id: "ctx-contact", label: "Contact sales", intentId: "CONTACT" },
    ],
  },
  {
    prefix: "/products/",
    actions: [
      { id: "ctx-specs", label: "Products", intentId: "PRODUCTS" },
      { id: "ctx-quote", label: "Request a Quote", intentId: "QUOTE" },
      { id: "ctx-contact", label: "Contact sales", intentId: "CONTACT" },
    ],
  },
  {
    prefix: "/laboratory",
    actions: [
      { id: "ctx-quality", label: "Quality Control & Laboratory", intentId: "QUALITY" },
      { id: "ctx-cert", label: "Certifications", intentId: "CERTIFICATIONS" },
      { id: "ctx-contact", label: "Contact", intentId: "CONTACT" },
    ],
  },
  {
    prefix: "/calculator",
    actions: [
      { id: "ctx-guide", label: "Calculation guide", intentId: "TECHNICAL" },
      { id: "ctx-products", label: "Products", intentId: "PRODUCTS" },
      { id: "ctx-quote", label: "Request a Quote", intentId: "QUOTE" },
    ],
  },
  {
    prefix: "/gallery",
    actions: [
      { id: "ctx-about", label: "About factory", intentId: "ABOUT" },
      { id: "ctx-products", label: "Products", intentId: "PRODUCTS" },
      { id: "ctx-contact", label: "Contact", intentId: "CONTACT" },
    ],
  },
];

export function getContextQuickActions(
  barePath: string,
  locale: "fa" | "en",
): AssistantQuickReply[] | null {
  const rules = locale === "fa" ? contextRulesFa : contextRulesEn;
  const sorted = [...rules].sort((a, b) => b.prefix.length - a.prefix.length);

  for (const rule of sorted) {
    if (barePath === rule.prefix || barePath.startsWith(`${rule.prefix}/`) || barePath.startsWith(rule.prefix)) {
      return rule.actions;
    }
  }

  return null;
}
