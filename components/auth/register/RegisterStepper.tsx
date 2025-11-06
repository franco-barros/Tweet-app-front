"use client";

import { useState, ReactElement } from "react";

// Componentes de pasos (solo UI)
function Step1UserInfo({ onNext }: Readonly<{ onNext: () => void }>) {
  return (
    <div className="flex flex-col gap-4 max-w-sm w-full mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Crea tu cuenta
      </h2>

      <input
        type="text"
        placeholder="Nombre completo"
        className="p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
      />
      <input
        type="email"
        placeholder="Correo electrónico"
        className="p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
      />

      <button
        onClick={onNext}
        className="mt-4 w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition"
      >
        Siguiente
      </button>
    </div>
  );
}

function Step2Validation({
  onNext,
  onBack,
}: Readonly<{ onNext: () => void; onBack: () => void }>) {
  return (
    <div className="flex flex-col gap-4 max-w-sm w-full mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Verifica tu cuenta
      </h2>

      <p className="text-gray-600 dark:text-gray-400 text-sm">
        Hemos enviado un código de verificación a tu correo. Ingrésalo para
        continuar.
      </p>

      <input
        type="text"
        placeholder="Código de verificación"
        className="p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
      />

      <div className="flex justify-between mt-4">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-full border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300"
        >
          Atrás
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}

function Step3Password({ onBack }: Readonly<{ onBack: () => void }>) {
  return (
    <div className="flex flex-col gap-4 max-w-sm w-full mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Crea una contraseña
      </h2>

      <input
        type="password"
        placeholder="Contraseña"
        className="p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
      />
      <input
        type="password"
        placeholder="Confirmar contraseña"
        className="p-3 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
      />

      <div className="flex justify-between mt-4">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-full border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300"
        >
          Atrás
        </button>
        <button className="px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold cursor-pointer">
          Registrarse
        </button>
      </div>
    </div>
  );
}

// Layout general (barra de progreso)
function StepLayout({
  step,
  totalSteps,
  children,
}: Readonly<{
  step: number;
  totalSteps: number;
  children: React.ReactNode;
}>) {
  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md mb-6">
        <div className="h-1 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-1 bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      {children}
    </div>
  );
}

// Componente principal
export default function RegisterStepper() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const steps: ReactElement[] = [
    <Step1UserInfo key="1" onNext={nextStep} />,
    <Step2Validation key="2" onNext={nextStep} onBack={prevStep} />,
    <Step3Password key="3" onBack={prevStep} />,
  ];

  return (
    <StepLayout step={currentStep - 1} totalSteps={steps.length}>
      {steps[currentStep - 1]}
    </StepLayout>
  );
}
