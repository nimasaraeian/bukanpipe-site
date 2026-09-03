import type { Metadata } from "next";
import { Callout } from "@/components/ui/ContentBlocks";
import { DevelopmentRoutePage } from "@/components/ui/DevelopmentRoutePage";
import { Field, FormCard, Input, Textarea } from "@/components/ui/Form";
import { Button } from "@/components/ui/Button";
import { routes } from "@/lib/config/routes";
import { createPageMetadata } from "@/lib/seo/metadata";

const route = routes.contact;

export const metadata: Metadata = createPageMetadata({
  title: route.titleFa,
  description: route.seoDescription,
  path: route.path,
});

export default function ContactPage() {
  return (
    <DevelopmentRoutePage
      route={route}
      extra={
        <div className="grid gap-6 lg:grid-cols-2">
          <FormCard
            title="پیام نمایشی"
            actions={<Button type="submit">ارسال نمایشی</Button>}
          >
            <Field label="نام" htmlFor="contact-name">
              <Input id="contact-name" name="name" autoComplete="name" />
            </Field>
            <Field label="پیام" htmlFor="contact-message">
              <Textarea id="contact-message" name="message" />
            </Field>
          </FormCard>
          <Callout title="اطلاعات تماس عملیاتی">
            شماره، نشانی و ایمیل از وب‌سایت میراثی کپی نمی‌شود تا زمانی که
            کارخانه آن‌ها را تأیید کند.
          </Callout>
        </div>
      }
    />
  );
}
