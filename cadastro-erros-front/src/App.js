import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CadastroErro from './pages/CadastroErro';
import ListagemErros from './pages/ListagemErros';
import Setores from './pages/Setores';





export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100 font-sans">
        {/* Navbar fixa */}
        <header className="fixed top-0 left-0 w-full z-50 bg-gray-900 shadow-md">
          <nav className="max-w-6xl mx-auto px-10 py-6 flex justify-between items-center">
            <Link to="/" className="text-3xl font-bold text-[#773870] hover:text-purple-300 transition">
              Cadastro de Não Conformidade
            </Link>
            <ul className="flex gap-9 text-base text-[#773870]">
              <li>
                <Link to="/cadastro" className="hover:text-purple-300 transition">
                  Cadastrar
                </Link>
              </li>
              <li>
                <Link to="/erros" className="hover:text-purple-300 transition">
                  Listar
                </Link>
              </li>
              <li>
                <Link to="/setores" className="hover:text-purple-300 transition">
                  Não Conformidades por Setores
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Conteúdo principal */}
        <main className="max-w-6xl mx-auto px-4 pt-[100px] pb-8 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastro" element={<CadastroErro />} />
            <Route path="/editar/:id" element={<CadastroErro />} />
            <Route path="/erros" element={<ListagemErros />} />
             
            <Route path="/setores" element={<Setores />} />
          </Routes>

        </main>

        {/* Footer visível em todas as páginas */}
        <footer className="bg-gray-900 text-[#773870] text-xs text-center py-3 border-t border-gray-800">
          <p>
            Sistema desenvolvido por <span className="font-semibold">LYUPXDev</span> © {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}
