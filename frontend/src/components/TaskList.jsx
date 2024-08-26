import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import Task from "./Task";
import CreateTask from "./CreateTask";
import DetailsTask from "./DetailsTask";

function TaskList() {
  const params = useParams();
  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const list = location.state.list;
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [taskSelected, setTaskSelected] = useState({});

  useEffect(() => {
    setTasks(list.task);
  }, [list]);

  const changeState = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, state: !task.state } : task
    );
    setTasks(updatedTasks);
  };

  const tasksPending = tasks.filter((task) => !task.state);
  const tasksCompleted = tasks.filter((task) => task.state);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const toggleDetails = (task) => {
    setShowDetails(!showDetails);
    setTaskSelected(task);
  };

  return (
    <div className="text-text-light dark:text-text-dark flex flex-col gap-4">
      {showForm ? (
        <div className="fixed flex justify-center items-center w-full inset-0 bg-slate-800 bg-opacity-40 z-[1000]">
          <CreateTask function={toggleForm} />
        </div>
      ) : null}
      {
        showDetails ? (
          <div className="fixed flex justify-center items-center w-full inset-0 bg-slate-800 bg-opacity-40 z-[1000]">
            <DetailsTask title={taskSelected.name} description={taskSelected.description}  function={toggleDetails} />
          </div>
        ) : null
      }
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
              name={task.name}
              date={task.date}
              state={task.state}
              onClick={() => changeState(task.id)}
              function={() => toggleDetails(task)}
            />
          ))
        ) : (
          <p>No hay tareas pendientes</p>
        )}
      </div>
      <p className="flex items-center gap-2 text-xl font-semibold">
        <span className="text-4xl">✅</span> Completadas
      </p>
      <div className="flex flex-col ml-2 gap-4">
        {tasksCompleted.length > 0 ? (
          tasksCompleted.map((task) => (
            <Task
              key={task.id}
              name={task.name}
              date={task.date}
              state={task.state}
              onClick={() => changeState(task.id)}
              function={() => toggleDetails(task)}
            />
          ))
        ) : (
          <p>No has completado ninguna tarea</p>
        )}
      </div>
    </div>
  );
}

export default TaskList;
