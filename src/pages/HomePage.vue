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
      <div class="text-center mb-10 md:mb-16">
        <div class="mb-6">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <i class="fa fa-exchange text-primary text-3xl"></i>
          </div>
          <h1 class="text-3xl md:text-4xl font-bold text-dark mb-4">API Proxy Tester</h1>
          <p class="text-lg md:text-xl text-primary font-medium mb-2">Dev By AI Coder</p>
        </div>
        
        <p class="text-base md:text-lg text-dark-2 mb-10 max-w-3xl mx-auto leading-relaxed">
          现代化的API测试工具，专为解决企业内部系统接口测试难题而设计。
          本工具可简单部署在内网环境中，为后续的内部接口对接提供方便的测试和实时接口数据对接能力。
        </p>
        
        <!-- 核心价值卡片 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          <div class="bg-white rounded-xl shadow-card p-6 hover:shadow-hover transition-all-300">
            <div class="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <i class="fa fa-shield text-blue-500 text-2xl"></i>
            </div>
            <h3 class="text-lg font-semibold text-dark mb-2">内网访问</h3>
            <p class="text-dark-2 text-sm">解决内网接口无法外网访问的难题</p>
          </div>
          
          <div class="bg-white rounded-xl shadow-card p-6 hover:shadow-hover transition-all-300">
            <div class="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <i class="fa fa-bolt text-green-500 text-2xl"></i>
            </div>
            <h3 class="text-lg font-semibold text-dark mb-2">实时测试</h3>
            <p class="text-dark-2 text-sm">实时获取真实响应数据，验证接口可用性</p>
          </div>
          
          <div class="bg-white rounded-xl shadow-card p-6 hover:shadow-hover transition-all-300">
            <div class="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <i class="fa fa-file-text-o text-purple-500 text-2xl"></i>
            </div>
            <h3 class="text-lg font-semibold text-dark mb-2">文档同步</h3>
            <p class="text-dark-2 text-sm">解决文档与实际接口不符的问题</p>
          </div>
        </div>
        
        <!-- AI开发特色介绍和合作邀请 - 列排版 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          <!-- AI开发特色介绍 -->
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
                </p>
                <a href="https://github.com/HongJuZi/API-Proxy-Tester/issues" target="_blank" rel="noopener noreferrer"
                   class="inline-flex items-center bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-all-300 transform hover:-translate-y-0.5">
                  <i class="fa fa-github mr-2"></i>提交Issue
                  <i class="fa fa-arrow-right ml-2 text-sm"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 行动按钮 -->
        <div class="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <button 
            @click="$router.push('/api-test')"
            class="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-all-300 flex items-center justify-center space-x-2 transform hover:-translate-y-1 hover:shadow-lg"
          >
            <i class="fa fa-rocket"></i>
            <span class="text-lg">立即使用</span>
          </button>
          <a 
            href="https://github.com/HongJuZi/API-Proxy-Tester" 
            target="_blank" 
            rel="noopener noreferrer"
            class="px-8 py-4 bg-secondary hover:bg-secondary/90 text-white font-medium rounded-xl transition-all-300 flex items-center justify-center space-x-2 transform hover:-translate-y-1 hover:shadow-lg"
          >
            <i class="fa fa-github"></i>
            <span class="text-lg">下载源码</span>
          </a>
        </div>
      </div>

      <!-- 轮播图组件 -->
      <div class="mb-12 md:mb-16 max-w-6xl mx-auto">
        <div class="relative overflow-hidden rounded-2xl shadow-xl" ref="carouselContainer">
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
            class="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 md:p-3 transition-all"
          >
            <i class="fa fa-chevron-left text-base md:text-lg"></i>
          </button>
          <button 
            @click="nextSlide" 
            class="absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 md:p-3 transition-all"
          >
            <i class="fa fa-chevron-right text-base md:text-lg"></i>
          </button>
          
          <!-- 指示器 -->
          <div class="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <button 
              v-for="(slide, index) in slides" 
              :key="index"
              @click="goToSlide(index)"
              :class="['w-3 h-3 rounded-full transition-all', currentIndex === index ? 'bg-white w-6' : 'bg-white/50']"
            ></button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
        <!-- API测试工具卡片 -->
        <div class="bg-white rounded-2xl shadow-card p-6 hover:shadow-hover transition-all-300 cursor-pointer transform hover:-translate-y-1" 
             @click="$router.push('/api-test')">
          <div class="flex items-center mb-4">
            <i class="fa fa-terminal text-primary text-2xl mr-3"></i>
            <h2 class="text-xl font-bold">API测试工具</h2>
          </div>
          <p class="text-dark-2 mb-4 text-base">完整的API测试解决方案，支持多种请求方式和参数配置</p>
          <div class="flex items-center text-primary font-medium">
            <span>立即使用</span>
            <i class="fa fa-arrow-right ml-2"></i>
          </div>
        </div>

        <!-- 文档生成工具卡片 -->
        <div class="bg-white rounded-2xl shadow-card p-6 hover:shadow-hover transition-all-300 cursor-pointer transform hover:-translate-y-1" 
             @click="$router.push('/api-test')">
          <div class="flex items-center mb-4">
            <i class="fa fa-file-text-o text-secondary text-2xl mr-3"></i>
            <h2 class="text-xl font-bold">文档生成工具</h2>
          </div>
          <p class="text-dark-2 mb-4 text-base">自动生成API文档，支持Markdown和HTML格式</p>
          <div class="flex items-center text-secondary font-medium">
            <span>立即使用</span>
            <i class="fa fa-arrow-right ml-2"></i>
          </div>
        </div>

        <!-- Mock服务卡片 -->
        <div class="bg-white rounded-2xl shadow-card p-6 hover:shadow-hover transition-all-300 opacity-50 transform hover:-translate-y-1">
          <div class="flex items-center mb-4">
            <i class="fa fa-server text-accent text-2xl mr-3"></i>
            <h2 class="text-xl font-bold">Mock服务</h2>
          </div>
          <p class="text-dark-2 mb-4 text-base">快速创建Mock API，模拟真实接口响应</p>
          <div class="flex items-center text-dark-2 font-medium">
            <span>即将上线</span>
          </div>
        </div>
      </div>
      
      <!-- AI编程模拟效果卡片 -->
      <div class="max-w-6xl mx-auto px-4 mb-12">
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6">
          <h2 class="text-2xl font-bold text-dark mb-4 flex items-center">
            <i class="fa fa-robot text-blue-500 mr-2"></i>
            AI编程实时协作演示
          </h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Chat区域 -->
            <div class="bg-white rounded-xl shadow-card p-4">
              <div class="flex items-center mb-3">
                <i class="fa fa-comments text-primary mr-2"></i>
                <h3 class="font-semibold">AI对话协作</h3>
              </div>
              
              <!-- 消息历史 -->
              <div class="h-48 overflow-y-auto mb-3 p-3 bg-light-1 rounded-lg">
                <div class="mb-3">
                  <div class="text-xs text-dark-2 mb-1">用户</div>
                  <div class="bg-primary/10 text-dark-2 text-sm p-2 rounded-lg">
                    帮我创建一个API测试工具的首页组件，包含导航栏和轮播图
                  </div>
                </div>
                
                <div class="mb-3">
                  <div class="text-xs text-dark-2 mb-1">AI助手</div>
                  <div class="bg-secondary/10 text-dark-2 text-sm p-2 rounded-lg">
                    好的，我来帮您创建一个API测试工具的首页组件。我会使用Vue 3和Tailwind CSS来实现，包含响应式导航栏和自动轮播图功能。
                  </div>
                </div>
                
                <div>
                  <div class="text-xs text-dark-2 mb-1">用户</div>
                  <div class="bg-primary/10 text-dark-2 text-sm p-2 rounded-lg">
                    轮播图需要自适应图片高度，并且要有平滑的过渡效果
                  </div>
                </div>
              </div>
              
              <!-- 输入区域 -->
              <div class="flex">
                <input 
                  type="text" 
                  placeholder="向AI助手提问..." 
                  class="flex-1 border border-light-2 rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  value="帮我优化一下轮播图的自动适应高度功能"
                />
                <button class="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-r-lg text-sm transition-all-300">
                  <i class="fa fa-paper-plane"></i>
                </button>
              </div>
            </div>
            
            <!-- 代码编辑区域 -->
            <div class="bg-gray-900 rounded-xl shadow-card overflow-hidden">
              <div class="flex items-center px-4 py-2 bg-gray-800">
                <div class="flex space-x-1">
                  <div class="w-3 h-3 rounded-full bg-red-500"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div class="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div class="text-gray-300 text-sm ml-2">HomePage.vue</div>
              </div>
              
              <div class="h-48 overflow-y-auto p-4 font-mono text-sm">
                <div class="text-gray-400">// AI正在编写代码...</div>
                <span class="text-blue-400">export</span> 
                <span class="text-green-400">default</span> {<br/>
                <span class="ml-4 text-blue-400">name:</span> 
                <span class="text-yellow-400">'HomePage'</span>,<br/>
                <span class="ml-4 text-blue-400">data()</span> {<br/>
                <span class="ml-8 text-blue-400">return</span> {<br/>
                <span class="ml-12 text-blue-400">currentIndex:</span> 
                <span class="text-purple-400">0</span>,<br/>
                <span class="ml-12 text-blue-400">imageHeights:</span> [],<br/>
                <span class="ml-8">}</span><br/>
                <span class="ml-4">},</span><br/>
                <span class="ml-4 text-blue-400">methods:</span> {<br/>
                <span class="ml-8 text-blue-400">adjustCarouselHeight()</span> {<br/>
                <span class="ml-12 text-green-400">// 根据当前图片调整轮播图高度</span><br/>
                <span class="ml-12 text-blue-400">const</span> images = 
                <span class="text-blue-400">this</span>
                .$refs.carouselContainer.querySelectorAll(<span class="text-yellow-400">'img'</span>);<br/>
                <span class="ml-12 text-blue-400">if</span> (images.length &amp;gt; 
                <span class="text-blue-400">this</span>.currentIndex) {<br/>
                <span class="ml-16 text-blue-400">const</span>
                 currentImage = images[<span class="text-blue-400">this</span>.currentIndex];<br/>
                <span class="ml-16 text-blue-400">this</span>.$refs.carouselContainer.style.height = currentImage.offsetHeight + <span class="text-yellow-400">'px'</span>;<br/>
                <span class="ml-12">}</span><br/>
                <span class="ml-8">},</span><br/>
                <span class="ml-8 text-blue-400">startAutoSlide()</span> {<br/>
                <span class="ml-12 text-blue-400">setInterval</span>(() =&amp;gt; {<br/>
                <span class="ml-16 text-blue-400">this</span>.nextSlide();<br/>
                <span class="ml-16 text-blue-400">this</span>.adjustCarouselHeight();<br/>
                <span class="ml-12">}, </span>
                <span class="text-purple-400">5000</span>);<br/>
                <span class="ml-8">}</span><br/>
                <span class="ml-4">}</span><br/>
                <span>}</span>
                <span class="animate-pulse">&amp;#9608;</span>
              </div>
            </div>
          </div>
          
          <div class="mt-4 text-center">
            <p class="text-dark-2 text-sm">
              <i class="fa fa-lightbulb text-yellow-500 mr-1"></i>
              这个演示展示了AI如何理解您的需求并实时生成代码，就像我们现在的协作一样
            </p>
          </div>
        </div>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="mt-12 md:mt-16 py-6 md:py-8 text-center text-sm md:text-base text-gray-500 border-t border-gray-200">
      <p>© 2025 API Proxy Tester By AI Coder <span class="ml-2">v1.0.0</span></p>
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
/* 添加打字机效果动画 */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.animate-pulse {
  animation: blink 1s infinite;
}
</style>