import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/styles/globals.css'],
  format: ['esm'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  minify: true,
  external: ['react', 'react-dom'],
  async onSuccess() {
    const { copy } = await import('fs-extra');
    await copy('src/styles/globals.css', 'dist/globals.css');
  },
});