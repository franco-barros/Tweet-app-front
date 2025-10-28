"use client";

export default function Feed() {
  const tweets = [
    { user: "elonmusk", content: "Starship flight test successful 🚀" },
    {
      user: "fran_barros",
      content: "Construyendo un clon de Twitter con Next.js 💻",
    },
  ];

  return (
    <div className="space-y-4">
      {tweets.map((t, i) => (
        <div
          key={i}
          className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow"
        >
          <p className="font-semibold">@{t.user}</p>
          <p className="text-gray-700 dark:text-gray-300">{t.content}</p>
        </div>
      ))}
    </div>
  );
}
