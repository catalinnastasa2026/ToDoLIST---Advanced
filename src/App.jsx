import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import ThemeSwitcher from "./components/ThemeSwitcher";

function App() {

  const { theme, themes } = useContext(ThemeContext);

  const currentTheme = themes[theme];

  return (
    <div
      style={{
        background: currentTheme.background,
        color: currentTheme.text,
        minHeight: "100vh",
        padding: "40px",
        transition: "0.3s"
      }}
    >
      <h1>Ziua 11 – Theme Switcher</h1>

      <ThemeSwitcher />

      <p>
        Acesta este un exemplu de schimbare de temă folosind React Context.
      </p>

    </div>
  );
}

export default App;