import EnterName from "./EnterName";
function Home() {
  const deleteData = () => {
    localStorage.removeItem("name");
    window.location.href = "/";
  };

  return (
    <div>
      {localStorage.getItem("name") ? (
        <div className="flex flex-col items-center justify-center gap-8 h-screen w-full bg-slate-50">
          <h1 className="text-4xl font-semibold text-gray-800">
            Bienvenido {localStorage.getItem("name")}
          </h1>
          <button
            onClick={deleteData}
            className="px-10 py-2 bg-gray-800 hover:bg-gray-900 hover:scale-105 transition-all text-slate-100 font-semibold rounded-lg text-lg shadow-xl"
          >
            Eliminar datos
          </button>
        </div>
      ) : (
        <EnterName />
      )}
    </div>
  );
}

export default Home;
