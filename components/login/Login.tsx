"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaTwitter } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLoginSubmit = () => {
    router.push("/dashboard");
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-blue-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        {/* Logo de Twitter */}
        <div className="flex justify-center mb-6">
          <FaTwitter size={48} className="text-blue-500" />
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Inicia sesión en Twitter Clone
        </h1>

        {/* Input Email */}
        <div className="mb-4">
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Input Contraseña */}
        <div className="mb-4">
          <input
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Botón principal */}
        <button
          onClick={handleLoginSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full font-bold transition mb-4 cursor-pointer"
        >
          Iniciar sesión
        </button>

        {/* Registro */}
        <div className="text-center text-sm text-gray-600">
          ¿No tenés cuenta?{" "}
          <button
            onClick={() => router.push("/register")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Registrate
          </button>
        </div>
      </div>
    </div>
  );
}
