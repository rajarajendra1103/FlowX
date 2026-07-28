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
      'flowx-devtools': 'src/index.ts',
    },
    format: ['iife'],
    globalName: 'FlowXDevTools',
    minify: true,
    sourcemap: true,
    clean: false, // Don't clean to preserve standard CJS/ESM built assets
    outExtension() {
      return {
        js: '.js',
      };
    },
  },
]);
