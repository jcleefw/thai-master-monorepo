import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    fs: {
      // Allow serving files from the monorepo root
      allow: ['../../'],
    },
  },
  resolve: {
    alias: {
      // Force all packages to use the app's React instance
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'styled-components': path.resolve(__dirname, 'node_modules/styled-components'),
    },
  },
  // Look for .env files in the monorepo root (two levels up)
  envDir: path.resolve(__dirname, '../../'),
  // Add this to ensure Vite doesn't try to use the pre-bundled fuse/dist in dev
  optimizeDeps: {
    exclude: ['@thai-master/fuse'],
  },
});
