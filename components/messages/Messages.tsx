"use client";

import { useState, FC } from "react";
import { useSwipeable } from "react-swipeable";
import { FaTimes, FaSearch } from "react-icons/fa";
import { Conversation } from "./conversation";

interface Message {
  id: number;
  sender: string;
  text: string;
  date: string;
  read: boolean;
}

const initialMessages: Message[] = [
  {
    id: 1,
    sender: "ana_123",
    text: "Hola, ¿cómo estás?",
    date: new Date().toISOString(),
    read: false,
  },
  {
    id: 2,
    sender: "miguel_dev",
    text: "Te pasé los archivos que pediste.",
    date: new Date(Date.now() - 86400000).toISOString(),
    read: true,
  },
  {
    id: 3,
    sender: "lucia89",
    text: "Nos vemos mañana en la reunión.",
    date: new Date(Date.now() - 86400000 * 3).toISOString(),
    read: false,
  },
  {
    id: 4,
    sender: "fran_barros",
    text: "Gracias por la info!",
    date: new Date(Date.now() - 86400000 * 10).toISOString(),
    read: true,
  },
];

interface MessageItemProps {
  message: Message;
  markAsRead: (id: number) => void;
  deleteMessage: (id: number) => void;
  onSelect: (message: Message) => void;
}

const MessageItem: FC<MessageItemProps> = ({
  message,
  markAsRead,
  deleteMessage,
  onSelect,
}) => {
  const [swiped, setSwiped] = useState(false);
  const handlers = useSwipeable({
    onSwipedLeft: () => setSwiped(true),
    onSwipedRight: () => setSwiped(false),
    trackMouse: true,
  });

  return (
    <li
      {...handlers}
      className="relative overflow-hidden rounded-lg"
      onClick={() => onSelect(message)}
    >
      <div
        className={`flex items-center justify-between p-3 transition-transform transform w-full text-left cursor-pointer ${
          message.read
            ? "bg-gray-100 dark:bg-gray-800"
            : "bg-blue-50 dark:bg-blue-900/30 font-semibold"
        } ${
          swiped ? "-translate-x-24" : "translate-x-0"
        } md:translate-x-0 hover:bg-gray-200 dark:hover:bg-gray-700`}
      >
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {message.sender}
          </span>
          <span className="text-gray-800 dark:text-gray-200">
            {message.text}
          </span>
        </div>
        <div className="hidden md:flex gap-2">
          {!message.read && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                markAsRead(message.id);
              }}
              className="text-sm text-blue-500 hover:underline cursor-pointer"
            >
              Marcar como leído
            </button>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              deleteMessage(message.id);
            }}
            className="text-gray-400 hover:text-red-500 cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>
      </div>
    </li>
  );
};

const Messages: FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"Mensajes" | "Solicitudes">(
    "Mensajes"
  );
  const [selectedConversation, setSelectedConversation] =
    useState<Message | null>(null);

  const markAsRead = (id: number) =>
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m))
    );
  const deleteMessage = (id: number) =>
    setMessages((prev) => prev.filter((m) => m.id !== id));

  const filteredMessages = messages.filter(
    (m) =>
      m.sender.toLowerCase().includes(search.toLowerCase()) ||
      m.text.toLowerCase().includes(search.toLowerCase())
  );

  const sendMessage = (text: string) => {
    if (!selectedConversation) return;
    const newMsg: Message = {
      id: Date.now(),
      sender: "yo",
      text,
      date: new Date().toISOString(),
      read: true,
    };
    setMessages((prev) =>
      prev.map((m) =>
        m.id === selectedConversation.id
          ? { ...m, text: `${m.text}\n${text}` }
          : m
      )
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {!selectedConversation ? (
        <div className="flex-1 w-full overflow-y-auto p-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">mi_cuenta</h2>
            <div className="flex gap-4">
              <button
                type="button"
                className={`px-3 py-1 rounded-md ${
                  activeTab === "Mensajes"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setActiveTab("Mensajes")}
              >
                Mensajes
              </button>
              <button
                type="button"
                className={`px-3 py-1 rounded-md ${
                  activeTab === "Solicitudes"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setActiveTab("Solicitudes")}
              >
                Solicitudes
              </button>
            </div>
          </div>

          {/* Buscador */}
          <div className="flex items-center mb-4 relative">
            <FaSearch className="absolute left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar mensajes..."
              className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Lista de mensajes */}
          {filteredMessages.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No hay mensajes
            </p>
          ) : (
            <ul className="space-y-2">
              {filteredMessages.map((m) => (
                <MessageItem
                  key={m.id}
                  message={m}
                  markAsRead={markAsRead}
                  deleteMessage={deleteMessage}
                  onSelect={setSelectedConversation}
                />
              ))}
            </ul>
          )}
        </div>
      ) : (
        <Conversation
          conversationId={selectedConversation.id}
          conversationName={selectedConversation.sender}
          messages={[selectedConversation]}
          markAsRead={markAsRead}
          sendMessage={sendMessage}
          onClose={() => setSelectedConversation(null)}
        />
      )}
    </div>
  );
};

export default Messages;
