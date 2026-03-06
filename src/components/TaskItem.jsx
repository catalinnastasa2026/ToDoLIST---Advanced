export default function TaskItem({ task, toggle, remove }) {
  return (
    <li className="flex items-center justify-between p-2 border-b hover:bg-gray-200 dark:hover:bg-gray-800">
      <span
        onClick={toggle}
        className={task.completed ? "line-through cursor-pointer" : "cursor-pointer"}
      >
        {task.text}
      </span>
      <button onClick={remove} className="ml-2 text-red-500 hover:text-red-700">❌</button>
    </li>
  );
}