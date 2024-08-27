import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
/**
 * A React component that renders a settings list with a dropdown menu.
 *
 * @param {object} props - The component props.
 * @param {function} props.functionDelete - A callback function to delete a task.
 * @return {JSX.Element} The rendered settings list component.
 */
function SettingsList(props) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

    /**
   * Deletes a task by preventing the default event behavior, closing the dropdown menu, and invoking the provided delete function.
   *
   * @param {object} event - The event object triggered by the delete action.
   * @return {void} No return value, as the function performs an action and does not produce a result.
   */
  const deleteTask = (event) => {
    event.preventDefault();
    setOpen(false);
    props.functionDelete();
  };

  const toggle = () => setOpen(!open);
  
    /**
   * Handles the click event outside the dropdown menu.
   *
   * @param {object} event - The event object triggered by the click action.
   * @return {void} No return value, as the function performs an action and does not produce a result.
   */
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="flex items-center hover:bg-gray-400 dark:hover:bg-gray-500 transition-all rounded-full"
    >
      <button onClick={toggle} className="text-text-light dark:text-text-dark">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
      </button>
      {open && (
        <div
          className="flex animate-flip-up animate-duration-200 flex-col w-36 absolute right-10 mb-16 bg-slate-700 dark:bg-button-dark text-text-dark dark:text-text-light text-sm rounded-lg shadow-lg"
          role="listbox"
        >
          <button
            className="p-2 font-semibold rounded-lg text-slate-300 bg-red-600"
            onClick={deleteTask}
          >
            Eliminar lista
          </button>
        </div>
      )}
    </div>
  );
}

SettingsList.propTypes = {
  function: PropTypes.func,
  functionDelete: PropTypes.func,
};

export default SettingsList;