import PropTypes from "prop-types";
import SettingsTask from "./SettingsTask";
import CreateTask from "./CreateTask";
import { useState } from "react";
/**
 * A React component that renders a task with a checkbox, name, and date, along with settings and creation options.
 *
 * @param {object} props - The component props.
 * @param {function} props.onClick - A callback function for the task checkbox.
 * @param {function} props.function - A callback function for the task settings.
 * @param {function} props.deleteTask - A callback function to delete the task.
 * @param {string} props.name - The name of the task.
 * @param {string} props.date - The date of the task.
 * @param {boolean} props.state - The state of the task (completed or not).
 * @return {JSX.Element} The rendered task component.
 */
function Task(props) {
  const [showForm, setShowForm] = useState(false);

    /**
   * Toggles the visibility of the form.
   *
   * @return {void} No return value.
   */
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const dateFormat = props.date;
  const date = new Date(dateFormat);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

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
            props.state
              ? "bg-green-600 hover:bg-red-600"
              : "bg-slate-500 hover:bg-green-600"
          } p-3 rounded-full  transition-all`}
        ></button>
        <p
          className={`${
            props.state
              ? "line-through text-text-light-lighter dark:text-text-dark-lighter"
              : ""
          } flex-1 font-bold`}
        >
          {props.name}
        </p>
      </div>
      <p className="mr-4 font-semibold">{formattedDate}</p>
      <SettingsTask
        functionDelete={props.deleteTask}
        function={props.function}
      />
    </div>
  );
}

Task.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  state: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  function: PropTypes.func,
  deleteTask: PropTypes.func,
};

export default Task;
