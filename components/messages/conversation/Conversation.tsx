"use client";

import { useState, FC, useRef, useEffect } from "react";
import { FaPaperPlane, FaTimes } from "react-icons/fa";

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
  onClose?: () => void;
}

const Conversation: FC<ConversationProps> = ({
  conversationId,
  conversationName,
  messages,
  markAsRead,
  sendMessage,
  onClose,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim() === "") return;
    sendMessage(newMessage.trim());
    setNewMessage("");
  };

  return (
    <div className="flex flex-col w-full md:w-1/2 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{conversationName}</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded-md max-w-[70%] ${
              msg.sender === "yo"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            }`}
          >
            <p>{msg.text}</p>
            <small className="text-xs text-gray-500">
              {new Date(msg.date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribir mensaje..."
          className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Conversation;
