import PropTypes from "prop-types";
import Button from "./Button";
/**
 * A React component that displays a task's details and allows editing.
 * 
 * @param {object} props - The component's props.
 * @param {function} props.function - A callback function to handle the task's state change.
 * @param {function} props.deleteTask - A callback function to delete the task.
 * @param {string} props.title - The task's title.
 * @param {string} props.description - The task's description.
 * @param {function} props.onTitleChange - A callback function to handle the title's change.
 * @param {function} props.onDescriptionChange - A callback function to handle the description's change.
 * @param {boolean} props.error - A flag indicating whether an error occurred.
 * @param {string} props.messageError - The error message.
 * @return {JSX.Element} The component's JSX element.
 */
function DetailsTask(props) {
  return (
    <article className="flex flex-col gap-6 md:py-6 md:px-10 py-4 px-6 bg-bg-light dark:bg-bg-dark w-[90%] md:w-[75%] h-[75%] rounded-lg">
      <div className="w-full h-10 flex mb-4 justify-between">
        <div>
          <h1 className="lg:text-3xl text-2xl font-bold text-text-light dark:text-text-dark flex items-center gap-2">
            Detalles de la tarea
          </h1>
          <p className="text-sm text-text-light-lighter dark:text-text-dark-lighter">
            Puedes editar los campos
          </p>
        </div>
        <button
          className="bg-red-600 hover:bg-red-700 rounded-full text-text-dark"
          onClick={props.function}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-10 p-2 rounded-full rotate-45"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
      <form className="flex flex-col gap-4 h-2/3 text-text-light dark:text-text-dark text-xl font-semibold">
        <label>Titulo</label>
        <input
          value={props.title}
          onChange={(e) => props.onTitleChange(e.target.value)}
          className={`p-2 focus:ring-2 text-base ring-gray-600 focus:outline-none border-2 border-gray-500 bg-slate-50 text-gray-700 dark:bg-slate-950 dark:text-gray-200 rounded-lg shadow-xl ${
            props.error ? "border-red-600" : ""
          } `}
          type="text"
          placeholder="Ejemplo: Tarea 1..."
        />
        <label>Descripción</label>
        <textarea
          value={props.description}
          onChange={(e) => props.onDescriptionChange(e.target.value)}
          className={`h-full resize-none p-2 text-base focus:ring-2 ring-gray-600 focus:outline-none border-2 border-gray-500 bg-slate-50 text-gray-700 dark:bg-slate-950 dark:text-gray-200 rounded-lg shadow-xl ${
            props.error ? "border-red-600" : ""
          } `}
          type="text"
          placeholder="Ejemplo: Descripcion tarea 1..."
        />
        {props.error ? (
          <p className="text-red-600 animate-fade-down text-lg lg:text-xl font-semibold">
            {props.messageError}
          </p>
        ) : null}
      </form>
      <div className="flex gap-10 justify-end">
        <button
          onClick={props.deleteTask}
          className="border-b-2 px-4 opacity-80 border-text-light-lighter dark:border-text-dark-lighter text-text-light-lighter dark:text-text-dark-lighter font-semibold"
        >
          Eliminar
        </button>
        <Button function={props.function} content="Guardar cambios" />
      </div>
    </article>
  );
}

DetailsTask.propTypes = {
  function: PropTypes.func,
  deleteTask: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  onTitleChange: PropTypes.func,
  onDescriptionChange: PropTypes.func,
  error: PropTypes.bool,
  messageError: PropTypes.string,
};

export default DetailsTask;
