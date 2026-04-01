import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import "./App.css";

const THEME_KEY = "todo-manager.theme";
const DEFAULT_THEME = "dark";

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return DEFAULT_THEME;
    }

    return window.localStorage.getItem(THEME_KEY) ?? DEFAULT_THEME;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  const toastStyle =
    theme === "light"
      ? {
          background: "#ffffff",
          color: "#18222a",
          border: "1px solid #d7e1e7",
        }
      : {
          background: "#2d1f18",
          color: "#f8efe5",
          border: "1px solid #6e4f38",
        };

  return (
    <>
      <Home theme={theme} onToggleTheme={toggleTheme} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2200,
          style: toastStyle,
        }}
      />
    </>
  );
}

export default App;
