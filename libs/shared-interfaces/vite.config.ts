/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import { joinPathFragments } from '@nx/devkit';
import { resolve } from 'path';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/shared-interfaces',
  root: __dirname, // semble être une ligne importante, si jamais bug de build dans le futur !
  plugins: [
    dts({
      entryRoot: 'src',
      // tsconfigPath: joinPathFragments(__dirname, 'tsconfig.lib.json'),
      tsconfigPath: resolve(__dirname, 'tsconfig.lib.json'),
    }),
    react(),
    viteTsConfigPaths({
      //   root: '../../',
      // on ne remonte plus dans tout le repo, on cible uniquement le tsconfig de la lib
      projects: [resolve(__dirname, 'tsconfig.lib.json')],
      // si tu as encore du bruit (IDE, autres monorepos…), ignore les erreurs de parsing
      ignoreConfigErrors: true,
    }),
  ],

  resolve: {
    alias: [
      {
        find: '@shared-interfaces',
        replacement: resolve(__dirname, 'src/interfaces'),
      },
    ],
  },
  build: {
    outDir: '../../dist/libs/shared-interfaces',
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: 'shared-interfaces',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forgot to update your package.json as well.
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
});
