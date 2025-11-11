import React, { useState } from "react";

export default function EmpresaCard({ nome, burnout }) {
  const [aberto, setAberto] = useState(false);

  return (
    <div
      className={`rounded-2xl p-5 shadow-lg border transition-all duration-500 cursor-pointer ${
        burnout
          ? "bg-gray-800 border-gray-700 hover:border-orange-400"
          : "bg-white border-gray-200 hover:border-blue-400"
      }`}
      onClick={() => setAberto(!aberto)}
    >
      <div className="flex justify-between items-center">
        <h3
          className={`text-xl font-semibold ${
            burnout ? "text-orange-300" : "text-blue-600"
          }`}
        >
          {nome}
        </h3>
        <span
          className={`text-sm ${burnout ? "text-gray-400" : "text-gray-500"}`}
        >
          {aberto ? "Fechar" : "Abrir"}
        </span>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ${
          aberto ? "max-h-96 mt-4" : "max-h-0"
        }`}
      >
        <p
          className={`text-sm ${burnout ? "text-gray-400" : "text-gray-600"}`}
        >
          Aqui aparecerão os funcionários, seus estados emocionais e dados da empresa.
        </p>
      </div>
    </div>
  );
}
