/**
 * Vitest configuration for frontend tests.
 * @module vitest.config
 */
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({ plugins: [react()], resolve: { alias: { '@': path.resolve(__dirname, 'src'), '@a': path.resolve(__dirname, 'src/alias/index.ts') } }, test: { environment: 'jsdom', include: ['src/**/*.test.tsx'] } });
