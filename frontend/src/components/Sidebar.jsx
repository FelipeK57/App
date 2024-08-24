import Button from "./Button";
import { useState } from "react";

function Sidebar() {
  const [openBar, setOpenBar] = useState(false);

  const toggleBar = () => {
    setOpenBar(!openBar);
  };

  return (
    <div>
      {/* Sidebar para dispositivos móviles */}
      <div
        className={`fixed top-0 left-0 h-screen px-8 py-6 bg-sidebar-light dark:bg-sidebar-dark flex flex-col gap-4 
        ${openBar ? 'block' : 'hidden'} md:block`} // Solo visible en móvil cuando está abierta, visible en escritorio
        style={{ zIndex: 1000 }}
      >
        <div className="flex justify-between items-center">
          <h1 className="md:text-3xl text-lg font-bold text-text-light dark:text-text-dark flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="md:size-10 size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
            NotesEasy
          </h1>
          <button onClick={toggleBar} className="md:size-10 size-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="md:size-10 size-6 text-text-light dark:text-text-dark"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        </div>
        <p className="text-text-dark-lighter text-2xl">Mis listas</p>
        <ul className="flex flex-col gap-2 text-text-light-lighter dark:text-text-dark-lighter">
          <li>+ Crea una lista</li>
        </ul>
        <div className="flex grow items-end">
          <Button
            content="Eliminar datos"
            function={() => {
              localStorage.setItem("name", "");
              window.location.href = "/";
            }}
          />
        </div>
      </div>

      {/* Botón para abrir la sidebar en móviles */}
      <button
        onClick={toggleBar}
        className="md:hidden fixed top-0 left-0 p-4 bg-sidebar-light dark:bg-sidebar-dark z-1000"
        style={{ zIndex: 1000 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="md:size-10 size-6 text-text-light dark:text-text-dark"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
}

export default Sidebar;
