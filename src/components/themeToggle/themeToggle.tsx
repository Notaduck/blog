import { FaMoon, FaSun } from "react-icons/fa";
import { useState, useEffect } from "react";

export const ThemeToggle = () => {
  const iconSize = 28;
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage?.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (document?.documentElement?.classList?.contains("dark")) {
      document?.documentElement?.classList?.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document?.documentElement?.classList?.add("dark");
      localStorage?.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <div
      className="z-50 cursor-pointer fixed right-4 bottom-4 border-primary"
      onClick={toggleTheme}
    >
      {isDarkMode ? <FaSun size={iconSize} /> : <FaMoon size={iconSize} />}
    </div>
  );
};
