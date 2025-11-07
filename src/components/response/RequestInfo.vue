<template>
  <div class="bg-white rounded-xl shadow-card p-5 hover:shadow-hover transition-all-300 mb-5">
    <div class="flex items-center justify-between mb-4 cursor-pointer" @click="toggleCollapse">
      <h2 class="text-lg font-semibold flex items-center">
        <i class="fa fa-terminal text-primary mr-2"></i>请求信息
      </h2>
      <div class="flex items-center space-x-3">
        <button @click.stop="copyFullRequest" class="text-primary text-sm hover:text-secondary transition-all-300">
          <i class="fa fa-copy mr-1"></i>全部复制
        </button>
        <button class="text-primary text-sm hover:text-secondary transition-all-300">
          <i :class="['fa', collapse ? 'fa-chevron-down' : 'fa-chevron-up']"></i>
        </button>
      </div>
    </div>
    
    <div v-if="!collapse" class="space-y-4">
      <!-- 请求基本信息 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- 请求方式 -->
        <div class="bg-primary/5 rounded-lg p-3 border border-primary/10 hover:border-primary/30 transition-all-300">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <i class="fa fa-exchange"></i>
              </div>
              <div>
                <div class="text-xs text-dark-3 uppercase tracking-wide font-medium">请求方式</div>
                <div class="text-lg font-bold text-dark">{{ requestMethod }}</div>
              </div>
            </div>
            <button @click.stop="copyItem('method', requestMethod)" class="p-2 text-dark-2 hover:text-primary transition-all-300">
              <i class="fa fa-copy"></i>
            </button>
          </div>
        </div>
        
        <!-- 请求地址 -->
        <div class="bg-secondary/5 rounded-lg p-3 border border-secondary/10 hover:border-secondary/30 transition-all-300">
          <div class="flex items-start justify-between">
            <div class="flex items-start gap-2 flex-1">
              <div class="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0 mt-1">
                <i class="fa fa-link"></i>
              </div>
              <div class="flex-1">
                <div class="text-xs text-dark-3 uppercase tracking-wide font-medium mb-1">请求地址</div>
                <div class="text-sm font-medium text-dark overflow-hidden whitespace-pre-wrap break-all max-h-[60px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded">
                  {{ requestUrl }}
                </div>
              </div>
            </div>
            <button @click.stop="copyItem('url', requestUrl)" class="p-2 text-dark-2 hover:text-primary transition-all-300 flex-shrink-0 mt-1">
              <i class="fa fa-copy"></i>
            </button>
          </div>
        </div>
      </div>
      
      <!-- 请求头信息 -->
      <div class="bg-info/5 rounded-lg p-3 border border-info/10 hover:border-info/30 transition-all-300">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-info/10 flex items-center justify-center text-info">
              <i class="fa fa-list-alt"></i>
            </div>
            <div class="text-xs text-dark-3 uppercase tracking-wide font-medium">请求头参数</div>
          </div>
          <button @click.stop="copyItem('headers', formattedHeaders)" class="p-2 text-dark-2 hover:text-primary transition-all-300">
            <i class="fa fa-copy"></i>
          </button>
        </div>
        <div class="bg-white/80 rounded-lg p-3 text-sm font-mono overflow-auto max-h-[150px] scrollbar-thin scrollbar-thumb-rounded">
          {{ formattedHeaders || '{}' }}
        </div>
      </div>
      
      <!-- 请求参数 -->
      <div class="bg-success/5 rounded-lg p-3 border border-success/10 hover:border-success/30 transition-all-300">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center text-success">
              <i class="fa fa-question-circle"></i>
            </div>
            <div class="text-xs text-dark-3 uppercase tracking-wide font-medium">URL参数</div>
          </div>
          <button @click.stop="copyItem('params', formattedParams)" class="p-2 text-dark-2 hover:text-primary transition-all-300">
            <i class="fa fa-copy"></i>
          </button>
        </div>
        <div class="bg-white/80 rounded-lg p-3 text-sm font-mono overflow-auto max-h-[150px] scrollbar-thin scrollbar-thumb-rounded">
          {{ formattedParams || '{}' }}
        </div>
      </div>
      
      <!-- 请求体数据（仅在有请求体时显示） -->
      <div v-if="hasRequestBody" class="bg-warning/5 rounded-lg p-3 border border-warning/10 hover:border-warning/30 transition-all-300">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center text-warning">
              <i class="fa fa-file-text-o"></i>
            </div>
            <div class="text-xs text-dark-3 uppercase tracking-wide font-medium">请求体数据</div>
          </div>
          <button @click.stop="copyItem('body', formattedBody)" class="p-2 text-dark-2 hover:text-primary transition-all-300">
            <i class="fa fa-copy"></i>
          </button>
        </div>
        <div class="bg-white/80 rounded-lg p-3 text-sm font-mono overflow-auto max-h-[150px] scrollbar-thin scrollbar-thumb-rounded">
          {{ formattedBody || '{}' }}
        </div>
      </div>
    </div>
    
    <!-- 收起状态显示 -->
    <div v-else class="text-center py-2 text-dark-3 text-sm cursor-pointer hover:text-primary transition-colors-300" @click="toggleCollapse">
      点击展开请求信息
    </div>
  </div>
</template>

<script>
import modalHelper from '../../utils/modalHelper.js'

