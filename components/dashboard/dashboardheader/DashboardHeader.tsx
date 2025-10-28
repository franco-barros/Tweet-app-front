"use client";

import { FaTwitter } from "react-icons/fa";

interface DashboardHeaderProps {
  name: string;
}

export default function DashboardHeader({
  name,
}: Readonly<DashboardHeaderProps>) {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
      <div className="flex items-center gap-3">
        <FaTwitter className="text-sky-500 text-2xl" />
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Inicio
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          @{name}
        </span>
        <div className="w-9 h-9 bg-sky-500 rounded-full flex items-center justify-center text-white font-semibold">
          {name.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
