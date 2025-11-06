<template>
  <div class="home-page">
    <!-- 顶部导航栏 -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="container mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <i class="fa fa-exchange text-primary text-2xl"></i>
          <h1 class="text-xl md:text-2xl font-bold text-dark">API Proxy Tester</h1>
        </div>
        <div class="flex items-center space-x-4">
          <button @click="$router.push('/')" :class="['text-dark-2 hover:text-primary transition-all-300', { 'text-primary font-medium': $route.path === '/' }]">
            <i class="fa fa-home mr-1"></i>首页
          </button>
          <a href="https://www.hongjuzi.com.cn" target="_blank" rel="noopener noreferrer" class="text-dark-2 hover:text-primary transition-all-300">
            <i class="fa fa-globe mr-1"></i>官网
          </a>
          <a href="https://github.com/HongJuZi/API-Proxy-Tester" target="_blank" rel="noopener noreferrer" class="text-dark-2 hover:text-primary transition-all-300">
            <i class="fa fa-github mr-1"></i>GitHub
          </a>
          <button @click="$router.push('/about')" :class="['text-dark-2 hover:text-primary transition-all-300', { 'text-primary font-medium': $route.path === '/about' }]">
            <i class="fa fa-info-circle mr-1"></i>关于
          </button>
          <button @click="toggleTheme" class="p-2 rounded-full hover:bg-light-1 transition-all-300">
            <i class="fa fa-moon-o text-dark-2"></i>
          </button>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-dark mb-4">欢迎使用 API Proxy Tester</h1>
        <p class="text-lg text-dark-2 mb-8">现代化的API测试工具，帮助您轻松测试和调试API接口</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <!-- API测试工具卡片 -->
        <div class="bg-white rounded-xl shadow-card p-6 hover:shadow-hover transition-all-300 cursor-pointer" 
             @click="$router.push('/api-test')">
          <div class="flex items-center mb-4">
            <i class="fa fa-terminal text-primary text-2xl mr-3"></i>
            <h2 class="text-xl font-semibold">API测试工具</h2>
          </div>
          <p class="text-dark-2 mb-4">完整的API测试解决方案，支持多种请求方式和参数配置</p>
          <div class="flex items-center text-primary">
            <span>立即使用</span>
            <i class="fa fa-arrow-right ml-2"></i>
          </div>
        </div>

        <!-- 文档生成工具卡片 -->
        <div class="bg-white rounded-xl shadow-card p-6 hover:shadow-hover transition-all-300 cursor-pointer" 
             @click="$router.push('/api-test')">
          <div class="flex items-center mb-4">
            <i class="fa fa-file-text-o text-secondary text-2xl mr-3"></i>
            <h2 class="text-xl font-semibold">文档生成工具</h2>
          </div>
          <p class="text-dark-2 mb-4">自动生成API文档，支持Markdown和HTML格式</p>
          <div class="flex items-center text-secondary">
            <span>立即使用</span>
            <i class="fa fa-arrow-right ml-2"></i>
          </div>
        </div>

        <!-- Mock服务卡片 -->
        <div class="bg-white rounded-xl shadow-card p-6 hover:shadow-hover transition-all-300 opacity-50">
          <div class="flex items-center mb-4">
            <i class="fa fa-server text-accent text-2xl mr-3"></i>
            <h2 class="text-xl font-semibold">Mock服务</h2>
          </div>
          <p class="text-dark-2 mb-4">快速创建Mock API，模拟真实接口响应</p>
          <div class="flex items-center text-dark-2">
            <span>即将上线</span>
          </div>
        </div>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="mt-16 py-6 text-center text-sm text-gray-500 border-t border-gray-200">
      <p>© 2025 API Proxy Tester</p>
      <p>开源许可协议：MIT</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  methods: {
    toggleTheme() {
      // 简单的主题切换示例
      const body = document.body
      if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode')
      } else {
        body.classList.add('dark-mode')
      }
    }
  }
}
</script>

<style scoped>
/* 页面特定样式 */
</style>