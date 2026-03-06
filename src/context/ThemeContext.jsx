import { createContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {

  const [theme, setTheme] = useState("light");

  const themes = {
    light: {
      background: "#ffffff",
      text: "#000000"
    },
    dark: {
      background: "#1e1e1e",
      text: "#ffffff"
    },
    blue: {
      background: "#0f172a",
      text: "#38bdf8"
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}