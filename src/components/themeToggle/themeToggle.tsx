// src/components/ThemeToggle.js
import { FaMoon, FaSun } from "react-icons/fa";
import useTheme from "../../hooks/useTheme";

export const ThemeToggle = () => {
  const iconSize = 28;
  const { isDarkMode, toggleTheme } = useTheme(); // Use the custom hook

  return (
    <button
      type="button"
      className="z-50 fixed right-4 bottom-4 border-primary rounded-full p-2 transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      aria-pressed={isDarkMode}
      title="Toggle color theme"
    >
      {isDarkMode ? <FaSun size={iconSize} /> : <FaMoon size={iconSize} />}
    </button>
  );
};
