import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import mockDevServerPlugin from 'vite-plugin-mock-dev-server'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',
    port: 8001,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/papi': {
        target: 'http://localhost:9090',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/papi/, '/api')
      }
    }
  },

  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}`
    }
  },

  plugins: [vue(), mockDevServerPlugin()],

  css: {
    preprocessorOptions: {
      less: {
        globalVars: {
          'color-white': '#ffffff',
          'color-black': '#000000',
          'color-gray-border': '#e5e7eb',
          'color-gray-bg': '#f0f2f5',
          'color-link': '#1890ff'
        }
        // additionalData: '@import (reference) "./src/assets/less/global.less";'
      }
    }
  },

  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router', 'pinia'],
          'ant-design': ['ant-design-vue', '@ant-design/icons-vue']
        }
      }
    }
  }
})
