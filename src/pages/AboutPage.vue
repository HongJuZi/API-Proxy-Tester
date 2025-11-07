<template>
  <div class="about-page">
    <!-- 顶部导航栏 -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="container mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <i class="fa fa-exchange text-primary text-2xl"></i>
          <h1 class="text-xl md:text-2xl font-bold text-dark">API Proxy Tester</h1>
        </div>
        <!-- 桌面端导航 -->
        <div class="hidden md:flex items-center space-x-4">
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
        <!-- 移动端菜单按钮 -->
        <button @click="toggleMobileMenu" class="md:hidden p-2 rounded-full hover:bg-light-1 transition-all-300">
          <i class="fa fa-bars text-dark-2"></i>
        </button>
      </div>
      <!-- 移动端导航菜单 -->
      <div v-if="showMobileMenu" class="md:hidden bg-white border-t border-light-2 py-2 px-4">
        <div class="flex flex-col space-y-3">
          <button @click="navigateTo('/')"
            :class="['flex items-center py-2 px-4 rounded-lg', { 'bg-primary/10 text-primary font-medium': $route.path === '/' }]">
            <i class="fa fa-home mr-2"></i>首页
          </button>
          <a href="https://www.hongjuzi.com.cn" target="_blank" rel="noopener noreferrer"
            class="flex items-center py-2 px-4 rounded-lg text-dark-2 hover:bg-light-1 hover:text-primary transition-all-300">
            <i class="fa fa-globe mr-2"></i>官网
          </a>
          <a href="https://github.com/HongJuZi/API-Proxy-Tester" target="_blank" rel="noopener noreferrer"
            class="flex items-center py-2 px-4 rounded-lg text-dark-2 hover:bg-light-1 hover:text-primary transition-all-300">
            <i class="fa fa-github mr-2"></i>GitHub
          </a>
          <button @click="navigateTo('/about')"
            :class="['flex items-center py-2 px-4 rounded-lg', { 'bg-primary/10 text-primary font-medium': $route.path === '/about' }]">
            <i class="fa fa-info-circle mr-2"></i>关于
          </button>
          <button @click="toggleTheme" class="flex items-center py-2 px-4 rounded-lg text-dark-2 hover:bg-light-1 hover:text-primary transition-all-300">
            <i class="fa fa-moon-o mr-2"></i>切换主题
          </button>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-6 md:py-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-2xl md:text-3xl font-bold text-dark mb-4 md:mb-6">关于我们</h1>
        
        <div class="bg-white rounded-xl shadow-card p-4 md:p-6 mb-6 md:mb-8">
          <h2 class="text-xl md:text-2xl font-semibold text-dark mb-3 md:mb-4">项目介绍</h2>
          <p class="text-dark-2 mb-3 md:mb-4 text-sm md:text-base">
            API Proxy Tester 是一个现代化的API代理测试工具，旨在帮助开发者和测试人员轻松测试和调试API接口。
            该工具提供了直观的用户界面，支持多种HTTP请求方法，包括GET、POST、PUT、DELETE等。
          </p>
          <p class="text-dark-2 mb-3 md:mb-4 text-sm md:text-base">
            通过API Proxy Tester，您可以：
          </p>
          <ul class="list-disc list-inside text-dark-2 text-sm md:text-base space-y-1">
            <li>发送各种类型的HTTP请求</li>
            <li>配置请求参数和请求头</li>
            <li>查看详细的响应信息</li>
            <li>生成API文档</li>
            <li>保存和管理历史请求</li>
          </ul>
        </div>

        <div class="bg-white rounded-xl shadow-card p-4 md:p-6 mb-6 md:mb-8">
          <h2 class="text-xl md:text-2xl font-semibold text-dark mb-3 md:mb-4">技术栈</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div class="border border-light-2 rounded-lg p-3 md:p-4">
              <h3 class="font-semibold text-lg mb-2">前端技术</h3>
              <ul class="list-disc list-inside text-dark-2 text-sm md:text-base space-y-1">
                <li>Vue 3</li>
                <li>Vue Router</li>
                <li>Tailwind CSS</li>
                <li>Axios</li>
              </ul>
            </div>
            <div class="border border-light-2 rounded-lg p-3 md:p-4">
              <h3 class="font-semibold text-lg mb-2">构建工具</h3>
              <ul class="list-disc list-inside text-dark-2 text-sm md:text-base space-y-1">
                <li>Vite</li>
                <li>PostCSS</li>
                <li>Autoprefixer</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-card p-4 md:p-6">
          <h2 class="text-xl md:text-2xl font-semibold text-dark mb-3 md:mb-4">开发团队</h2>
          <p class="text-dark-2 mb-3 md:mb-4 text-sm md:text-base">
            本项目由红橘子科技开发团队创建和维护。我们致力于为开发者提供高质量、易用的工具，
            帮助提高开发效率和代码质量。
          </p>
          <div class="flex items-center text-sm md:text-base">
            <i class="fa fa-copyright text-dark-2 mr-2"></i>
            <span class="text-dark-2">2025 红橘子科技</span>
          </div>
        </div>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="mt-8 md:mt-16 py-4 md:py-6 text-center text-xs md:text-sm text-gray-500 border-t border-gray-200">
      <p>© 2025 API Proxy Tester</p>
      <p class="mt-1">开源许可协议：MIT</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  data() {
    return {
      showMobileMenu: false
    }
  },
  methods: {
    toggleTheme() {
      // 简单的主题切换示例
      const body = document.body
      if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode')
      } else {
        body.classList.add('dark-mode')
      }
    },
    
    // 移动端菜单切换
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
    },
    
    // 导航方法
    navigateTo(path) {
      this.$router.push(path)
      this.showMobileMenu = false // 关闭移动端菜单
    }
  }
}
</script>

<style scoped>
/* 页面特定样式 */
</style>