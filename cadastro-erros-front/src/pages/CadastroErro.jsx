import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CadastroErro() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    descricao: '',
    identificacao: '',
    item: '',
    lote: '',
    acaoTomada: '',
    imagem: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [carregando, setCarregando] = useState(false);

  // Define tipo com base na descrição
  const tipo = form.descricao?.toLowerCase().includes('não conformidade')
    ? 'não Conformidade'
    : 'Erro';

  const titulo = id ? `Editar ${tipo}` : `Cadastrar ${tipo}`;

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5112/api/Erros/${id}`)
        .then(res => {
          const erro = res.data;
          setForm({
            descricao: erro.descricao || '',
            identificacao: erro.identificacao || '',
            item: erro.item || '',
            lote: erro.lote || '',
            acaoTomada: erro.acaoTomada || '',
            imagem: null,
          });
          if (erro.imagePath) {
            setPreviewUrl(`http://localhost:5112${erro.imagePath}`);
          }
        })
        .catch(err => console.error('Erro ao carregar erro:', err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setForm(prev => ({ ...prev, [name]: file }));
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.descricao || !form.identificacao) {
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
      data.append('DataRegistro', new Date().toISOString());

      if (form.imagem) {
        data.append('Imagem', form.imagem);
      }

      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      };

      if (id) {
        await axios.put(`http://localhost:5112/api/Erros/com-imagem/${id}`, data, config);
        alert('Erro atualizado com sucesso!');
      } else {
        await axios.post('http://localhost:5112/api/Erros/com-imagem', data, config);
        alert('Erro cadastrado com sucesso!');
      }

      navigate('/erros');
    } catch (err) {
      console.error('Erro ao enviar:', err.response?.data || err.message);
      alert(`Falha ao cadastrar ou atualizar erro: ${err.response?.data?.message || err.message}`);
    } finally {
      setCarregando(false);
    }
  };

  const handleExcluir = async () => {
    if (!window.confirm('Tem certeza que deseja excluir este erro?')) return;

    try {
      await axios.delete(`http://localhost:5112/api/Erros/${id}`);
      alert('Erro excluído com sucesso!');
      navigate('/erros');
    } catch (err) {
      console.error('Erro ao excluir:', err);
      alert('Falha ao excluir erro.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-900 text-white rounded shadow">
     <h2 className="text-2xl font-bold mb-4">
         {id ? 'Editar não Conformidade' : 'Cadastrar não Conformidade'}
        </h2>
 

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="descricao"
          placeholder="Descrição do erro"
          value={form.descricao}
          onChange={handleChange}
          required
          className="bg-gray-800 text-white border border-gray-600 rounded p-2 placeholder-gray-400"
        />
        <input
          name="identificacao"
          placeholder="Identificação"
          value={form.identificacao}
          onChange={handleChange}
          required
          className="bg-gray-800 text-white border border-gray-600 rounded p-2 placeholder-gray-400"
        />
        <input
          name="item"
          placeholder="Item"
          value={form.item}
          onChange={handleChange}
          className="bg-gray-800 text-white border border-gray-600 rounded p-2 placeholder-gray-400"
        />
        <input
          name="lote"
          placeholder="Lote"
          value={form.lote}
          onChange={handleChange}
          className="bg-gray-800 text-white border border-gray-600 rounded p-2 placeholder-gray-400"
        />
        <input
          name="acaoTomada"
          placeholder="Ação tomada"
          value={form.acaoTomada}
          onChange={handleChange}
          className="bg-gray-800 text-white border border-gray-600 rounded p-2 placeholder-gray-400"
        />
        <input
          type="file"
          name="imagem"
          accept="image/*"
          onChange={handleChange}
          className="bg-gray-800 text-white border border-gray-600 rounded p-2"
        />

        {previewUrl && (
          <div className="mt-2">
            <p className="text-sm text-gray-400 mb-1">Pré-visualização da imagem:</p>
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-48 object-cover rounded border border-gray-700"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={carregando}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
        >
          {carregando ? 'Enviando...' : id ? 'Atualizar' : 'Cadastrar'}
        </button>

        {id && (
          <button
            type="button"
            onClick={handleExcluir}
            className="bg-red-600 hover:bg-red-700 text-white py-2 rounded"
          >
            Excluir
          </button>
        )}
      </form>
    </div>
  );
}
