import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ListagemErros() {
  const [erros, setErros] = useState([]);
  const [setores, setSetores] = useState([]);
  const [filtros, setFiltros] = useState({
    lote: '',
    item: '',
    data: '',
    setorId: '',
  });

  useEffect(() => {
    carregarTodos();
    carregarSetores();
  }, []);

  const carregarSetores = async () => {
    try {
      const res = await axios.get('http://localhost:5112/api/Setores');
      setSetores(res.data);
    } catch (err) {
      console.error('Erro ao carregar setores:', err);
    }
  };

  const carregarTodos = async () => {
    try {
      const res = await axios.get('http://localhost:5112/api/Erros');
      setErros(res.data);
    } catch (err) {
      console.error('Erro ao carregar lista:', err);
    }
  };

  const buscar = async () => {
    const params = new URLSearchParams();

    Object.entries(filtros).forEach(([key, value]) => {
      if (value !== '') {
        const val = key === 'setorId' ? parseInt(value) : value;
        params.append(key, val);
      }
    });

    try {
      const res = await axios.get(`http://localhost:5112/api/Erros/filtrar?${params.toString()}`);
      setErros(res.data);
    } catch (err) {
      console.error('Erro ao buscar:', err);
      setErros([]);
    }
  };

  const handleExcluir = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este erro?')) return;
    try {
      await axios.delete(`http://localhost:5112/api/Erros/${id}`);
      alert('Erro excluído com sucesso!');
      setErros(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      console.error('Erro ao excluir:', err);
      alert('Falha ao excluir erro.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 pt-[800px] pb-16">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#773870]">Divergências Registradas</h2>

      {/* Filtros */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-3">
          <input
            type="text"
            placeholder="Item"
            value={filtros.item}
            onChange={e => setFiltros({ ...filtros, item: e.target.value })}
            className="bg-gray-800 text-white text-sm p-2 rounded border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#773870]"
          />
          <input
            type="text"
            placeholder="Lote"
            value={filtros.lote}
            onChange={e => setFiltros({ ...filtros, lote: e.target.value })}
            className="bg-gray-800 text-white text-sm p-2 rounded border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#773870]"
          />
          <input
            type="date"
            value={filtros.data}
            onChange={e => setFiltros({ ...filtros, data: e.target.value })}
            className="bg-gray-800 text-white text-sm p-2 rounded border border-gray-700 focus:outline-none focus:ring-1 focus:ring-[#773870]"
          />
          <div className="flex gap-2">
            <select
              value={filtros.setorId}
              onChange={e => setFiltros({ ...filtros, setorId: e.target.value })}
              className="flex-1 bg-gray-800 text-white text-sm p-2 rounded border border-gray-700 focus:outline-none focus:ring-1 focus:ring-[#773870]"
            >
              <option value="">Setor</option>
              {setores.map(setor => (
                <option key={setor.id} value={setor.id}>
                  {setor.nome}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={buscar}
              className="bg-[#773870] hover:bg-purple-700 text-white px-4 py-2 rounded text-sm font-semibold transition"
            >
              Buscar
            </button>
          </div>
        </div>
      </div>

      {/* Lista de erros */}
      {erros.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">Nenhum erro encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {erros.map(erro => (
            <div
              key={erro.id}
              className="rounded-xl shadow-lg overflow-hidden bg-cover bg-center relative group transition-transform hover:scale-[1.02]"
              style={{
                backgroundImage: erro.imagePath
                  ? `url(http://localhost:5112${erro.imagePath})`
                  : 'linear-gradient(to bottom right, #6A1B9A, #8E24AA)',
                minHeight: '280px',
              }}
            >
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition" />
              <div className="relative z-10 p-5 h-full flex flex-col justify-between text-gray-200">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{erro.descricao}</h3>
                  <p className="text-sm mb-1"><strong>ID:</strong> {erro.id}</p>
                  <p className="text-sm mb-1"><strong>Item:</strong> {erro.item}</p>
                  <p className="text-sm mb-1"><strong>Lote:</strong> {erro.lote}</p>
                  <p className="text-sm mb-3"><strong>Ação tomada:</strong> {erro.acaoTomada}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <Link
                    to={`/editar/${erro.id}`}
                    className="bg-white text-[#773870] px-3 py-1 rounded hover:bg-purple-100 text-sm font-medium"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleExcluir(erro.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm font-medium"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
