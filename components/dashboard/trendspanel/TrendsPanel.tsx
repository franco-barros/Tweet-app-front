"use client";

import { fakeTrends } from "@/lib/fakeTrends";

export default function TrendsPanel() {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow">
      <h3 className="font-bold text-lg mb-3">Tendencias</h3>

      <ul className="space-y-2">
        {fakeTrends.map((t) => (
          <li key={t.id} className="flex justify-between text-sm">
            <span>{t.topic}</span>
            <span className="text-gray-500">{t.tweets}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
