<template>
  <div class="bg-white rounded-xl shadow-card p-5 hover:shadow-hover transition-all-300 w-full max-w-full">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold flex items-center">
        <i class="fa fa-terminal text-primary mr-2"></i>接口配置
      </h2>
      <button @click="toggleExpand('api')" class="text-dark-2 hover:text-primary transition-all-300">
        <i :class="expandedSections.api ? 'fa fa-chevron-up' : 'fa fa-chevron-down'"></i>
      </button>
    </div>
    
    <div class="api-config-content space-y-4 animate-fade-in" :style="{ maxHeight: expandedSections.api ? '2000px' : 'auto' }">
      <!-- 接口名称 -->
      <div class="w-full">
        <label class="block text-sm font-medium text-dark-2 mb-1">接口名称</label>
        <input 
          :value="apiName"
          @input="$emit('update:apiName', $event.target.value)"
          type="text" 
          placeholder="例如：用户列表查询" 
          class="w-full form-input rounded-lg border-light-2 px-3 py-2 text-sm"
        >
      </div>
      
      <!-- 请求方法和接口路径 -->
      <div class="w-full">
        <div class="flex items-center justify-between mb-1">
          <label class="block text-sm font-medium text-dark-2">请求设置</label>
          <button @click="clearApiConfig" class="text-primary text-sm hover:text-secondary transition-all-300">
            <i class="fa fa-plus-circle mr-1"></i>新增
          </button>
        </div>
        <div class="flex items-center space-x-2 w-full">
          <select 
            :value="selectedMethod"
            @input="$emit('update:selectedMethod', $event.target.value)"
            class="form-select rounded-lg border-light-2 px-3 py-2 text-sm bg-white"
          >
            <option v-for="method in methods" :key="method" :value="method">
              {{ method }}
            </option>
          </select>
          <span class="text-dark-2 text-sm">/</span>
          <input 
            :value="apiPath"
            @input="$emit('update:apiPath', $event.target.value)"
            type="text" 
            placeholder="users/1"
            class="flex-1 form-input rounded-lg border-light-2 px-3 py-2 text-sm"
          >
        </div>
      </div>
      
      <!-- 参数与请求体Tab切换 -->
      <div class="w-full">
        <!-- Tab切换器 -->
        <div class="flex bg-light-1 rounded-lg p-1 mb-3">
          <button 
            @click="activeTab = 'params'" 
            class="flex-1 px-4 py-2 text-sm rounded-md flex items-center justify-center"
            :class="activeTab === 'params' ? 'bg-primary text-white' : 'text-dark-2 hover:text-primary'"
          >
            <i class="fa fa-question-circle-o mr-1"></i>接口参数
          </button>
          <button 
            @click="activeTab = 'body'" 
            class="flex-1 px-4 py-2 text-sm rounded-md flex items-center justify-center"
            :class="activeTab === 'body' ? 'bg-primary text-white' : 'text-dark-2 hover:text-primary'"
            v-show="['POST', 'PUT', 'PATCH'].includes(selectedMethod)"
          >
            <i class="fa fa-file-text-o mr-1"></i>请求体
          </button>
        </div>
        
        <!-- 接口参数Tab面板 -->
        <div v-show="activeTab === 'params'" class="animate-fade-in w-full">
          <div class="flex items-center justify-between mb-2 w-full">
            <button @click="addParam('api')" class="text-primary text-sm hover:text-secondary transition-all-300">
              <i class="fa fa-plus-circle mr-1"></i>添加参数
            </button>
          </div>
          <div class="space-y-2">
            <!-- 接口参数项 -->
            <div v-for="(param, index) in apiParams" :key="`api-${index}`" 
                 class="api-param-item flex items-center space-x-2 animate-fade-in" 
                 :style="{ opacity: param.visible ? 1 : 0 }">
              <input :value="param.name" @input="$emit('update:apiParams', [...apiParams.slice(0, index), {...param, name: $event.target.value}, ...apiParams.slice(index+1)])" type="text" placeholder="参数名" class="flex-1 form-input rounded-lg border-light-2 px-3 py-2 text-sm">
              <input :value="param.value" @input="$emit('update:apiParams', [...apiParams.slice(0, index), {...param, value: $event.target.value}, ...apiParams.slice(index+1)])" type="text" placeholder="参数值" class="flex-1 form-input rounded-lg border-light-2 px-3 py-2 text-sm">
              <button @click="removeParam('api', index)" class="remove-api-param p-2 text-dark-2 hover:text-danger transition-all-300">
                <i class="fa fa-trash-o"></i>
              </button>
            </div>
          </div>
        </div>
        
        <!-- 请求体Tab面板 -->
        <div v-show="activeTab === 'body' && ['POST', 'PUT', 'PATCH'].includes(selectedMethod)" class="animate-fade-in w-full">
          <!-- 输入模式切换 -->
          <div class="flex items-center justify-between mb-2 w-full">
            <!-- 模式切换选项卡 -->
            <div class="flex bg-light-1 rounded-lg p-1">
              <button @click="changeInputMode('kv')" 
                      class="px-3 py-1 text-sm rounded-md" 
                      :class="inputMode === 'kv' ? 'bg-primary text-white' : 'text-dark-2 hover:text-primary'">
                键值对
              </button>
              <button @click="changeInputMode('json')" 
                      class="px-3 py-1 text-sm rounded-md" 
                      :class="inputMode === 'json' ? 'bg-primary text-white' : 'text-dark-2 hover:text-primary'">
                JSON原始数据
              </button>
            </div>
            <!-- 键值对模式下显示添加按钮 -->
            <button v-show="inputMode === 'kv'" @click="addKvPair" class="text-primary text-sm hover:text-secondary transition-all-300">
              <i class="fa fa-plus-circle mr-1"></i>添加键值对
            </button>
            <!-- JSON模式下显示格式化按钮 -->
            <button v-show="inputMode === 'json'" @click="formatJsonInput" class="text-primary text-sm hover:text-secondary transition-all-300">
              <i class="fa fa-indent mr-1"></i>格式化JSON
            </button>
          </div>
          
          <!-- 键值对列表模式 -->
          <div v-show="inputMode === 'kv'" class="animate-fade-in w-full">
            <!-- 键值对列表 -->
            <div class="space-y-3">
              <!-- 键值对项 -->
              <div v-for="(pair, index) in kvPairs" :key="`kv-${index}`" 
                   class="kv-item flex items-center space-x-2 bg-light-1 p-3 rounded-lg animate-fade-in" 
                   :style="{ opacity: pair.visible ? 1 : 0 }">
                <select :value="pair.type" @input="$emit('update:kvPairs', [...kvPairs.slice(0, index), {...pair, type: $event.target.value}, ...kvPairs.slice(index+1)])" class="w-24 form-select rounded-lg border-light-2 px-3 py-2 text-sm">
                  <option value="string">字符串</option>
                  <option value="number">数字</option>
                  <option value="boolean">布尔值</option>
                  <option value="array">数组</option>
                  <option value="object">对象</option>
                  <option value="null">Null</option>
                </select>
                <input :value="pair.key" @input="$emit('update:kvPairs', [...kvPairs.slice(0, index), {...pair, key: $event.target.value}, ...kvPairs.slice(index+1)])" type="text" placeholder="键名 (key)" class="flex-1 form-input rounded-lg border-light-2 px-3 py-2 text-sm">
                <input :value="pair.value" @input="$emit('update:kvPairs', [...kvPairs.slice(0, index), {...pair, value: $event.target.value}, ...kvPairs.slice(index+1)])" type="text" placeholder="值 (value)" class="flex-1 form-input rounded-lg border-light-2 px-3 py-2 text-sm">
                <button @click="removeKvPair(index)" class="remove-kv-pair p-2 text-dark-2 hover:text-danger transition-all-300">
                  <i class="fa fa-trash-o"></i>
                </button>
              </div>
            </div>
            
            <!-- JSON预览区域 -->
            <div class="mt-4 bg-dark/5 p-3 rounded-lg">
              <label class="block text-sm font-medium text-dark-2 mb-1">JSON预览</label>
              <pre ref="jsonPreview" class="text-sm font-mono overflow-auto max-h-32 scrollbar-thin scrollbar-thumb-rounded">{{ jsonPreviewContent }}</pre>
            </div>
            
            <button @click="formatJsonPreview" class="mt-2 text-primary text-sm hover:text-secondary transition-all-300">
              <i class="fa fa-indent mr-1"></i>格式化JSON
            </button>
          </div>
          
          <!-- JSON原始数据模式 -->
          <div v-show="inputMode === 'json'" class="animate-fade-in">
            <div class="bg-dark/5 rounded-lg">
              <textarea 
                :value="jsonRawInput"
                @input="$emit('update:jsonRawInput', $event.target.value)"
                class="w-full h-64 form-textarea rounded-lg border-light-2 p-3 text-sm font-mono resize-none scrollbar-thin scrollbar-thumb-rounded" 
                placeholder="请输入JSON格式的数据..."
              ></textarea>
            </div>
            
            <div class="mt-2 flex items-center justify-between">
              <button @click="validateJson" class="text-primary text-sm hover:text-secondary transition-all-300">
                <i class="fa fa-check-circle mr-1"></i>验证JSON
              </button>
              <button @click="importJsonToKvPairs" class="text-secondary text-sm hover:text-primary transition-all-300">
                <i class="fa fa-exchange mr-1"></i>导入为键值对
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 请求按钮 -->
      <div class="flex items-center justify-center space-x-3 py-4">
        <button 
          @click="copyRequestConfig"
          class="px-4 py-2 bg-light-1 text-dark-1 rounded-lg hover:bg-light-2 transition-all-300 flex items-center">
          <i class="fa fa-copy mr-2"></i>
        </button>
        <button @click="sendRequest" class="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2.5 px-4 rounded-lg transition-all-300 flex items-center justify-center space-x-2">
          <i class="fa fa-paper-plane"></i>
          <span>发送请求</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useMainStore } from '../../stores/index.js'

