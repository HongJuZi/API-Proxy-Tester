import { defineStore } from 'pinia'
import storage from '../utils/storage.js'
import modalHelper from '../utils/modalHelper.js'

// 定义主 store
export const useMainStore = defineStore('main', {
  state: () => ({
    // 基础配置
    baseUrl: 'https://jsonplaceholder.typicode.com',
    timeout: 5000,
    selectedMethod: 'POST',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    apiPath: 'users',
    inputMode: 'json', // 'kv' 或 'json'
    requestMode: 'proxy', // proxy 或 direct
    proxyUrl: 'backend/api-test-worker.php', // 代理服务器URL
    
    // 数据模型
    globalParams: [{
      name: '',
      value: '',
      visible: true
    }],
    globalParamMode: 'kv', // kv 或 json
    globalParamMethod: 'POST', // 全局参数提交方式：GET、POST、PUT、DELETE
    globalJsonInput: '{"token": "", "user_id": ""}',
    showGlobalSettings: false,
    requestHistory: [],
    toastMessage: '',
    toastVisible: false,
    toastType: 'success',
    headers: [
      {
        name: 'Content-Type',
        value: 'application/json',
        visible: true
      },
      {
        name: 'Accept',
        value: 'application/json',
        visible: true
      }
    ],
    apiParams: [{
      name: '',
      value: '',
      visible: true
    }],
    
    kvPairs: [{
      type: 'string',
      key: '',
      value: '',
      visible: true
    }],
    jsonRawInput: '{}',
    jsonPreviewContent: '{}',
    
    // 响应数据
    showResponse: false,
    responseCode: 0,
    responseTime: 0,
    responseSize: '0 KB',
    responseUrl: '',
    responseContent: '',
    formattedResponseContent: '',
    
    // 请求信息
    requestMethod: '',
    requestUrl: '',
    requestHeaders: {},
    requestParams: {},
    requestData: null,
    
    // 文档相关
    apiName: '用户信息接口',
    apiDescription: '获取用户信息列表，支持分页查询和条件筛选',
    apiAuthor: '红橘子科技',
    showDocumentPreview: false,
    documentContent: '',
      
    // 历史数据
    showCopyToast: false,
    documentFormat: 'html',
    requestHistory: [],
    
    // UI状态
    showHelp: false,
    expandedSections: {
      global: true,
      api: true,
      document: true
    }
  }),
  
  getters: {
    // 获取全局参数
    globalParamsGetter: (state) => state.globalParams,
    
    // 获取请求头
    headersGetter: (state) => state.headers,
    
    // 获取API参数
    apiParamsGetter: (state) => state.apiParams,
    
    // 获取键值对
    kvPairsGetter: (state) => state.kvPairs
  },
  
  actions: {
    // 更新状态属性
    updateProperty(key, value) {
      this[key] = value
    },
    
    // 批量更新状态
    updateState(newState) {
      Object.assign(this, newState)
    },
    
    // 设置全局设置模态框可见性
    setGlobalSettingsVisible(visible) {
      
      
      // 确保值是布尔类型
      const boolVisible = Boolean(visible)
  
      
      this.showGlobalSettings = boolVisible
  
      
      // 添加一个立即的状态检查
      setTimeout(() => {
    
      }, 0)
    },
    
    // 设置帮助模态框可见性
    setHelpVisible(visible) {
      
      
      // 确保值是布尔类型
      const boolVisible = Boolean(visible)
  
      
      this.showHelp = boolVisible
  
    },
    
    // 添加全局参数
    addGlobalParam() {
      this.globalParams.push({
        name: '',
        value: '',
        visible: true
      })
    },
    
    // 移除全局参数
    removeGlobalParam(index) {
      if (this.globalParams[index]) {
        this.globalParams[index].visible = false
        setTimeout(() => {
          this.globalParams.splice(index, 1)
        }, 300)
      }
    },
    
    // 添加请求头
    addHeader() {
      this.headers.push({
        name: '',
        value: '',
        visible: true
      })
    },
    
    // 移除请求头
    removeHeader(index) {
      if (this.headers[index]) {
        this.headers[index].visible = false
        setTimeout(() => {
          this.headers.splice(index, 1)
        }, 300)
      }
    },
    
    // 添加API参数
    addApiParam() {
      this.apiParams.push({
        name: '',
        value: '',
        visible: true
      })
    },
    
    // 移除API参数
    removeApiParam(index) {
      if (this.apiParams[index]) {
        this.apiParams[index].visible = false
        setTimeout(() => {
          this.apiParams.splice(index, 1)
        }, 300)
      }
    },
    
    // 添加键值对
    addKvPair() {
      this.kvPairs.push({
        type: 'string',
        key: '',
        value: '',
        visible: true
      })
    },
    
    // 移除键值对
    removeKvPairAction(index) {
      if (this.kvPairs[index]) {
        this.kvPairs[index].visible = false
        setTimeout(() => {
          this.kvPairs.splice(index, 1)
        }, 300)
      }
    },
    
    // 更新JSON预览
    updateJsonPreview(content) {
      this.jsonPreviewContent = content
    },
    
    // 更新响应数据
    updateResponseData(payload) {
      this.showResponse = payload.showResponse
      this.responseCode = payload.responseCode
      this.responseTime = payload.responseTime
      this.responseSize = payload.responseSize
      this.responseUrl = payload.responseUrl
      this.responseContent = payload.responseContent
      this.formattedResponseContent = payload.formattedResponseContent
      
      // 更新请求信息
      this.requestMethod = payload.requestMethod || ''
      this.requestUrl = payload.requestUrl || ''
      this.requestHeaders = payload.requestHeaders || {}
      this.requestParams = payload.requestParams || {}
      // 同时更新requestData和requestBody，确保兼容性
      this.requestData = payload.requestData || payload.requestBody
      this.requestBody = payload.requestBody || payload.requestData
    },
    
    // 更新文档预览
    updateDocumentPreview(payload) {
      this.showDocumentPreview = payload.showDocumentPreview
      this.documentContent = payload.documentContent
    },
    
    // 显示提示
    showToast(message = '操作成功！', type = 'success') {
      this.toastMessage = message;
      this.toastType = type;
      this.toastVisible = true;
    },
    
    // 隐藏提示
    hideToast() {
      this.toastVisible = false;
    },
    
    // 切换展开状态
    toggleExpand(section) {
      this.expandedSections[section] = !this.expandedSections[section]
    },
    
    // 设置全局参数提交方式
    setGlobalParamMethod(method) {
      this.globalParamMethod = method
    }
  }
})