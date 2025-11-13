"use client";

import { FC } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";

interface Message {
  id: number;
  sender: string;
  text: string;
  date: string;
  read: boolean;
}

interface ConversationItem {
  id: number;
  name: string;
  messages: Message[];
}

interface MessagesListProps {
  conversations: ConversationItem[];
  onSelect: (id: number) => void;
  onNewConversation?: () => void; // opcional, para futuro
}

const MessagesList: FC<MessagesListProps> = ({
  conversations,
  onSelect,
  onNewConversation,
}) => {
  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-gray-800 shadow-md rounded-none overflow-hidden">
      {/* 🔹 Header con input de búsqueda y botón de nueva conversación */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        {/* 🔍 Input de búsqueda */}
        <div className="flex items-center gap-2 flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1.5 focus-within:ring-2 focus-within:ring-blue-400 dark:focus-within:ring-blue-500 transition-all">
          <FaSearch className="text-gray-500 dark:text-gray-300" />
          <input
            type="text"
            placeholder="Buscar conversación..."
            className="bg-transparent flex-1 outline-none text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        {/* ➕ Nueva conversación */}
        <button
          type="button"
          onClick={onNewConversation}
          className="ml-3 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 cursor-pointer"
          aria-label="Iniciar nueva conversación"
        >
          <FaPlus />
        </button>
      </div>

      {/* 🔹 Lista de conversaciones */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {conversations.map((conv) => {
          const lastMessage = conv.messages.at(-1);
          const isUnread = lastMessage && !lastMessage.read;

          return (
            <button
              key={conv.id}
              type="button"
              onClick={() => onSelect(conv.id)}
              className={`text-left w-full p-4 border-b border-gray-200 dark:border-gray-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 ${
                isUnread
                  ? "bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {conv.name}
              </h3>
              {lastMessage && (
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {lastMessage.text}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MessagesList;
