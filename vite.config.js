import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './',  // Set the root directory to the project folder
  build: {
    outDir: 'dist',  // Output directory for the built files
    assetsDir: 'assets',  // Place assets inside an 'assets' directory in dist
    emptyOutDir: true,  // Clear old files from dist before building
    rollupOptions: {
      input: './public/index.html',  // Entry point for the build
    },
  },
  resolve: {
    alias: {
      '@': '/src',  // Create an alias for src folder to simplify imports
    },
  },
});
