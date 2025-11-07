<template>
  <div id="api-test-page" class="min-h-screen flex flex-col">
    <!-- 顶部导航栏 - 全屏 -->
    <AppHeader 
      @toggle-theme="toggleTheme"
    />
    
    <!-- 左侧浮动业务导航工具条 -->
    <div class="hidden lg:block fixed left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50 flex flex-col items-center space-y-3 transition-all duration-300" :class="{ 'w-16': !toolBarExpanded, 'w-48': toolBarExpanded }">
      <!-- 业务功能按钮组 -->
      <div class="flex flex-col items-center space-y-2">
        <!-- 历史请求按钮（放在第一位） -->
        <button 
            @click="toggleHistoryModal"
            class="px-3 py-2 rounded-md text-sm flex items-center space-x-3 w-full justify-start hover:bg-gray-100 transition-colors"
            :class="{ 'bg-primary/10 text-primary': activeTool === 'history' }"
          >
            <i class="fa fa-history text-lg w-6 text-center"></i>
            <span v-show="toolBarExpanded">历史请求</span>
          </button>
          
          <div class="w-full h-px bg-gray-200 my-1" v-show="toolBarExpanded"></div>
          
          <button 
            @click="handleShowGlobalSettings"
            class="px-3 py-2 rounded-md text-sm flex items-center space-x-3 w-full justify-start hover:bg-gray-100 transition-colors"
            :class="{ 'bg-primary/10 text-primary': activeTool === 'settings' }"
          >
            <i class="fa fa-cog text-lg w-6 text-center"></i>
            <span v-show="toolBarExpanded">全局设置</span>
          </button>
          <button 
            @click="handleShowHelp"
            class="px-3 py-2 rounded-md text-sm flex items-center space-x-3 w-full justify-start hover:bg-gray-100 transition-colors"
            :class="{ 'bg-primary/10 text-primary': activeTool === 'help' }"
          >
            <i class="fa fa-question-circle text-lg w-6 text-center"></i>
            <span v-show="toolBarExpanded">帮助说明</span>
          </button>
          <div class="w-full h-px bg-gray-200 my-1" v-show="toolBarExpanded"></div>
          <button 
            class="px-3 py-2 rounded-md text-sm flex items-center space-x-3 w-full justify-start hover:bg-gray-100 transition-colors"
            :class="{ 'bg-primary/10 text-primary': activeBusiness === 'project' }"
            @click="setActiveBusiness('project')"
          >
            <i class="fa fa-folder text-lg w-6 text-center"></i>
            <span v-show="toolBarExpanded">项目管理</span>
          </button>
          <button 
            class="px-3 py-2 rounded-md text-sm flex items-center space-x-3 w-full justify-start hover:bg-gray-100 transition-colors"
            :class="{ 'bg-primary/10 text-primary': activeBusiness === 'group' }"
            @click="setActiveBusiness('group')"
          >
            <i class="fa fa-object-group text-lg w-6 text-center"></i>
            <span v-show="toolBarExpanded">分组管理</span>
          </button>
          <!-- 分隔线 -->
          <div class="w-full h-px bg-gray-200 my-1" v-show="toolBarExpanded"></div>
          
          <!-- 收起按钮 -->
          <button 
            @click="toggleToolBarExpanded"
            class="px-3 py-2 rounded-md text-sm flex items-center space-x-3 w-full justify-start hover:bg-gray-100 transition-colors"
            title="收起工具栏"
          >
            <i class="fa fa-compress text-lg w-6 text-center transition-transform duration-500 ease-in-out" :class="toolBarExpanded ? 'rotate-180' : ''"></i>
            <span v-show="toolBarExpanded">收起</span>
          </button>
      </div>
    </div>
    
    <!-- 移动端业务导航工具条 -->
    <div class="lg:hidden bg-white border-b border-gray-200 py-2 px-4 flex items-center justify-between z-40">
      <div class="flex items-center space-x-2">
        <button 
          @click="toggleHistoryModal"
          class="p-2 rounded-md hover:bg-gray-100 transition-colors"
          title="历史请求"
        >
          <i class="fa fa-history"></i>
        </button>
        <button 
          @click="handleShowGlobalSettings"
          class="p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <i class="fa fa-cog"></i>
        </button>
        <button 
          @click="handleShowHelp"
          class="p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <i class="fa fa-question-circle"></i>
        </button>
      </div>
      <div class="flex items-center space-x-2">
        <button 
          class="p-2 rounded-md hover:bg-gray-100 transition-colors"
          @click="setActiveBusiness('project')"
        >
          <i class="fa fa-folder"></i>
        </button>
        <button 
          class="p-2 rounded-md hover:bg-gray-100 transition-colors"
          @click="setActiveBusiness('group')"
        >
          <i class="fa fa-object-group"></i>
        </button>
        <button 
          class="p-2 rounded-md hover:bg-gray-100 transition-colors"
          @click="setActiveBusiness('template')"
        >
          <i class="fa fa-file-text"></i>
        </button>
      </div>
    </div>
    
    <!-- 主内容区域 - 全屏 -->
    <main class="flex-1 flex p-4 lg:pl-24 lg:pr-104">
      <!-- 文档预览模态框 -->
      <DocumentPreview 
        v-if="showDocumentPreview"
        :document-content="documentContent"
        @copy-document="copyDocument"
        @download-document="downloadDocument"
        @close-preview="closeDocumentPreview"
      />
      
      <!-- 左侧区域：文档配置 -->
      <div class="w-64 min-w-64 mr-4">
        <!-- 文档配置卡片 -->
        <DocumentConfig 
          v-model:api-name="apiName"
          v-model:api-description="apiDescription"
          v-model:api-author="apiAuthor"
          :expanded-sections="expandedSections"
          @toggle-expand="toggleExpand"
          @generate-document="generateDocument"
        />
      </div>
      
      <!-- 中间区域：接口配置 + 请求信息 -->
      <div class="flex-1 max-w-3xl mx-4">
        <!-- 首次使用提醒 -->
        <div v-if="showFirstUseReminder" class="bg-warning-light border border-warning rounded-lg p-4 mb-4">
          <div class="flex items-start">
            <i class="fa fa-info-circle text-warning mt-1 mr-3"></i>
            <div>
              <h4 class="font-medium text-dark-1 mb-1">首次使用提醒</h4>
              <p class="text-sm text-dark-2 mb-2">为了更好地使用接口测试工具，请先配置全局参数</p>
              <button @click="handleShowGlobalSettings" class="bg-primary hover:bg-primary/90 text-white text-sm px-3 py-1 rounded transition-colors">
                去配置全局参数
              </button>
              <button @click="dismissFirstUseReminder" class="ml-2 text-sm text-dark-2 hover:text-dark-1">
                稍后再说
              </button>
            </div>
          </div>
        </div>
        
        <!-- 接口配置卡片 -->
        <ApiConfig
          v-model:selected-method="selectedMethod"
          :methods="methods"
          v-model:api-path="apiPath"
          :api-name="apiName"
          @update:apiName="updateProperty('apiName', $event)"
          v-model:api-params="apiParams"
          v-model:input-mode="inputMode"
          v-model:kv-pairs="kvPairs"
          :json-raw-input="jsonRawInput"
          @update:json-raw-input="updateProperty('jsonRawInput', $event)"
          v-model:json-preview-content="jsonPreviewContent"
          :expanded-sections="expandedSections"
          @toggle-expand="toggleExpand"
          @add-param="addParam"
          @remove-param="removeParam"
          @add-kv-pair="addKvPair"
          @remove-kv-pair="removeKvPair"
          @update-json-preview="updateJsonPreview"
          @format-json-preview="formatJsonPreview"
          @format-json-input="formatJsonInput"
          @validate-json="validateJson"
          @import-json-to-kv-pairs="importJsonToKvPairs"
          @copy-request-config="copyRequestConfig"
          @send-request="sendRequest"
          @clear-api-config="clearApiConfig"
          @update:api-path="updateProperty('apiPath', $event)"
        />
        
        <!-- 请求信息卡片 -->
        <RequestInfo
          v-if="showResponse"
          :request-method="requestMethod"
          :request-url="requestUrl"
          :request-headers="requestHeaders"
          :request-params="requestParams"
          :request-body="requestData"
        />
      </div>
      
      <!-- 右侧区域：响应信息 -->
      <div class="w-full lg:w-96 min-w-96 ml-4">
        <!-- 响应信息卡片 -->
        <ResponseInfo 
          v-if="showResponse"
          :response-code="responseCode"
          :response-time="responseTime"
          :response-size="responseSize"
          :response-url="responseUrl"
          :formatted-response-content="formattedResponseContent"
          @copy-response="copyResponse"
          @download-response="downloadResponse"
        />
      </div>
    </main>
    
    <!-- 历史请求模态框 -->
    <div v-if="showHistoryModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <!-- 模态框头部 -->
        <div class="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 class="font-medium text-dark flex items-center">
            <i class="fa fa-history text-primary mr-2"></i>
            历史请求
          </h3>
          <button 
            @click="closeHistoryModal"
            class="text-dark-2 hover:text-dark p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="关闭"
          >
            <i class="fa fa-times"></i>
          </button>
        </div>
        <!-- 模态框内容 -->
        <div class="flex-1 overflow-y-auto p-4">
          <RequestHistory 
            :request-history="requestHistory"
            @clear-history="handleClearHistory"
            @load-history-item="handleLoadHistoryItem"
          />
        </div>
      </div>
    </div>
    
    <!-- 全局设置模态框 -->
    <GlobalSettings 
      v-if="showGlobalSettings"
      v-model:request-mode="requestMode"
      v-model:global-param-mode="globalParamMode"
      :proxy-url="proxyUrl"
      :base-url="baseUrl"
      :timeout="timeout"
      :global-params="globalParams"
      v-model:global-json-input="globalJsonInput"
      :headers="headers"
      v-model:global-param-method="globalParamMethod"
      @close="hideGlobalSettings"
      @save="saveGlobalSettings"
      @add-param="addParam"
      @remove-param="removeParam"
      @validate-global-json="validateGlobalJson"
      @format-global-json="formatGlobalJson"
      @import-global-json="importGlobalJson"
      @update:global-params="handleGlobalParamsUpdate"
      @update:headers="handleHeadersUpdate"
      @update:proxy-url="handleProxyUrlUpdate"
      @update:base-url="handleBaseUrlUpdate"
      @update:timeout="handleTimeoutUpdate"
      @update:request-mode="handleRequestModeChange"
      @update:global-param-mode="handleGlobalParamModeChange"
    />
    
    <!-- 帮助模态框 -->
    <HelpModal v-if="showHelp" @close="hideHelp" />
    
    <!-- 操作提示 -->
    <Toast 
      :message="toastMessage" 
      :visible="toastVisible"
      @close="hideToast"
    />
    
    <!-- 页脚 -->
    <AppFooter />
  </div>
