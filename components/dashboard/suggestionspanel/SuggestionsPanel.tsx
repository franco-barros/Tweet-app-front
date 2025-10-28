"use client";

export default function SuggestionsPanel() {
  const users = [
    { name: "ReactJS", user: "@reactjs" },
    { name: "Next.js", user: "@nextjs" },
  ];

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow">
      <h3 className="font-bold text-lg mb-3">A quién seguir</h3>
      <ul className="space-y-3">
        {users.map((u, i) => (
          <li key={i} className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{u.name}</p>
              <p className="text-gray-500 text-sm">{u.user}</p>
            </div>
            <button className="bg-sky-500 text-white px-3 py-1 rounded-full text-sm hover:bg-sky-600">
              Seguir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
