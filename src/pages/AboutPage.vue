<template>
  <div class="about-page">
    <!-- 顶部导航栏 -->
    <AppHeader 
      @toggle-theme="toggleTheme" 
      @show-global-settings="handleShowGlobalSettings"
      @show-help="handleShowHelp"
    />

    <main class="container mx-auto px-4 py-8">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-10">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <i class="fa fa-info-circle text-primary text-3xl"></i>
          </div>
          <h1 class="text-3xl md:text-4xl font-bold text-dark mb-4">关于我们</h1>
        </div>
        
        <!-- 项目介绍卡片 -->
        <div class="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl shadow-lg p-8 mb-12 hover:shadow-xl transition-all-300">
          <div class="flex flex-col items-center text-center">
            <div class="w-full">
              <h2 class="text-2xl font-bold text-dark mb-4">项目介绍</h2>
              <p class="text-dark-2 mb-6 text-base leading-relaxed">
                API Proxy Tester 是一个现代化的API代理测试工具，专为解决企业内部系统接口测试难题而设计。
                在对接一些内部系统时，接口通常不允许外网访问，本地在做接口对接测试及开发时无法实时访问测试查看接口效果。
                本工具可简单部署在内网环境中，为后续的内部接口对接提供方便的测试和实时接口数据对接能力。
              </p>
            </div>
          </div>
        </div>
        
        <!-- AI开发特色和合作邀请 - 列排版 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <!-- AI开发特色 -->
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all-300">
            <div class="flex flex-col items-center text-center">
              <div class="mb-5">
                <div class="bg-white rounded-full p-5 shadow-md inline-block">
                  <i class="fa fa-robot text-blue-500 text-4xl"></i>
                </div>
              </div>
              <div class="w-full">
                <h2 class="text-2xl font-bold text-dark mb-4">AI驱动的开发模式</h2>
                <p class="text-dark-2 mb-6 text-base leading-relaxed">
                  本项目是全程由AI Coder参与开发的创新项目，从需求分析、架构设计到代码实现均由AI辅助完成。
                  我们致力于探索AI在软件开发领域的应用，让需求实现由AI来完成，推动项目迭代目标的自动化实现。
                  目前使用到的AI开发工具有：Trace CN、Qorder等先进AI编程工具。
                </p>
                <div class="flex flex-wrap justify-center gap-2">
                  <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">AI开发</span>
                  <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">自动化实现</span>
                  <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">智能编程</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 合作邀请 -->
          <div class="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all-300">
            <div class="flex flex-col items-center text-center">
              <div class="mb-5">
                <div class="bg-white rounded-full p-5 shadow-md inline-block">
                  <i class="fa fa-users text-green-500 text-4xl"></i>
                </div>
              </div>
              <div class="w-full">
                <h2 class="text-2xl font-bold text-dark mb-4">加入我们的开发社区</h2>
                <p class="text-dark-2 mb-6 text-base leading-relaxed">
                  如果您对这个项目感兴趣，有任何需求想法或改进建议，欢迎加入我们的开发社区！
                  我们鼓励开发者、测试人员和产品经理共同参与项目迭代，一起打造更强大的API测试工具。
                  请多多提Issues，您的每一个建议都可能成为下一个版本的重要功能！
                </p>
                <a href="https://github.com/HongJuZi/API-Proxy-Tester/issues" target="_blank" rel="noopener noreferrer"
                   class="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-all-300 transform hover:-translate-y-0.5">
                  <i class="fab fa-github mr-2"></i>提交Issue
                  <i class="fa fa-arrow-right ml-2 text-sm"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 功能亮点 -->
        <div class="bg-white rounded-2xl shadow-card p-8 mb-12">
          <h2 class="text-2xl font-bold text-dark mb-6 text-center">核心功能</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex flex-col items-center text-center p-6 bg-light-1 rounded-xl hover:bg-light-2 transition-all-300 transform hover:-translate-y-1">
              <div class="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <i class="fa fa-terminal text-primary text-2xl"></i>
              </div>
              <h3 class="font-bold text-lg mb-2">API测试</h3>
              <p class="text-dark-2 text-sm">支持多种HTTP方法，完整测试API接口</p>
            </div>
            <div class="flex flex-col items-center text-center p-6 bg-light-1 rounded-xl hover:bg-light-2 transition-all-300 transform hover:-translate-y-1">
              <div class="w-12 h-12 bg-secondary-50 rounded-lg flex items-center justify-center mb-4">
                <i class="fa fa-cog text-secondary text-2xl"></i>
              </div>
              <h3 class="font-bold text-lg mb-2">参数配置</h3>
              <p class="text-dark-2 text-sm">灵活配置全局参数和请求头</p>
            </div>
            <div class="flex flex-col items-center text-center p-6 bg-light-1 rounded-xl hover:bg-light-2 transition-all-300 transform hover:-translate-y-1">
              <div class="w-12 h-12 bg-accent-50 rounded-lg flex items-center justify-center mb-4">
                <i class="fa-regular fa-file-lines text-accent text-2xl"></i>
              </div>
              <h3 class="font-bold text-lg mb-2">文档生成</h3>
              <p class="text-dark-2 text-sm">自动生成API文档（Markdown/HTML）</p>
            </div>
            <div class="flex flex-col items-center text-center p-6 bg-light-1 rounded-xl hover:bg-light-2 transition-all-300 transform hover:-translate-y-1">
              <div class="w-12 h-12 bg-warning-50 rounded-lg flex items-center justify-center mb-4">
                <i class="fa fa-history text-warning text-2xl"></i>
              </div>
              <h3 class="font-bold text-lg mb-2">历史记录</h3>
              <p class="text-dark-2 text-sm">保存和管理历史请求记录</p>
            </div>
          </div>
        </div>

        <!-- 技术栈 -->
        <div class="bg-white rounded-2xl shadow-card p-8 mb-12">
          <h2 class="text-2xl font-bold text-dark mb-6 text-center">技术栈</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="border border-light-2 rounded-xl p-6 hover:shadow-md transition-all-300">
              <h3 class="font-bold text-lg mb-4 flex items-center">
                <i class="fa fa-code text-primary mr-2"></i>前端技术
              </h3>
              <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">Vue 3</span>
                <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">Vue Router</span>
                <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">Pinia</span>
                <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">Tailwind CSS</span>
                <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">Axios</span>
                <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">Font Awesome</span>
              </div>
            </div>
            <div class="border border-light-2 rounded-xl p-6 hover:shadow-md transition-all-300">
              <h3 class="font-bold text-lg mb-4 flex items-center">
                <i class="fa fa-wrench text-secondary mr-2"></i>构建工具
              </h3>
              <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">Vite</span>
                <span class="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">PostCSS</span>
                <span class="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">Autoprefixer</span>
                <span class="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">ESLint</span>
                <span class="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">Prettier</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 开发团队 -->
        <div class="bg-gradient-to-br from-accent/10 to-warning/10 rounded-2xl shadow-lg p-8 mb-12 hover:shadow-xl transition-all-300">
          <div class="flex flex-col items-center text-center">
            <div class="mb-5">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md">
                <i class="fa fa-users text-accent text-3xl"></i>
              </div>
            </div>
            <div class="w-full">
              <h2 class="text-2xl font-bold text-dark mb-4">开发团队</h2>
              <p class="text-dark-2 mb-6 text-base leading-relaxed">
                本项目由红橘子科技开发团队创建和维护。我们致力于为开发者提供高质量、易用的工具，
                帮助提高开发效率和代码质量。
              </p>
              <div class="flex items-center justify-center text-base">
                <i class="fa fa-copyright text-dark-2 mr-2"></i>
                <span class="text-dark-2">2025 红橘子科技</span>
              </div>
            </div>
          </div>
        </div>

        <!-- RoadMap 部分 -->
        <div class="bg-white rounded-2xl shadow-card p-8">
          <h2 class="text-2xl font-bold text-dark mb-6 text-center">项目路线图 (Roadmap)</h2>
          
          <div class="mb-8">
            <h3 class="text-xl font-bold text-dark mb-4 flex items-center">
              <i class="fa fa-check-circle text-green-500 mr-2"></i>已完成功能
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-all-300">
                <i class="fa fa-check text-green-500 mr-3"></i>
                <span class="text-dark-2">基础API测试功能</span>
              </div>
              <div class="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-all-300">
                <i class="fa fa-check text-green-500 mr-3"></i>
                <span class="text-dark-2">请求参数配置</span>
              </div>
              <div class="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-all-300">
                <i class="fa fa-check text-green-500 mr-3"></i>
                <span class="text-dark-2">响应数据查看与格式化</span>
              </div>
              <div class="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-all-300">
                <i class="fa fa-check text-green-500 mr-3"></i>
                <span class="text-dark-2">历史请求记录管理</span>
              </div>
              <div class="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-all-300">
                <i class="fa fa-check text-green-500 mr-3"></i>
                <span class="text-dark-2">API文档自动生成</span>
              </div>
              <div class="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-all-300">
                <i class="fa fa-check text-green-500 mr-3"></i>
                <span class="text-dark-2">参数占位符自动替换</span>
              </div>
              <div class="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-all-300">
                <i class="fa fa-check text-green-500 mr-3"></i>
                <span class="text-dark-2">代理请求模式支持</span>
              </div>
            </div>
          </div>
          
          <div class="mb-8">
            <h3 class="text-xl font-bold text-dark mb-4 flex items-center">
              <i class="fa fa-clock-o text-blue-500 mr-2"></i>近期规划 (v1.1 - v1.3)
            </h3>
            <div class="grid grid-cols-1 gap-4">
              <div class="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all-300">
                <i class="fa fa-circle text-blue-500 mr-3"></i>
                <span class="text-dark-2">Mock服务功能：快速创建模拟API接口</span>
              </div>
              <div class="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all-300">
                <i class="fa fa-circle text-blue-500 mr-3"></i>
                <span class="text-dark-2">接口测试自动化：支持测试用例编写与执行</span>
              </div>
              <div class="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all-300">
                <i class="fa fa-circle text-blue-500 mr-3"></i>
                <span class="text-dark-2">团队协作功能：支持多人共享测试环境</span>
              </div>
              <div class="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all-300">
                <i class="fa fa-circle text-blue-500 mr-3"></i>
                <span class="text-dark-2">性能测试模块：接口压力测试与性能分析</span>
              </div>
              <div class="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all-300">
                <i class="fa fa-circle text-blue-500 mr-3"></i>
                <span class="text-dark-2">数据对比功能：不同版本接口响应数据对比</span>
              </div>
            </div>
          </div>
          
          <div class="mb-8">
            <h3 class="text-xl font-bold text-dark mb-4 flex items-center">
              <i class="fa fa-star text-purple-500 mr-2"></i>中期规划 (v1.4 - v2.0)
            </h3>
            <div class="grid grid-cols-1 gap-4">
              <div class="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all-300">
                <i class="fa fa-circle text-purple-500 mr-3"></i>
                <span class="text-dark-2">AI智能接口分析：自动识别接口参数和数据结构</span>
              </div>
              <div class="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all-300">
                <i class="fa fa-circle text-purple-500 mr-3"></i>
                <span class="text-dark-2">代码生成器：根据接口自动生成调用代码（多语言支持）</span>
              </div>
              <div class="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all-300">
                <i class="fa fa-circle text-purple-500 mr-3"></i>
                <span class="text-dark-2">接口监控告警：实时监控接口状态并发送告警</span>
              </div>
              <div class="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all-300">
                <i class="fa fa-circle text-purple-500 mr-3"></i>
                <span class="text-dark-2">测试报告生成：自动生成详细的测试报告</span>
              </div>
              <div class="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-all-300">
                <i class="fa fa-circle text-purple-500 mr-3"></i>
                <span class="text-dark-2">插件系统：支持自定义插件扩展功能</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 class="text-xl font-bold text-dark mb-4 flex items-center">
              <i class="fa fa-rocket text-orange-500 mr-2"></i>长期愿景 (v2.0+)
            </h3>
            <div class="grid grid-cols-1 gap-4">
              <div class="flex items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-all-300">
                <i class="fa fa-circle text-orange-500 mr-3"></i>
                <span class="text-dark-2">AI驱动的智能测试：基于历史数据和接口文档自动生成测试用例</span>
              </div>
              <div class="flex items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-all-300">
                <i class="fa fa-circle text-orange-500 mr-3"></i>
                <span class="text-dark-2">自然语言接口测试：通过自然语言描述进行接口测试</span>
              </div>
              <div class="flex items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-all-300">
                <i class="fa fa-circle text-orange-500 mr-3"></i>
                <span class="text-dark-2">智能文档更新：自动检测接口变更并更新文档</span>
              </div>
              <div class="flex items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-all-300">
                <i class="fa fa-circle text-orange-500 mr-3"></i>
                <span class="text-dark-2">预测性分析：基于历史数据预测接口性能和稳定性</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 页脚 -->
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '../components/layout/AppHeader.vue'
import AppFooter from '../components/layout/AppFooter.vue'

export default {
  name: 'AboutPage',
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      // 数据已移至组件中管理
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
    
    // 处理显示全局设置
    handleShowGlobalSettings() {
      this.setGlobalSettingsVisible(true)
    },
    // 处理显示帮助
    handleShowHelp() {
      this.setHelpVisible(true)
    }
  }
}
</script>

<style scoped>
/* 页面特定样式 */
</style>