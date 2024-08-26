import PropTypes from "prop-types";
import Button from "./Button";
import axios from "axios";
function CreateTask(props) {
  const handleSubmit = async () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    props.onClose();
    console.log(title, description);
    try {
      const response = await axios.post("http://localhost:8000/create-task", {
        tittle: title,
        description: description,
        id_list: props.list_id,
      });
      const task = response.data.task;
      props.updateTasks(task);
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
          className="p-2 focus:ring-2 text-base ring-gray-600 focus:outline-none border-2 border-gray-500 bg-slate-50 text-gray-700 dark:bg-slate-950 dark:text-gray-200 rounded-lg shadow-xl"
          type="text"
          placeholder="Ejemplo: Tarea 1..."
        />
        <label>Descripción</label>
        <textarea
          id="description"
          className="h-full resize-none p-2 text-base focus:ring-2 ring-gray-600 focus:outline-none border-2 border-gray-500 bg-slate-50 text-gray-700 dark:bg-slate-950 dark:text-gray-200 rounded-lg shadow-xl"
          type="text"
          placeholder="Ejemplo: Descripcion tarea 1..."
        />
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
  updateTasks: PropTypes.func
};

export default CreateTask;
