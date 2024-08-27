import { useState, useEffect } from "react";
/**
 * A React hook to manage the toggle mode state.
 *
 * Provides the current mode state and a function to toggle it.
 *
 * @return {Array} An array containing the current mode state and the toggle function.
 */
function useToggleMode() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "true" ? true : false
  );
    /**
   * Toggles the dark mode state.
   *
   * @return {void} No return value.
   */
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", false);
    }
  }, [darkMode]);

  return [darkMode, toggleDarkMode];
}

export default useToggleMode;
