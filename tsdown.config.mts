import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['cjs'],
    dts: false,
    sourcemap: true,
    clean: true,
    fixedExtension: false,
    outExtensions() {
      return { js: '.js' };
    },
    outDir: 'dist',
    name: 'headbreaker-ts',
    deps: {
      neverBundle: ['konva'],
    },
  },
  {
    entry: ['src/index.ts'],
    format: ['esm'],
    dts: true,
    sourcemap: true,
    clean: false,
    fixedExtension: false,
    outExtensions() {
      return { js: '.mjs', dts: '.d.ts' };
    },
    outDir: 'dist',
    name: 'headbreaker-ts',
    deps: {
      neverBundle: ['konva'],
    },
  },
  {
    entry: { headbreaker: 'src/index.ts' },
    format: ['iife'],
    globalName: 'headbreaker',
    deps: {
      alwaysBundle: ['konva'],
    },
    platform: 'browser',
    sourcemap: true,
    fixedExtension: false,
    outDir: 'docs/public/js',
    clean: false,
    outExtensions() {
      return { js: '.js' };
    },
    outputOptions: {
      entryFileNames: '[name].js',
      chunkFileNames: '[name].js',
    },
  },
]);
