/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import solidPlugin from 'vite-plugin-solid'

import pkg from './package.json'

export default defineConfig({
  plugins: [
    solidPlugin(),
    dts({
      tsConfigFilePath: 'tsconfig.build.json',
      insertTypesEntry: true,
      noEmitOnError: true,
      skipDiagnostics: false,
      logDiagnostics: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    conditions: ['development', 'browser'],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    transformMode: {
      web: [/\.[jt]sx?$/],
    },
    setupFiles: './setupVitest.ts',
    // solid needs to be inline to work around
    // a resolution issue in vitest:
    deps: {
      inline: [/solid-js/],
    },
    coverage: {
      reporter: ['lcov'],
    },
    // if you have few tests, try commenting one
    // or both out to improve performance:
    threads: false,
    isolate: false,
  },

  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: format => (format === 'es' ? 'index.mjs' : 'index.cjs'),
    },
    rollupOptions: {
      external: [...Object.keys(pkg.dependencies), 'solid-js/web', 'solid-js/store'],
    },
    target: 'esnext',
    polyfillDynamicImport: false,
  },
})
