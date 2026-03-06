/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // include toate fișierele tale React
  ],
  darkMode: 'class', // <--- foarte important, clasa "dark" va controla tema
  theme: {
    extend: {},
  },
  plugins: [],
}