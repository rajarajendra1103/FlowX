import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs', 'iife'],
  globalName: 'FlowX',
  dts: true,
  minify: true,
  sourcemap: true,
  clean: true,
  target: 'es2020',
  splitting: false,
});
