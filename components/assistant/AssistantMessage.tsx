"use client";

import Link from "next/link";
import type { AssistantMessage as AssistantMessageType } from "@/lib/assistant/types";

type AssistantMessageProps = {
  message: AssistantMessageType;
  localePath: (path: string) => string;
};

export function AssistantMessage({ message, localePath }: AssistantMessageProps) {
  const isAssistant = message.role === "assistant";

  return (
    <div
      className={
        isAssistant ? "bpg-guide-message bpg-guide-message--assistant" : "bpg-guide-message bpg-guide-message--user"
      }
    >
      <div className="bpg-guide-message__bubble">
        {message.text.split("\n").map((line, index) => (
          <p key={`${message.id}-line-${index}`} className="bpg-guide-message__line">
            {line}
          </p>
        ))}

        {message.navigate ? (
          <div className="bpg-guide-message__nav">
            <Link href={localePath(message.navigate.path)} className="bpg-guide-message__link">
              {message.navigate.label}
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
