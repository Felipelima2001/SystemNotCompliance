import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Setores() {
  const [form, setForm] = useState({ nome: '', responsavel: '' });
  const [mensagem, setMensagem] = useState('');
  const [setores, setSetores] = useState([]);
  const [setorSelecionado, setSetorSelecionado] = useState('');
  const navigate = useNavigate();

  // Carrega setores ao iniciar
  useEffect(() => {
    buscarSetores();
  }, []);

  const buscarSetores = async () => {
    try {
      const res = await axios.get('http://localhost:5112/api/Setores');
      setSetores(res.data);
    } catch (err) {
      console.error('Erro ao buscar setores:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nome) {
      alert('O campo Nome é obrigatório.');
      return;
    }

    try {
      await axios.post('http://localhost:5112/api/Setores', form);
      setMensagem('Setor cadastrado com sucesso!');
      setForm({ nome: '', responsavel: '' });
      buscarSetores();
    } catch (err) {
      console.error('Erro ao cadastrar setor:', err);
      setMensagem('Falha ao cadastrar setor.');
    }
  };

  const handleVerErros = () => {
    if (!setorSelecionado) {
      alert('Selecione um setor para visualizar os erros.');
      return;
    }
    navigate(`/erros?setorId=${setorSelecionado}`);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 pt-[100px] pb-8">
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-md p-6">
        {/* Cadastro de Setor */}
        <h2 className="text-xl font-bold text-center text-[#773870] mb-6">
          Cadastrar Setor
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm mb-8">
          <input
            type="text"
            name="nome"
            placeholder="Nome do setor"
            value={form.nome}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white border border-gray-700 rounded p-2 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#773870]"
            required
          />
          <input
            type="text"
            name="responsavel"
            placeholder="Responsável (opcional)"
            value={form.responsavel}
            onChange={handleChange}
            className="w-full bg-gray-800 text-white border border-gray-700 rounded p-2 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#773870]"
          />
          <button
            type="submit"
            className="w-full bg-[#773870] hover:bg-purple-700 text-white py-2 rounded font-semibold text-sm transition"
          >
            Cadastrar
          </button>
          {mensagem && <p className="text-center text-sm mt-2 text-gray-300">{mensagem}</p>}
        </form>

        {/* Filtro por setor */}
        <h2 className="text-xl font-bold text-center text-[#773870] mb-4">
          Ver Erros por Setor
        </h2>

        <div className="flex gap-4 items-center mb-6">
          <select
            value={setorSelecionado}
            onChange={(e) => setSetorSelecionado(e.target.value)}
            className="flex-1 bg-gray-800 text-white border border-gray-700 rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#773870]"
          >
            <option value="">Selecione um setor</option>
            {setores.map(setor => (
              <option key={setor.id} value={setor.id}>
                {setor.nome}
              </option>
            ))}
          </select>

          <button
            onClick={handleVerErros}
            className="bg-[#773870] hover:bg-purple-700 text-white px-4 py-2 rounded font-semibold text-sm transition"
          >
            Ver erros
          </button>
        </div>
      </div>
    </div>
  );
}
