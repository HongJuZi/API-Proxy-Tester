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
        <h1 class="text-2xl md:text-3xl font-bold text-dark mb-4 md:mb-6 text-center">关于我们</h1>
        
        <!-- 项目介绍卡片 -->
        <div class="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl shadow-card p-6 mb-8">
          <div class="flex flex-col md:flex-row items-center">
            <div class="md:w-full md:pl-6">
              <h2 class="text-xl md:text-2xl font-semibold text-dark mb-3">项目介绍</h2>
              <p class="text-dark-2 mb-4 text-sm md:text-base">
                API Proxy Tester 是一个现代化的API代理测试工具，专为解决企业内部系统接口测试难题而设计。
                在对接一些内部系统时，接口通常不允许外网访问，本地在做接口对接测试及开发时无法实时访问测试查看接口效果。
                本工具可简单部署在内网环境中，为后续的内部接口对接提供方便的测试和实时接口数据对接能力。
              </p>
            </div>
          </div>
        </div>
        
        <!-- AI开发特色和合作邀请 - 列排版 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <!-- AI开发特色 -->
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-card p-6">
            <div class="flex flex-col items-center text-center">
              <div class="mb-4">
                <div class="bg-white rounded-full p-4 shadow-md inline-block">
                  <i class="fa fa-robot text-blue-500 text-4xl"></i>
                </div>
              </div>
              <div class="w-full">
                <h2 class="text-xl md:text-2xl font-semibold text-dark mb-3">AI驱动的开发模式</h2>
                <p class="text-dark-2 mb-4 text-sm md:text-base">
                  本项目是全程由AI Coder参与开发的创新项目，从需求分析、架构设计到代码实现均由AI辅助完成。
                  我们致力于探索AI在软件开发领域的应用，让需求实现由AI来完成，推动项目迭代目标的自动化实现。
                  目前使用到的AI开发工具有：Trace CN、Qorder等先进AI编程工具。
                </p>
                <div class="flex flex-wrap justify-center gap-2 mt-4">
                  <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm">AI开发</span>
                  <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm">自动化实现</span>
                  <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm">智能编程</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 合作邀请 -->
          <div class="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl shadow-card p-6">
            <div class="flex flex-col items-center text-center">
              <div class="mb-4">
                <div class="bg-white rounded-full p-4 shadow-md inline-block">
                  <i class="fa fa-handshake text-green-500 text-4xl"></i>
                </div>
              </div>
              <div class="w-full">
                <h2 class="text-xl md:text-2xl font-semibold text-dark mb-3">加入我们的开发社区</h2>
                <p class="text-dark-2 mb-4 text-sm md:text-base">
                  如果您对这个项目感兴趣，有任何需求想法或改进建议，欢迎加入我们的开发社区！
                  我们鼓励开发者、测试人员和产品经理共同参与项目迭代，一起打造更强大的API测试工具。
                  请多多提Issues，您的每一个建议都可能成为下一个版本的重要功能！
                </p>
                <a href="https://github.com/HongJuZi/API-Proxy-Tester/issues" target="_blank" rel="noopener noreferrer"
                   class="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition-all-300 mt-2">
                  <i class="fa fa-github mr-2"></i>提交Issue
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 功能亮点 -->
        <div class="bg-white rounded-2xl shadow-card p-6 mb-8">
          <h2 class="text-xl md:text-2xl font-semibold text-dark mb-4 text-center">核心功能</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col items-center text-center p-4 bg-light-1 rounded-lg hover:bg-light-2 transition-colors duration-300">
              <i class="fa fa-terminal text-primary text-2xl mb-2"></i>
              <h3 class="font-semibold text-lg mb-1">API测试</h3>
              <p class="text-dark-2 text-sm">支持多种HTTP方法，完整测试API接口</p>
            </div>
            <div class="flex flex-col items-center text-center p-4 bg-light-1 rounded-lg hover:bg-light-2 transition-colors duration-300">
              <i class="fa fa-cog text-secondary text-2xl mb-2"></i>
              <h3 class="font-semibold text-lg mb-1">参数配置</h3>
              <p class="text-dark-2 text-sm">灵活配置全局参数和请求头</p>
            </div>
            <div class="flex flex-col items-center text-center p-4 bg-light-1 rounded-lg hover:bg-light-2 transition-colors duration-300">
              <i class="fa fa-file-text-o text-accent text-2xl mb-2"></i>
              <h3 class="font-semibold text-lg mb-1">文档生成</h3>
              <p class="text-dark-2 text-sm">自动生成API文档（Markdown/HTML）</p>
            </div>
            <div class="flex flex-col items-center text-center p-4 bg-light-1 rounded-lg hover:bg-light-2 transition-colors duration-300">
              <i class="fa fa-history text-warning text-2xl mb-2"></i>
              <h3 class="font-semibold text-lg mb-1">历史记录</h3>
              <p class="text-dark-2 text-sm">保存和管理历史请求记录</p>
            </div>
          </div>
        </div>

        <!-- 技术栈 -->
        <div class="bg-white rounded-2xl shadow-card p-6 mb-8">
          <h2 class="text-xl md:text-2xl font-semibold text-dark mb-4">技术栈</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="border border-light-2 rounded-lg p-4">
              <h3 class="font-semibold text-lg mb-3 flex items-center">
                <i class="fa fa-code text-primary mr-2"></i>前端技术
              </h3>
              <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Vue 3</span>
                <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Vue Router</span>
                <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Pinia</span>
                <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Tailwind CSS</span>
                <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Axios</span>
                <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Font Awesome</span>
              </div>
            </div>
            <div class="border border-light-2 rounded-lg p-4">
              <h3 class="font-semibold text-lg mb-3 flex items-center">
                <i class="fa fa-wrench text-secondary mr-2"></i>构建工具
              </h3>
              <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">Vite</span>
                <span class="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">PostCSS</span>
                <span class="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">Autoprefixer</span>
                <span class="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">ESLint</span>
                <span class="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">Prettier</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 开发团队 -->
        <div class="bg-gradient-to-r from-accent/10 to-warning/10 rounded-2xl shadow-card p-6 mb-8">
          <div class="flex flex-col md:flex-row items-center">
            <div class="md:w-1/3 mb-4 md:mb-0 flex justify-center">
              <div class="bg-white rounded-full p-4 shadow-md">
                <i class="fa fa-users text-accent text-4xl"></i>
              </div>
            </div>
            <div class="md:w-2/3 md:pl-6">
              <h2 class="text-xl md:text-2xl font-semibold text-dark mb-3">开发团队</h2>
              <p class="text-dark-2 mb-4 text-sm md:text-base">
                本项目由红橘子科技开发团队创建和维护。我们致力于为开发者提供高质量、易用的工具，
                帮助提高开发效率和代码质量。
              </p>
              <div class="flex items-center text-sm md:text-base">
                <i class="fa fa-copyright text-dark-2 mr-2"></i>
                <span class="text-dark-2">2025 红橘子科技</span>
              </div>
            </div>
          </div>
        </div>

        <!-- RoadMap 部分 -->
        <div class="bg-white rounded-2xl shadow-card p-6">
          <h2 class="text-xl md:text-2xl font-semibold text-dark mb-4">项目路线图 (Roadmap)</h2>
          
          <div class="mb-6">
            <h3 class="text-lg md:text-xl font-medium text-dark mb-3 flex items-center">
              <i class="fa fa-check-circle text-green-500 mr-2"></i>已完成功能
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div class="flex items-center p-3 bg-green-50 rounded-lg">
                <i class="fa fa-check text-green-500 mr-2"></i>
                <span class="text-dark-2">基础API测试功能</span>
              </div>
              <div class="flex items-center p-3 bg-green-50 rounded-lg">
                <i class="fa fa-check text-green-500 mr-2"></i>
                <span class="text-dark-2">请求参数配置</span>
              </div>
              <div class="flex items-center p-3 bg-green-50 rounded-lg">
                <i class="fa fa-check text-green-500 mr-2"></i>
                <span class="text-dark-2">响应数据查看与格式化</span>
              </div>
              <div class="flex items-center p-3 bg-green-50 rounded-lg">
                <i class="fa fa-check text-green-500 mr-2"></i>
                <span class="text-dark-2">历史请求记录管理</span>
              </div>
              <div class="flex items-center p-3 bg-green-50 rounded-lg">
                <i class="fa fa-check text-green-500 mr-2"></i>
                <span class="text-dark-2">API文档自动生成</span>
              </div>
              <div class="flex items-center p-3 bg-green-50 rounded-lg">
                <i class="fa fa-check text-green-500 mr-2"></i>
                <span class="text-dark-2">参数占位符自动替换</span>
              </div>
              <div class="flex items-center p-3 bg-green-50 rounded-lg">
                <i class="fa fa-check text-green-500 mr-2"></i>
                <span class="text-dark-2">代理请求模式支持</span>
              </div>
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="text-lg md:text-xl font-medium text-dark mb-3 flex items-center">
              <i class="fa fa-clock-o text-blue-500 mr-2"></i>近期规划 (v1.1 - v1.3)
            </h3>
            <div class="grid grid-cols-1 gap-3">
              <div class="flex items-center p-3 bg-blue-50 rounded-lg">
                <i class="fa fa-circle-o text-blue-500 mr-2"></i>
                <span class="text-dark-2">Mock服务功能：快速创建模拟API接口</span>
              </div>
              <div class="flex items-center p-3 bg-blue-50 rounded-lg">
                <i class="fa fa-circle-o text-blue-500 mr-2"></i>
                <span class="text-dark-2">接口测试自动化：支持测试用例编写与执行</span>
              </div>
              <div class="flex items-center p-3 bg-blue-50 rounded-lg">
                <i class="fa fa-circle-o text-blue-500 mr-2"></i>
                <span class="text-dark-2">团队协作功能：支持多人共享测试环境</span>
              </div>
              <div class="flex items-center p-3 bg-blue-50 rounded-lg">
                <i class="fa fa-circle-o text-blue-500 mr-2"></i>
                <span class="text-dark-2">性能测试模块：接口压力测试与性能分析</span>
              </div>
              <div class="flex items-center p-3 bg-blue-50 rounded-lg">
                <i class="fa fa-circle-o text-blue-500 mr-2"></i>
                <span class="text-dark-2">数据对比功能：不同版本接口响应数据对比</span>
              </div>
            </div>
          </div>
          
          <div class="mb-6">
            <h3 class="text-lg md:text-xl font-medium text-dark mb-3 flex items-center">
              <i class="fa fa-star text-purple-500 mr-2"></i>中期规划 (v1.4 - v2.0)
            </h3>
            <div class="grid grid-cols-1 gap-3">
              <div class="flex items-center p-3 bg-purple-50 rounded-lg">
                <i class="fa fa-circle-o text-purple-500 mr-2"></i>
                <span class="text-dark-2">AI智能接口分析：自动识别接口参数和数据结构</span>
              </div>
              <div class="flex items-center p-3 bg-purple-50 rounded-lg">
                <i class="fa fa-circle-o text-purple-500 mr-2"></i>
                <span class="text-dark-2">代码生成器：根据接口自动生成调用代码（多语言支持）</span>
              </div>
              <div class="flex items-center p-3 bg-purple-50 rounded-lg">
                <i class="fa fa-circle-o text-purple-500 mr-2"></i>
                <span class="text-dark-2">接口监控告警：实时监控接口状态并发送告警</span>
              </div>
              <div class="flex items-center p-3 bg-purple-50 rounded-lg">
                <i class="fa fa-circle-o text-purple-500 mr-2"></i>
                <span class="text-dark-2">测试报告生成：自动生成详细的测试报告</span>
              </div>
              <div class="flex items-center p-3 bg-purple-50 rounded-lg">
                <i class="fa fa-circle-o text-purple-500 mr-2"></i>
                <span class="text-dark-2">插件系统：支持自定义插件扩展功能</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg md:text-xl font-medium text-dark mb-3 flex items-center">
              <i class="fa fa-rocket text-orange-500 mr-2"></i>长期愿景 (v2.0+)
            </h3>
            <div class="grid grid-cols-1 gap-3">
              <div class="flex items-center p-3 bg-orange-50 rounded-lg">
                <i class="fa fa-circle-o text-orange-500 mr-2"></i>
                <span class="text-dark-2">AI驱动的智能测试：基于历史数据和接口文档自动生成测试用例</span>
              </div>
              <div class="flex items-center p-3 bg-orange-50 rounded-lg">
                <i class="fa fa-circle-o text-orange-500 mr-2"></i>
                <span class="text-dark-2">自然语言接口测试：通过自然语言描述进行接口测试</span>
              </div>
              <div class="flex items-center p-3 bg-orange-50 rounded-lg">
                <i class="fa fa-circle-o text-orange-500 mr-2"></i>
                <span class="text-dark-2">智能文档更新：自动检测接口变更并更新文档</span>
              </div>
              <div class="flex items-center p-3 bg-orange-50 rounded-lg">
                <i class="fa fa-circle-o text-orange-500 mr-2"></i>
                <span class="text-dark-2">预测性分析：基于历史数据预测接口性能和稳定性</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="mt-8 md:mt-16 py-4 md:py-6 text-center text-xs md:text-sm text-gray-500 border-t border-gray-200">
      <p>© 2025 API Proxy Tester By AI Coder <span class="ml-1 md:ml-2">v1.0.0</span></p>
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