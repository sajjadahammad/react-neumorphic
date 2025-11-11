import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'cli/index': 'src/cli/index.ts',
    'cli/init': 'src/cli/init.ts',
    'cli/add': 'src/cli/add.ts',
  },
  format: ['esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,
  shims: true,
  external: ['react', 'react-dom'],
  async onSuccess() {
    const { copy } = await import('fs-extra');
    await copy('src/styles/global.css', 'dist/globals.css');
  },
});