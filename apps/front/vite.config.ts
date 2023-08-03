import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/front',
  plugins: [tsconfigPaths(), react()],
  envDir:'environments',
  server: {
    port: 1418,
    host: 'localhost',
    strictPort: true,
  },
  preview: {
    port: 31000,
    host: 'localhost',
  },
  build: {
    assetsInlineLimit: 20000,
  },
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      {
        find: '@styles',
        replacement: '/src/styles',
      },
      {
        find: '@assets',
        replacement: '/src/assets',
      },
      {
        find: '@app',
        replacement: '/src/app',
      },
      {
        find: '@shared',
        replacement: '/src/shared',
      },
      {
        find: '@components',
        replacement: '/src/shared/components',
      },
      {
        find: '@hooks',
        replacement: '/src/shared/hooks',
      },
      // { IDK WHY ITS NOT WORKING FOR EXTERN LIBRARY ...
      //   find: '@shared-interfaces',
      //   replacement: '../../libs/shared-interfaces/src/interfaces/*',
      // },
    ],
  },

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },
});
