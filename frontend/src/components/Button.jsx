import PropTypes from "prop-types";
function Button(props) {
  return (
    <button
      onClick={props.function}
      className="px-10 py-2 bg-gray-800 hover:bg-gray-900 hover:scale-110 transition-all text-slate-100 font-semibold rounded-lg text-base shadow-xl dark:bg-slate-100 dark:text-slate-800"
    >
      {props.content}
    </button>
  );
}

Button.propTypes = {
  function: PropTypes.func,
  content: PropTypes.string.isRequired,
};

export default Button;
