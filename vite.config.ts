import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import NodeModulesPolyfill from '@esbuild-plugins/node-modules-polyfill'
import NodeGlobalsPolyfill from '@esbuild-plugins/node-globals-polyfill'
import nodePolyfills from 'rollup-plugin-polyfill-node'

export default defineConfig(({command, mode}) => {
  return {
    plugins: [
      react(),
    ],
    optimizeDeps: {
      esbuildOptions: {
        plugins: [
          NodeModulesPolyfill(),
          NodeGlobalsPolyfill({
            buffer: true,
            process: true,
          }),
        ],
      },
    },
    build: {
      sourcemap: true,
      emptyOutDir: true,
      rollupOptions: {
        plugins: [
          nodePolyfills(),
        ],
      },
    },
    server: command === 'serve' ? {open: '/'} : undefined,
  }
})
