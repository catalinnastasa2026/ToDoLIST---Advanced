export default function FilterButtons({ filter, setFilter }) {
  const filters = ["All", "Active", "Completed"];

  return (
    <div className="flex gap-2 mb-4">
      {filters.map((f) => {
        const isActive = filter === f;
        const buttonClass = isActive
          ? "px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-400"
          : "px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-gray-200 hover:bg-blue-400";

        return (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={buttonClass}
          >
            {f}
          </button>
        );
      })}
    </div>
  );
}