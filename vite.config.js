import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',  // Change this to 'build' to match the Netlify setting
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html') // Point to the correct index.html
    }
  }
})
