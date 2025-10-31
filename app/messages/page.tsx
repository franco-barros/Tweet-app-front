"use client";

import { Messages } from "../../components/messages";

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Mensajes</h2>

      <Messages />
    </div>
  );
}
