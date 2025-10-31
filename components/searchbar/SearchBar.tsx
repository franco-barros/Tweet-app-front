"use client";

import { useState, useEffect, ChangeEvent, KeyboardEvent, FC } from "react";
import { FaSearch, FaHistory, FaTimes, FaTrashAlt } from "react-icons/fa";

interface RecentSearch {
  id: number;
  term: string;
}

const SearchBar: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    let active = true;
    if (stored) {
      queueMicrotask(() => {
        if (active) setRecentSearches(JSON.parse(stored));
      });
    }
    return () => {
      active = false;
    };
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      const newSearch = { id: Date.now(), term: searchTerm.trim() };
      const updated = [
        newSearch,
        ...recentSearches.filter((s) => s.term !== newSearch.term),
      ].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
      setSearchTerm("");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectRecent = (term: string) => {
    setSearchTerm(term);
  };

  const handleDeleteRecent = (id: number) => {
    const updated = recentSearches.filter((item) => item.id !== id);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleDeleteAll = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  let content;
  if (searchTerm) {
    content = (
      <p className="text-gray-500 dark:text-gray-400">
        Resultados para: <span className="font-semibold">{searchTerm}</span>
      </p>
    );
  } else if (recentSearches.length > 0) {
    content = (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Últimas búsquedas:
          </p>
          <button
            onClick={handleDeleteAll}
            className="flex items-center gap-1 text-sm text-red-500 hover:underline transition cursor-pointer"
          >
            <FaTrashAlt /> Limpiar todo
          </button>
        </div>
        <ul className="space-y-1">
          {recentSearches.map((item) => (
            <li key={item.id}>
              <div className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <button
                  onClick={() => handleSelectRecent(item.term)}
                  className="flex items-center gap-2 text-left w-full"
                >
                  <FaHistory className="text-blue-500" />
                  <span>{item.term}</span>
                </button>
                <button
                  onClick={() => handleDeleteRecent(item.id)}
                  className="text-gray-400 hover:text-red-500 transition cursor-pointer"
                  aria-label="Eliminar búsqueda"
                >
                  <FaTimes />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    content = (
      <p className="text-gray-500 dark:text-gray-400">
        Sin búsquedas recientes
      </p>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-5">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
        <FaSearch className="text-blue-500" />
        Buscar usuarios
      </h2>

      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Buscar por nombre o usuario..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full 
          bg-gray-100 dark:bg-gray-800 shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {content}
    </div>
  );
};

export default SearchBar;
