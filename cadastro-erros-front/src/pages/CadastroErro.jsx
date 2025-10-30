import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function CadastroErro() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    descricao: '',
    identificacao: '',
    item: '',
    lote: '',
    acaoTomada: '',
    imagem: null,
    setorId: '',
    dataRegistro: '', // necessário para cadastro e edição
  });

  const [setores, setSetores] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [carregandoDados, setCarregandoDados] = useState(!!id);

  useEffect(() => {
    const carregarSetores = async () => {
      try {
        const res = await axios.get('http://localhost:5112/api/Setores');
        setSetores(res.data);
      } catch (err) {
        console.error('Erro ao buscar setores:', err);
      }
    };

    const carregarErro = async () => {
      try {
        const res = await axios.get(`http://localhost:5112/api/Erros/${id}`);
        const erro = res.data;
        setForm({
          descricao: erro.descricao || '',
          identificacao: erro.identificacao || '',
          item: erro.item || '',
          lote: erro.lote || '',
          acaoTomada: erro.acaoTomada || '',
          imagem: null,
          setorId: erro.setorId?.toString() || '',
          dataRegistro: erro.dataRegistro || new Date().toISOString(),
        });
        if (erro.imagePath) {
          setPreviewUrl(`http://localhost:5112${erro.imagePath}`);
        }
      } catch (err) {
        console.error('Erro ao carregar erro existente:', err);
      } finally {
        setCarregandoDados(false);
      }
    };

    carregarSetores();
    if (id) {
      carregarErro();
    } else {
      setForm(prev => ({ ...prev, dataRegistro: new Date().toISOString() }));
      setCarregandoDados(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files?.length) {
      const file = files[0];
      setForm(prev => ({ ...prev, imagem: file }));
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.descricao || !form.identificacao || !form.setorId) {
      alert('Preencha os campos obrigatórios.');
      return;
    }

    setCarregando(true);

    try {
      const data = new FormData();
      data.append('Descricao', form.descricao);
      data.append('Identificacao', form.identificacao);
      data.append('Item', form.item);
      data.append('Lote', form.lote);
      data.append('AcaoTomada', form.acaoTomada);
      data.append('SetorId', parseInt(form.setorId));
      data.append('DataRegistro', form.dataRegistro);
      if (form.imagem) {
        data.append('Imagem', form.imagem);
      }

      if (id) {
        await axios.put(`http://localhost:5112/api/Erros/com-imagem/${id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Erro atualizado com sucesso!');
      } else {
        await axios.post('http://localhost:5112/api/Erros/com-imagem', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Erro cadastrado com sucesso!');
      }

      navigate('/erros');
    } catch (err) {
      console.error('Erro ao salvar:', err.response?.data || err.message);
      alert('Falha ao salvar erro.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 pt-[200px] pb-8">
      <div className="max-w-md mx-auto bg-gray-900 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-center text-[#773870] mb-6">
          {id ? 'Editar Não Conformidade' : 'Cadastrar Não Conformidade'}
        </h2>

        {carregandoDados ? (
          <p className="text-center text-gray-400">Carregando dados...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-sm">
            <input
              name="descricao"
              placeholder="Descrição"
              value={form.descricao}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded p-2"
              required
            />
            <input
              name="identificacao"
              placeholder="Identificação"
              value={form.identificacao}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded p-2"
              required
            />
            <input
              name="item"
              placeholder="Item"
              value={form.item}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded p-2"
            />
            <input
              name="lote"
              placeholder="Lote"
              value={form.lote}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded p-2"
            />
            <input
              name="acaoTomada"
              placeholder="Ação Tomada"
              value={form.acaoTomada}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded p-2"
            />

            <select
              name="setorId"
              value={form.setorId}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded p-2"
              required
            >
              <option value="">Selecione o setor</option>
              {setores.map((setor) => (
                <option key={setor.id} value={setor.id.toString()}>
                  {setor.nome}
                </option>
              ))}
            </select>

            <input
              type="file"
              name="imagem"
              accept="image/*"
              onChange={handleChange}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded p-2"
            />

            {previewUrl && (
              <div className="mt-2">
                <p className="text-xs text-gray-400 mb-1">Pré-visualização:</p>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded border border-gray-700"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={carregando}
              className="w-full bg-[#773870] hover:bg-purple-700 text-white py-2 rounded font-semibold text-sm transition"
            >
              {carregando ? 'Salvando...' : id ? 'Atualizar' : 'Cadastrar'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
