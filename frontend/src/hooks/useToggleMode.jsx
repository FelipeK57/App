import { useState, useEffect } from "react";
function useToggleMode() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "true" ? true : false
  );
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
