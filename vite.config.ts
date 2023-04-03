import { defineConfig } from "vite"
import path from "path"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "localhost",
    port: 8001,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/papi": {
        target: "http://localhost:9090",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/papi/, "/api"),
      },
    },
  },

  resolve: {
    alias: {
      "@": `${path.resolve(__dirname, "src")}`,
    },
  },

  plugins: [vue()],

  css: {
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/assets/less/global.less";',
      },
    },
  },
})
