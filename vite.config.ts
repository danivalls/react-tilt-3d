/// <reference types="vitest" />

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { peerDependencies } from './package.json';

const testFiles = ['**/*.test.ts', '**/*.test.tsx'];

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'rotate-follow-cursor',
      fileName: (format) => `index.${format}.js`,
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies)], //
    },
    sourcemap: true,
    emptyOutDir: true,
    minify: 'terser',
  },
  test: {
    include: testFiles,
    environment: 'jsdom',
    globals: true,
  },
  plugins: [dts({ exclude: testFiles })],
});
