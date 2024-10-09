// src/components/ThemeToggle.js
import { FaMoon, FaSun } from "react-icons/fa";
import useTheme from "../../hooks/useTheme";

export const ThemeToggle = () => {
  const iconSize = 28;
  const { isDarkMode, toggleTheme } = useTheme(); // Use the custom hook

  return (
    <div
      className="z-50 cursor-pointer fixed right-4 bottom-4 border-primary"
      onClick={toggleTheme}
      role="button"
      aria-label="Toggle theme"
    >
      {isDarkMode ? <FaSun size={iconSize} /> : <FaMoon size={iconSize} />}
    </div>
  );
};

