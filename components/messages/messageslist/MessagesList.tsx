"use client";

import { FC } from "react";

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
}

const MessagesList: FC<MessagesListProps> = ({ conversations, onSelect }) => {
  return (
    <div className="flex flex-col w-full md:w-1/3 h-full bg-white dark:bg-gray-800 shadow-md overflow-y-auto rounded-r-xl">
      {conversations.map((conv) => {
        const lastMessage = conv.messages.at(-1);
        const isUnread = lastMessage && !lastMessage.read;

        return (
          <button
            key={conv.id}
            type="button"
            onClick={() => onSelect(conv.id)}
            className={`text-left w-full p-4 border-b border-gray-200 dark:border-gray-700 transition-colors rounded-none focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 ${
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
  );
};

export default MessagesList;
