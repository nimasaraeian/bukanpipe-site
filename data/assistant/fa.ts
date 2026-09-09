import type { AssistantQuickReply } from "@/lib/assistant/types";

export const assistantCopyFa = {
  name: "راهنمای بوکان پایپ",
  launcherLabel: "راهنما",
  launcherAria: "باز کردن راهنمای بوکان پایپ",
  closeAria: "بستن راهنما",
  minimizeAria: "کوچک کردن راهنما",
  resetAria: "شروع دوباره گفتگو",
  composerPlaceholder: "سؤال یا عبارت خود را بنویسید…",
  composerSubmit: "ارسال",
  composerMaxLength: 240,
  panelAria: "راهنمای وب‌سایت بوکان پایپ",
  greeting:
    "سلام 👋\nبرای پیدا کردن محصول، اطلاعات فنی، استعلام قیمت یا بخش موردنظرتان راهنمایی‌تان می‌کنم.",
  lowConfidence:
    "دقیقاً متوجه نشدم دنبال کدام بخش هستید. یکی از گزینه‌های زیر را انتخاب کنید:",
  leadIntro:
    "برای استعلام قیمت یا تماس با واحد فروش، یکی از گزینه‌های زیر را انتخاب کنید:",
  leadPhoneLabel: "شماره تماس",
  leadPhonePlaceholder: "مثال: 09123456789",
  leadNameLabel: "نام (اختیاری)",
  leadSubmit: "درخواست تماس",
  leadQuoteButton: "استعلام قیمت",
  leadCallbackButton: "درخواست تماس",
  leadNotConfigured:
    "ثبت آنلاین هنوز فعال نیست. لطفاً از دکمه استعلام قیمت استفاده کنید یا با واحد فروش تماس بگیرید.",
  leadValidationPhone: "لطفاً یک شماره تماس معتبر وارد کنید.",
  chooseProductQuestion: "لوله را برای چه کاربردی نیاز دارید؟",
  chooseProductUnsure:
    "برای انتخاب دقیق‌تر می‌توانید راهنمای فنی یا واحد فروش را ببینید.",
  navigatePrefix: "اطلاعات کامل در این بخش قرار دارد:",
  externalHint: "پیوند خارجی",
  resetConversation: "شروع دوباره",
  contactSales: "ارتباط با فروش",
} as const;

export const primaryQuickActionsFa: AssistantQuickReply[] = [
  { id: "qa-quote", label: "استعلام قیمت", intentId: "QUOTE" },
  { id: "qa-choose", label: "انتخاب محصول", flowId: "choose_product" },
  { id: "qa-products", label: "محصولات", intentId: "PRODUCTS" },
  { id: "qa-technical", label: "اطلاعات فنی", intentId: "TECHNICAL" },
  { id: "qa-lab", label: "آزمایشگاه و کنترل کیفیت", intentId: "LABORATORY" },
  { id: "qa-calc", label: "محاسبات لوله", intentId: "CALCULATOR" },
  { id: "qa-downloads", label: "دانلود کاتالوگ", intentId: "DOWNLOADS" },
  { id: "qa-contact", label: "تماس با فروش", intentId: "CONTACT" },
];

export const fallbackQuickActionsFa: AssistantQuickReply[] = [
  { id: "fb-products", label: "محصولات", intentId: "PRODUCTS" },
  { id: "fb-quote", label: "استعلام قیمت", intentId: "QUOTE" },
  { id: "fb-technical", label: "اطلاعات فنی", intentId: "TECHNICAL" },
  { id: "fb-contact", label: "ارتباط با فروش", intentId: "CONTACT" },
];

export const chooseProductOptionsFa: AssistantQuickReply[] = [
  { id: "pf-water", label: "آبرسانی", intentId: "PRODUCT_FLOW_WATER" },
  { id: "pf-gas", label: "گازرسانی", intentId: "PRODUCT_FLOW_GAS" },
  { id: "pf-irrigation", label: "آبیاری", intentId: "PRODUCT_FLOW_IRRIGATION" },
  { id: "pf-industrial", label: "صنعتی", intentId: "PRODUCT_FLOW_INDUSTRIAL" },
  { id: "pf-unsure", label: "سایر / مطمئن نیستم", intentId: "PRODUCT_FLOW_UNSURE" },
];
