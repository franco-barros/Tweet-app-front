"use client";

import { FC } from "react";
import { ConversationMessages } from "../ConversationMessages";
import { ConversationInput } from "../ConversationInput";

interface Message {
  id: number;
  sender: string;
  text: string;
  date: string;
  read: boolean;
}

interface ConversationViewProps {
  messages: Message[];
  sendMessage: (text: string) => void;
}

const ConversationView: FC<ConversationViewProps> = ({
  messages,
  sendMessage,
}) => {
  return (
    <div className="flex flex-col flex-1 h-full">
      <ConversationMessages messages={messages} />
      <ConversationInput onSend={sendMessage} />
    </div>
  );
};

export default ConversationView;
