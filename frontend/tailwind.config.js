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
        'bg-light': '#F3F4F6',
        'text-dark': '#F3F4F6',
        'text-light': '#030712',
        'text-light-lighter': '#6B7280',
        'text-dark-lighter': '#D1D5DB',
        'border-dark': '#f9fafb',
        'border-light': '#1F2937',
        'button-dark': '#E5E7EB',
        'button-light': '#1F2937',
        'sidebar-dark': '#111827',
        'sidebar-light': '#D1D5DB',
        'focus-sidebar-light': '#9CA3AF',
        'focus-sidebar-dark': '#1F2937',
        'component-task-light': "#E5E7EB",
        'component-task-dark': "#1F2937",
      }
    },
  },
  darkMode: 'class',
  plugins: [
    require('tailwindcss-animated')
  ],
}

