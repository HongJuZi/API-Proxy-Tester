<template>
  <div class="home-page">
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

    <main class="container mx-auto px-4 py-8">
      <div class="text-center mb-8 md:mb-12">
        <h1 class="text-2xl md:text-3xl font-bold text-dark mb-4">欢迎使用 API Proxy Tester Dev By AI Coder</h1>
        <p class="text-base md:text-lg text-dark-2 mb-8 md:mb-10 max-w-4xl mx-auto">现代化的API测试工具，专为解决企业内部系统接口测试难题而设计。在对接一些内部系统时，接口通常不允许外网访问，本地在做接口对接测试及开发时无法实时访问测试查看接口效果。本工具可简单部署在内网环境中，为后续的内部接口对接提供方便的测试和实时接口数据对接能力。</p>
        
        <!-- 添加的按钮 -->
        <div class="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button 
            @click="$router.push('/api-test')"
            class="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all-300 flex items-center justify-center space-x-2"
          >
            <i class="fa fa-rocket"></i>
            <span>立即使用</span>
          </button>
          <a 
            href="https://github.com/HongJuZi/API-Proxy-Tester" 
            target="_blank" 
            rel="noopener noreferrer"
            class="px-6 py-3 bg-secondary hover:bg-secondary/90 text-white font-medium rounded-lg transition-all-300 flex items-center justify-center space-x-2"
          >
            <i class="fa fa-github"></i>
            <span>下载源码</span>
          </a>
        </div>
        <!-- AI开发特色介绍和合作邀请 - 列排版 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10 mt-10">
          <!-- AI开发特色介绍 -->
          <div class="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6">
            <div class="flex flex-col items-center text-center">
              <div class="mb-4">
                <div class="bg-white rounded-full p-4 shadow-md inline-block">
                  <i class="fa fa-robot text-primary text-4xl"></i>
                </div>
              </div>
              <div class="w-full">
                <h2 class="text-xl md:text-2xl font-semibold text-dark mb-3">AI驱动的开发模式</h2>
                <p class="text-dark-2 mb-4 text-sm md:text-base">
                  本项目是全程由AI Coder参与开发的创新项目，从需求分析、架构设计到代码实现均由AI辅助完成。
                  我们致力于探索AI在软件开发领域的应用，让需求实现由AI来完成，推动项目迭代目标的自动化实现。
                  目前使用到的AI开发工具有：Trace CN、Qorder等先进AI编程工具。
                </p>
                <div class="flex flex-wrap justify-center gap-2">
                  <span class="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs md:text-sm">AI开发</span>
                  <span class="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs md:text-sm">自动化实现</span>
                  <span class="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs md:text-sm">智能编程</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 合作邀请 -->
          <div class="bg-gradient-to-r from-accent/10 to-warning/10 rounded-2xl p-6">
            <div class="flex flex-col items-center text-center">
              <div class="mb-4">
                <div class="bg-white rounded-full p-4 shadow-md inline-block">
                  <i class="fa fa-users text-accent text-4xl"></i>
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
                   class="inline-flex items-center bg-accent hover:bg-accent/90 text-white font-medium py-2 px-6 rounded-lg transition-all-300">
                  <i class="fa fa-github mr-2"></i>提交Issue
                </a>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <!-- 轮播图组件 -->
      <div class="mb-8 md:mb-12 max-w-4xl mx-auto">
        <div class="relative overflow-hidden rounded-xl shadow-lg" ref="carouselContainer">
          <!-- 图片容器 -->
          <div 
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          >
            <div class="w-full flex-shrink-0">
              <img src="/demo/ai-coding.jpg" alt="AI编码界面" class="w-full h-auto object-cover" @load="onImageLoad">
            </div>
            <div class="w-full flex-shrink-0">
              <img src="/demo/api.jpg" alt="API测试界面" class="w-full h-auto object-cover" @load="onImageLoad">
            </div>
            <div class="w-full flex-shrink-0">
              <img src="/demo/config.jpg" alt="配置界面" class="w-full h-auto object-cover" @load="onImageLoad">
            </div>
            <div class="w-full flex-shrink-0">
              <img src="/demo/index.jpg" alt="首页界面" class="w-full h-auto object-cover" @load="onImageLoad">
            </div>
          </div>
          
          <!-- 导航按钮 -->
          <button 
            @click="prevSlide" 
            class="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5 md:p-2 transition-all"
          >
            <i class="fa fa-chevron-left text-sm md:text-base"></i>
          </button>
          <button 
            @click="nextSlide" 
            class="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5 md:p-2 transition-all"
          >
            <i class="fa fa-chevron-right text-sm md:text-base"></i>
          </button>
          
          <!-- 指示器 -->
          <div class="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 md:space-x-2">
            <button 
              v-for="(slide, index) in slides" 
              :key="index"
              @click="goToSlide(index)"
              :class="['w-2 h-2 md:w-3 md:h-3 rounded-full transition-all', currentIndex === index ? 'bg-white' : 'bg-white/50']"
            ></button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
        <!-- API测试工具卡片 -->
        <div class="bg-white rounded-xl shadow-card p-4 md:p-6 hover:shadow-hover transition-all-300 cursor-pointer" 
             @click="$router.push('/api-test')">
          <div class="flex items-center mb-3 md:mb-4">
            <i class="fa fa-terminal text-primary text-xl md:text-2xl mr-2 md:mr-3"></i>
            <h2 class="text-lg md:text-xl font-semibold">API测试工具</h2>
          </div>
          <p class="text-sm md:text-base text-dark-2 mb-3 md:mb-4">完整的API测试解决方案，支持多种请求方式和参数配置</p>
          <div class="flex items-center text-primary text-sm md:text-base">
            <span>立即使用</span>
            <i class="fa fa-arrow-right ml-1 md:ml-2"></i>
          </div>
        </div>

        <!-- 文档生成工具卡片 -->
        <div class="bg-white rounded-xl shadow-card p-4 md:p-6 hover:shadow-hover transition-all-300 cursor-pointer" 
             @click="$router.push('/api-test')">
          <div class="flex items-center mb-3 md:mb-4">
            <i class="fa fa-file-text-o text-secondary text-xl md:text-2xl mr-2 md:mr-3"></i>
            <h2 class="text-lg md:text-xl font-semibold">文档生成工具</h2>
          </div>
          <p class="text-sm md:text-base text-dark-2 mb-3 md:mb-4">自动生成API文档，支持Markdown和HTML格式</p>
          <div class="flex items-center text-secondary text-sm md:text-base">
            <span>立即使用</span>
            <i class="fa fa-arrow-right ml-1 md:ml-2"></i>
          </div>
        </div>

        <!-- Mock服务卡片 -->
        <div class="bg-white rounded-xl shadow-card p-4 md:p-6 hover:shadow-hover transition-all-300 opacity-50">
          <div class="flex items-center mb-3 md:mb-4">
            <i class="fa fa-server text-accent text-xl md:text-2xl mr-2 md:mr-3"></i>
            <h2 class="text-lg md:text-xl font-semibold">Mock服务</h2>
          </div>
          <p class="text-sm md:text-base text-dark-2 mb-3 md:mb-4">快速创建Mock API，模拟真实接口响应</p>
          <div class="flex items-center text-dark-2 text-sm md:text-base">
            <span>即将上线</span>
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
  name: 'HomePage',
  data() {
    return {
      currentIndex: 0,
      showMobileMenu: false,
      slides: [
        { image: '/demo/ai-coding.jpg', alt: 'AI编码界面' },
        { image: '/demo/api.jpg', alt: 'API测试界面' },
        { image: '/demo/config.jpg', alt: '配置界面' },
        { image: '/demo/index.jpg', alt: '首页界面' }
      ],
      autoSlideInterval: null,
      loadedImages: 0,
      imageHeights: []
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
    },
    
    // 轮播图方法
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length
    },
    
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length
    },
    
    goToSlide(index) {
      this.currentIndex = index
    },
    
    // 图片加载完成回调
    onImageLoad(event) {
      this.loadedImages++
      // 当所有图片加载完成时，设置容器高度
      if (this.loadedImages === this.slides.length) {
        this.$nextTick(() => {
          this.adjustCarouselHeight()
        })
      }
    },
    
    // 调整轮播图容器高度
    adjustCarouselHeight() {
      if (this.$refs.carouselContainer) {
        // 获取当前显示的图片
        const images = this.$refs.carouselContainer.querySelectorAll('img')
        if (images.length > this.currentIndex) {
          const currentImage = images[this.currentIndex]
          // 设置容器高度为当前图片的高度
          this.$refs.carouselContainer.style.height = currentImage.offsetHeight + 'px'
        }
      }
    },
    
    // 自动轮播时调整高度
    updateCarouselHeight() {
      this.$nextTick(() => {
        this.adjustCarouselHeight()
      })
    },
    
    // 自动轮播
    startAutoSlide() {
      this.autoSlideInterval = setInterval(() => {
        this.nextSlide()
        this.updateCarouselHeight()
      }, 5000) // 每5秒切换一次
    },
    
    stopAutoSlide() {
      if (this.autoSlideInterval) {
        clearInterval(this.autoSlideInterval)
      }
    }
  },
  
  // 自动轮播
  mounted() {
    this.startAutoSlide()
  },
  
  beforeUnmount() {
    this.stopAutoSlide()
  },
  
  // 监听当前索引变化
  watch: {
    currentIndex() {
      this.$nextTick(() => {
        this.updateCarouselHeight()
      })
    }
  }
}
</script>

<style scoped>
/* 页面特定样式 */
</style>