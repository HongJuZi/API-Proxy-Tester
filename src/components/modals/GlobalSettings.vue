<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <!-- 模态框头部 -->
      <div class="flex justify-between items-center px-6 py-4 border-b">
        <h3 class="text-lg font-semibold flex items-center">
          <i class="fa fa-cog text-primary mr-2"></i>全局设置
        </h3>
        <button class="text-dark-2 hover:text-dark transition-all-300" @click="close" title="关闭">
          <i class="fa fa-times"></i>
        </button>
      </div>
      
      <!-- 模态框内容 -->
      <div class="p-6">
        <!-- 请求方式设置 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-dark-2 mb-1">请求方式</label>
          <div class="inline-flex bg-light-1 rounded-lg p-1">
            <label 
              class="flex items-center cursor-pointer px-4 py-2 rounded-md transition-all-300"
              :class="requestMode === 'proxy' ? 'bg-white shadow-sm text-dark' : 'text-dark-2 hover:text-dark'"
            >
              <input 
                type="radio" 
                :value="'proxy'"
                :checked="requestMode === 'proxy'"
                @change="$emit('update:requestMode', 'proxy')"
                class="sr-only"
              >
              <div class="w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center" :class="requestMode === 'proxy' ? 'border-primary' : 'border-dark-3'">
                <div v-if="requestMode === 'proxy'" class="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <span>代理请求</span>
            </label>
            <label 
              class="flex items-center cursor-pointer px-4 py-2 rounded-md transition-all-300"
              :class="requestMode === 'direct' ? 'bg-white shadow-sm text-dark' : 'text-dark-2 hover:text-dark'"
            >
              <input 
                type="radio" 
                :value="'direct'"
                :checked="requestMode === 'direct'"
                @change="$emit('update:requestMode', 'direct')"
                class="sr-only"
              >
              <div class="w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center" :class="requestMode === 'direct' ? 'border-primary' : 'border-dark-3'">
                <div v-if="requestMode === 'direct'" class="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <span>直接请求</span>
            </label>
          </div>
          <p v-if="requestMode === 'direct'" class="text-xs text-dark-2 mt-1">直接请求可能受到跨域限制</p>
        </div>
        
        <!-- 代理URL设置 -->
        <div class="mb-4" v-if="requestMode === 'proxy'">
          <label class="block text-sm font-medium text-dark-2 mb-1">代理URL</label>
          <input 
            :value="proxyUrl" 
            @input="$emit('update:proxyUrl', $event.target.value)"
            type="text" 
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="代理服务器地址"
          >
          <p class="text-xs text-dark-2 mt-1">代理服务器将转发请求到目标URL</p>
        </div>
        
        <!-- 基础URL设置 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-dark-2 mb-1">基础URL</label>
          <input 
            :value="baseUrl"
            @input="$emit('update:baseUrl', $event.target.value)"
            type="text" 
            placeholder="https://api.example.com" 
            class="w-full form-input rounded-lg border-light-2 px-3 py-2 text-sm"
          >
        </div>
        
        <!-- 请求超时设置 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-dark-2 mb-1">请求超时 (ms)</label>
          <input 
            :value="timeout"
            @input="$emit('update:timeout', Number($event.target.value))"
            type="number" 
            placeholder="5000" 
            class="w-full form-input rounded-lg border-light-2 px-3 py-2 text-sm"
          >
        </div>
        
        <!-- 全局参数区域 -->
        <div class="mb-4">
          <div class="flex items-center justify-between mb-2">
            <label class="block text-sm font-medium text-dark-2">全局参数</label>
            <div class="flex items-center space-x-2">
              <!-- 请求方式选择 -->
              <select 
                :value="globalParamMethod"
                @change="$emit('update:globalParamMethod', $event.target.value)"
                class="text-xs px-2 py-1 rounded border border-light-2 bg-white"
              >
                <option value="POST">POST</option>
                <option value="GET">GET</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
              <!-- 模式切换 -->
              <div class="inline-flex p-0.5 bg-light-1 rounded-lg">
                <button 
                  @click="$emit('update:globalParamMode', 'kv')"
                  :class="['text-xs px-2 py-1 rounded', globalParamMode === 'kv' ? 'bg-white shadow-sm text-dark' : 'text-dark-2']"
                >
                  键值对
                </button>
                <button 
                  @click="$emit('update:globalParamMode', 'json')"
                  :class="['text-xs px-2 py-1 rounded', globalParamMode === 'json' ? 'bg-white shadow-sm text-dark' : 'text-dark-2']"
                >
                  JSON
                </button>
              </div>
              <!-- 添加按钮（仅在KV模式下显示） -->
              <button v-if="globalParamMode === 'kv'" @click="addParam('global')" class="text-primary text-sm hover:text-secondary transition-all-300">
                <i class="fa fa-plus-circle mr-1"></i>添加
              </button>
            </div>
          </div>
          
          <!-- KV模式 -->
          <div v-if="globalParamMode === 'kv'" class="space-y-2">
            <!-- 全局参数项 -->
            <div v-for="(param, index) in globalParams" :key="`global-${index}`" 
                  class="global-param-item flex items-center space-x-2 animate-fade-in" 
                  :style="{ opacity: param.visible ? 1 : 0 }">
              <input :value="param.name" @input="$emit('update:globalParams', [...globalParams.slice(0, index), {...param, name: $event.target.value}, ...globalParams.slice(index+1)])" type="text" placeholder="参数名" class="flex-1 form-input rounded-lg border-light-2 px-3 py-2 text-sm">
              <input :value="param.value" @input="$emit('update:globalParams', [...globalParams.slice(0, index), {...param, value: $event.target.value}, ...globalParams.slice(index+1)])" type="text" placeholder="参数值" class="flex-1 form-input rounded-lg border-light-2 px-3 py-2 text-sm">
              <button @click="removeParam('global', index)" class="remove-global-param p-2 text-dark-2 hover:text-danger transition-all-300">
                <i class="fa fa-trash-o"></i>
              </button>
            </div>
          </div>
          
          <!-- JSON模式 -->
          <div v-else class="space-y-2">
            <textarea 
              :value="globalJsonInput" 
              @input="$emit('update:globalJsonInput', $event.target.value)"
              placeholder="输入JSON格式的全局参数"
              class="w-full form-input rounded-lg border-light-2 px-3 py-2 text-sm min-h-[120px] font-mono"
            ></textarea>
            <div class="text-xs text-dark-2 mt-1">
              支持JSON格式，例如：{"token": "value", "user_id": "123"}
            </div>
            <div class="flex items-center justify-between">
              <div class="flex space-x-2">
                <button @click="validateGlobalJson" class="text-primary text-sm hover:text-secondary transition-all-300">
                  <i class="fa fa-check-circle mr-1"></i>验证JSON
                </button>
                <button @click="formatGlobalJson" class="text-primary text-sm hover:text-secondary transition-all-300">
                  <i class="fa fa-indent mr-1"></i>格式化JSON
                </button>
              </div>
              <button @click="importGlobalJson" class="text-primary text-sm hover:text-secondary transition-all-300">
                <i class="fa fa-download mr-1"></i>导入为键值对
              </button>
            </div>
          </div>
        </div>
        
        <!-- 请求头设置 -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="block text-sm font-medium text-dark-2">请求头</label>
            <button @click="addParam('header')" class="text-primary text-sm hover:text-secondary transition-all-300">
              <i class="fa fa-plus-circle mr-1"></i>添加
            </button>
          </div>
          <div class="space-y-2">
            <!-- 请求头项 -->
            <div v-for="(header, index) in headers" :key="`header-${index}`" 
                  class="header-item flex items-center space-x-2 animate-fade-in" 
                  :style="{ opacity: header.visible ? 1 : 0 }">
              <input :value="header.name" @input="$emit('update:headers', [...headers.slice(0, index), {...header, name: $event.target.value}, ...headers.slice(index+1)])" type="text" class="flex-1 form-input rounded-lg border-light-2 px-3 py-2 text-sm">
              <input :value="header.value" @input="$emit('update:headers', [...headers.slice(0, index), {...header, value: $event.target.value}, ...headers.slice(index+1)])" type="text" class="flex-1 form-input rounded-lg border-light-2 px-3 py-2 text-sm">
              <button @click="removeParam('header', index)" class="remove-header p-2 text-dark-2 hover:text-danger transition-all-300">
                <i class="fa fa-trash-o"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 模态框底部 -->
      <div class="flex justify-end px-6 py-4 border-t space-x-3">
        <button class="px-4 py-2 border border-light-2 rounded-lg hover:bg-light-1 transition-all-300" @click="close">取消</button>
        <button class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all-300" @click="save">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalSettings',
  props: {
    requestMode: String,
    proxyUrl: String,
    baseUrl: String,
    timeout: Number,
    globalParams: Array,
    globalParamMode: String,
    globalJsonInput: String,
    headers: Array,
    globalParamMethod: String
  },
  methods: {
    close() {
      this.$emit('close')
    },
    save() {
      this.$emit('save')
    },
    addParam(type) {
      this.$emit('add-param', type)
    },
    removeParam(type, index) {
      this.$emit('remove-param', type, index)
    },
    validateGlobalJson() {
      this.$emit('validate-global-json')
    },
    formatGlobalJson() {
      this.$emit('format-global-json')
    },
    importGlobalJson() {
      this.$emit('import-global-json')
    }
  }
}
</script>