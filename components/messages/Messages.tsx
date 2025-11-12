"use client";

import { useState } from "react";
import { MessagesList } from "./messageslist";
import { Conversation } from "./conversation";

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

const initialConversations: ConversationItem[] = [
  {
    id: 1,
    name: "Juan Pérez",
    messages: [
      {
        id: 1,
        sender: "Juan Pérez",
        text: "Hola, ¿cómo estás?",
        date: new Date().toISOString(),
        read: true,
      },
      {
        id: 2,
        sender: "yo",
        text: "Todo bien, ¿vos?",
        date: new Date().toISOString(),
        read: true,
      },
    ],
  },
  {
    id: 2,
    name: "María Gómez",
    messages: [
      {
        id: 1,
        sender: "María Gómez",
        text: "¿Te queda cómodo mañana?",
        date: new Date().toISOString(),
        read: false,
      },
    ],
  },
];

export default function Messages() {
  const [conversations, setConversations] =
    useState<ConversationItem[]>(initialConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);

  const selectedConversation =
    conversations.find((c) => c.id === selectedConversationId) || null;

  // ==========================
  // 🔹 Helpers
  // ==========================

  const updateConversation = (id: number, updatedMessages: Message[]) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, messages: updatedMessages } : c))
    );
  };

  const markMessagesAsRead = (messages: Message[]) =>
    messages.map((m) => ({ ...m, read: true }));

  // ==========================
  // 🔹 Handlers
  // ==========================

  const handleSelectConversation = (id: number) => {
    const conv = conversations.find((c) => c.id === id);
    if (!conv) return;
    const updatedMessages = markMessagesAsRead(conv.messages);
    updateConversation(id, updatedMessages);
    setSelectedConversationId(id);
  };

  const handleCloseConversation = () => setSelectedConversationId(null);

  const handleSendMessage = (text: string) => {
    if (!selectedConversation) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: "yo",
      text,
      date: new Date().toISOString(),
      read: true,
    };

    const updatedMessages = [...selectedConversation.messages, newMessage];
    updateConversation(selectedConversation.id, updatedMessages);
  };

  // ==========================
  // 🔹 Render
  // ==========================

  return (
    <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
      {selectedConversation ? (
        <Conversation
          conversationId={selectedConversation.id}
          conversationName={selectedConversation.name}
          messages={selectedConversation.messages}
          sendMessage={handleSendMessage}
          markAsRead={() =>
            updateConversation(
              selectedConversation.id,
              markMessagesAsRead(selectedConversation.messages)
            )
          }
          onClose={handleCloseConversation}
        />
      ) : (
        <MessagesList
          conversations={conversations}
          onSelect={handleSelectConversation}
        />
      )}
    </div>
  );
}
