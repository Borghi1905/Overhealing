import React, { useState } from "react";
import EmpresaCard from "../components/EmpresaCard";
import "../styles/Home.css";

export default function Home() {
  const [burnout, setBurnout] = useState(false);
  const [empresas, setEmpresas] = useState([]);
  const [novaEmpresa, setNovaEmpresa] = useState("");

  const adicionarEmpresa = (e) => {
    e.preventDefault();
    if (!novaEmpresa.trim()) return;

    const nova = {
      id: Date.now(),
      nome: novaEmpresa,
    };

    setEmpresas([...empresas, nova]);
    setNovaEmpresa("");
  };

  const removerEmpresa = (nome) => {
    setEmpresas(empresas.filter((e) => e.nome !== nome));
  };

  return (
    <main className={`home-main ${burnout ? "burnout" : "normal"}`}>
      {/* HEADER */}
      <header className={`home-header ${burnout ? "burnout" : "normal"}`}>
        <h1 className="header-title">OVERHEALING</h1>
        <button
          onClick={() => setBurnout(!burnout)}
          className="header-button"
        >
          {burnout ? "Modo Equilíbrio ⚖️" : "Modo Burnout 🔥"}
        </button>
      </header>

      {/* CONTEÚDO */}
      <section className="home-content">
        <div className="empresa-form">
          <h2 className="text-2xl font-semibold mb-4">Cadastrar nova empresa</h2>
          <form
            onSubmit={adicionarEmpresa}
            className="flex flex-col sm:flex-row gap-4 w-full"
          >
            <input
              type="text"
              placeholder="Nome da empresa"
              value={novaEmpresa}
              onChange={(e) => setNovaEmpresa(e.target.value)}
              className="empresa-input"
            />
            <button
              type="submit"
              className={`empresa-button ${
                burnout ? "empresa-button-burnout" : ""
              }`}
            >
              Adicionar
            </button>
          </form>
        </div>

        <div className="empresa-list">
          {empresas.length === 0 ? (
            <p className="text-gray-500 text-sm text-center">
              Nenhuma empresa cadastrada ainda.
            </p>
          ) : (
            empresas.map((empresa) => (
              <EmpresaCard
                key={empresa.id}
                nome={empresa.nome}
                burnout={burnout}
                onRemoverEmpresa={removerEmpresa} // <-- AQUI
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
}
