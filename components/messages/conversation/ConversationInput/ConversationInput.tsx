"use client";

import { FC, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

interface ConversationInputProps {
  onSend: (text: string) => void;
}

const ConversationInput: FC<ConversationInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setMessage("");
  };

  return (
    <div className="flex items-center gap-2 p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribir mensaje..."
        className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-400"
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        onClick={handleSend}
        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        <FaPaperPlane />
      </button>
    </div>
  );
};

export default ConversationInput;
