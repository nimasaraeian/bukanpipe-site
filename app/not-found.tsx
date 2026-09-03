import Link from "next/link";
import { routes } from "@/lib/config/routes";

export default function NotFound() {
  return (
    <article className="max-w-3xl">
      <p className="text-sm text-muted">خطای ۴۰۴</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">صفحه پیدا نشد</h1>
      <p className="mt-4 text-base leading-8">
        این مسیر در سکوی دیجیتال وجود ندارد یا هنوز ساخته نشده است.
      </p>
      <p className="mt-4">
        <Link className="underline-offset-4 hover:underline" href={routes.home.path}>
          بازگشت به خانه
        </Link>
      </p>
    </article>
  );
}
