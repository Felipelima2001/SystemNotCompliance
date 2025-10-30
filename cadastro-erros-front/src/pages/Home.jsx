import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[60vh]">
      <h2 className="text-4xl font-bold text-[#773870] mb-6 animate-fade-in">
        Bem-vindo ao Cadastro de Não Conformidade
        </h2>
      <p className="text-gray-300 text-base md:text-lg mb-10 max-w-xl">
        Aqui você pode registrar, listar e acompanhar não conformidades de forma simples e eficiente.
      </p>
      <div className="flex gap-6 flex-wrap justify-center">
        <Link
          to="/cadastro"
          className="bg-[#773870] hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          Cadastrar Novo Erro
        </Link>
        <Link
          to="/erros"
          className="bg-[#773870] hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          Ver Lista de Erros
        </Link>
      </div>
    </div>
  );
}
