<template>
  <div class="bg-white rounded-xl shadow-card p-5 hover:shadow-hover transition-all-300 w-full max-w-full">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold flex items-center">
        <i class="fa fa-terminal text-primary mr-2"></i>接口配置
      </h2>
      <button @click="$emit('share-config')" class="text-dark-2 hover:text-primary transition-all-300">
        <i class="fa fa-share-alt"></i>
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
            <i class="fa-regular fa-file-lines mr-1"></i>请求体
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
                <i class="fa fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
        
        <!-- 请求体Tab面板 -->
        <div v-show="activeTab === 'body'" class="animate-fade-in w-full">
          <!-- 请求体输入模式切换 -->
          <div class="mb-4 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-100 shadow-sm">
            <span class="text-sm font-medium text-blue-800 font-semibold">输入模式</span>
            <div class="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                @click="localInputMode = 'kv'"
                :class="[
                  'px-4 py-2 text-sm font-medium',
                  localInputMode === 'kv' 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300',
                  'first:rounded-l-lg last:rounded-r-lg transition-all duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none'
                ]"
              >
                <i class="fa fa-key mr-1.5"></i>键值对
              </button>
              <button
                type="button"
                @click="localInputMode = 'json'"
                :class="[
                  'px-4 py-2 text-sm font-medium',
                  localInputMode === 'json' 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300',
                  'first:rounded-l-lg last:rounded-r-lg transition-all duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none'
                ]"
              >
                <i class="fa fa-code mr-1.5"></i>JSON
              </button>
            </div>
          </div>
          
          <!-- 键值对输入模式 -->
          <div v-if="localInputMode === 'kv'" class="space-y-3">
            <div 
              v-for="(pair, index) in kvPairs" 
              :key="index"
              v-show="pair.visible"
              class="flex items-center space-x-2"
            >
              <select v-model="pair.type" class="text-sm p-1.5 border border-gray-300 rounded-md bg-white w-20">
                <option value="string">字符串</option>
                <option value="number">数字</option>
                <option value="boolean">布尔值</option>
                <option value="array">数组</option>
                <option value="object">对象</option>
                <option value="null">null</option>
              </select>
              <input 
                v-model="pair.key"
                type="text" 
                placeholder="键"
                class="flex-1 text-sm p-1.5 border border-gray-300 rounded-md bg-white"
              >
              <input 
                v-model="pair.value"
                type="text" 
                placeholder="值"
                class="flex-1 text-sm p-1.5 border border-gray-300 rounded-md bg-white"
              >
              <button 
                @click="removeKvPair(index)"
                class="p-1.5 text-red-500 hover:text-red-700 rounded-md hover:bg-red-100 transition-colors"
                title="删除"
              >
                <i class="fa fa-trash-can"></i>
              </button>
            </div>
            <button 
              @click="addKvPair"
              class="text-sm text-primary hover:text-primary/80 flex items-center"
            >
              <i class="fa fa-plus mr-1"></i> 添加键值对
            </button>
          </div>
          
          <!-- JSON输入模式 -->
          <div v-if="localInputMode === 'json'" class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-sm text-dark-2">JSON输入:</span>
              <div class="flex space-x-2">
                <button 
                  @click="formatJsonInput"
                  class="text-xs px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
                  title="格式化JSON"
                >
                  <i class="fa fa-indent mr-1"></i> 格式化
                </button>
                <button 
                  @click="validateJson"
                  class="text-xs px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center"
                  title="验证JSON"
                >
                  <i class="fa fa-check mr-1"></i> 验证
                </button>
                <button 
                  @click="importJsonToKvPairs"
                  class="text-xs px-2 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors flex items-center"
                  title="导入到键值对"
                >
                  <i class="fa fa-exchange mr-1"></i> 导入
                </button>
              </div>
            </div>
            <textarea
              v-model="localJsonInput"
              @input="handleJsonInput"
              @blur="handleJsonBlur"
              placeholder="请输入JSON格式的请求体数据..."
              class="w-full h-64 p-3 border border-gray-300 rounded-md bg-white font-mono text-sm resize-vertical"
              :class="{ 'border-danger': jsonValidationError }"
              @keydown="handleTabKey"
            ></textarea>
            <div v-if="jsonValidationError" class="mt-1 text-xs text-danger">
              {{ jsonValidationError }}
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
import JsonEditor from '../JsonEditor.vue'
import Helpers from '../../utils/helpers.js'

export default {
  utils: {
    helpers: Helpers
  },
  name: 'ApiConfig',
  components: {
    JsonEditor
  },
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
      // 本地JSON输入值
      localJsonInput: this.jsonRawInput,
      // 本地输入模式变量
      localInputMode: this.inputMode,
      // JSON验证错误信息
      jsonValidationError: ''
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
    },
    // 监听props变化，更新本地值
    jsonRawInput(newVal) {
      this.localJsonInput = newVal
    },
    // 监听输入模式props变化
    inputMode(newVal) {
      this.localInputMode = newVal
    },
    // 监听本地输入模式变化，发出更新事件
     localInputMode(newVal) {
       this.$emit('update:input-mode', newVal)
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
    handleJsonInput() {
      this.$emit('update:json-raw-input', this.localJsonInput)
    },
    formatJson() {
      this.$emit('format-json-input')
    },
    validateJson() {
      this.$emit('validate-json')
    },
    
    // 处理JSON验证结果
    handleJsonValidation(result) {
      if (!result.valid && result.error) {
        // 验证失败时显示错误信息
        this.$emit('json-error', result.error)
      } else if (result.valid) {
        this.$emit('json-valid')
      }
    },
    
    // 处理JSON格式化事件
    handleJsonFormatted(formattedJson) {
      this.$emit('json-formatted', formattedJson)
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
    },
    // 处理JSON输入
    handleJsonInput() {
      this.$emit('update:jsonRawInput', this.localJsonInput)
      // 清除之前的错误信息
      this.jsonValidationError = ''
    },
    // 处理JSON输入框失去焦点事件，验证并自动格式化
    handleJsonBlur() {
      // 如果有输入值，自动验证JSON格式
      const trimmedInput = this.localJsonInput.trim()
      if (trimmedInput) {
        const result = this.$options.utils.helpers.validateJson(trimmedInput)
        if (!result.valid) {
          this.jsonValidationError = `JSON格式错误: ${result.error}`
          this.$emit('json-error', result.error)
        } else {
          this.jsonValidationError = ''
          this.$emit('json-valid')
          // 验证成功后自动格式化JSON
          try {
            const parsedJson = JSON.parse(trimmedInput)
            this.localJsonInput = JSON.stringify(parsedJson, null, 2)
            // 手动触发更新事件
            this.$emit('update:jsonRawInput', this.localJsonInput)
          } catch (e) {
            // 格式化失败但不影响验证结果
            console.warn('JSON格式化失败:', e)
          }
        }
      }
    },
    handleTabKey(event) {
      // 只处理Tab键，其他快捷键（如Ctrl+A、Ctrl+C、Ctrl+V）保持默认行为
      if (event.key === 'Tab') {
        event.preventDefault();
        
        const textarea = event.target;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const spaces = '    '; // 4个空格
        
        // 在光标位置插入4个空格
        this.localJsonInput = this.localJsonInput.substring(0, start) + spaces + this.localJsonInput.substring(end);
        
        // 设置新的光标位置
        this.$nextTick(() => {
          textarea.selectionStart = textarea.selectionEnd = start + spaces.length;
        });
      }
      // 对于其他快捷键，不做任何处理，保持浏览器默认行为
    }
  }
}
</script>