import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const THEME_KEY = "theme";
const DARK_CLASS = "dark";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedTheme = window.localStorage.getItem(THEME_KEY);
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark =
      storedTheme === "dark" || (!storedTheme && prefersDark);

    const root = document.documentElement;
    root.classList.remove("light", DARK_CLASS);
    root.classList.add(shouldUseDark ? DARK_CLASS : "light");
    root.dataset.theme = shouldUseDark ? "dark" : "light";
    root.style.colorScheme = shouldUseDark ? "dark" : "light";
    setIsDarkMode(shouldUseDark);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    const root = document.documentElement;
    root.classList.remove("light", DARK_CLASS);
    root.classList.add(isDarkMode ? DARK_CLASS : "light");
    const theme = isDarkMode ? "dark" : "light";
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(THEME_KEY, next ? "dark" : "light");
      }
      return next;
    });
  };

  const Icon = isDarkMode ? FaSun : FaMoon;

  return (
    <button
      type="button"
      className="fixed right-4 bottom-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-main-text bg-primary text-main-text shadow-lg transition hover:scale-105"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} theme`}
    >
      <Icon size={24} />
    </button>
  );
};

export default ThemeToggle;
