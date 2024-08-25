import PropTypes from "prop-types";
function Task(props) {
  return (
    <div className="flex items-center text-sm md:text-base rounded-lg shadow-xl bg-component-task-light dark:bg-component-task-dark ml-4 p-4 text-text-light dark:text-text-dark">
      <div className="flex gap-4 flex-1 flex-row items-center">
        <button
          id="check"
          onClick={props.onClick}
          className={`${
            props.state ? "bg-green-600" : "bg-slate-500"
          } p-3 rounded-full hover:bg-green-600 transition-all`}
        ></button>
        <p className={`${props.state ? "line-through text-text-light-lighter dark:text-text-dark-lighter" : ""} flex-1 font-bold`}>{props.name}</p>
      </div>
      <p className="mr-4 font-semibold">{props.date}</p>
      <button className="text-text-light dark:text-text-dark">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
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
    </div>
  );
}

Task.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  state: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

export default Task;
