/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#020617',
        surface: '#0f172a',
        border: '#1e293b',
        accent: '#facc15',
        'accent-dark': '#ca8a04'
      },
      backgroundImage: {
        'gradient-yellow': 'linear-gradient(to right, #facc15, #fbbf24)',
      }
    },
  },
  plugins: [],
}