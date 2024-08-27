import { Link } from "react-router-dom";
import Button from "./Button";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import SettingsList from "./SettingList";
/**
 * @function Sidebar
 * @description A component that renders a sidebar. It toggles its visibility when the button is clicked.
 * @returns {JSX.Element} The JSX code for the component.
 */
function Sidebar({ setListSelected }) {
  const [openBar, setOpenBar] = useState(false);
  const [lists, setLists] = useState([]);
  /**
   * @function toggleBar
   * @description Toggles the visibility of the sidebar.
   */
  const toggleBar = () => {
    // Toggle the value of openBar
    setOpenBar(!openBar);
  };

  const [createList, setCreateList] = useState(false);
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState("");

  /**
   * @function toggleCreateList
   * @description Toggles the value of createList state variable and resets the error state variable.
   */
  const toggleCreateList = () => {
    // Reset the error state variable
    setError(false);
    // Toggle the value of createList state variable
    setCreateList(!createList);
  };

  useEffect(() => {
    /**
     * @function fetchData
     * @description Fetches the lists from the backend and updates the state.
     * @returns {Promise<void>} A promise that resolves when the data is fetched and the state is updated.
     */
    const fetchData = async () => {
      try {
        // Send a POST request to the backend to get the lists
        const response = await axios.post("http://localhost:8000/get-lists", {
          id: localStorage.getItem("id"), // Use the user's ID from localStorage
        });
        // Update the state with the fetched lists
        setLists(response.data.lists);
      } catch (error) {
        // Log the error to the console
        console.log(error);
      }
    };

    fetchData();
  }, []);

  /**
   * @function pickList
   * @description Toggles the bar and sets the listSelected state variable to true.
   * @returns {void}
   */
  const pickList = () => {
    // Toggle the bar
    toggleBar();
    // Set the listSelected state variable to true
    setListSelected(true);
  };

  /**
   * @function createNewList
   * @description Creates a new list and updates the state.
   * @returns {Promise<void>} A promise that resolves when the list is created and the state is updated.
   */
  const createNewList = async () => {
    // Get the values of emoji and name from the form inputs
    const emoji = document.getElementById("emoji").value;
    const name = document.getElementById("listName").value;

    try {
      // Check if emoji and name are not provided
      if (!emoji && !name) {
        setError(true);
        setMessageError("Todos los campos son obligatorios");
        return;
      }
      // Check if name is not provided
      if (!name) {
        setError(true);
        setMessageError("El nombre es obligatorio");
        return;
      }
      // Check if emoji is not provided
      if (!emoji) {
        setError(true);
        setMessageError("El emoji es obligatorio");
        return;
      }

      // Send a POST request to the backend to create the list
      const response = await axios.post("http://localhost:8000/create-list", {
        name: name, // Add the name of the list
        emoji: emoji, // Add the emoji of the list
        id: localStorage.getItem("id"), // Add the user's ID from localStorage
      });

      // Log the response data to the console
      console.log(response.data);

      // Clear the error state
      setError(false);

      // Add the newly created list to the lists state array
      setLists([...lists, response.data.list]);
    } catch (error) {
      // Log the error message from the backend to the console
      console.log(error.response.data.message);
    }

    // Toggle the createList state variable to hide the form
    toggleCreateList();

    // Toggle the bar to hide the form
    toggleBar();
  };

  /**
   * @function deleteList
   * @description Deletes a list from the state and sends a request to the backend to delete the list.
   * @param {string} listId - The ID of the list to be deleted.
   * @returns {Promise<void>} A promise that resolves when the list is deleted from the state and the backend.
   */
  const deleteList = async (listId) => {
    // Filter out the list to be deleted from the lists state array
    const updateList = lists.filter((list) => list.id !== listId);
    // Update the lists state array with the filtered list
    setLists(updateList);
    try {
      // Send a POST request to the backend to delete the list
      const response = await axios.post("http://localhost:8000/delete-list", {
        id: listId,
      });
      // Log the response data from the backend
      console.log(response.data);
      // Reset the listSelected state variable
      setListSelected(false);
    } catch (error) {
      // Log any errors that occur during the request
      console.log(error);
    }
  };

  /**
   * Deletes user data from the backend and clears local storage.
   *
   * @return {Promise<void>} A promise that resolves when the data is deleted and local storage is cleared.
   */
  const deleteData = async () => {
    localStorage.getItem("id");
    try {
      const response = await axios.post("http://localhost:8000/delete-data", {
        id: localStorage.getItem("id"),
      });
      console.log(response.data);
      window.location.reload();
      localStorage.clear();
    } catch (error) {
      console.log(error.response.data.message);
    }
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
            <h1 className="md:text-2xl lg:text-3xl text-3xl font-bold text-text-light dark:text-text-dark flex items-center gap-2">
              <span className="text-5xl">🧑‍💻</span>
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
              <div
                className="flex items-center hover:bg-focus-sidebar-light p-2 pr-4 rounded-lg dark:hover:bg-focus-sidebar-dark hover:bg-opacity-40"
                key={list.id}
              >
                <Link
                  onClick={() => pickList(list.id)}
                  to={`/home/list/${list.id}`}
                  className="flex grow justify-start"
                >
                  <p className="flex items-center gap-2 md:gap-0 text-xl md:text-lg font-semibold">
                    <span className="text-4xl">{list.emoji}</span> {list.name}
                  </p>
                </Link>
                <SettingsList functionDelete={() => deleteList(list.id)} />
              </div>
            ))}
            {createList ? (
              <div className="flex flex-col gap-2">
                <input
                  id="emoji"
                  className={`p-2 bg-sidebar-light dark:bg-sidebar-dark focus:ring-2 ring-gray-600 focus:outline-none border-2 border-gray-500 text-gray-700  dark:text-gray-200 rounded-lg shadow-xl ${
                    error && "border-2 border-red-600"
                  } `}
                  maxLength={2}
                  type="text"
                  placeholder="Ejemplo: 🙃..."
                />

                <input
                  id="listName"
                  className={`p-2 bg-sidebar-light dark:bg-sidebar-dark focus:ring-2 ring-gray-600 focus:outline-none border-2 border-gray-500 text-gray-700  dark:text-gray-200 rounded-lg shadow-xl ${
                    error && "border-2 border-red-600"
                  } `}
                  type="text"
                  placeholder="Ejemplo: Trabajo..."
                />

                <Button function={createNewList} content="Crear" />
                {error && (
                  <p className="text-red-600 animate-fade-down text-base lg:text-lg font-semibold">
                    {messageError}
                  </p>
                )}
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
            <Button content="Eliminar datos" function={deleteData} />
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
