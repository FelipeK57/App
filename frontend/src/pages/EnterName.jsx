import { useEffect, useState } from "react";
function EnterName() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "true" ? true : false
  );
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", false);
    }
  }, [darkMode]);

  const [error, setError] = useState(false);
  const saveName = () => {
    if (!document.getElementById("name").value) {
      setError(true);
      return;
    }
    localStorage.setItem("name", document.getElementById("name").value);
    window.location.href = "/";
  };

  return (
    <div className="overflow-hidden flex flex-col items-center justify-center h-screen w-full">
      <div className="flex flex-col items-center justify-center gap-12 h-screen w-full">
        <div className="absolute inset-0 -z-10 h-full w-full dark:bg-slate-950 bg-slate-50 bg-[linear-gradient(to_right,#f0f0f0_2px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-[linear-gradient(to_right,#0f172a_2px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] dark:bg-[size:6rem_4rem]"></div>
        <h1 className="text-center animate-wiggle text-3xl md:text-5xl font-semibold text-gray-800 dark:text-slate-100">
          Bienvenido a NotesEasy.
        </h1>
        <div className="animate-fade-up flex flex-col items-center gap-2 w-full md:w-1/2">
          <p className="text-xl font-base text-gray-500 dark:text-gray-200">
            Ingresa tu nombre
          </p>
          <input
            id="name"
            className={`w-1/2 py-2 px-4 focus:ring-2 ring-gray-600 focus:outline-none border-2 border-gray-500 bg-slate-50 text-gray-700 dark:bg-slate-950 dark:text-gray-200 rounded-lg shadow-xl ${
              error && "border-red-600"
            }`}
            type="text"
            placeholder="Ejemplo: Esteban, Pablo..."
          />
          {error && (
            <p className="text-red-600 animate-fade">
              El campo esta vacío, intenta escribir tu nombre.
            </p>
          )}
        </div>
        <div className="animate-fade-up">
          <button
            onClick={saveName}
            className="px-10 py-2 bg-gray-800 hover:bg-gray-900 hover:scale-110 transition-all text-slate-100 font-semibold rounded-lg text-lg shadow-xl dark:bg-slate-100 dark:text-slate-800"
          >
            Comenzar
          </button>
        </div>
      </div>
      <div className="animate-fade-left flex w-full items-end justify-end p-4 ">
        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 hover:scale-110 transition-all text-slate-100 font-semibold rounded-lg text-lg shadow-xl dark:bg-slate-100 dark:text-slate-800"
        >
          {darkMode === false ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          )}
          {darkMode === false ? "Modo oscuro" : "Modo claro"}
        </button>
      </div>
    </div>
  );
}

export default EnterName;
