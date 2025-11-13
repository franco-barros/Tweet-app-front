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
    <div className="flex flex-col w-full h-full bg-white dark:bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <button
          type="button"
          onClick={handleGoToProfile}
          className="text-xl font-semibold text-left cursor-pointer hover:text-blue-500 transition-colors"
        >
          {conversationName}
        </button>

        <button
          type="button"
          onClick={onClose}
          className=" cursor-pointer text-gray-500 hover:text-red-500 transition-colors rounded-full p-2"
        >
          <FaTimes size={20} />
        </button>
      </div>

      {/* Mensajes + input */}
      <div className="flex-1 flex flex-col">
        <ConversationView messages={messages} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Conversation;
