import { defineConfig } from 'tsup';

export default defineConfig([
  // Library builds (CJS + ESM with type declarations)
  {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    sourcemap: true,
    clean: true,
    outDir: 'dist',
    name: 'headbreaker',
    external: ['konva'],
  },
  // Browser bundle for docs (IIFE with konva bundled)
  {
    entry: { headbreaker: 'src/index.ts' },
    format: ['iife'],
    globalName: 'headbreaker',
    sourcemap: true,
    outDir: 'docs/js',
    clean: false,
    outExtension() {
      return { js: '.js' };
    },
  },
]);
