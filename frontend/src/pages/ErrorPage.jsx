import { Link } from "react-router-dom";
function ErrorPage() {
  return (
    <div className="flex flex-col h-screen text-text-light dark:text-text-dark w-full items-center justify-center gap-8">
      <h1 className="md:text-4xl text-2xl font-semibold">¡Ups!,al parecer estas perdido</h1>
      <Link
        className="bg-sky-600 text-slate-50 p-4 rounded-lg md:text-xl text-lg font-semibold hover:bg-sky-700 transition-all "
        to="/home"
      >
        Volver a la página principal
      </Link>
    </div>
  );
}

export default ErrorPage;
