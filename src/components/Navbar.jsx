// src/components/Navbar.jsx
export default function Navbar({ title, children }) {
  return (
    <header className="p-4 flex justify-between items-center bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <h1 className="text-xl font-bold">{title}</h1>
      <div>{children}</div>
    </header>
  );
}