export default {
  name: 'ApiConfig',
  props: {
    selectedMethod: String,
    methods: Array,
    apiPath: String,
    apiName: String,
    apiParams: Array,
    inputMode: String,
    kvPairs: Array,
    jsonRawInput: String,
    jsonPreviewContent: String,
    expandedSections: Object
  },
  data() {
    return {
      activeTab: 'params', // 默认显示接口参数标签页
      store: useMainStore()
    }
  },
  watch: {
    selectedMethod(newMethod) {
      // 当非GET请求方法被选择时，自动切换到请求体标签页
      if (['POST', 'PUT', 'PATCH'].includes(newMethod)) {
        this.activeTab = 'body'
      } else {
        this.activeTab = 'params'
      }
    }
  },
  // 组件挂载时初始化activeTab
  mounted() {
    this.$nextTick(() => {
      if (['POST', 'PUT', 'PATCH'].includes(this.selectedMethod)) {
        this.activeTab = 'body'
      }
    })
  },
  methods: {
    toggleExpand(section) {
      this.$emit('toggle-expand', section)
    },
    addParam(type) {
      this.$emit('add-param', type)
    },
    removeParam(type, index) {
      this.$emit('remove-param', type, index)
    },
    addKvPair() {
      this.$emit('add-kv-pair')
    },
    removeKvPair(index) {
      this.$emit('remove-kv-pair', index)
    },
    updateJsonPreview() {
      this.$emit('update-json-preview')
    },
    formatJsonPreview() {
      this.$emit('format-json-preview')
    },
    formatJsonInput() {
      this.$emit('format-json-input')
    },
    validateJson() {
      this.$emit('validate-json')
    },
    importJsonToKvPairs() {
      this.$emit('import-json-to-kv-pairs')
    },
    copyRequestConfig() {
      this.$emit('copy-request-config')
    },
    sendRequest() {
      this.$emit('send-request')
    },
    clearApiConfig() {
      // 清空接口配置参数
      this.$emit('clear-api-config')
    },
    // 更改输入模式
    changeInputMode(mode) {
      // 确保只接受有效的模式值
      if (mode === 'kv' || mode === 'json') {
        // 直接更新store中的inputMode状态
        this.store.updateProperty('inputMode', mode)
        // 同时发出事件以保持v-model兼容性
        this.$emit('update:inputMode', mode)
      }
    }
  }
}
</script>