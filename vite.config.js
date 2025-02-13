import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    host: true,
    hmr: {
      clientPort: 443
    }
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia']
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})