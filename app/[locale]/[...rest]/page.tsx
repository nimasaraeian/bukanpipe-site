import { notFound } from "next/navigation";

/** Unmatched paths under /[locale]/ trigger the localized not-found page. */
export default function LocaleCatchAll() {
  notFound();
}
