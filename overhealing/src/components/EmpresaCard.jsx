import React, { useState, useEffect } from "react";
import funcionariosJSON from "../data/funcionarios.json";
import "../styles/EmpresaCard.css";

export default function EmpresaCard({ nome, burnout, onRemoverEmpresa }) {
  const [aberto, setAberto] = useState(false);
  const [funcionarios, setFuncionarios] = useState([]);
  const [novoFuncionario, setNovoFuncionario] = useState({
    nome: "",
    ultimoDia: "",
    estado: "",
  });
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);

  // Carrega funcionários do JSON com data padrão se não existir
useEffect(() => {
  const hoje = new Date().toLocaleDateString("pt-BR");
  const dadosCompletos = funcionariosJSON.map((f) => ({
    ...f,
    dataVisualizacao: hoje, // ✅ sempre o dia atual
  }));
  setFuncionarios(dadosCompletos);
}, []);


  const adicionarFuncionario = (e) => {
    e.preventDefault();
    if (!novoFuncionario.nome.trim() || !novoFuncionario.ultimoDia.trim()) return;

    const novo = {
      ...novoFuncionario,
      dataVisualizacao: new Date().toLocaleDateString("pt-BR"),
    };

    setFuncionarios([...funcionarios, novo]);
    setNovoFuncionario({ nome: "", ultimoDia: "", estado: "" });
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

  const getCorEstado = (estado) => {
    switch (estado?.toLowerCase()) {
      case "feliz":
        return "#3b82f6"; // azul
      case "cansado":
        return "#22c55e"; // verde
      case "muito cansado":
        return "#facc15"; // amarelo
      case "burnout":
        return "#ef4444"; // vermelho
      default:
        return "#9ca3af"; // cinza
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
                  <div
                    key={i}
                    className="funcionario-card"
                    onClick={() => setFuncionarioSelecionado(f)}
                  >
                    <div className="info">
                      <p><strong>Nome:</strong> {f.nome}</p>
                      <p><strong>Último dia:</strong> {f.ultimoDia}</p>
                      <p><strong>Visualizado em:</strong> {f.dataVisualizacao}</p>
                    </div>

                    {f.estado && (
                      <div
                        className={`estado-indicador ${
                          f.estado.toLowerCase() === "burnout" ? "pulse" : ""
                        }`}
                        style={{ backgroundColor: getCorEstado(f.estado) }}
                      >
                        {f.estado}
                      </div>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removerFuncionario(i);
                      }}
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
                  onClick={() =>
                    setNovoFuncionario({ nome: "", ultimoDia: "", estado: "" })
                  }
                  className="cancelar"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FUNCIONÁRIO */}
      {funcionarioSelecionado && (
        <div className="modal-overlay" onClick={() => setFuncionarioSelecionado(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{funcionarioSelecionado.nome}</h2>
            <p><strong>Último dia de folga:</strong> {funcionarioSelecionado.ultimoDia}</p>
            <p><strong>Visualizado em:</strong> {funcionarioSelecionado.dataVisualizacao}</p>
            <p>
              <strong>Estado atual:</strong>{" "}
              <span
                style={{
                  color: getCorEstado(funcionarioSelecionado.estado),
                  fontWeight: "bold",
                }}
              >
                {funcionarioSelecionado.estado}
              </span>
            </p>
            <button onClick={() => setFuncionarioSelecionado(null)} className="fechar-modal">
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
