import PropTypes from "prop-types";
import Button from "./Button";
import axios from "axios";
import { useState } from "react";
/**
 * A React functional component to create a new task.
 *
 * @param {object} props - The component props.
 * @param {function} props.updateTasks - A function to update the tasks list.
 * @param {function} props.onClose - A function to close the component.
 * @param {number} props.list_id - The ID of the list where the task will be created.
 * @return {JSX.Element} The JSX element of the component.
 */
function CreateTask(props) {
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState("");
    /**
   * Handles the submission of a new task form.
   *
   * Validates the title and description fields, displays an error message if either field is empty,
   * and creates a new task via an HTTP POST request to the server if both fields are valid.
   *
   * @return {void}
   */
  const handleSubmit = async () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    console.log(title, description);
    try {
      if (!title && !description) {
        setError(true);
        setMessageError("Todos los campos son obligatorios");
        return;
      }
      if (!title) {
        setError(true);
        setMessageError("El título es obligatorio");
        return;
      }
      if (!description) {
        setError(true);
        setMessageError("La descripción es obligatoria");
        return;
      }
      const response = await axios.post("http://localhost:8000/create-task", {
        tittle: title,
        description: description,
        id_list: props.list_id,
      });
      const task = response.data.task;
      props.updateTasks(task);
      props.onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className="flex flex-col gap-6 md:py-6 md:px-10 py-4 px-6 bg-bg-light dark:bg-bg-dark w-[90%] md:w-[75%] h-[75%] rounded-lg">
      <div className="w-full flex justify-between">
        <h1 className="md:text-3xl text-2xl font-bold text-text-light dark:text-text-dark flex items-center gap-2">
          Crea una tarea
        </h1>
        <button
          className="bg-red-600 hover:bg-red-700 rounded-full text-text-dark"
          onClick={props.onClose}
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
          id="title"
          className={`p-2 focus:ring-2 text-base ring-gray-600 focus:outline-none border-2 border-gray-500 bg-slate-50 text-gray-700 dark:bg-slate-950 dark:text-gray-200 rounded-lg shadow-xl ${
            error ? "border-red-600" : ""
          } `}
          type="text"
          placeholder="Ejemplo: Tarea 1..."
        />
        <label>Descripción</label>
        <textarea
          id="description"
          className={`h-full resize-none p-2 text-base focus:ring-2 ring-gray-600 focus:outline-none border-2 border-gray-500 bg-slate-50 text-gray-700 dark:bg-slate-950 dark:text-gray-200 rounded-lg shadow-xl ${
            error ? "border-red-600" : ""
          } `}
          type="text"
          placeholder="Ejemplo: Descripcion tarea 1..."
        />
        {error ? (
          <p className="text-red-600 animate-fade-down text-lg lg:text-xl font-semibold">
            {messageError}
          </p>
        ) : null}
      </form>
      <div className="flex gap-10 justify-end">
        <button
          onClick={props.onClose}
          className="border-b-2 px-4 opacity-80 border-text-light-lighter dark:border-text-dark-lighter text-text-light-lighter dark:text-text-dark-lighter font-semibold"
        >
          Cancelar
        </button>
        <Button function={handleSubmit} content="Crear" />
      </div>
    </article>
  );
}

CreateTask.propTypes = {
  onClose: PropTypes.func,
  list_id: PropTypes.string,
  updateTasks: PropTypes.func,
};

export default CreateTask;
