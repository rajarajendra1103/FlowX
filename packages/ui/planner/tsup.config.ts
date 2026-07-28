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
      'flowx-planner': 'src/index.ts',
    },
    format: ['iife'],
    globalName: 'FlowXPlanner',
    minify: true,
    sourcemap: true,
    clean: false,
    outExtension() {
      return { js: '.js' };
    },
  },
]);
