<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <router-link to="/" class="flex items-center space-x-2">
          <i class="fa fa-exchange text-primary text-2xl"></i>
          <h1 class="text-xl md:text-2xl font-bold text-dark">API Proxy Tester</h1>
        </router-link>
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
        <button @click="showGlobalSettings" class="p-2 rounded-full hover:bg-light-1 transition-all-300">
          <i class="fa fa-cog text-dark-2"></i>
        </button>
        <button @click="showHelp" class="p-2 rounded-full hover:bg-light-1 transition-all-300">
          <i class="fa fa-question-circle text-dark-2"></i>
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
        <button @click="showGlobalSettings" class="flex items-center py-2 px-4 rounded-lg text-dark-2 hover:bg-light-1 hover:text-primary transition-all-300">
          <i class="fa fa-cog mr-2"></i>全局设置
        </button>
        <button @click="showHelp" class="flex items-center py-2 px-4 rounded-lg text-dark-2 hover:bg-light-1 hover:text-primary transition-all-300">
          <i class="fa fa-question-circle mr-2"></i>帮助
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      showMobileMenu: false
    }
  },
  methods: {
    showGlobalSettings() {
      // 通知父组件显示全局设置模态框
      try {
        this.$emit('show-global-settings')
      } catch (error) {
        console.error('事件触发失败:', error)
      }
      this.showMobileMenu = false // 关闭移动端菜单
    },
    showHelp() {
      // 通知父组件显示帮助模态框
      try {
        this.$emit('show-help')
      } catch (error) {
        console.error('事件触发失败:', error)
      }
      this.showMobileMenu = false // 关闭移动端菜单
    },
    toggleTheme() {
      // 主题切换逻辑将在主应用中实现
      try {
        this.$emit('toggle-theme')
      } catch (error) {
        console.error('事件触发失败:', error)
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