// App.jsx
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TaskItem from "./components/TaskItem";
import FilterButtons from "./components/FilterButtons";

export default function App() {
  // === State-uri principale ===
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // === Persistență tasks și theme ===
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.className = theme; // aplică clasa pe <html> pentru Tailwind dark
  }, [theme]);

  // === Funcții CRUD ===
  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { text: task.trim(), completed: false }]);
    setTask("");
  };

  const deleteTask = (indexToDelete) => {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  };

  const toggleTask = (indexToToggle) => {
    setTasks(tasks.map((t, index) =>
      index === indexToToggle ? { ...t, completed: !t.completed } : t
    ));
  };

  // === Filtrare și search ===
  const filteredTasks = tasks
    .filter(t => {
      if (filter === "Active") return !t.completed;
      if (filter === "Completed") return t.completed;
      return true;
    })
    .filter(t => t.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar title="Site-ul lui Nastasa" />

      <main className="flex-1 max-w-xl mx-auto w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold"> – Todo List 🚀</h1>
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="px-3 py-1 border rounded bg-gray-200 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Caută task..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Input + Add button */}
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Adaugă un task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") addTask(); }}
            className="p-2 border rounded mr-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
          {filteredTasks.map((t, index) => (
            <TaskItem
              key={index}
              task={t}
              toggle={() => toggleTask(index)}
              remove={() => deleteTask(index)}
            />
          ))}
        </ul>
      </main>

      <Footer year={2026} />
    </div>
  );
}