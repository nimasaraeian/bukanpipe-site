import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Callout } from "@/components/ui/ContentBlocks";
import { DevelopmentRoutePage } from "@/components/ui/DevelopmentRoutePage";
import { Field, FormCard, Input } from "@/components/ui/Form";
import { routes } from "@/lib/config/routes";
import { createPageMetadata } from "@/lib/seo/metadata";

const route = routes.verify;

export const metadata: Metadata = createPageMetadata({
  title: route.titleFa,
  description: route.seoDescription,
  path: route.path,
});

export default function VerifyPage() {
  return (
    <DevelopmentRoutePage
      route={route}
      extra={
        <div className="grid gap-6 lg:grid-cols-2">
          <FormCard
            title="الگوی ورود کد"
            actions={
              <Button type="submit" disabled>
                بررسی — غیرفعال
              </Button>
            }
          >
            <Field
              label="کد یا تلفن نماینده"
              htmlFor="dealer-key"
              hint="منطق راستی‌آزمایی و فهرست نمایندگان هنوز وجود ندارد."
            >
              <Input
                id="dealer-key"
                name="dealer-key"
                dir="ltr"
                placeholder="—"
                disabled
              />
            </Field>
          </FormCard>
          <Callout title="این صفحه چک‌کننده زنده نیست" tone="warning">
            /verify فقط بنیاد مسیر است. تا دادهٔ نمایندگان و منطق تأیید آماده
            نشود، هیچ نتیجهٔ «معتبر / نامعتبر» نمایش داده نمی‌شود.
          </Callout>
        </div>
      }
    />
  );
}
