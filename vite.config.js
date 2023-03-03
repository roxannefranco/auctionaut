import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import { resolve } from 'path'

export default defineConfig({
  // Config options
  plugins: [eslint()],
  server: { port: 8000 },
  // Allows better structure inside src folder
  root: 'src',
  publicDir: 'public',
  build: {
    outDir: '../dist',
    // Config to build the necessary pages
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        login: resolve(__dirname, 'src/login.html'),
        register: resolve(__dirname, 'src/register.html'),
        profile: resolve(__dirname, 'src/profile.html'),
        single: resolve(__dirname, 'src/single.html'),
        new: resolve(__dirname, 'src/new.html'),
        edit: resolve(__dirname, 'src/edit.html')
      }
    }
  }
})
