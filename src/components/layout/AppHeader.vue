<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <router-link to="/" class="flex items-center space-x-2">
          <i class="fa fa-exchange text-primary text-2xl"></i>
          <h1 class="text-xl md:text-2xl font-bold text-dark">API Proxy Tester</h1>
        </router-link>
      </div>
      <div class="flex items-center space-x-4">
        <button @click="showGlobalSettings" class="p-2 rounded-full hover:bg-light-1 transition-all-300">
          <i class="fa fa-cog text-dark-2"></i>
        </button>
        <button @click="toggleTheme" class="p-2 rounded-full hover:bg-light-1 transition-all-300">
          <i class="fa fa-moon-o text-dark-2"></i>
        </button>
        <button @click="showHelp" class="p-2 rounded-full hover:bg-light-1 transition-all-300">
          <i class="fa fa-question-circle text-dark-2"></i>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  methods: {
    showGlobalSettings() {
      // 通知父组件显示全局设置模态框
      console.log('===== AppHeader: 触发全局设置事件 =====')
      console.log('this.$emit 存在:', !!this.$emit)
      try {
        const result = this.$emit('show-global-settings')
        console.log('事件触发结果:', result)
      } catch (error) {
        console.error('事件触发失败:', error)
      }
    },
    showHelp() {
      // 通知父组件显示帮助模态框
      console.log('===== AppHeader: 触发帮助事件 =====')
      console.log('this.$emit 存在:', !!this.$emit)
      try {
        const result = this.$emit('show-help')
        console.log('事件触发结果:', result)
      } catch (error) {
        console.error('事件触发失败:', error)
      }
    },
    toggleTheme() {
      // 主题切换逻辑将在主应用中实现
      console.log('===== AppHeader: 触发主题切换事件 =====')
      console.log('this.$emit 存在:', !!this.$emit)
      try {
        const result = this.$emit('toggle-theme')
        console.log('事件触发结果:', result)
      } catch (error) {
        console.error('事件触发失败:', error)
      }
    }
  }
}
</script>