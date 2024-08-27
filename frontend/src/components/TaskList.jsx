import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Task from "./Task";
import CreateTask from "./CreateTask";
import DetailsTask from "./DetailsTask";
import axios from "axios";

function TaskList() {
  const params = useParams(); // Obteniendo el id de la lista desde la URL
  const [tasks, setTasks] = useState([]);
  const [list, setList] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [taskSelected, setTaskSelected] = useState({});
  const [tasksPending, setTasksPending] = useState([]);
  const [tasksCompleted, setTasksCompleted] = useState([]);

  // Fetch de la lista y sus tareas usando el id desde useParams
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

  const updateTasks = (task) => {
    setTasks((tasks) => [...tasks, task]);
  };

  useEffect(() => {
    const pendingTasks = tasks.filter((task) => !task.completed);
    const completedTasks = tasks.filter((task) => task.completed);
    setTasksPending(pendingTasks);
    setTasksCompleted(completedTasks);
  }, [tasks]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const toggleDetails = (task) => {
    setShowDetails(!showDetails);
    setTaskSelected(task);
  };

  const deleteTask = async (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    try {
      const response = await axios.post("http://localhost:8000/delete-task", {
        id: taskId,
      });
      console.log("Respuesta del backend:", response.data);
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
            title={taskSelected.tittle}
            description={taskSelected.description}
            function={toggleDetails}
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
