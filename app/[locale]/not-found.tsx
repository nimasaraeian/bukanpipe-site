import type { Metadata } from "next";
import { NotFoundContent } from "@/components/pages/NotFoundContent";

export const metadata: Metadata = {
  title: "404",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundContent />;
}
