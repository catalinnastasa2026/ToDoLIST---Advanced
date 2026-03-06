// src/components/Footer.jsx
export default function Footer({ year }) {
  return (
    <footer className="p-4 text-center bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 mt-auto">
      &copy; {year} – Toate drepturile rezervate
    </footer>
  );
}