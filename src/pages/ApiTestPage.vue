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
            class="px-3 py-2 h-10 rounded-md text-sm flex items-center space-x-3 w-full justify-start hover:bg-gray-100 transition-colors overflow-hidden"
            :class="{ 'bg-primary/10 text-primary': activeTool === 'history' }"
          >
            <i class="fa fa-history text-lg w-6 text-center"></i>
            <span v-show="toolBarExpanded">历史请求</span>
          </button>
          
          <div class="w-full h-px bg-gray-200 my-1" v-show="toolBarExpanded"></div>
          
          <button 
            @click="handleShowGlobalSettings"
            class="px-3 py-2 h-10 rounded-md text-sm flex items-center space-x-3 w-full justify-start hover:bg-gray-100 transition-colors overflow-hidden"
            :class="{ 'bg-primary/10 text-primary': activeTool === 'settings' }"
          >
            <i class="fa fa-cog text-lg w-6 text-center"></i>
            <span v-show="toolBarExpanded">全局设置</span>
          </button>
          <button 
            @click="handleShowHelp"
            class="px-3 py-2 h-10 rounded-md text-sm flex items-center space-x-3 w-full justify-start hover:bg-gray-100 transition-colors overflow-hidden"
            :class="{ 'bg-primary/10 text-primary': activeTool === 'help' }"
          >
            <i class="fa fa-question-circle text-lg w-6 text-center"></i>
            <span v-show="toolBarExpanded">帮助说明</span>
          </button>
          <div class="w-full h-px bg-gray-200 my-1" v-show="toolBarExpanded"></div>
          <button 
            class="px-3 py-2 h-10 rounded-md text-sm flex items-center space-x-3 w-full justify-start hover:bg-gray-100 transition-colors overflow-hidden"
            :class="{ 'bg-primary/10 text-primary': activeBusiness === 'project' }"
            @click="setActiveBusiness('project')"
          >
            <i class="fa fa-folder text-lg w-6 text-center"></i>
            <span v-show="toolBarExpanded">项目管理</span>
          </button>
          <button 
            class="px-3 py-2 h-10 rounded-md text-sm flex items-center space-x-3 w-full justify-start hover:bg-gray-100 transition-colors overflow-hidden"
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
            class="px-3 py-2 h-10 rounded-md text-sm flex items-center space-x-3 w-full justify-start hover:bg-gray-100 transition-colors overflow-hidden"
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
    <main class="flex-1 flex flex-wrap lg:flex-nowrap p-4 lg:pl-24 lg:pr-4 overflow-hidden">
      <!-- 文档预览模态框 -->
      <DocumentPreview 
        v-if="showDocumentPreview"
        :document-content="documentContent"
        @copy-document="copyDocument"
        @download-document="downloadDocument"
        @close-preview="closeDocumentPreview"
      />
      
      <!-- 左侧区域：文档配置 - 占屏幕宽度的20% -->
      <div class="w-full lg:w-[20%] lg:min-w-[20%] mr-4 lg:mr-6 lg:shrink-0">
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
      
      <!-- 中间区域：接口配置 + 请求信息 - 占屏幕宽度的40% -->
      <div class="w-full lg:w-[40%] lg:min-w-[40%] mx-2 lg:mx-6 lg:shrink-0">
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
      
      <!-- 右侧区域：响应信息 - 占屏幕宽度的40% -->
      <div class="w-full lg:w-[33%] lg:min-w-[33%] ml-4 lg:ml-6 lg:shrink-0 lg:mr-[60px]">
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
      :toast-type="toastType"
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
import apiService from '../utils/apiService.js'
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
      toolBarExpanded: false, // 业务导航工具条是否展开
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
      'toastType',
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
        const result = apiService.validateJson(this.globalJsonInput)
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
        const result = apiService.validateJson(this.globalJsonInput)
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
      return apiService.getRequestBodyJson({
        inputMode: this.inputMode,
        jsonRawInput: this.jsonRawInput,
        kvPairs: this.kvPairs
      }, paramProcessor);
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
        const result = apiService.formatJson(this.jsonRawInput);
        if (result.valid) {
          this.updateProperty('jsonRawInput', result.formatted);
        } else {
          modalHelper.error(`JSON格式错误: ${result.error}`);
        }
      } catch (e) {
        modalHelper.error(`JSON格式错误: ${e.message}`);
      }
    },
    // 格式化全局参数JSON
    formatGlobalJson() {
      try {
        const result = apiService.formatJson(this.globalJsonInput);
        if (result.valid) {
          this.updateProperty('globalJsonInput', result.formatted);
        } else {
          modalHelper.error(`JSON格式错误: ${result.error}`);
        }
      } catch (e) {
        modalHelper.error(`JSON格式错误: ${e.message}`);
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
      // 使用apiService来保存历史记录
      apiService.saveToHistory(
        config, 
        response, 
        this.requestHistory, 
        this.updateProperty.bind(this), 
        {
          globalParams: this.globalParams,
          globalParamMode: this.globalParamMode,
          globalJsonInput: this.globalJsonInput,
          baseUrl: this.baseUrl,
          timeout: this.timeout,
          requestMode: this.requestMode,
          proxyUrl: this.proxyUrl,
          headers: this.headers
        }
      );
    },
    // 加载历史记录项（优先使用合并后的参数）
    loadHistoryItem(index) {
      const item = this.requestHistory[index];
      
      // 使用apiService来加载历史记录项
      apiService.loadHistoryItem(item, this.updateProperty.bind(this));
      
      this.showToast('已加载历史请求（全量恢复）');
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
        const result = apiService.validateJson(this.jsonRawInput);
        if (result.valid) {
          modalHelper.success('JSON格式正确！');
        } else {
          modalHelper.error(`JSON格式错误: ${result.error}`);
        }
      } catch (e) {
        modalHelper.error(`JSON格式错误: ${e.message}`);
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
      return apiService.processKeyValuePairs(kvPairs);
    },
    
    // 尝试解析JSON字符串
    parseJsonIfPossible(value) {
      return apiService.parseJsonIfPossible(value);
    },
    
    // 深度合并参数对象
    mergeParams(target, source) {
      return apiService.mergeParams(target, source);
    },
    
    // 收集全局参数
    collectGlobalParams() {
      return apiService.collectGlobalParams({
        globalParamMode: this.globalParamMode,
        globalJsonInput: this.globalJsonInput,
        globalParams: this.globalParams
      });
    },
    
    // 构建请求头
    buildHeaders() {
      return apiService.buildHeaders(this.headers);
    },
    
    // 构建请求URL和目标URL
    buildRequestInfo(params) {
      return apiService.buildRequestInfo({
        requestMode: this.requestMode,
        apiPath: this.apiPath,
        proxyUrl: this.proxyUrl,
        baseUrl: this.baseUrl
      });
    },
    
    // 重构后的收集请求配置方法 - 确保请求参数与页面参数完全独立
    collectRequestConfig() {
      // 使用apiService来收集请求配置
      return apiService.collectRequestConfig({
        globalParamMode: this.globalParamMode,
        globalJsonInput: this.globalJsonInput,
        globalParams: this.globalParams,
        apiParams: this.apiParams,
        headers: this.headers,
        kvPairs: this.kvPairs,
        jsonRawInput: this.jsonRawInput,
        selectedMethod: this.selectedMethod,
        requestMode: this.requestMode,
        proxyUrl: this.proxyUrl,
        baseUrl: this.baseUrl,
        apiPath: this.apiPath,
        apiName: this.apiName, // 传递用户输入的接口名称
        globalParamMethod: this.globalParamMethod,
        inputMode: this.inputMode,
        timeout: this.timeout
      });
    },
    // 发送请求
    async sendRequest() {
      // 提前定义config变量，确保在try-catch整个作用域内都可用
      const config = this.collectRequestConfig();
      
      try {
        // 标记用户已使用工具
        this.markAsUsed();
        
        // 显示请求发送中的提示
        this.showToast('请求发送中...', 'info');
        
        // 处理默认接口名称：如果未填写，使用apiPath并将/转换为-
        if (!this.apiName.trim()) {
          const defaultName = this.apiPath.trim() || '未命名接口';
          this.updateProperty('apiName', defaultName.replace(/\//g, '-'));
        }
        
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
        let requestHeaders = config.headers
        let requestParams = config.params
        let requestMethod = config.method
        // 始终使用实际的请求体数据，而不是整个代理请求对象
        let requestBody = config.data
        
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
          requestBody: requestBody
        })
        
        // 保存到历史记录，传递响应对象以获取状态信息
        this.saveToHistory(config, response)
        
        // 发送请求成功后不再自动生成文档预览
        
        // 请求成功后显示成功提示
        this.showToast('请求成功', 'success');
      } catch (error) {
        // 判断是否是超时错误
        let errorResponse = null;
        if (error.code === 'ECONNABORTED' || error.message.includes('timeout') || error.message.includes('超时')) {
          // 超时错误，传递'timeout'标识
          errorResponse = 'timeout';
        }
        // 请求失败时也保存到历史记录，标记为错误状态或超时状态
        this.saveToHistory(config, errorResponse)
        // 显示错误提示
        this.showToast(`请求失败: ${error.message}`, 'error')
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
      this.setGlobalSettingsVisible(true)
    },
    // 处理显示帮助说明
    handleShowHelp() {
      this.activeTool = 'help'
      this.setHelpVisible(true)
    }

  }
}
</script>

<style scoped>
/* 页面特定样式 */
</style>