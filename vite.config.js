import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080,
    open: true
  },
  // 设置为相对路径，确保在任何路径下都能正常访问，包括带端口号的URL
  base: './',
  build: {
    outDir: 'dist/',
    assetsDir: 'assets'
  },
  // 添加CSS相关配置，确保Font Awesome正常工作
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "node_modules/font-awesome/scss/font-awesome.scss";`
      }
    }
  },
  // 添加别名和资源处理配置
  resolve: {
    alias: {
      'font-awesome': 'node_modules/font-awesome'
    }
  }
})