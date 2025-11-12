"use client";

import { FC, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaTimes } from "react-icons/fa";
import { ConversationView } from "./ConversationView";

interface Message {
  id: number;
  sender: string;
  text: string;
  date: string;
  read: boolean;
}

interface ConversationProps {
  conversationId: number;
  conversationName: string;
  messages: Message[];
  markAsRead: (id: number) => void;
  sendMessage: (text: string) => void;
  onClose: () => void;
}

const Conversation: FC<ConversationProps> = ({
  conversationId,
  conversationName,
  messages,
  markAsRead,
  sendMessage,
  onClose,
}) => {
  const router = useRouter();
  const hasMarkedRead = useRef(false);

  // ✅ Evita loops de render
  useEffect(() => {
    if (!hasMarkedRead.current) {
      markAsRead(conversationId);
      hasMarkedRead.current = true;
    }
  }, [conversationId, markAsRead]);

  const handleGoToProfile = () => {
    router.push(`/perfil/${conversationId}`);
  };

  return (
    <div className="flex flex-col w-full h-full bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
      {/* 🔹 Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={handleGoToProfile}
          onKeyDown={(e) => e.key === "Enter" && handleGoToProfile()}
          className="text-lg font-bold text-left cursor-pointer hover:text-blue-500 transition-colors bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
        >
          {conversationName}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="text-gray-500 hover:text-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 dark:focus:ring-red-600 rounded-full p-1"
          aria-label="Cerrar conversación"
        >
          <FaTimes />
        </button>
      </div>

      {/* 🔹 Contenido */}
      <ConversationView messages={messages} sendMessage={sendMessage} />
    </div>
  );
};

export default Conversation;
