import { Link } from "react-router-dom";
import Button from "./Button";
import { useState } from "react";
import PropTypes from "prop-types";
/**
 * @function Sidebar
 * @description A component that renders a sidebar. It toggles its visibility when the button is clicked.
 * @returns {JSX.Element} The JSX code for the component.
 */
function Sidebar({ setListSelected }) {
  /**
   * @param {boolean} openBar Whether the sidebar is open or not.
   * @type {boolean}
   */
  const [openBar, setOpenBar] = useState(false);

  /**
   * @function toggleBar
   * @description Toggles the visibility of the sidebar.
   */
  const toggleBar = () => {
    setOpenBar(!openBar);
  };

  const [createList, setCreateList] = useState(false);

  const toggleCreateList = () => {
    setCreateList(!createList);
  };

  const taskHogar = [
    {
      id: 1,
      name: "Comprar muebles para casa",
      description: "Sofa, sillas, escritorios, etc. en Homecenter",
      date: "2022-01-01",
      state: true,
    },
    {
      id: 2,
      name: "Pintar una habitación",
      description: "Pintar la habitación de mi casa de color blanco",
      date: "2022-01-02",
      state: true,
    },
  ];

  const tasksPersonales = [
    {
      id: 1,
      name: "Comprar ropa para fiesta de cumpleaños",
      description: "Camisas, pantalones, zapatillas, etc. en Zara",
      date: "2022-01-01",
      state: false,
    },
    {
      id: 2,
      name: "Hacer compras en Mercado Libre",
      description: "Libros, ropa, zapatos, etc. en Mercado Libre",
      date: "2022-01-02",
      state: false,
    },
  ];

  const lists = [
    {
      id: 1,
      emoji: "👤",
      name: "Personales",
      task: tasksPersonales,
    },
    {
      id: 2,
      emoji: "🏡",
      name: "Hogar",
      task: taskHogar,
    },
  ];

  const pickList = () => {
    toggleBar();
    setListSelected(true);
    localStorage.setItem("listSelected", true);
  };

  return (
    <div>
      {/* Main Sidebar */}
      <aside
        className={`fixed md:flex shadow flex inset-0 bg-sidebar-light dark:bg-sidebar-dark p-6 md:w-64 lg:w-80 h-screen z-50 ${
          openBar ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col gap-6 w-full">
          <div className="flex justify-between items-center">
            <h1 className="md:text-3xl text-2xl font-bold text-text-light dark:text-text-dark flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="md:size-10 size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              NotesEasy.
            </h1>
            <button
              onClick={toggleBar}
              className={`p-2 md:hidden bg-gray-800 hover:bg-gray-900 hover:scale-110 transition-all text-slate-100 font-semibold rounded-lg text-base shadow-xl dark:bg-slate-100 dark:text-slate-800 `}
            >
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
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          </div>
          <p className="text-text-light dark:text-text-dark text-2xl font-semibold">
            Mis listas
          </p>
          <nav className="flex flex-col gap-6 text-text-light dark:text-text-dark">
            {lists.map((list) => (
              <Link
                key={list.id}
                onClick={pickList}
                to={`/home/list/${list.id}`}
                state={{ list: list }}
              >
                <p className="flex items-center gap-2 text-xl font-semibold hover:bg-focus-sidebar-light dark:hover:bg-focus-sidebar-dark hover:bg-opacity-40 focus:bg-focus-sidebar-light p-2 rounded -lg dark:focus:bg-focus-sidebar-dark">
                  <span className="text-4xl">{list.emoji}</span> {list.name}
                </p>
              </Link>
            ))}
            {createList ? (
              <div className="flex flex-col gap-2">
                <input
                  className="p-2  bg-sidebar-light dark:bg-sidebar-dark focus:ring-2 ring-gray-600 focus:outline-none border-2 border-gray-500 text-gray-700  dark:text-gray-200 rounded-lg shadow-xl"
                  type="text"
                  placeholder="Ejemplo: 🙃..."
                />

                <input
                  className="p-2  bg-sidebar-light dark:bg-sidebar-dark focus:ring-2 ring-gray-600 focus:outline-none border-2 border-gray-500 text-gray-700  dark:text-gray-200 rounded-lg shadow-xl"
                  type="text"
                  placeholder="Ejemplo: Trabajo..."
                />

                <Button content="Crear" />
              </div>
            ) : null}
            <button
              onClick={toggleCreateList}
              className="flex ml-4 items-center gap-2 font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Crear una lista
            </button>
          </nav>
          <div className="flex grow items-end">
            <Button
              content="Eliminar datos"
              function={() => {
                localStorage.setItem("name", "");
                window.location.href = "/home";
              }}
            />
          </div>
        </div>
      </aside>

      {/* Toggle Button */}
      <button
        onClick={toggleBar}
        className={`fixed top-0 left-0 p-2 m-6 z-50 md:hidden ${
          openBar ? "hidden" : "block"
        } bg-gray-800 hover:bg-gray-900 hover:scale-110 transition-all text-slate-100 font-semibold rounded-lg text-base shadow-xl dark:bg-slate-100 dark:text-slate-800 `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="md:size-10 size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>
  );
}

Sidebar.propTypes = {
  setListSelected: PropTypes.func,
};

export default Sidebar;
