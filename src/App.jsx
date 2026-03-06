// src/App.jsx
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TaskItem from "./components/TaskItem";
import FilterButtons from "./components/FilterButtons";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [priority, setPriority] = useState("Low"); // State pentru prioritate

  // Încarcă tema din localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  // Aplică clasa 'dark' și salvează tema
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // -------------------------
  // Funcții task-uri
  // -------------------------
  const addTask = () => {
    if (!task) return;
    setTasks([...tasks, { text: task, completed: false, priority }]);
    setTask("");
    setPriority("Low");
  };

  const deleteTask = (indexToDelete) => {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  };

  const toggleTask = (indexToToggle) => {
    setTasks(tasks.map((t, index) => {
      if (index === indexToToggle) {
        if (!t.completed) alert(`Ai terminat task-ul: "${t.text}" ✅`);
        return { ...t, completed: !t.completed };
      }
      return t;
    }));
  };

  // -------------------------
  // Filtrare și search
  // -------------------------
  const filteredTasks = tasks
    .filter(t => {
      if (filter === "Active") return !t.completed;
      if (filter === "Completed") return t.completed;
      return true;
    })
    .filter(t => t.text.toLowerCase().includes(search.toLowerCase()));

  // -------------------------
  // Sortare după prioritate
  // -------------------------
  const sortedTasks = filteredTasks.sort((a, b) => {
    const order = { High: 1, Medium: 2, Low: 3 };
    return order[a.priority] - order[b.priority];
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar + toggle Light/Dark */}
      <Navbar title="Todo List Avansat">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </Navbar>

      <main className="flex-1 p-6 max-w-xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-4">Todo List Avansat - Prioritati🏆</h1>
        <h2 className="text-sm text-gray-500 mb-4">Adaugă task-uri cu priorități și gestionează-le eficient!</h2>
      
        {/* Search bar */}
        <input
          type="text"
          placeholder="Caută un task..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />

        {/* Input + priority + Add */}
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Adaugă un task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") addTask(); }}
            className="p-2 border rounded mr-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border p-1 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 mr-2"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button
            onClick={addTask}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Adaugă
          </button>
        </div>

        {/* Filter Buttons */}
        <FilterButtons filter={filter} setFilter={setFilter} />

        {/* Task List */}
        <ul>
          {sortedTasks.map((t, index) => (
            <TaskItem
              key={index}
              task={t}
              toggle={() => toggleTask(index)}
              remove={() => deleteTask(index)}
            />
          ))}
        </ul>
      </main>

      <Footer  year={2026} />
    </div>
  );
}