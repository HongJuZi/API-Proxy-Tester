<template>
  <header class="bg-white shadow-md sticky top-0 z-50 backdrop-blur-sm bg-opacity-90 w-full">
    <div class="w-full px-4 py-3 flex items-center justify-between">
      <div class="flex items-center space-x-3 hover cursor-pointer" @click="$router.push('/')">
        <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <i class="fa fa-exchange text-primary text-xl"></i>
        </div>
        <h1 class="text-xl md:text-2xl font-bold text-dark bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">API Proxy Tester</h1>
      </div>
      <!-- 桌面端导航 -->
      <div class="hidden md:flex items-center space-x-1">
        <button @click="$router.push('/')" 
                :class="['px-4 py-2 rounded-lg font-medium transition-all-300 flex items-center space-x-1', 
                        { 'bg-primary/10 text-primary': $route.path === '/' },
                        { 'text-dark-2 hover:bg-light-1 hover:text-primary': $route.path !== '/' }]">
          <i class="fa fa-home"></i>
          <span>首页</span>
        </button>
        <a href="https://www.hongjuzi.com.cn" target="_blank" rel="noopener noreferrer" 
           class="px-4 py-2 rounded-lg text-dark-2 hover:bg-light-1 hover:text-primary transition-all-300 flex items-center space-x-1">
          <i class="fa fa-globe"></i>
          <span>官网</span>
        </a>
        <a href="https://github.com/HongJuZi/API-Proxy-Tester" target="_blank" rel="noopener noreferrer" 
           class="px-4 py-2 rounded-lg text-dark-2 hover:bg-light-1 hover:text-primary transition-all-300 flex items-center space-x-1">
          <i class="fab fa-github"></i>
          <span>GitHub</span>
        </a>
        <button @click="$router.push('/about')" 
                :class="['px-4 py-2 rounded-lg font-medium transition-all-300 flex items-center space-x-1', 
                        { 'bg-primary/10 text-primary': $route.path === '/about' },
                        { 'text-dark-2 hover:bg-light-1 hover:text-primary': $route.path !== '/about' }]">
          <i class="fa fa-info-circle"></i>
          <span>关于</span>
        </button>
        <button @click="toggleTheme" class="p-2 rounded-lg hover:bg-light-1 text-dark-2 hover:text-primary transition-all-300">
          <i class="fa fa-moon"></i>
          <span>切换主题</span>
        </button>
      </div>
      <!-- 移动端菜单按钮 -->
      <button @click="toggleMobileMenu" class="md:hidden p-2 rounded-lg hover:bg-light-1 text-dark-2 hover:text-primary transition-all-300">
        <i class="fa fa-bars text-xl"></i>
      </button>
    </div>
    <!-- 移动端导航菜单 -->
    <div v-if="showMobileMenu" class="md:hidden bg-white border-t border-light-2 py-3 px-4 shadow-lg">
      <div class="flex flex-col space-y-2">
        <button @click="navigateTo('/')"
                :class="['flex items-center py-3 px-4 rounded-lg font-medium transition-all-300', 
                        { 'bg-primary/10 text-primary': $route.path === '/' },
                        { 'text-dark-2 hover:bg-light-1': $route.path !== '/' }]">
          <i class="fa fa-home mr-3 text-lg"></i>
          <span>首页</span>
        </button>
        <a href="https://www.hongjuzi.com.cn" target="_blank" rel="noopener noreferrer"
           class="flex items-center py-3 px-4 rounded-lg text-dark-2 hover:bg-light-1 transition-all-300">
          <i class="fa fa-globe mr-3 text-lg"></i>
          <span>官网</span>
        </a>
        <a href="https://github.com/HongJuZi/API-Proxy-Tester" target="_blank" rel="noopener noreferrer"
           class="flex items-center py-3 px-4 rounded-lg text-dark-2 hover:bg-light-1 transition-all-300">
          <i class="fab fa-github mr-3 text-lg"></i>
          <span>GitHub</span>
        </a>
        <button @click="navigateTo('/about')"
                :class="['flex items-center py-3 px-4 rounded-lg font-medium transition-all-300', 
                        { 'bg-primary/10 text-primary': $route.path === '/about' },
                        { 'text-dark-2 hover:bg-light-1': $route.path !== '/about' }]">
          <i class="fa fa-info-circle mr-3 text-lg"></i>
          <span>关于</span>
        </button>
        <button @click="toggleTheme" class="flex items-center py-3 px-4 rounded-lg text-dark-2 hover:bg-light-1 transition-all-300">
          <i class="fa fa-moon mr-3 text-lg"></i>
          <span>切换主题</span>
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
    
      }
      this.showMobileMenu = false // 关闭移动端菜单
    },
    showHelp() {
      // 通知父组件显示帮助模态框
      try {
        this.$emit('show-help')
      } catch (error) {
    
      }
      this.showMobileMenu = false // 关闭移动端菜单
    },
    toggleTheme() {
      // 主题切换逻辑将在主应用中实现
      this.$emit('toggle-theme')
      this.showMobileMenu = false // 关闭移动端菜单
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