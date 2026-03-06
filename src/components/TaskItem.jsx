// src/components/TaskItem.jsx
export default function TaskItem({ task, toggle, remove }) {
  return (
    <li className="flex items-center justify-between p-2 border-b border-gray-300 dark:border-gray-600">
      <span
        onClick={toggle}
        className={`cursor-pointer ${
          task.completed ? "line-through text-gray-400 dark:text-gray-500" : ""
        }`}
      >
        {task.text}
      </span>
      <button
        onClick={remove}
        className="ml-2 text-red-500 hover:text-red-700"
      >
        ❌
      </button>
    </li>
  );
}