import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Inner_Lift/', // GitHub Pages base path - matches your repo name
  server: {
    open: true // Auto-open browser
  },
  build: {
    sourcemap: true, // Enable source maps for debugging
    outDir: 'dist'
  }
})
