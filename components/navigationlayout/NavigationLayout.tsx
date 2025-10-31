"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaBell, FaEnvelope, FaSearch } from "react-icons/fa";

export default function NavigationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", icon: <FaHome />, label: "Inicio" },
    { href: "/search", icon: <FaSearch />, label: "Buscar" },
    { href: "/notifications", icon: <FaBell />, label: "Notificaciones" },
    { href: "/messages", icon: <FaEnvelope />, label: "Mensajes" },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar (solo desktop) */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 border-r border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Twitter
        </h1>
        <nav className="space-y-3">
          {navItems.map(({ href, icon, label }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 p-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition ${
                pathname === href
                  ? "bg-gray-200 dark:bg-gray-800 font-semibold"
                  : ""
              }`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto p-4 md:p-8 md:ml-64 bg-gray-50 dark:bg-gray-950">
        {children}
      </main>

      {/* Bottom Nav (solo mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 flex justify-around bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-2 md:hidden z-50">
        {navItems.map(({ href, icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center text-sm ${
              pathname === href ? "text-red-600 font-semibold" : "text-gray-500"
            }`}
          >
            <div className="text-xl">{icon}</div>
            <span className="text-xs">{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
