// src/App.jsx
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"; // ← schimbat aici
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format, differenceInDays } from "date-fns";           // npm i date-fns
// import { CalendarDays, Briefcase, User, Folder } from "lucide-react"; // opțional icons

export default function App() {
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState(""); // YYYY-MM-DD
  const [category, setCategory] = useState("Personal");
  const [priority, setPriority] = useState("Low");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    setDarkMode(saved === "dark");
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),               // id stabil pentru drag&drop
        text: task,
        completed: false,
        priority,
        category,
        deadline: deadline || null,
      },
    ]);
    setTask("");
    setDeadline("");
    setCategory("Personal");
    setPriority("Low");
    toast.success("Task adăugat! 🚀");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
    toast.info("Task șters 🗑️");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
            }
          : t
      )
    );
    const found = tasks.find((t) => t.id === id);
    if (found && !found.completed) {
      toast.success(`Felicitări! „${found.text}” terminat 🎉`);
    }
  };

  const editTask = (id, newText) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  };

  // Filtrare & căutare
  let visibleTasks = tasks
    .filter((t) => {
      if (filter === "Active") return !t.completed;
      if (filter === "Completed") return t.completed;
      return true;
    })
    .filter((t) =>
      t.text.toLowerCase().includes(search.toLowerCase())
    )
    .filter((t) => categoryFilter === "All" || t.category === categoryFilter);

  // Sortare: priority → apoi după deadline (urgent first)
  visibleTasks = visibleTasks.sort((a, b) => {
    const prioOrder = { High: 0, Medium: 1, Low: 2 };
    const prioDiff = prioOrder[a.priority] - prioOrder[b.priority];
    if (prioDiff !== 0) return prioDiff;

    // Deadline mai apropiat → mai sus
    if (!a.deadline) return 1;
    if (!b.deadline) return -1;
    return new Date(a.deadline) - new Date(b.deadline);
  });

  const stats = {
    total: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setTasks(items);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Navbar */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Todo PRO
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-10">
        {/* Stats cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
            <p className="text-2xl font-bold text-blue-600">{stats.active}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Gata</p>
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          </div>
        </div>

        {/* Add task form */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              placeholder="Ce trebuie făcut azi?..."
              className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent"
            >
              <option value="Personal">Personal</option>
              <option value="Work">Muncă</option>
              <option value="Other">Altele</option>
            </select>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <button
              onClick={addTask}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
            >
              Adaugă
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          {["All", "Active", "Completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"
              }`}
            >
              {f}
            </button>
          ))}

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-sm"
          >
            <option value="All">Toate categoriile</option>
            <option value="Personal">Personal</option>
            <option value="Work">Muncă</option>
            <option value="Other">Altele</option>
          </select>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Caută..."
            className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-sm flex-1 min-w-[180px]"
          />
        </div>

        {/* Task list */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-3"
              >
                {visibleTasks.map((t, idx) => (
                  <Draggable key={t.id} draggableId={String(t.id)} index={idx}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskItem
                          task={t}
                          toggle={() => toggleTask(t.id)}
                          remove={() => deleteTask(t.id)}
                          edit={(newText) => editTask(t.id, newText)}
                        />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>

        {visibleTasks.length === 0 && (
          <p className="text-center text-gray-400 mt-12">
            Niciun task aici... adaugă ceva! ✨
          </p>
        )}
      </main>

      <ToastContainer position="bottom-right" theme={darkMode ? "dark" : "light"} />
    </div>
  );
}