import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'flowx-charts': 'src/index.ts',
    index: 'src/index.ts',
  },
  format: ['iife', 'esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  minify: true,
  globalName: 'FlowXCharts',
  target: 'es2022',
});
