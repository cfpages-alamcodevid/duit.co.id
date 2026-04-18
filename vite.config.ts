import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import { viteContentPlugin } from "./vite-content-plugin"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteContentPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 7777,
  },
})
