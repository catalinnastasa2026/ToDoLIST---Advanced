import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function ThemeSwitcher() {

  const { setTheme } = useContext(ThemeContext);

  return (
    <div style={{ marginBottom: "20px" }}>
      <button onClick={() => setTheme("light")}>
        Light
      </button>

      <button onClick={() => setTheme("dark")} style={{ marginLeft: "10px" }}>
        Dark
      </button>

      <button onClick={() => setTheme("blue")} style={{ marginLeft: "10px" }}>
        Blue
      </button>
    </div>
  );
}

export default ThemeSwitcher;