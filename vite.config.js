import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd())
  
  // 从环境变量中获取配置，如果没有则使用默认值
  const baseDir = env.VITE_BASE_DIR || '/'
  const outDir = env.VITE_OUT_DIR || 'dist/'
  const assetsDir = env.VITE_ASSETS_DIR || 'assets'
  
  return {
    plugins: [vue()],
    server: {
      port: 8080,
      open: true
    },
    // 使用环境变量中的baseDir
    base: baseDir,
    build: {
      // 打包输出目录
      outDir: outDir,
      assetsDir: assetsDir,
      // 确保构建产物适应部署路径
      rollupOptions: {
        output: {
          chunkFileNames: `${assetsDir}/[name]-[hash].js`,
          entryFileNames: `${assetsDir}/[name]-[hash].js`,
          assetFileNames: `${assetsDir}/[name]-[hash].[ext]`
        }
      }
    },
    // 添加别名和资源处理配置
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  }
})