// src/components/TaskItem.jsx
import { useState } from "react";

export default function TaskItem({ task, toggle, remove, edit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);

  const save = () => {
    if (text.trim()) edit(text);
    setIsEditing(false);
  };

  const categoryStyles = {
    Work: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
    Personal: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
    Other: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
  };

  const deadlineStatus = task.deadline
    ? (() => {
        const days = differenceInDays(new Date(task.deadline), new Date());
        if (days < 0) return { text: "Întârziat!", color: "text-red-600" };
        if (days === 0) return { text: "Azi!", color: "text-orange-600" };
        if (days <= 3) return { text: `În ${days} zile`, color: "text-yellow-600" };
        return { text: `În ${days} zile`, color: "text-green-600" };
      })()
    : null;

  return (
    <div
      className={`group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200 ${
        task.completed ? "opacity-75" : ""
      }`}
    >
      <div className="flex items-start gap-4 flex-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggle}
          className="mt-1.5 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />

        {isEditing ? (
          <input
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={save}
            onKeyDown={(e) => e.key === "Enter" && save()}
            className="flex-1 p-1 bg-transparent border-b-2 border-blue-500 focus:outline-none"
          />
        ) : (
          <div className="flex-1">
            <p
              className={`font-medium ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.text}
            </p>

            <div className="flex flex-wrap gap-2 mt-1.5 text-xs">
              <span
                className={`px-2.5 py-0.5 rounded-full font-medium ${categoryStyles[task.category]}`}
              >
                {task.category}
              </span>
              <span className={`font-medium ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
              {deadlineStatus && (
                <span className={`font-medium ${deadlineStatus.color}`}>
                  {deadlineStatus.text}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 opacity-70 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-500 hover:text-blue-700"
        >
          {isEditing ? "Salvează" : "Editează"}
        </button>
        <button onClick={remove} className="text-red-500 hover:text-red-700">
          Șterge
        </button>
      </div>
    </div>
  );
}

function getPriorityColor(prio) {
  if (prio === "High") return "text-red-600";
  if (prio === "Medium") return "text-yellow-600";
  return "text-green-600";
}