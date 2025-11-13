"use client";

import { FC, useEffect, useRef } from "react";

interface Message {
  id: number;
  sender: string;
  text: string;
  date: string;
  read: boolean;
}

interface ConversationMessagesProps {
  messages: Message[];
}

const ConversationMessages: FC<ConversationMessagesProps> = ({ messages }) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex flex-col gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-950 min-h-0">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-2 rounded-md max-w-[75%] ${
            msg.sender === "yo"
              ? "bg-blue-500 text-white self-end"
              : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          }`}
        >
          <p>{msg.text}</p>
          <small className="block text-xs text-gray-500">
            {new Date(msg.date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </small>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
};

export default ConversationMessages;
