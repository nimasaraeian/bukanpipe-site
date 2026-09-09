"use client";

import type { AssistantQuickReply } from "@/lib/assistant/types";

type AssistantQuickActionsProps = {
  replies: AssistantQuickReply[];
  onSelect: (reply: AssistantQuickReply) => void;
};

export function AssistantQuickActions({ replies, onSelect }: AssistantQuickActionsProps) {
  if (!replies.length) {
    return null;
  }

  return (
    <div className="bpg-guide-quick-actions" role="group">
      {replies.map((reply) => (
        <button
          key={reply.id}
          type="button"
          className="bpg-guide-quick-actions__btn"
          onClick={() => onSelect(reply)}
        >
          {reply.label}
        </button>
      ))}
    </div>
  );
}
