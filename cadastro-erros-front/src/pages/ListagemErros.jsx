import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ListagemErros() {
  const [erros, setErros] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5112/api/Erros')
      .then(res => setErros(res.data))
      .catch(err => console.error('Erro ao carregar lista:', err));
  }, []);

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
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-300">Erros Registrados</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {erros.map(erro => (
          <div
            key={erro.id}
            className="rounded-lg shadow-lg overflow-hidden bg-cover bg-center relative group"
            style={{
              backgroundImage: erro.imagePath
                ? `url(http://localhost:5112${erro.imagePath})`
                : 'linear-gradient(to bottom right, #6A1B9A, #8E24AA)',
              minHeight: '260px',
            }}
          >
            {/* Overlay escuro para legibilidade */}
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition" />

            {/* Conteúdo do card */}
            <div className="relative z-10 p-4 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">{erro.descricao}</h3>
                <p className="text-sm mb-1"><strong>ID:</strong> {erro.id}</p>
                <p className="text-sm mb-1"><strong>Identificação:</strong> {erro.identificacao}</p>
                <p className="text-sm mb-1"><strong>Item:</strong> {erro.item}</p>
                <p className="text-sm mb-1"><strong>Lote:</strong> {erro.lote}</p>
                <p className="text-sm mb-3"><strong>Ação tomada:</strong> {erro.acaoTomada}</p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <Link
                  to={`/editar/${erro.id}`}
                  className="bg-white text-[#6A1B9A] px-3 py-1 rounded hover:bg-purple-100 font-medium"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleExcluir(erro.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 font-medium"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
