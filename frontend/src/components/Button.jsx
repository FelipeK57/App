import PropTypes from "prop-types";
/**
 * Button component
 * @param {Object} props - The properties passed to the component
 * @param {Function} props.function - The function to be called when the button is clicked
 * @param {string} props.content - The content to be displayed inside the button
 * @returns {JSX.Element} The Button component
 */
function Button(props) {
  // Render the button with the provided properties
  return (
    <button
      // Call the provided function when the button is clicked
      onClick={props.function}
      // Set the CSS classes for the button
      className="px-10 py-2 bg-gray-800 hover:bg-gray-900 hover:scale-110 transition-all text-slate-100 font-semibold rounded-lg text-base shadow-xl dark:bg-slate-100 dark:text-slate-800"
    >
      {/* Display the provided content inside the button */}
      {props.content}
    </button>
  );
}

Button.propTypes = {
  function: PropTypes.func,
  content: PropTypes.string.isRequired,
};

export default Button;
