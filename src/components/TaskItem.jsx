// src/components/TaskItem.jsx

export default function TaskItem({ task, toggle, remove }) {

  const priorityColor = {
    High: "text-red-500",
    Medium: "text-yellow-500",
    Low: "text-green-500"
  };

  return (
    <li className="flex justify-between items-center border p-2 mb-2 rounded bg-white dark:bg-gray-800">

      <div className="flex items-center gap-3">

        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggle}
        />

        <span
          className={`${
            task.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {task.text}
        </span>

        <span
          className={`text-sm font-bold ${priorityColor[task.priority]}`}
        >
          {task.priority}
        </span>

      </div>

      <button
        onClick={remove}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>

    </li>
  );
}