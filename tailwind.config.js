/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0e1a',
        surface: '#0f172a',
        border: '#1e293b',
        accent: '#8b5cf6',
        'accent-dark': '#6366f1'
      },
      backgroundImage: {
        'gradient-yellow': 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      }
    },
  },
  plugins: [],
}