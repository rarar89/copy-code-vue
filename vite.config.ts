import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    dts({ 
      include: ['src'],
      tsconfigPath: './tsconfig.app.json'
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CopyCodeVue',
      // the proper extensions will be added
      fileName: 'copy-code-vue',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})