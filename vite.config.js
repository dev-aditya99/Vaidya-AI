import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
  },
  server: {
    // For dev only
    historyApiFallback: true,
  },
  // For production deployment on static hosts like Render
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
