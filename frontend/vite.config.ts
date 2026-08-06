/**
 * Vite development and build configuration.
 * @module vite.config
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@a': path.resolve(__dirname, 'src/alias/index.ts'),
    },
  },
  server: {
    port: 5173,
  },
});
