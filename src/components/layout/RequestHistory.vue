<template>
  <div class="bg-white rounded-xl shadow-card p-5 hover:shadow-hover transition-all-300 mt-4">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold flex items-center">
        <i class="fa fa-history text-primary mr-2"></i>历史请求
      </h2>
      <button @click="clearHistory" class="text-danger text-sm hover:text-danger/80 transition-all-300">
        <i class="fa fa-trash-o mr-1"></i>清空
      </button>
    </div>
    
    <div class="animate-fade-in">
      <div class="space-y-3 max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded">
        <div v-for="(historyItem, index) in requestHistory" :key="index" 
             class="p-4 bg-light-1 rounded-lg hover:bg-light-2 transition-all-300 cursor-pointer border border-light-2 shadow-sm hover:shadow transition-all-300"
             @click="loadHistoryItem(index)">
          <!-- 第一行：接口名称 -->
          <div class="mb-2 font-medium text-dark truncate">
            {{ historyItem.apiName || historyItem.path }}
          </div>
          <!-- 第二行：请求方法和请求状态 -->
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <span :class="['inline-block px-2 py-0.5 text-xs font-medium rounded-full', getMethodClass(historyItem.method)]">
                {{ historyItem.method }}
              </span>
              <!-- 请求状态 -->
              <span v-if="historyItem.requestStatus" :class="['inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full', getStatusClass(historyItem.requestStatus)]">
                <i v-if="historyItem.requestStatus === 'success'" class="fa fa-check-circle mr-0.5"></i>
                <i v-else-if="historyItem.requestStatus === 'error'" class="fa fa-times-circle mr-0.5"></i>
                <i v-else class="fa fa-clock-o mr-0.5"></i>
                {{ getStatusText(historyItem.requestStatus) }}
                <span v-if="historyItem.responseCode" class="ml-1">{{ historyItem.responseCode }}</span>
              </span>
            </div>
          </div>
          <!-- 第三行：请求地址 -->
          <div class="text-sm text-dark-2 mb-2 truncate flex items-center">
            <i class="fa fa-link mr-1.5 text-dark-3"></i>
            {{ historyItem.targetUrl || historyItem.url }}
          </div>
          <!-- 第四行：请求时间 -->
          <div class="text-xs text-dark-3 flex items-center">
            <i class="fa fa-clock-o mr-1.5"></i>
            {{ formatDate(historyItem.timestamp) }}
          </div>
        </div>
        <div v-if="requestHistory.length === 0" class="text-center text-dark-2 py-4">
          暂无历史请求记录
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RequestHistory',
  props: {
    requestHistory: Array
  },
  methods: {
    clearHistory() {
      this.$emit('clear-history')
    },
    loadHistoryItem(index) {
      this.$emit('load-history-item', index)
    },
    formatDate(timestamp) {
      const date = new Date(timestamp)
      return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`
    },
    // 获取请求方式对应的样式类
    getMethodClass(method) {
      const methodClasses = {
        'GET': 'bg-success/10 text-success border border-success/20',
        'POST': 'bg-primary/10 text-primary border border-primary/20',
        'PUT': 'bg-warning/10 text-warning border border-warning/20',
        'DELETE': 'bg-danger/10 text-danger border border-danger/20',
        'PATCH': 'bg-info/10 text-info border border-info/20',
        'HEAD': 'bg-dark/10 text-dark-2 border border-dark/20',
        'OPTIONS': 'bg-secondary/10 text-secondary border border-secondary/20'
      }
      return methodClasses[method] || 'bg-dark/10 text-dark-2 border border-dark/20'
    },
    // 获取请求状态对应的样式类
    getStatusClass(status) {
      const statusClasses = {
        'success': 'bg-success/10 text-success border border-success/20',
        'error': 'bg-danger/10 text-danger border border-danger/20',
        'timeout': 'bg-warning/10 text-warning border border-warning/20'
      }
      return statusClasses[status] || 'bg-dark/10 text-dark-2 border border-dark/20'
    },
    // 获取请求状态文本
    getStatusText(status) {
      const statusTexts = {
        'success': '成功',
        'error': '失败',
        'timeout': '超时'
      }
      return statusTexts[status] || '未知'
    }
  }
}
</script>