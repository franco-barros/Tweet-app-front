"use client";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  step: number;
  totalSteps: number;
};

export default function StepLayout({
  children,
  step,
  totalSteps,
}: Readonly<Props>) {
  return (
    <div className="w-full max-w-md sm:max-w-2xl lg:max-w-4xl bg-white border border-gray-200 rounded-2xl shadow-xl p-8 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Crear Cuenta</h2>
        <p className="text-sm text-gray-500">
          Paso {step + 1} de {totalSteps}
        </p>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div
          className="bg-purple-800 h-full transition-all duration-300"
          style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
        />
      </div>

      <div>{children}</div>
    </div>
  );
}
