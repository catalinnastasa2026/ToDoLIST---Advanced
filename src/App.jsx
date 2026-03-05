import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task === "") return;

     setTasks([...tasks, { text: task, completed: false }]);
    setTask(""); // golește input
  };
const deleteTask = (indexToDelete) => {
  const newTasks = tasks.filter((_, index) => index !== indexToDelete);
  setTasks(newTasks);
};
const toggleTask = (indexToToggle) => {  // <<-- PASUL 3
    const updatedTasks = tasks.map((t, index) => {
      if (index === indexToToggle) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    setTasks(updatedTasks);
  };
  return (
    <main style={{ padding: "20px" }}>
      <h1>Ziua mea trista – Todo List 📝</h1>

      <input
        type="text"
        placeholder="Adaugă un task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => {
    if (e.key === "Enter") {
      addTask();
    }
  }}
        style={{ padding: "10px", marginRight: "10px" }}
      />

      <button onClick={addTask}>
        Adaugă
      </button>
<ul>
  {tasks.map((t, index) => (
    <li key={index}>
      <input
        type="checkbox"
        checked={t.completed}
        onChange={() => toggleTask(index)}
      />

      <span
        style={{
          textDecoration: t.completed ? "line-through" : "none",
          marginLeft: "10px",
        }}
      >
        {t.text}
      </span>

      <button onClick={() => deleteTask(index)} style={{ marginLeft: "10px" }}>
        ❌
      </button>
    </li>
  ))}
</ul>
    </main>
  );
}

export default App;