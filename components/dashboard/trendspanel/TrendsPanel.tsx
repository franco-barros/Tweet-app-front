"use client";

export default function TrendsPanel() {
  const trends = [
    { id: "trend-1", topic: "#NextJS", tweets: "10.5K" },
    { id: "trend-2", topic: "#AI", tweets: "20.2K" },
    { id: "trend-3", topic: "#OpenSource", tweets: "8.9K" },
  ];

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow">
      <h3 className="font-bold text-lg mb-3">Tendencias</h3>
      <ul className="space-y-2">
        {trends.map((t) => (
          <li key={t.id} className="flex justify-between text-sm">
            <span>{t.topic}</span>
            <span className="text-gray-500">{t.tweets}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
