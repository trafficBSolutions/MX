// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './',  // Root directory of the project
  build: {
    outDir: 'dist',  // Ensure it builds to 'dist'
    assetsDir: 'assets',  // Directory for assets within the output folder
  },
  resolve: {
    alias: {
      '@': '/src',  // Allows you to use `@` as an alias for `src`
    },
  },
});
