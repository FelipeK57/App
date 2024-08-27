import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
/**
 * A React component that renders a settings task with a dropdown menu.
 *
 * @param {object} props - The component props.
 * @param {function} props.functionDelete - A callback function to delete a task.
 * @param {function} props.function - A callback function to view task details.
 * @return {JSX.Element} The rendered settings task component.
 */
function SettingsTask(props) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  /**
   * Deletes a task by preventing the default event behavior, closing the dropdown menu, and invoking the functionDelete callback.
   *
   * @param {object} event - The event object triggered by the delete action.
   * @return {void} No return value.
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
   * @param {Event} event - The click event.
   * @return {void}
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

  /**
   * Views task details by preventing the default event behavior, closing the dropdown menu, and invoking the function callback.
   *
   * @param {object} event - The event object triggered by the view details action.
   * @return {void} No return value.
   */
  const viewDetails = (event) => {
    event.preventDefault();
    setOpen(false);
    props.function();
  };

  return (
    <div
      ref={dropdownRef}
      className="flex transition-all items-center hover:bg-gray-400 dark:hover:bg-gray-500 rounded-full"
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
          className="flex animate-flip-up animate-duration-200 flex-col w-36 absolute right-4 bottom-12 bg-slate-700 dark:bg-button-dark text-text-dark dark:text-text-light text-sm rounded-lg shadow-lg"
          role="listbox"
        >
          <button
            className="p-2 font-semibold rounded-t-lg"
            onClick={viewDetails}
          >
            Ver detalles
          </button>
          <button
            className="p-2 font-semibold rounded-b-lg text-slate-300 bg-red-600"
            onClick={deleteTask}
          >
            Eliminar tarea
          </button>
        </div>
      )}
    </div>
  );
}

SettingsTask.propTypes = {
  function: PropTypes.func,
  functionDelete: PropTypes.func,
};

export default SettingsTask;