export default {
  name: 'RequestInfo',
  props: {
    requestMethod: String,
    requestUrl: String,
    requestHeaders: Object,
    requestParams: Object,
    requestBody: [Object, String]
  },
  data() {
    return {
      collapse: true
    }
  },
  computed: {
    formattedHeaders() {
      try {
        return JSON.stringify(this.requestHeaders || {}, null, 2)
      } catch {
        return String(this.requestHeaders || '{}')
      }
    },
    formattedParams() {
      try {
        // 处理参数对象，确保对象值被正确序列化
        const processedParams = {}
        for (const key in this.requestParams) {
          if (Object.prototype.hasOwnProperty.call(this.requestParams, key)) {
            const value = this.requestParams[key]
            // 如果值是对象，将其转换为JSON字符串
            if (typeof value === 'object' && value !== null) {
              processedParams[key] = JSON.stringify(value)
            } else {
              processedParams[key] = value
            }
          }
        }
        return JSON.stringify(processedParams || {}, null, 2)
      } catch {
        return String(this.requestParams || '{}')
      }
    },
    formattedBody() {
      try {
        // 确保始终返回字符串，以JSON文本格式显示最终合并后的请求体数据
        let result = ''
        
        // 处理代理模式下的请求体（包装对象）
        // 在代理模式下，requestBody可能包含完整请求信息，需要提取其中的data字段作为实际请求体
        console.log(this.requestBody);
        if (typeof this.requestBody === 'object' && 
            this.requestBody !== null && 
            'method' in this.requestBody && 
            'url' in this.requestBody && 
            'data' in this.requestBody) {
          // 这是一个代理模式下的包装请求对象，提取其中的实际请求体数据
            result = this.formatJson(this.requestBody.data)
        } else if (typeof this.requestBody === 'object' && this.requestBody !== null) {
          // 非代理模式的对象数据，直接格式化
          result = JSON.stringify(this.requestBody, null, 2)
        } else if (typeof this.requestBody === 'string') {
          // 字符串类型数据
          const trimmed = this.requestBody.trim()
          if (trimmed && trimmed !== '{}') {
            // 尝试作为JSON解析并美化
            try {
              const parsed = JSON.parse(trimmed)
              result = JSON.stringify(parsed, null, 2)
            } catch {
              // 不是有效的JSON字符串，直接返回
              result = trimmed
            }
          } else {
            result = '{}'
          }
        } else {
          // 其他情况或null/undefined
          result = this.requestBody ? JSON.stringify(this.requestBody, null, 2) : '{}'
        }
        
        // 最终类型检查，确保返回字符串
        return typeof result === 'string' ? result : String(result)
      } catch (e) {
        console.warn('格式化请求体失败:', e)
        // 错误处理，确保返回有效的字符串
        return this.requestBody ? String(this.requestBody) : '{}'
      }
    },
    hasRequestBody() {
      if (!this.requestBody) return false
      if (typeof this.requestBody === 'string') {
        return this.requestBody.trim() !== '' && this.requestBody.trim() !== '{}'
      }
      return Object.keys(this.requestBody).length > 0
    }
  },
  methods: {
    toggleCollapse() {
      this.collapse = !this.collapse
    },
    
    // 简化的JSON格式化辅助方法
    formatJson(obj) {
      try {
        return JSON.stringify(obj, null, 2)
      } catch (e) {
        console.warn('JSON格式化失败:', e)
        return '{}'
      }
    },
    copyItem(type, content) {
      // 使用更兼容的复制方法
      if (navigator.clipboard && window.isSecureContext) {
        // 在安全上下文下使用现代API
        navigator.clipboard.writeText(content)
          .then(() => this.showToast(`${this.getItemLabel(type)}已复制`))
          .catch(() => this.fallbackCopy(content, `${this.getItemLabel(type)}`))
      } else {
        // 回退到传统方法
        this.fallbackCopy(content, `${this.getItemLabel(type)}`)
      }
    },
    copyFullRequest() {
      const fullRequest = {
        method: this.requestMethod,
        url: this.requestUrl,
        headers: this.requestHeaders,
        params: this.requestParams,
        data: this.requestBody
      }
      const content = JSON.stringify(fullRequest, null, 2)
      
      // 使用更兼容的复制方法
      if (navigator.clipboard && window.isSecureContext) {
        // 在安全上下文下使用现代API
        navigator.clipboard.writeText(content)
          .then(() => this.showToast('完整请求信息已复制'))
          .catch(() => this.fallbackCopy(content, '完整请求信息'))
      } else {
        // 回退到传统方法
        this.fallbackCopy(content, '完整请求信息')
      }
    },
    // 传统复制方法作为备用
    fallbackCopy(text, label) {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      try {
        document.execCommand('copy')
        this.showToast(`${label}已复制`)
      } catch (err) {
        console.error('复制失败:', err)
        modalHelper.error(`${label}复制失败！`)
      } finally {
        document.body.removeChild(textArea)
      }
    },
    getItemLabel(type) {
      const labels = {
        method: '请求方式',
        url: '请求地址',
        headers: '请求头参数',
        params: 'URL参数',
        body: '请求体数据'
      }
      return labels[type] || type
    },
    showToast(message) {
      // 简单的toast实现，直接在当前组件显示
      // 创建toast元素
      const toast = document.createElement('div')
      toast.textContent = message
      toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 9999;
        font-size: 14px;
        transition: opacity 0.3s;
      `
      
      // 添加到文档
      document.body.appendChild(toast)
      
      // 3秒后移除
      setTimeout(() => {
        toast.style.opacity = '0'
        setTimeout(() => {
          document.body.removeChild(toast)
        }, 300)
      }, 3000)
    }
  }
}
</script>

<style scoped>
/* 可以添加特定样式 */
</style>