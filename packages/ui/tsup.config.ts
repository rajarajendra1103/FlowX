import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    minify: true,
    sourcemap: true,
    clean: true,
  },
  {
    entry: {
      'flowx-ui': 'src/index.ts',
    },
    format: ['iife'],
    globalName: 'FlowXUI',
    minify: true,
    sourcemap: true,
    clean: false, // preserve standard CJS/ESM
    outExtension() {
      return {
        js: '.js',
      };
    },
  },
]);
