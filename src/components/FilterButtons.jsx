// src/components/FilterButtons.jsx
export default function FilterButtons({ filter, setFilter }) {
  const filters = ["All", "Active", "Completed"];

  return (
    <div className="flex gap-2 mb-4">
      {filters.map(f => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-3 py-1 rounded ${
            filter === f
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
          } hover:bg-blue-400`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}