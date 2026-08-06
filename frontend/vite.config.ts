import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@a': path.resolve(__dirname, 'src/alias/index.ts'),
    },
  },
  server: {
    port: 5173,
  },
});
