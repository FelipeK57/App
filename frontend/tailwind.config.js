/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#030712',
        'bg-light': '#f9fafb',
        'text-dark': '#f9fafb',
        'text-light': '#030712',
        'text-light-lighter': '#a3a3a3',
        'text-dark-lighter': '#a3a3a3',
        'border-dark': '#f9fafb',
        'border-light': '#f3f4f6',
        'button-dark': '#f9fafb',
        'button-light': '#f3f4f6',
        'sidebar-dark': '#0f172a',
        'sidebar-light': '#f3f4f6',
      }
    },
  },
  darkMode: 'class',
  plugins: [
    require('tailwindcss-animated')
  ],
}

