<template>
  <div class="bg-white rounded-xl shadow-card p-5 hover:shadow-hover transition-all-300">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold flex items-center">
        <i class="fa fa-info-circle text-primary mr-2"></i>响应信息
      </h2>
      <div class="flex items-center space-x-3">
        <button @click="copyResponse" class="text-primary text-sm hover:text-secondary transition-all-300">
          <i class="fa fa-copy mr-1"></i>复制
        </button>
        <button @click="downloadResponse" class="text-primary text-sm hover:text-secondary transition-all-300">
          <i class="fa fa-download mr-1"></i>下载
        </button>
      </div>
    </div>
    
    <div class="space-y-3">
      <!-- 响应状态 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <!-- 状态码 -->
        <div class="bg-primary/5 rounded-lg p-3 border border-primary/10 hover:border-primary/30 transition-all-300">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <i class="fa fa-check-circle"></i>
            </div>
            <div>
              <div class="text-xs text-dark-3 uppercase tracking-wide font-medium">状态码</div>
              <div :class="`text-lg font-bold ${getStatusCodeClass(responseCode)}`">{{ responseCode }}</div>
            </div>
          </div>
        </div>
        
        <!-- 耗时 -->
        <div class="bg-secondary/5 rounded-lg p-3 border border-secondary/10 hover:border-secondary/30 transition-all-300">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
              <i class="fa fa-clock-o"></i>
            </div>
            <div>
              <div class="text-xs text-dark-3 uppercase tracking-wide font-medium">耗时</div>
              <div class="text-lg font-bold text-dark">{{ responseTime }}ms</div>
            </div>
          </div>
        </div>
        
        <!-- 大小 -->
        <div class="bg-info/5 rounded-lg p-3 border border-info/10 hover:border-info/30 transition-all-300">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-info/10 flex items-center justify-center text-info">
              <i class="fa fa-file-o"></i>
            </div>
            <div>
              <div class="text-xs text-dark-3 uppercase tracking-wide font-medium">大小</div>
              <div class="text-lg font-bold text-dark">{{ responseSize }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 响应内容 -->
      <div>
        <label class="block text-sm font-medium text-dark-2 mb-1">响应内容</label>
        <pre class="bg-dark/5 p-3 rounded-lg text-sm font-mono">{{ formattedResponseContent }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResponseInfo',
  props: {
    responseCode: [Number, String],
    responseTime: [Number, String],
    responseSize: String,
    responseUrl: String,
    formattedResponseContent: String
  },
  methods: {
    copyResponse() {
      this.$emit('copy-response')
    },
    downloadResponse() {
      this.$emit('download-response')
    },
    getStatusCodeClass(code) {
      if (code >= 200 && code < 300) return 'text-success'
      if (code >= 300 && code < 400) return 'text-warning'
      if (code >= 400) return 'text-danger'
      return 'text-dark'
    }
  }
}
</script>