import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import { resolve } from 'path'

export default defineConfig({
  // Config options
  plugins: [eslint()],
  server: { port: 8000 },
  // Allows better structure inside src folder
  root: 'src',
  build: {
    // Config to build the necessary pages
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        login: resolve(__dirname, 'src/login.html')
      }
    }
  }
})
