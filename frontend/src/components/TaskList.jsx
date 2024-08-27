import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Task from "./Task";
import CreateTask from "./CreateTask";
import DetailsTask from "./DetailsTask";
import axios from "axios";

/**
 * TaskList component that displays a list of tasks and allows users to create, update, and delete tasks.
 *
 * @return {JSX.Element} The JSX element representing the TaskList component.
 */
function TaskList() {
  const params = useParams();
  const [tasks, setTasks] = useState([]);
  const [list, setList] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [taskSelected, setTaskSelected] = useState({});
  const [tasksPending, setTasksPending] = useState([]);
  const [tasksCompleted, setTasksCompleted] = useState([]);

  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  /**
   * Fetches a list from the backend and updates the component's state.
   *
   * @return {Promise<void>} A promise that resolves when the list is fetched and the state is updated.
   */
  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.post("http://localhost:8000/get-list", {
          id: params.id,
        });
        setList(response.data.list);
        setTasks(response.data.list.tasks);
      } catch (error) {
        console.log(error);
      }
    };

    fetchList();
  }, [params.id]);

  /**
   * Changes the state of a task by sending a POST request to the backend to update the task's completion status.
   *
   * @param {number} taskId - The ID of the task to be updated.
   * @return {Promise<void>} A promise that resolves when the task's state is updated.
   */
  const changeState = async (taskId) => {
    try {
      const task = tasks.find((task) => task.id === taskId);
      let stateTask = !task.completed;

      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, completed: stateTask } : task
      );

      setTasks(updatedTasks);
      const response = await axios.post("http://localhost:8000/update-task", {
        id: taskId,
        completed: stateTask,
      });
      console.log("Respuesta del backend:", response.data.task.completed);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  /**
   * Updates the tasks state by adding a new task.
   *
   * @param {object} task - The new task to be added to the tasks state.
   * @return {void} No return value, updates the tasks state directly.
   */
  const updateTasks = (task) => {
    setTasks((tasks) => [...tasks, task]);
  };

  useEffect(() => {
    const pendingTasks = tasks.filter((task) => !task.completed);
    const completedTasks = tasks.filter((task) => task.completed);
    setTasksPending(pendingTasks);
    setTasksCompleted(completedTasks);
  }, [tasks]);

  /**
   * Toggles the visibility of the form.
   *
   * @return {void} No return value, updates the showForm state directly.
   */
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  /**
   * Toggles the visibility of task details and updates the task selection.
   *
   * @param {object} task - The task object to be selected.
   * @return {void} No return value, updates the state directly.
   */
  const toggleDetails = (task) => {
    setError(false);
    setTaskSelected(task);
    setTitle(task.tittle);
    setDescription(task.description);
    setShowDetails(!showDetails);
  };

  /**
   * Updates a task's details by sending a POST request to the backend.
   *
   * @return {void} No return value, updates the task state directly.
   */
  const updateTaskDetails = async () => {
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
      const response = await axios.post("http://localhost:8000/update-task", {
        id: taskSelected.id,
        tittle: title,
        description: description,
      });
      setTaskSelected(response.data.task);
      setError(false);
      const updatedTasks = tasks.map((task) =>
        task.id === taskSelected.id ? response.data.task : task
      );
      setTasks(updatedTasks);
      console.log("Respuesta del backend:", response.data.task);
      setShowDetails(false);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  /**
   * Handles changes to the task title by updating the title state.
   *
   * @param {string} newTitle - The new title to be set.
   * @return {void} No return value, updates the title state directly.
   */
  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
  };

  /**
   * Handles changes to the task description by updating the description state.
   *
   * @param {string} newDescription - The new description to be set.
   * @return {void} No return value, updates the description state directly.
   */
  const handleDescriptionChange = (newDescription) => {
    setDescription(newDescription);
  };

  /**
   * Deletes a task by its ID and updates the tasks state.
   *
   * @param {number} taskId - The ID of the task to be deleted.
   * @return {Promise<void>} A promise that resolves when the task is deleted and the tasks state is updated.
   */
  const deleteTask = async (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    try {
      const response = await axios.post("http://localhost:8000/delete-task", {
        id: taskId,
      });
      console.log("Respuesta del backend:", response.data);
      setShowDetails(false);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="text-text-light dark:text-text-dark flex flex-col gap-4">
      {showForm ? (
        <div className="fixed flex justify-center items-center w-full inset-0 bg-slate-800 bg-opacity-40 z-[1000]">
          <CreateTask
            list_id={params.id}
            onClose={toggleForm}
            updateTasks={updateTasks}
          />
        </div>
      ) : null}
      {showDetails ? (
        <div className="fixed flex justify-center items-center w-full inset-0 bg-slate-800 bg-opacity-40 z-[1000]">
          <DetailsTask
            title={title}
            description={description}
            function={updateTaskDetails}
            onTitleChange={handleTitleChange}
            onDescriptionChange={handleDescriptionChange}
            deleteTask={() => deleteTask(taskSelected.id)}
            error={error}
            messageError={messageError}
          />
        </div>
      ) : null}
      <button
        onClick={toggleForm}
        className="shadow-xl flex flex-row items-center gap-2 w-full px-4 py-2 text-text-light dark:text-text-dark bg-component-task-light dark:bg-component-task-dark font-semibold rounded-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-10 p-2 rounded-full"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Crear nueva tarea
      </button>
      <p
        key={params.id}
        className="flex items-center gap-2 text-xl font-semibold"
      >
        <span className="text-4xl">{list.emoji}</span> {list.name}
      </p>
      <div className="flex flex-col ml-2 gap-4">
        {tasksPending.length > 0 ? (
          tasksPending.map((task) => (
            <Task
              key={task.id}
              name={task.tittle}
              date={task.date}
              state={task.completed}
              onClick={() => changeState(task.id)}
              function={() => toggleDetails(task)}
              deleteTask={() => deleteTask(task.id)}
            />
          ))
        ) : (
          <p>No hay tareas pendientes</p>
        )}
      </div>
      <p className="flex items-center gap-2 text-xl font-semibold">
        <span className="text-4xl">✅</span>Tareas completadas
      </p>
      <div className="flex flex-col ml-2 gap-4">
        {tasksCompleted.length > 0 ? (
          tasksCompleted.map((task) => (
            <Task
              key={task.id}
              name={task.tittle}
              date={task.date}
              state={task.completed}
              onClick={() => changeState(task.id)}
              function={() => toggleDetails(task)}
              deleteTask={() => deleteTask(task.id)}
            />
          ))
        ) : (
          <p>No hay tareas completadas</p>
        )}
      </div>
    </div>
  );
}

export default TaskList;
