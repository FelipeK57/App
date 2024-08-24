function EnterName() {
  const saveName = () => {
    localStorage.setItem("name", document.getElementById("name").value);
  };

  return (
    <div className="animate-fadeIn flex flex-col items-center justify-center gap-8 h-screen w-full bg-slate-50">
      <h1 className="text-4xl font-semibold text-gray-800">
        Bienvenido a NotesEasy.
      </h1>
      <div className="flex flex-col items-center gap-2 w-1/2">
        <p className="text-lg font-base text-gray-500">Ingresa tu nombre</p>
        <input
          id="name"
          className="w-1/2 py-2 px-4 border-2 border-gray-500 bg-slate-50 text-gray-700 rounded-lg shadow-xl"
          type="text"
          placeholder="Ejemplo: Kevin Felipe..."
        />
      </div>
      <button
        onClick={saveName}
        className="px-10 py-2 bg-gray-800 text-slate-100 font-semibold rounded-lg text-lg shadow-xl"
      >
        Comenzar
      </button>
    </div>
  );
}

export default EnterName;
