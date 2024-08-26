import PropTypes from "prop-types";
import SettingsTask from "./SettingsTask";
import CreateTask from "./CreateTask";
import { useState } from "react";
function Task(props) {

  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="flex animate-shake items-center text-sm md:text-base rounded-lg shadow-xl bg-component-task-light dark:bg-component-task-dark ml-4 p-4 text-text-light dark:text-text-dark">
      {showForm ? (
        <div className="fixed flex justify-center items-center w-full inset-0 bg-slate-800 bg-opacity-40 z-[1000]">
          <CreateTask function={toggleForm} />
        </div>
      ) : null}
      <div className="flex gap-4 flex-1 flex-row items-center">
        <button
          id="check"
          onClick={props.onClick}
          className={`${
            props.state ? "bg-green-600 hover:bg-red-600" : "bg-slate-500 hover:bg-green-600"
          } p-3 rounded-full  transition-all`}
        ></button>
        <p className={`${props.state ? "line-through text-text-light-lighter dark:text-text-dark-lighter" : ""} flex-1 font-bold`}>{props.name}</p>
      </div>
      <p className="mr-4 font-semibold">{props.date}</p>
      <SettingsTask function={props.function} />
    </div>
  );
}

Task.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  state: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  function: PropTypes.func,
};

export default Task;
