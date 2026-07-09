import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Root path for the GitHub Pages user site.
  base: '/',

  build: {
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react'],
        },
      },
    },
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 800,
  },

  server: {
    port: 5173,
    open: true,
  },
});
