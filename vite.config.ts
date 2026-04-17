import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 7777,
    watch: {
      ignored: ['**/stitch/**']
    }
  },
  optimizeDeps: {
    // Explicitly define entry points to prevent Vite from scanning the 'stitch' folder
    entries: ['index.html'],
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
})
