import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CadastroErro from './pages/CadastroErro';
import ListagemErros from './pages/ListagemErros';
import Setores from './pages/Setores';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
        {/* Navbar */}
        <header className="bg-gray-900 shadow">
  <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
    <h1 className="text-xl font-bold text-purple-400">Sistema De Não Conformidade</h1>
    <ul className="flex gap-6 text-sm">
      <li><Link to="/cadastro" className="hover:text-purple-300">Cadastrar</Link></li>
      <li><Link to="/erros" className="hover:text-purple-300">Listar Não Conformidades</Link></li>
      <li><Link to="/setores" className="hover:text-purple-300">Setores</Link></li>
    </ul>
  </nav>
</header>



        {/* Conteúdo das rotas */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/cadastro" element={<CadastroErro />} />
            <Route path="/editar/:id" element={<CadastroErro />} />
            <Route path="/erros" element={<ListagemErros />} />
            <Route path="/setores" element={<Setores />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
