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
  // base: '/tools/',
  build: {
    // 打包输出到dist目录
    outDir: 'dist/',
    assetsDir: 'assets',
    // 确保构建产物适应部署在/tools/路径下
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  // 添加别名和资源处理配置
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})