</template>

<script>
// 从pinia中导入useMainStore
import { mapState, mapActions } from 'pinia'
import { useMainStore } from '../stores/index.js'

import AppHeader from '../components/layout/AppHeader.vue'
import AppFooter from '../components/layout/AppFooter.vue'
import DocumentConfig from '../components/settings/DocumentConfig.vue'
import RequestHistory from '../components/layout/RequestHistory.vue'
import ApiConfig from '../components/forms/ApiConfig.vue'
import ResponseInfo from '../components/response/ResponseInfo.vue'
import RequestInfo from '../components/response/RequestInfo.vue'
import DocumentPreview from '../components/response/DocumentPreview.vue'
import GlobalSettings from '../components/modals/GlobalSettings.vue'
import HelpModal from '../components/modals/HelpModal.vue'
import Toast from '../components/layout/Toast.vue'

// 导入工具模块
import apiClient from '../utils/apiClient.js'
import paramProcessor from '../utils/paramProcessor.js'
import storage from '../utils/storage.js'
import documentGenerator from '../utils/documentGenerator.js'
import Helpers from '../utils/helpers.js'
import modalHelper from '../utils/modalHelper.js'

export default {
  name: 'ApiTestPage',
  components: {
    AppHeader,
    AppFooter,
    DocumentConfig,
    RequestHistory,
    ApiConfig,
    ResponseInfo,
    RequestInfo,
    DocumentPreview,
    GlobalSettings,
    HelpModal,
    Toast
  },
  data() {
    return {
      hasUsedTool: false, // 标记用户是否已经使用过工具
      toolBarExpanded: true, // 业务导航工具条是否展开
      activeTool: '', // 当前激活的工具
      activeBusiness: '', // 当前激活的业务功能
      showHistoryModal: false // 是否显示历史请求模态框
    }
  },
  watch: {
    // 移除apiName的watcher，避免循环更新
  },
  
  computed: {
    // 使用Pinia的mapState映射状态
    ...mapState(useMainStore, [
      'baseUrl',
      'timeout',
      'selectedMethod',
      'methods',
      'apiPath',
      'inputMode',
      'requestMode',
      'proxyUrl',
      'globalParamMode',
      'globalJsonInput',
      'showGlobalSettings',
      'requestHistory',
      'toastMessage',
      'jsonRawInput',
      'jsonPreviewContent',
      'showResponse',
      'responseCode',
      'responseTime',
      'responseSize',
      'responseUrl',
      'responseContent',
      'formattedResponseContent',
      'apiName',
      'apiDescription',
      'apiAuthor',
      'showDocumentPreview',
      'documentContent',
      'toastVisible',
      'documentFormat',
      'showHelp',
      'expandedSections',
      'globalParams',
      'headers',
      'apiParams',
      'kvPairs',
      'globalParamMethod',
      // 请求信息
      'requestMethod',
      'requestUrl',
      'requestHeaders',
      'requestParams',
      'requestData'
    ]),
    // 计算是否显示首次使用提醒
    showFirstUseReminder() {
      // 条件：1. 还没有使用过工具
      // 2. 全局参数没有配置（globalParams 中没有有效的参数）
      if (this.hasUsedTool) return false
      
      // 检查全局参数是否都为空
      const hasValidGlobalParams = this.globalParams.some(param => 
        param.name.trim() !== ''
      )
      
      return !hasValidGlobalParams
    }
  },
  mounted() {
    // 初始化JSON预览
    this.updateJsonPreview()
    // 加载历史请求
    this.loadHistory()
    // 加载全局设置
    this.loadGlobalSettings()
    
    // 检查是否是首次使用
    const hasUsedBefore = localStorage.getItem('apiToolHasUsed')
    if (hasUsedBefore) {
      this.hasUsedTool = true
    }
  },
  methods: {
    // 显示文档预览模态框
    showDocumentPreviewModal() {
      this.showDocumentPreview = true
    },
    

    
    // 使用Pinia的mapActions映射actions
    ...mapActions(useMainStore, [
      'updateProperty',
      'updateState',
      'setGlobalSettingsVisible',
      'setHelpVisible',
      'addGlobalParam',
      'removeGlobalParam',
      'addHeader',
      'removeHeader',
      'addApiParam',
      'removeApiParam',
      'addKvPair',
      'removeKvPairAction', // 重命名以避免冲突
      'updateJsonPreview',
      'updateResponseData',
      'updateDocumentPreview',
      'showToast',
      'hideToast',
      'toggleExpand'
    ]),
    
    // 关闭文档预览
    closeDocumentPreview() {
      this.showDocumentPreview = false
      this.updateDocumentPreview({ showDocumentPreview: false, documentContent: '' })
    },
    
    // 切换主题
    toggleTheme() {
  
      // 简单的主题切换实现
      const body = document.body;
      if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
      } else {
        body.classList.add('dark-mode');
      }
      this.showToast('主题已切换');
    },
    
    // 刷新JSON预览（本地方法）
    refreshJsonPreview() {
  
      try {
        // 获取请求体JSON数据
        const jsonData = this.getRequestBodyJson();
        // 调用store中的updateJsonPreview方法，传入格式化后的JSON
        this.updateJsonPreview(JSON.stringify(jsonData, null, 2));
      } catch (e) {
    
        this.updateJsonPreview(`// JSON格式错误: ${e.message}`);
      }
    },
    
    // 处理显示全局设置
    handleShowGlobalSettings() {
      
      try {
        this.setGlobalSettingsVisible(true)
    
        // 立即检查状态
        setTimeout(() => {
      
        }, 0)
      } catch (error) {
    
      }
    },
    
    // 隐藏全局设置
    hideGlobalSettings() {
  
      try {
        this.setGlobalSettingsVisible(false)
    
      } catch (error) {
    
      }
    },
    
    // 处理显示帮助
    handleShowHelp() {
  
      try {
        this.setHelpVisible(true)
    
      } catch (error) {
    
      }
    },
    
    // 隐藏帮助
    hideHelp() {
  
      try {
        this.setHelpVisible(false)
    
      } catch (error) {
    
      }
    },
    
    // 处理代理URL更新
    handleProxyUrlUpdate(newProxyUrl) {
      // 使用store的updateProperty方法更新代理URL
      this.updateProperty('proxyUrl', newProxyUrl)
    },
    
    // 处理基础URL更新
    handleBaseUrlUpdate(newBaseUrl) {
      // 使用store的updateProperty方法更新基础URL
      this.updateProperty('baseUrl', newBaseUrl)
    },
    
    // 处理超时设置更新
    handleTimeoutUpdate(newTimeout) {
      // 使用store的updateProperty方法更新超时设置
      this.updateProperty('timeout', newTimeout)
    },
    
    // 处理全局参数更新
    handleGlobalParamsUpdate(newParams) {
      // 使用store的updateProperty方法更新全局参数
      this.updateProperty('globalParams', newParams)
    },
    
    // 处理请求头更新
    handleHeadersUpdate(newHeaders) {
      // 使用store的updateProperty方法更新请求头
      this.updateProperty('headers', newHeaders)
    },
    
    // 添加参数
    addParam(type) {
      switch (type) {
        case 'global':
          this.addGlobalParam()
          break
        case 'header':
          this.addHeader()
          break
        case 'api':
          this.addApiParam()
          break
      }
    },
    
    // 移除参数
    removeParam(type, index) {
      switch (type) {
        case 'global':
          this.removeGlobalParam(index)
          break
        case 'header':
          this.removeHeader(index)
          break
        case 'api':
          this.removeApiParam(index)
          break
      }
    },
    
    // 移除键值对
    removeKvPair(index) {
  
      this.removeKvPairAction(index)
    },
    
    // 处理从ApiConfig组件传递的add-kv-pair事件
    addKvPair() {
  
      // 使用从mapActions映射的方法
      this.addKvPairAction();
      // 标记用户已使用工具
      this.markAsUsed();
    },
    
    // 清空API配置参数
    clearApiConfig() {
      // 重置API参数
      this.updateProperty('apiParams', [{ name: '', value: '', visible: true }]);
      
      // 重置请求体键值对
      this.updateProperty('kvPairs', [{ type: 'string', key: '', value: '', visible: true }]);
      
      // 重置JSON原始输入
      this.updateProperty('jsonRawInput', '');
      
      // 重置请求路径
      this.updateProperty('apiPath', '');
      
      // 显示成功提示
      this.showToast('已重置接口配置参数');
    },
    
    // 标记用户已使用工具
    markAsUsed() {
      this.hasUsedTool = true;
      localStorage.setItem('apiToolHasUsed', 'true');
    },
    
    // 关闭首次使用提醒
    dismissFirstUseReminder() {
      this.markAsUsed();
    },
    
    // 处理请求方式切换
    handleRequestModeChange(mode) {
      
      try {
        this.updateProperty('requestMode', mode);
    
      } catch (error) {
    
      }
    },
    
    // 处理全局参数模式切换
    handleGlobalParamModeChange(mode) {
      try {
        this.updateProperty('globalParamMode', mode);
      } catch (error) {
    
      }
    },
    // 处理全局参数提交方式切换
    handleGlobalParamMethodChange(method) {
      this.setGlobalParamMethod(method)
    },
    
    // 保存全局设置到localStorage
    saveGlobalSettings(settingsFromModal) {
      try {
        // 确保使用从模态框传递的设置数据
        if (!settingsFromModal) {
          this.showToast('设置数据无效')
          return
        }
        
        // 创建设置的深拷贝，确保不引用原始对象
        const settings = JSON.parse(JSON.stringify(settingsFromModal))
        // 直接保存到localStorage
        const success = storage.saveGlobalSettings(settings)
        
        if (success) {
          // 使用从模态框传递的设置数据直接更新store和组件属性，而不是重新加载
          // 使用updateState方法更新store中的所有全局设置属性
          this.updateState({
            requestMode: settings.requestMode,
            proxyUrl: settings.proxyUrl,
            baseUrl: settings.baseUrl,
            timeout: settings.timeout,
            globalParams: JSON.parse(JSON.stringify(settings.globalParams)),
            globalParamMode: settings.globalParamMode,
            globalJsonInput: settings.globalJsonInput,
            headers: JSON.parse(JSON.stringify(settings.headers)),
            globalParamMethod: settings.globalParamMethod || 'GET'
          })
          
          // 显示保存成功提示
          this.showToast('设置已保存')
        } else {
          this.showToast('设置保存失败')
        }
      } catch (error) {
    
        this.showToast('设置保存失败')
      }
    },
    // 加载全局设置
    loadGlobalSettings() {
      try {
        const settings = storage.loadGlobalSettings()
        
        // 使用updateState一次性更新所有设置，确保完整更新
        const settingsToUpdate = {
          requestMode: settings.requestMode || 'proxy',
          proxyUrl: settings.proxyUrl || 'backend/api-test-worker.php',
          baseUrl: settings.baseUrl || 'https://jsonplaceholder.typicode.com',
          timeout: settings.timeout || 30000,
          globalParams: settings.globalParams ? JSON.parse(JSON.stringify(settings.globalParams)) : [{ name: '', value: '', visible: true }],
          globalParamMode: settings.globalParamMode || 'kv',
          globalJsonInput: settings.globalJsonInput || '',
          headers: settings.headers ? JSON.parse(JSON.stringify(settings.headers)) : [{ name: 'Content-Type', value: 'application/json', visible: true }],
          globalParamMethod: settings.globalParamMethod || 'GET'
        }
        
    
        this.updateState(settingsToUpdate)
        
    
      } catch (error) {
    
      }
    },
    // 验证全局JSON参数
    validateGlobalJson() {
      try {
        if (!this.globalJsonInput.trim()) {
          modalHelper.warning('请输入JSON内容')
          return
        }
        const result = Helpers.validateJson(this.globalJsonInput)
        if (result.valid) {
          modalHelper.success('JSON格式正确')
        } else {
          modalHelper.error('JSON格式错误: ' + result.error)
        }
      } catch (error) {
        modalHelper.error('JSON格式错误: ' + error.message)
      }
    },
    // 导入JSON为键值对
    importGlobalJson() {
      try {
        if (!this.globalJsonInput.trim()) {
          modalHelper.warning('请输入JSON内容')
          return
        }
        const result = Helpers.validateJson(this.globalJsonInput)
        if (!result.valid) {
          modalHelper.error('JSON格式错误: ' + result.error)
          return
        }
        const jsonData = JSON.parse(this.globalJsonInput)
        const newParams = []
        for (const [key, value] of Object.entries(jsonData)) {
          newParams.push({
            name: key,
            value: String(value),
            visible: true
          })
        }
        this.updateProperty('globalParams', newParams)
        this.updateProperty('globalParamMode', 'kv')
        modalHelper.success('导入成功')
      } catch (error) {
        modalHelper.error('导入失败: ' + error.message)
      }
    },
    // 获取请求体JSON数据
    getRequestBodyJson() {
      let jsonData = {}
      
      if (this.inputMode === 'json') {
        // JSON原始数据模式
        const rawJson = this.jsonRawInput.trim()
        if (!rawJson) {
          return {}
        }
        try {
          jsonData = JSON.parse(rawJson)
        } catch (e) {
          throw new Error(`JSON解析错误: ${e.message}`)
        }
      } else {
        // 键值对模式
        this.kvPairs.forEach(pair => {
          if (!pair.visible) return
          
          const key = pair.key.trim()
          if (!key) return
          
          const value = pair.value.trim()
          
          // 根据类型转换值
          switch(pair.type) {
            case 'string':
              jsonData[key] = value
              break
            case 'number':
              jsonData[key] = value ? parseFloat(value) : 0
              break
            case 'boolean':
              jsonData[key] = value.toLowerCase() === 'true' || value === '1'
              break
            case 'array':
              try {
                jsonData[key] = value ? JSON.parse(value) : []
              } catch (e) {
                // 如果不是有效的JSON数组，尝试用逗号分割
                jsonData[key] = value ? value.split(',').map(item => item.trim()) : []
              }
              break
            case 'object':
              try {
                jsonData[key] = value ? JSON.parse(value) : {}
              } catch (e) {
            
                jsonData[key] = {}
              }
              break
            case 'null':
              jsonData[key] = null
              break
            default:
              jsonData[key] = value
          }
        })
      }
      
      // 应用占位符替换
      return paramProcessor.processPlaceholdersInObject(jsonData)
    },
    // 格式化JSON预览
    formatJsonPreview() {
      try {
        const jsonData = this.getRequestBodyJson()
        this.updateJsonPreview(JSON.stringify(jsonData, null, 2))
      } catch (e) {
        this.updateJsonPreview(`// JSON格式错误: ${e.message}`)
      }
    },
    // 格式化JSON输入
    formatJsonInput() {
      try {
        const result = Helpers.formatJson(this.jsonRawInput)
        if (result.valid) {
          this.updateProperty('jsonRawInput', result.formatted)
        } else {
          modalHelper.error(`JSON格式错误: ${result.error}`)
        }
      } catch (e) {
        modalHelper.error(`JSON格式错误: ${e.message}`)
      }
    },
    // 格式化全局参数JSON
    formatGlobalJson() {
      try {
        const result = Helpers.formatJson(this.globalJsonInput)
        if (result.valid) {
          this.updateProperty('globalJsonInput', result.formatted)
        } else {
          modalHelper.error(`JSON格式错误: ${result.error}`)
        }
      } catch (e) {
        modalHelper.error(`JSON格式错误: ${e.message}`)
      }
    },
    // 加载历史请求
    loadHistory() {
      try {
        const history = storage.loadHistory()
        if (history) {
          this.updateProperty('requestHistory', history)
          if (this.requestHistory.length > 50) {
            this.updateProperty('requestHistory', this.requestHistory.slice(0, 50))
          }
        }
      } catch (e) {
    
      }
    },
    // 保存请求到历史
    saveToHistory(config, response) {
      // 创建合并后的参数的深拷贝，确保存储的是发送请求时使用的实际参数
      // 确定请求状态
      let requestStatus = 'error';
      let responseCode = null;
      
      if (response) {
        if (response === 'timeout') {
          requestStatus = 'timeout';
        } else {
          requestStatus = response.status >= 200 && response.status < 400 ? 'success' : 'error';
          responseCode = response.status;
        }
      }
      
      const historyItem = {
        url: config.url,
        method: config.method,
        path: this.apiPath,
        apiName: this.apiName.trim() || this.apiPath.replace(/\//g, '-') || '未命名接口',
        // 添加唯一标识符，方便后续更新
        id: Date.now() + Math.random().toString(36).substr(2, 9),
        params: JSON.parse(JSON.stringify(config.params || {})),
        headers: JSON.parse(JSON.stringify(config.headers || {})),
        data: config.data ? JSON.parse(JSON.stringify(config.data)) : null,
        timestamp: Date.now(),
        targetUrl: config.targetUrl || null,
        requestStatus: requestStatus,
        responseCode: responseCode,
        // 保存全局配置（原始页面参数）
        globalConfig: {
          globalParams: JSON.parse(JSON.stringify(this.globalParams)),
          globalParamMode: this.globalParamMode,
          globalJsonInput: this.globalJsonInput,
          baseUrl: this.baseUrl,
          timeout: this.timeout,
          requestMode: this.requestMode,
          proxyUrl: this.proxyUrl,
          headers: JSON.parse(JSON.stringify(this.headers))
        }
      }
      
      const newHistory = [historyItem, ...this.requestHistory]
      
      // 限制历史记录最多保存500个
      if (newHistory.length > 500) {
        this.updateProperty('requestHistory', newHistory.slice(0, 500))
      } else {
        this.updateProperty('requestHistory', newHistory)
      }
      
      try {
        storage.saveHistory(this.requestHistory)
      } catch (e) {
    
      }
    },
    // 加载历史记录项（优先使用合并后的参数）
    loadHistoryItem(index) {
      const item = this.requestHistory[index]
      
      // 1. 优先恢复页面基本配置
      if (item.globalConfig) {
        // 恢复全局配置（页面显示用）
        this.updateProperty('globalParamMode', item.globalConfig.globalParamMode || 'kv')
        this.updateProperty('globalJsonInput', item.globalConfig.globalJsonInput || '{}')
        this.updateProperty('baseUrl', item.globalConfig.baseUrl || 'https://jsonplaceholder.typicode.com')
        this.updateProperty('timeout', item.globalConfig.timeout || 5000)
        this.updateProperty('requestMode', item.globalConfig.requestMode || 'proxy')
        this.updateProperty('proxyUrl', item.globalConfig.proxyUrl || 'backend/api-test-worker.php')
        
        // 恢复请求头配置
        this.updateProperty('headers', JSON.parse(JSON.stringify(item.globalConfig.headers || [
          { name: 'Content-Type', value: 'application/json', visible: true },
          { name: 'Accept', value: 'application/json', visible: true }
        ])))
        
        // 恢复全局参数配置（但这些参数不会直接影响已保存的请求参数）
        this.updateProperty('globalParams', JSON.parse(JSON.stringify(item.globalConfig.globalParams || [{ name: '', value: '', visible: true }])))
      }
      
      // 2. 恢复请求基本信息
      this.updateProperty('selectedMethod', item.method)
      this.updateProperty('apiPath', item.path)
      
      // 3. 优先使用存储的合并后参数，而不是重新计算
      // 转换参数格式为UI显示所需的格式
      if (item.params) {
        // 过滤掉代理模式下的target_url参数（如果存在）
        const filteredParams = { ...item.params }
        delete filteredParams.target_url
        
        this.updateProperty('apiParams', Object.entries(filteredParams).map(([name, value]) => ({
          name,
          value: String(value),
          visible: true
        })))
      } else {
        this.updateProperty('apiParams', [{ name: '', value: '', visible: true }])
      }
      
      // 4. 处理请求体
      if (['POST', 'PUT', 'PATCH'].includes(item.method) && item.data) {
        this.updateProperty('jsonRawInput', JSON.stringify(item.data, null, 2))
        this.updateProperty('inputMode', 'json')
        this.updateJsonPreview()
      }
      
      this.showToast('已加载历史请求（全量恢复）')
    },
    // 切换历史请求模态框显示
    toggleHistoryModal() {
      this.activeTool = this.showHistoryModal ? '' : 'history'
      this.showHistoryModal = !this.showHistoryModal
    },
    
    // 关闭历史请求模态框
    closeHistoryModal() {
      this.activeTool = ''
      this.showHistoryModal = false
    },
    
    // 处理清空历史记录（在模态框中）
    handleClearHistory() {
      if (confirm('确定要清空所有历史请求记录吗？')) {
        this.updateProperty('requestHistory', [])
        storage.remove('api-test-history')
        this.showToast('历史记录已清空')
      }
    },
    
    // 处理加载历史记录项（在模态框中）
    handleLoadHistoryItem(index) {
      this.loadHistoryItem(index)
      this.closeHistoryModal() // 加载后关闭模态框
    },
    
    // 清空历史记录（保留原始方法）
    clearHistory() {
      if (confirm('确定要清空所有历史请求记录吗？')) {
        this.updateProperty('requestHistory', [])
        storage.remove('api-test-history')
        this.showToast('历史记录已清空')
      }
    },
    // 复制请求配置
    copyRequestConfig() {
      const config = this.collectRequestConfig()
      const text = JSON.stringify(config, null, 2)
      navigator.clipboard.writeText(text)
        .then(() => this.showToast('请求配置已复制'))
        .catch(() => modalHelper.error('复制失败！'))
    },
    // 验证JSON格式
    validateJson() {
      try {
        const result = Helpers.validateJson(this.jsonRawInput)
        if (result.valid) {
          modalHelper.success('JSON格式正确！')
        } else {
          modalHelper.error(`JSON格式错误: ${result.error}`)
        }
      } catch (e) {
        modalHelper.error(`JSON格式错误: ${e.message}`)
      }
    },
    // 处理输入模式切换
    handleInputModeChange(newMode) {
  
      this.updateProperty('inputMode', newMode);
      // 当切换到JSON模式时，尝试从键值对生成JSON
      if (newMode === 'json') {
        this.refreshJsonPreview();
      }
    },
    
    // 导入JSON为键值对
    importJsonToKvPairs() {
      try {
    
        const result = Helpers.validateJson(this.jsonRawInput)
        if (!result.valid) {
          this.showToast(`JSON格式错误: ${result.error}`)
          return
        }
        const jsonData = JSON.parse(this.jsonRawInput)
        const newPairs = []
        
        Object.keys(jsonData).forEach(key => {
          const value = jsonData[key]
          let type
          let valueStr
          
          if (value === null) {
            type = 'null'
            valueStr = ''
          } else if (typeof value === 'string') {
            type = 'string'
            valueStr = value
          } else if (typeof value === 'number') {
            type = 'number'
            valueStr = value.toString()
          } else if (typeof value === 'boolean') {
            type = 'boolean'
            valueStr = value.toString()
          } else if (Array.isArray(value)) {
            type = 'array'
            valueStr = JSON.stringify(value)
          } else if (typeof value === 'object' && value !== null) {
            // 确保对象类型的值正确转换为JSON字符串
            type = 'object'
            try {
              valueStr = JSON.stringify(value)
            } catch (e) {
          
              valueStr = String(value)
            }
          } else {
            type = 'string'
            valueStr = String(value)
          }
          
          newPairs.push({
            type,
            key,
            value: valueStr,
            visible: true
          })
        })
        
        if (newPairs.length > 0) {
          this.updateProperty('kvPairs', newPairs)
          this.updateProperty('inputMode', 'kv')
          this.updateJsonPreview()
          this.showToast('导入成功！')
        } else {
          this.showToast('未找到可导入的数据！')
        }
      } catch (e) {
        this.showToast(`导入失败: ${e.message}`)
      }
    },
    // 收集请求配置
    // 处理键值对参数
    processKeyValuePairs(kvPairs) {
      const result = {}
      kvPairs.forEach(param => {
        if (!param.visible || !param.name.trim()) return
        
        const name = param.name.trim()
        let value = paramProcessor.replacePlaceholders(param.value)
        
        // 尝试解析可能的JSON字符串
        result[name] = this.parseJsonIfPossible(value)
      })
      return result
    },
    
    // 尝试解析JSON字符串
    parseJsonIfPossible(value) {
      if (!value) return value
      
      try {
        if (value.startsWith('{') && value.endsWith('}') || value.startsWith('[') && value.endsWith(']')) {
          const parsed = JSON.parse(value)
          if (typeof parsed === 'object' && parsed !== null) {
            return parsed
          }
        }
      } catch (e) {
        // 解析失败，返回原始值
      }
      return value
    },
    
    // 深度合并参数对象
    mergeParams(target, source) {
      for (const key in source) {
        if (!Object.prototype.hasOwnProperty.call(source, key)) continue
        
        const targetVal = target[key]
        const sourceVal = source[key]
        
        if (targetVal && typeof targetVal === 'object' && targetVal !== null &&
            typeof sourceVal === 'object' && sourceVal !== null) {
          // 对嵌套对象进行深度合并
          target[key] = paramProcessor.deepMerge(targetVal, sourceVal)
        } else {
          target[key] = sourceVal
        }
      }
      return target
    },
    
    // 收集全局参数
    collectGlobalParams() {
      const params = {}
      
      if (this.globalParamMode === 'json') {
        this.collectJsonGlobalParams(params)
      } else {
        const kvParams = this.processKeyValuePairs(this.globalParams)
        this.mergeParams(params, kvParams)
      }
      
      return params
    },
    
    // 收集JSON格式的全局参数
    collectJsonGlobalParams(target) {
      try {
        if (!this.globalJsonInput.trim()) return
        
        const globalJson = JSON.parse(this.globalJsonInput)
        if (typeof globalJson === 'object' && globalJson !== null && !Array.isArray(globalJson)) {
          const processedJson = paramProcessor.processPlaceholdersInObject(globalJson)
          this.mergeParams(target, processedJson)
        }
      } catch (e) {
    
        this.showToast('全局参数JSON格式错误，请检查')
      }
    },
    
    // 构建请求头
    buildHeaders() {
      const headers = {}
      this.headers.forEach(header => {
        if (header.visible && header.name.trim()) {
          headers[header.name.trim()] = header.value
        }
      })
      return headers
    },
    
    // 构建请求URL和目标URL
    buildRequestInfo(params) {
      let url = ''
      let targetUrl = ''
      
      if (this.requestMode === 'direct') {
        url = this.apiPath.trim()
        targetUrl = url
      } else {
        url = this.proxyUrl
        targetUrl = `${this.baseUrl.replace(/\/$/, '')}/${this.apiPath.replace(/^\//, '')}`
      }
      
      return { url, targetUrl }
    },
    
    // 重构后的收集请求配置方法 - 确保请求参数与页面参数完全独立
    collectRequestConfig() {
      // 创建页面参数的深拷贝，确保不影响原页面参数
      // 确保使用最新的全局参数
  
      const pageGlobalParams = JSON.parse(JSON.stringify(this.globalParams))
      const pageApiParams = JSON.parse(JSON.stringify(this.apiParams))
      const pageHeaders = JSON.parse(JSON.stringify(this.headers))
      const pageKvPairs = JSON.parse(JSON.stringify(this.kvPairs))
      const pageJsonRawInput = this.jsonRawInput
      const pageGlobalJsonInput = this.globalJsonInput
      const pageSelectedMethod = this.selectedMethod
      const pageRequestMode = this.requestMode
      const pageProxyUrl = this.proxyUrl
      const pageBaseUrl = this.baseUrl
      const pageApiPath = this.apiPath
      const pageGlobalParamMode = this.globalParamMode
      const pageGlobalParamMethod = this.globalParamMethod
      const pageInputMode = this.inputMode
      const pageTimeout = this.timeout
      
      // 独立的全局参数收集方法
      const collectRequestGlobalParams = () => {
        const params = {}
        
        if (pageGlobalParamMode === 'json') {
          try {
            if (pageGlobalJsonInput.trim()) {
              const globalJson = JSON.parse(pageGlobalJsonInput)
              if (typeof globalJson === 'object' && globalJson !== null && !Array.isArray(globalJson)) {
                const processedJson = paramProcessor.processPlaceholdersInObject(globalJson)
                this.mergeParams(params, processedJson)
              }
            }
          } catch (e) {
        
            this.showToast('全局参数JSON格式错误，请检查')
          }
        } else {
          pageGlobalParams.forEach(param => {
            if (!param.visible || !param.name.trim()) return
            
            const name = param.name.trim()
            let value = paramProcessor.replacePlaceholders(param.value)
            
            // 尝试解析可能的JSON字符串
            params[name] = this.parseJsonIfPossible(value)
          })
        }
        
        return params
      }
      
      // 独立的接口参数处理方法
      const processRequestApiParams = () => {
        const result = {}
        pageApiParams.forEach(param => {
          if (!param.visible || !param.name.trim()) return
          
          const name = param.name.trim()
          let value = paramProcessor.replacePlaceholders(param.value)
          
          // 尝试解析可能的JSON字符串
          result[name] = this.parseJsonIfPossible(value)
        })
        return result
      }
      
      // 独立的请求头构建方法
      const buildRequestHeaders = () => {
        const headers = {}
        pageHeaders.forEach(header => {
          if (header.visible && header.name.trim()) {
            headers[header.name.trim()] = header.value
          }
        })
        return headers
      }
      
      // 独立的请求体获取方法
      const getRequestRequestBodyJson = () => {
        let jsonData = {}
        
        if (pageInputMode === 'json') {
          // JSON原始数据模式
          const rawJson = pageJsonRawInput.trim()
          if (!rawJson) {
            return {}
          }
          try {
            jsonData = JSON.parse(rawJson)
          } catch (e) {
            throw new Error(`JSON解析错误: ${e.message}`)
          }
        } else {
          // 键值对模式
          pageKvPairs.forEach(pair => {
            if (!pair.visible) return
            
            const key = pair.key.trim()
            if (!key) return
            
            const value = pair.value.trim()
            
            // 根据类型转换值
            switch(pair.type) {
              case 'string':
                jsonData[key] = value
                break
              case 'number':
                jsonData[key] = value ? parseFloat(value) : 0
                break
              case 'boolean':
                jsonData[key] = value.toLowerCase() === 'true' || value === '1'
                break
              case 'array':
                try {
                  jsonData[key] = value ? JSON.parse(value) : []
                } catch (e) {
                  // 如果不是有效的JSON数组，尝试用逗号分割
                  jsonData[key] = value ? value.split(',').map(item => item.trim()) : []
                }
                break
              case 'object':
                try {
                  jsonData[key] = value ? JSON.parse(value) : {}
                } catch (e) {
              
                  jsonData[key] = {}
                }
                break
              case 'null':
                jsonData[key] = null
                break
              default:
                jsonData[key] = value
            }
          })
        }
        
        // 应用占位符替换
        return paramProcessor.processPlaceholdersInObject(jsonData)
      }
      
      // 独立的URL构建方法
      const buildRequestUrlInfo = (params) => {
        let url = ''
        let targetUrl = ''
        
        if (pageRequestMode === 'direct') {
          targetUrl = `${pageBaseUrl.replace(/\/$/, '')}/${pageApiPath.replace(/^\//, '')}`
          url       = targetUrl
        } else {
          url = pageProxyUrl
          targetUrl = `${pageBaseUrl.replace(/\/$/, '')}/${pageApiPath.replace(/^\//, '')}`
        }
        
        return { url, targetUrl }
      }
      
      // 收集全局参数
      const globalParams = collectRequestGlobalParams()
  
      
      // 处理接口参数
      const apiParams = processRequestApiParams()
  
      
      // 根据全局参数提交方式决定如何处理全局参数
      let params = {} // URL参数
      let bodyParams = {} // 请求体参数
      
      // 接口参数始终合并到URL参数中
      this.mergeParams(params, apiParams)
      
      // 全局参数根据提交方式处理
      if (pageGlobalParamMethod === 'GET') {
        // GET请求：全局参数合并到URL参数
    
        this.mergeParams(params, globalParams)
      } else {
        // 非GET请求：全局参数合并到请求体
    
        bodyParams = globalParams
      }
  
  
      
      // 构建请求配置
      const { url, targetUrl } = buildRequestUrlInfo(params)
      const headers = buildRequestHeaders()
      const hasBody = ['POST', 'PUT', 'PATCH'].includes(pageSelectedMethod)
      
      // 获取接口的请求体
      const apiRequestBody = hasBody ? getRequestRequestBodyJson() : null
      
      // 合并请求体数据
      let finalData = apiRequestBody
  
  
      if (hasBody && bodyParams && Object.keys(bodyParams).length > 0) {
        // 如果接口已有请求体，深度合并全局参数
        if (typeof apiRequestBody === 'object' && apiRequestBody !== null) {
          finalData = this.mergeParams({...apiRequestBody}, bodyParams)
        } else {
          // 如果接口没有请求体，直接使用全局参数作为请求体
          finalData = bodyParams
        }
      }
      
      return {
        url,
        targetUrl,
        method: pageSelectedMethod,
        params,
        headers,
        timeout: pageTimeout,
        data: finalData,
        requestMode: pageRequestMode
      }
    },
    // 发送请求
    async sendRequest() {
      try {
        // 标记用户已使用工具
        this.markAsUsed();
        
        // 处理默认接口名称：如果未填写，使用apiPath并将/转换为-
        if (!this.apiName.trim()) {
          const defaultName = this.apiPath.trim() || '未命名接口';
          this.updateProperty('apiName', defaultName.replace(/\//g, '-'));
        }
        

        
        const config = this.collectRequestConfig()
        
        // 根据请求模式设置axios配置
        let axiosConfig = {
          ...config,
          validateStatus: () => true // 不抛出HTTP错误
        }
        
        // 直接请求模式下，确保使用完整URL
        if (this.requestMode === 'direct' && config.url) {
          // 在直接请求模式下，确保URL是完整的
          const trimmedUrl = config.url.trim();
          if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
            this.showToast('直接请求模式下请输入完整URL（包含http://或https://）')
            return
          }
        } else if (this.requestMode === 'proxy') {
          // 代理模式：构建标准的代理请求格式
        // 1. 设置代理URL
        axiosConfig.url = this.proxyUrl
        // 2. 构建请求数据，包含所有必要信息
        axiosConfig.method = 'POST' // 代理请求使用POST方法
        axiosConfig.data = {
          url: config.targetUrl, // 直接使用targetUrl
          method: config.method, // 原始请求方法
          params: config.params, // URL参数
          headers: config.headers, // 请求头
          data: config.data, // 请求体数据
          timeout: config.timeout // 超时时间
        }
        // 3. 清除URL参数，避免重复
        axiosConfig.params = {}
        }
        
        const result = await apiClient.sendRequest(axiosConfig)
        const response = result.response
        const responseTime = result.responseTime
        
        // 格式化响应内容
        const formattedContent = apiClient.formatResponseContent(response.data)
        
        // 准备请求信息数据
        // 在代理模式下，显示实际发送给代理服务器的完整请求数据
        let requestData = config.data
        let requestHeaders = config.headers
        let requestParams = config.params
        let requestMethod = config.method
        
        // 如果是代理模式，使用实际发送的代理请求数据
        if (this.requestMode === 'proxy') {
          requestData = {
            url: config.targetUrl,
            method: config.method,
            params: config.params,
            headers: config.headers,
            data: config.data,
            timeout: config.timeout
          }
        }
        
        // 更新响应数据，同时包含请求信息
        this.updateResponseData({
          showResponse: true,
          responseCode: response.status,
          responseTime: responseTime,
          responseSize: apiClient.calculateResponseSize(formattedContent),
          responseUrl: config.url,
          responseContent: formattedContent,
          formattedResponseContent: formattedContent,
          // 请求信息
          requestMethod: this.requestMode === 'proxy' ? 'POST' : config.method,
          requestUrl: config.targetUrl || config.url,
          requestHeaders: requestHeaders,
          requestParams: requestParams,
          requestBody: requestData
        })
        
        // 保存到历史记录，传递响应对象以获取状态信息
        this.saveToHistory(config, response)
        
        // 发送请求成功后不再自动生成文档预览
      } catch (error) {
        // 判断是否是超时错误
        let errorResponse = null;
        if (error.code === 'ECONNABORTED' || error.message.includes('timeout') || error.message.includes('超时')) {
          // 超时错误，传递'timeout'标识
          errorResponse = 'timeout';
        }
        // 请求失败时也保存到历史记录，标记为错误状态或超时状态
        this.saveToHistory(config, errorResponse)
        modalHelper.error(`请求失败: ${error.message}`)
      }
    },
    // 复制响应内容
    copyResponse() {
      // 使用格式化的响应内容，确保复制的是用户看到的内容
      const contentToCopy = this.formattedResponseContent || this.responseContent || ''
      
      // 方法1：使用navigator.clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(contentToCopy)
          .then(() => {
            this.showToast('响应内容已复制')
          })
          .catch(() => {
            // 降级到方法2
            this.fallbackCopyText(contentToCopy)
          })
      } else {
        // 降级到方法2
        this.fallbackCopyText(contentToCopy)
      }
    },
    // 降级复制方法，兼容不支持clipboard API的环境
    fallbackCopyText(text) {
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
        this.showToast('响应内容已复制')
      } catch (error) {
    
        modalHelper.error('复制失败！请手动复制内容')
      } finally {
        document.body.removeChild(textArea)
      }
    },
    // 下载响应内容
    downloadResponse() {
      const blob = new Blob([this.responseContent], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `response_${new Date().getTime()}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    },
    // 生成文档
    generateDocument(type) {
      const config = this.collectRequestConfig()
      let content = ''
      
      // 准备响应数据（如果有）
      let responseData = null
      if (this.showResponse) {
        responseData = {
          code: this.responseCode,
          time: this.responseTime,
          size: this.responseSize,
          content: this.responseContent
        }
      }
      
      if (type === 'markdown') {
        content = documentGenerator.generateDocument(config, type, this.apiName, this.apiDescription, this.apiAuthor, responseData)
        this.updateDocumentPreview({
          showDocumentPreview: true,
          documentContent: documentGenerator.markdownToHtml(content)
        })
        // 显示文档预览模态框
        this.showDocumentPreview = true
      } else if (type === 'html') {
        content = documentGenerator.generateDocument(config, type, this.apiName, this.apiDescription, this.apiAuthor, responseData)
        this.updateDocumentPreview({
          showDocumentPreview: true,
          documentContent: content
        })
        // 显示文档预览模态框
        this.showDocumentPreview = true
      }
    },
    // 复制文档
    copyDocument() {
      navigator.clipboard.writeText(this.documentContent)
        .then(() => this.showToast('文档已复制'))
        .catch(() => modalHelper.error('复制失败！'))
    },
    // 下载文档
    downloadDocument() {
      const blob = new Blob([this.documentContent], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `api-doc_${new Date().getTime()}.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    },
    // 切换业务导航工具条展开状态
    toggleToolBarExpanded() {
      this.toolBarExpanded = !this.toolBarExpanded
    },
    // 设置当前激活的业务功能
    setActiveBusiness(business) {
      this.activeBusiness = business === this.activeBusiness ? '' : business
    },
    // 处理显示全局设置
    handleShowGlobalSettings() {
      this.activeTool = 'settings'
      this.showGlobalSettings = true
    },
    // 处理显示帮助说明
    handleShowHelp() {
      this.activeTool = 'help'
      this.showHelp = true
    }

  }
}
</script>

<style scoped>
/* 页面特定样式 */
</style>