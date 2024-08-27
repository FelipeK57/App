import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
function SettingsTask(props) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const deleteTask = (event) => {
    event.preventDefault();
    setOpen(false);
    props.functionDelete();
  };

  const toggle = () => setOpen(!open);

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

  const viewDetails = (event) => {
    event.preventDefault();
    setOpen(false);
    props.function();
  };

  return (
    <div ref={dropdownRef} className="flex items-center">
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
          className="flex animate-flip-up animate-duration-200 flex-col w-36 absolute right-0 bottom-8 bg-slate-700 dark:bg-button-dark text-text-dark dark:text-text-light text-sm rounded-lg shadow-lg"
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
