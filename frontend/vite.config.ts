import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0',
    middlewareMode: false,
    cors: true,
    // HMR optimization for faster refreshes
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    },
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'firebase/app',
      'firebase/auth',
      'firebase/firestore',
      'firebase/messaging',
      'lucide-react',
    ],
    exclude: ['@vite/client', '@vite/env'],
    // Faster parsing
    esbuildOptions: {
      target: 'esnext',
    },
  },
  // Build optimizations
  build: {
    target: 'esnext',
    minify: 'esbuild', // Use esbuild minifier (included by default)
    rollupOptions: {
      output: {
        // Manual chunks to reduce initial load
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/messaging'],
          ui: ['lucide-react'],
        },
      },
    },
  },
});
