/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4ade80', // green-400
          hover: '#22c55e', // green-500
        },
        accent: {
          DEFAULT: '#fbbf24', // yellow-400
          hover: '#f59e0b', // yellow-500
        }
      }
    },
  },
  plugins: [],
}