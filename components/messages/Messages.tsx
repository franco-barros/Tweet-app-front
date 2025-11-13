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

  const updateConversation = (id: number, updatedMessages: Message[]) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, messages: updatedMessages } : c))
    );
  };

  const markMessagesAsRead = (messages: Message[]) =>
    messages.map((m) => ({ ...m, read: true }));

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

  return (
    <div className="flex flex-col md:flex-row w-full h-dvh bg-gray-200 dark:bg-gray-950 overflow-hidden">
      {/* 🔹 Lista de conversaciones */}
      <div
        className={`transition-all duration-300 ${
          selectedConversation ? "hidden md:flex md:w-1/3" : "flex w-full"
        } flex-col overflow-hidden`}
      >
        {/* Contenido con scroll interno */}
        <div className="flex-1 overflow-y-auto">
          <MessagesList
            conversations={conversations}
            onSelect={handleSelectConversation}
          />
        </div>
      </div>

      {/* 🔹 Conversación */}
      {selectedConversation && (
        <div
          className={`
          fixed inset-0 z-20 w-full h-full bg-white dark:bg-gray-900
          md:static md:z-0 md:w-2/3 md:h-full md:rounded-none md:shadow-none
          flex flex-col overflow-hidden
        `}
        >
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
        </div>
      )}
    </div>
  );
}
