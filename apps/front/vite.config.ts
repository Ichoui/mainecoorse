import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/front',
  plugins: [
    tsconfigPaths(),
    react(),
    VitePWA({
      // https://vite-pwa-org.netlify.app/examples/react.html
      // https://github.com/vite-pwa/vite-plugin-pwa/
      // https://web.dev/add-manifest/ manifest
      // https://maskable.app/editor <-- pour générer les icones avec fond de couleur
      // Utiliser lightHouse pour tester le PWA
      registerType: 'autoUpdate',
      workbox: {
        // clientsClaim: true, // <-- this one generate sw.js and workbox-xxx.js
        // skipWaiting: true,
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  envDir: 'environments',
  publicDir: 'public',
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
    outDir: '../../dist/apps/front',
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
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
