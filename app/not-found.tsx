import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Eyebrow, RichHeading, Section } from "@/components/layout/Section";
import { routes } from "@/lib/config/routes";

export default function NotFound() {
  return (
    <Section lumen>
      <Container width="narrow">
        <Eyebrow>۴۰۴</Eyebrow>
        <RichHeading className="mt-4">صفحه پیدا نشد</RichHeading>
        <p className="mt-4 text-base leading-8 text-muted">
          این مسیر در سکوی دیجیتال وجود ندارد یا هنوز ساخته نشده است.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={routes.home.path}>بازگشت به خانه</ButtonLink>
          <Link
            href={routes.contact.path}
            className="self-center text-sm font-semibold text-accent"
          >
            تماس
          </Link>
        </div>
      </Container>
    </Section>
  );
}
