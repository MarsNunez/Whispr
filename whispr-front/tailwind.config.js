/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Si usas App Router
    "./pages/**/*.{js,ts,jsx,tsx}", // Si usas Pages Router
    "./components/**/*.{js,ts,jsx,tsx}", // Rutas adicionales si las tienes
  ],
  darkMode: "class", // Habilita el modo oscuro basado en una clase
  theme: {
    extend: {},
  },
  plugins: [],
};
