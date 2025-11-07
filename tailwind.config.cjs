/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#020617',
        surface: '#050816',
        border: '#111827',
        accent: {
          DEFAULT: '#facc15',
          light: '#fde047',
          dark: '#fbbf24',
          muted: 'rgba(250, 204, 21, 0.08)'
        }
      },
      boxShadow: {
        'glow': '0 0 15px rgba(250, 204, 21, 0.15)',
        'glow-sm': '0 0 10px rgba(250, 204, 21, 0.1)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at top left, rgba(250,204,21,0.1), #020617 55%, #000 100%)',
        'gradient-yellow': 'linear-gradient(to right, #facc15, #fbbf24)'
      }
    },
  },
  plugins: [],
}
