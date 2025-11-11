import React, { useState } from "react";

export default function EmpresaCard({ nome, burnout }) {
  const [aberto, setAberto] = useState(false);

  return (
    <div
      className={`w-full max-w-2xl mx-auto rounded-2xl p-5 shadow-lg border transition-all duration-500 cursor-pointer 
      ${burnout
        ? "bg-gray-800 border-gray-700 hover:border-orange-400"
        : "bg-white border-gray-200 hover:border-blue-400"}`}
      onClick={() => setAberto(!aberto)}
    >
      {/* Cabeçalho do Card */}
      <div className="flex justify-between items-center">
        <h3
          className={`text-xl font-semibold ${
            burnout ? "text-orange-300" : "text-blue-600"
          }`}
        >
          {nome}
        </h3>
        <span
          className={`text-sm font-medium ${
            burnout ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {aberto ? "Fechar" : "Abrir"}
        </span>
      </div>

      {/* Conteúdo Expandido */}
      <div
        className={`overflow-hidden transition-all duration-500 transform ${
          aberto
            ? "max-h-[400px] opacity-100 scale-y-100 mt-4"
            : "max-h-0 opacity-0 scale-y-0"
        }`}
      >
        <div
          className={`text-sm leading-relaxed ${
            burnout ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <p>
            Aqui aparecerão os funcionários, seus estados emocionais e dados
            adicionais da empresa.
          </p>

          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div
              className={`p-2 rounded-lg text-center ${
                burnout
                  ? "bg-gray-700 text-gray-200"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Funcionários: 12
            </div>
            <div
              className={`p-2 rounded-lg text-center ${
                burnout
                  ? "bg-gray-700 text-gray-200"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Nível de Estresse: Moderado
            </div>
            <div
              className={`p-2 rounded-lg text-center ${
                burnout
                  ? "bg-gray-700 text-gray-200"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Satisfação: 78%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
