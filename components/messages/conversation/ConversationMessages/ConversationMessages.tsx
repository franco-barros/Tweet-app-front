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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ✅ Scroll automático solo si hay mensajes nuevos
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-gray-50 dark:bg-gray-950">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-2 rounded-md max-w-[75%] ${
            msg.sender === "yo"
              ? "bg-blue-500 text-white ml-auto"
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
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ConversationMessages;
