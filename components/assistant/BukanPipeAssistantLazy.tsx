"use client";

import dynamic from "next/dynamic";

const BukanPipeAssistant = dynamic(
  () => import("./BukanPipeAssistant").then((mod) => mod.BukanPipeAssistant),
  { ssr: false, loading: () => null },
);

export function BukanPipeAssistantLazy() {
  return <BukanPipeAssistant />;
}
