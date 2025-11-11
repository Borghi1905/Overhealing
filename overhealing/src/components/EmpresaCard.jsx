import React, { useState } from "react";
import "../styles/EmpresaCard.css";

export default function EmpresaCard({ nome, burnout, onRemoverEmpresa }) {
  const [aberto, setAberto] = useState(false);
  const [funcionarios, setFuncionarios] = useState([]);
  const [novoFuncionario, setNovoFuncionario] = useState({
    nome: "",
    ultimoDia: "",
  });

  const adicionarFuncionario = (e) => {
    e.preventDefault();
    if (!novoFuncionario.nome.trim() || !novoFuncionario.ultimoDia.trim()) return;

    const novo = {
      ...novoFuncionario,
      dataVisualizacao: new Date().toLocaleDateString("pt-BR"),
    };

    setFuncionarios([...funcionarios, novo]);
    setNovoFuncionario({ nome: "", ultimoDia: "" });
  };

  const removerFuncionario = (index) => {
    const atualizados = funcionarios.filter((_, i) => i !== index);
    setFuncionarios(atualizados);
  };

  const removerEmpresa = () => {
    if (window.confirm(`Deseja realmente remover a empresa "${nome}"?`)) {
      if (onRemoverEmpresa) onRemoverEmpresa(nome);
    }
  };

  return (
    <div className={`empresa-card ${burnout ? "burnout" : ""}`}>
      {/* CABEÇALHO */}
      <div className="empresa-header">
        <h3>{nome}</h3>
        <div className="botoes-header">
          <button onClick={() => setAberto(!aberto)}>
            {aberto ? "Fechar" : "Ver Funcionários"}
          </button>
          <button onClick={removerEmpresa} className="remover-empresa">
            Remover Empresa
          </button>
        </div>
      </div>

      {/* CONTEÚDO EXPANDIDO */}
      {aberto && (
        <div className="empresa-content">
          <div className="funcionarios-box">
            <h4>Funcionários</h4>
            {funcionarios.length === 0 ? (
              <p className="vazio">Nenhum funcionário cadastrado.</p>
            ) : (
              <div className="funcionarios-list">
                {funcionarios.map((f, i) => (
                  <div key={i} className="funcionario-card">
                    <div className="info">
                      <p><strong>Nome:</strong> {f.nome}</p>
                      <p><strong>Último dia:</strong> {f.ultimoDia}</p>
                      <p><strong>Visualizado em:</strong> {f.dataVisualizacao}</p>
                    </div>
                    <button
                      onClick={() => removerFuncionario(i)}
                      className="remover-funcionario"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FORMULÁRIO */}
          <div className="form-box">
            <form onSubmit={adicionarFuncionario} className="form-funcionario">
              <label>
                Nome do Funcionário:
                <input
                  type="text"
                  value={novoFuncionario.nome}
                  onChange={(e) =>
                    setNovoFuncionario({
                      ...novoFuncionario,
                      nome: e.target.value,
                    })
                  }
                />
              </label>

              <label>
                Último dia que folgou:
                <input
                  type="date"
                  value={novoFuncionario.ultimoDia}
                  onChange={(e) =>
                    setNovoFuncionario({
                      ...novoFuncionario,
                      ultimoDia: e.target.value,
                    })
                  }
                />
              </label>

              <div className="botoes">
                <button type="submit" className="confirmar">
                  Adicionar
                </button>
                <button
                  type="button"
                  onClick={() => setNovoFuncionario({ nome: "", ultimoDia: "" })}
                  className="cancelar"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
