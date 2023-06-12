/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/front',
  server: {
    port: 1418,
    host: 'localhost',
    strictPort: true
  },
  preview: {
    port: 31000,
    host: 'localhost',
  },
  build: {
    assetsInlineLimit: 20000,
  },
  plugins: [
    react(),
    viteTsConfigPaths({
      root: '../../',
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },
});
