import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiMoon, FiSun } from "react-icons/fi";
import useDarkMode from "use-dark-mode";



export const ThemeToggle = () => {
  const iconSize = "28";
  const darkMode = useDarkMode(false);


  const icon =
    darkMode.value === false ? (
      <FaMoon size={iconSize} />
    ) : (
      <FaSun size={iconSize} />
    );

  return (
    <div
      className="cursor-pointer fixed right-4 bottom-4 border-primary "
      onClick={() => darkMode.toggle()}
    >
      {" "}
      {icon}
    </div>
  );
};

