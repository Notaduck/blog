import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import useDarkMode from "use-dark-mode";

export const ThemeToggle = () => {

  const iconSize = 28;
  const darkMode = useDarkMode(false);

  const icon =
    !darkMode.value ? (
      <FaMoon size={iconSize} />
    ) : (
      <FaSun size={iconSize} />
    );

  return (
    <div
      className=" z-50 cursor-pointer fixed right-4 bottom-4 border-primary "
      onClick={() => darkMode.toggle()}
    >
      {" "}
      {icon}
    </div>
  );
};
