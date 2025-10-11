import { act, renderHook, waitFor } from "@testing-library/react";
import useTheme from "../src/hooks/useTheme";

describe("useTheme", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
  });

  it("enables dark mode when a dark preference is stored", async () => {
    localStorage.setItem("theme", "dark");

    const { result } = renderHook(() => useTheme());

    await waitFor(() => expect(result.current.isDarkMode).toBe(true));
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("toggles to light mode from dark mode", async () => {
    localStorage.setItem("theme", "dark");

    const { result } = renderHook(() => useTheme());

    await waitFor(() => expect(result.current.isDarkMode).toBe(true));

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.isDarkMode).toBe(false);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("toggles to dark mode from light mode", async () => {
    localStorage.setItem("theme", "light");

    const { result } = renderHook(() => useTheme());

    await waitFor(() => expect(result.current.isDarkMode).toBe(false));

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.isDarkMode).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
  });
});
