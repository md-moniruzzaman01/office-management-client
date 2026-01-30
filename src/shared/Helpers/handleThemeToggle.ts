/* eslint-disable @typescript-eslint/no-explicit-any */
import { setToLocalStorage } from "./local_storage";

export const toggleDarkMode = ({
  isDarkMode,
  setIsDarkMode,
}: {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}) => {
  const root = document.getElementById("dashboard");
  const newTheme = !isDarkMode ? "dark" : "light";

  setIsDarkMode(!isDarkMode);
  setToLocalStorage("theme", newTheme);

  if (root) {
    if (newTheme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }
};
