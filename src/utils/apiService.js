import paramProcessor from './paramProcessor.js'
import Helpers from './helpers.js'
import storage from './storage.js'

/**
 * API服务模块 - 处理API请求相关的业务逻辑
 */
class ApiService {
  /**
   * 深度合并参数对象
   * @param {Object} target - 目标对象
   * @param {Object} source - 源对象
   * @returns {Object} 合并后的对象
   */
  mergeParams(target, source) {
    for (const key in source) {
      if (!Object.prototype.hasOwnProperty.call(source, key)) continue
      
      const targetVal = target[key]
      const sourceVal = source[key]
      
      if (targetVal && typeof targetVal === 'object' && targetVal !== null &&
          typeof sourceVal === 'object' && sourceVal !== null) {
        // 对嵌套对象进行深度合并
        target[key] = this.deepMerge(targetVal, sourceVal)
      } else {
        target[key] = sourceVal
      }
    }
    return target
  }
  
  /**
   * 修复的深度合并方法 - 确保正确处理嵌套对象合并，特别是input.head这样的结构
   * @param {Object} target - 目标对象
   * @param {Object} source - 源对象
   * @returns {Object} 合并后的对象
   */
  deepMerge(target, source) {
    // 如果source不是对象，直接返回source
    if (source === null || typeof source !== 'object') {
      return source
    }
    
    // 如果target不是对象，创建一个空对象
    if (target === null || typeof target !== 'object') {
      target = Array.isArray(source) ? [] : {}
    }
    
    // 如果都是数组，合并数组
    if (Array.isArray(target) && Array.isArray(source)) {
      return [...target, ...source]
    }
    
    // 如果类型不同，返回source
    if (Array.isArray(target) !== Array.isArray(source)) {
      return source
    }
    
    // 递归合并对象属性 - 创建新对象避免修改原始对象
    const merged = { ...target }
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        // 确保递归合并所有嵌套属性，包括input.head这样的结构
        merged[key] = this.deepMerge(merged[key], source[key])
      }
    }
    
    return merged
  }
  
  /**
   * 尝试解析JSON字符串
   * @param {string} value - 要解析的值
   * @returns {*} 解析后的值或原始值
   */
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
  }
  
  /**
   * 处理键值对参数
   * @param {Array} kvPairs - 键值对数组
   * @returns {Object} 处理后的参数对象
   */
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
  }
  
  /**
   * 收集全局参数
   * @param {Object} pageConfig - 页面配置对象
   * @returns {Object} 全局参数对象
   */
  collectGlobalParams(pageConfig) {
    const params = {}
    
    if (pageConfig.globalParamMode === 'json') {
      this.collectJsonGlobalParams(params, pageConfig.globalJsonInput)
    } else {
      const kvParams = this.processKeyValuePairs(pageConfig.globalParams)
      this.mergeParams(params, kvParams)
    }
    
    return params
  }
  
  /**
   * 收集JSON格式的全局参数
   * @param {Object} target - 目标对象
   * @param {string} globalJsonInput - 全局JSON输入
   */
  collectJsonGlobalParams(target, globalJsonInput) {
    try {
      if (!globalJsonInput.trim()) return
      
      const globalJson = JSON.parse(globalJsonInput)
      if (typeof globalJson === 'object' && globalJson !== null && !Array.isArray(globalJson)) {
        const processedJson = paramProcessor.processPlaceholdersInObject(globalJson)
        this.mergeParams(target, processedJson)
      }
    } catch (e) {
      Helpers.showToast('全局参数JSON格式错误，请检查')
    }
  }
  
  /**
   * 构建请求头
   * @param {Array} headers - 头部数组
   * @returns {Object} 请求头对象
   */
  buildHeaders(headers) {
    const result = {}
    headers.forEach(header => {
      if (header.visible && header.name.trim()) {
        result[header.name.trim()] = header.value
      }
    })
    return result
  }
  
  /**
   * 构建请求URL和目标URL
   * @param {Object} pageConfig - 页面配置对象
   * @returns {Object} URL信息对象
   */
  buildRequestInfo(pageConfig) {
    let url = ''
    let targetUrl = ''
    
    if (pageConfig.requestMode === 'direct') {
      targetUrl = `${pageConfig.baseUrl.replace(/\/$/, '')}/${pageConfig.apiPath.replace(/^\//, '')}`
      url = targetUrl
    } else {
      url = pageConfig.proxyUrl
      targetUrl = `${pageConfig.baseUrl.replace(/\/$/, '')}/${pageConfig.apiPath.replace(/^\//, '')}`
    }
    
    return { url, targetUrl }
  }
  
  /**
   * 获取请求体JSON数据
   * @param {Object} pageConfig - 页面配置对象
   * @returns {Object} 请求体数据
   * @throws {Error} JSON解析错误
   */
  getRequestRequestBodyJson(pageConfig) {
    if (pageConfig.inputMode === 'json') {
      // JSON原始数据模式
      const rawJson = pageConfig.jsonRawInput.trim()
      if (!rawJson) {
        return {}
      }
      try {
        return JSON.parse(rawJson)
      } catch (e) {
        throw new Error(`JSON解析错误: ${e.message}`)
      }
    } else {
      // 键值对模式
      return this.processKeyValuePairs(pageConfig.kvPairs)
    }
  }
  
  /**
   * 获取请求体JSON数据（用于页面组件）
   * @param {Object} pageConfig - 页面配置对象
   * @param {Object} paramProcessor - 参数处理器
   * @returns {Object} 请求体数据
   * @throws {Error} JSON解析错误
   */
  getRequestBodyJson(pageConfig, paramProcessor) {
    let jsonData = {};
    
    if (pageConfig.inputMode === 'json') {
      // JSON原始数据模式
      const rawJson = pageConfig.jsonRawInput.trim();
      if (!rawJson) {
        return {};
      }
      try {
        jsonData = JSON.parse(rawJson);
      } catch (e) {
        throw new Error(`JSON解析错误: ${e.message}`);
      }
    } else {
      // 键值对模式
      pageConfig.kvPairs.forEach(pair => {
        if (!pair.visible) return;
        
        const key = pair.key.trim();
        if (!key) return;
        
        const value = pair.value.trim();
        
        // 根据类型转换值
        switch(pair.type) {
          case 'string':
            jsonData[key] = value;
            break;
          case 'number':
            jsonData[key] = value ? parseFloat(value) : 0;
            break;
          case 'boolean':
            jsonData[key] = value.toLowerCase() === 'true' || value === '1';
            break;
          case 'array':
            try {
              jsonData[key] = value ? JSON.parse(value) : [];
            } catch (e) {
              // 如果不是有效的JSON数组，尝试用逗号分割
              jsonData[key] = value ? value.split(',').map(item => item.trim()) : [];
            }
            break;
          case 'object':
            try {
              jsonData[key] = value ? JSON.parse(value) : {};
            } catch (e) {
              jsonData[key] = {};
            }
            break;
          case 'null':
            jsonData[key] = null;
            break;
          default:
            jsonData[key] = value;
        }
      });
    }
    
    // 应用占位符替换
    return paramProcessor.processPlaceholdersInObject(jsonData);
  }
  
  /**
   * 收集请求配置
   * @param {Object} pageConfig - 页面配置对象
   * @returns {Object} 请求配置对象
   */
  collectRequestConfig(pageConfig) {
    // 收集全局参数
    const globalParams = this.collectGlobalParams(pageConfig)
    
    // 处理接口参数
    const apiParams = this.processKeyValuePairs(pageConfig.apiParams)
    
    // 根据全局参数提交方式决定如何处理全局参数
    let params = {} // URL参数
    let bodyParams = {} // 请求体参数
    
    // 接口参数始终合并到URL参数中
    this.mergeParams(params, apiParams)
    
    // 全局参数根据提交方式处理
    if (pageConfig.globalParamMethod === 'GET') {
      // GET请求：全局参数合并到URL参数
      this.mergeParams(params, globalParams)
    } else {
      // 非GET请求：全局参数合并到请求体
      bodyParams = globalParams
    }
    
    // 构建请求配置
    const { url, targetUrl } = this.buildRequestInfo(pageConfig)
    const headers = this.buildHeaders(pageConfig.headers)
    const hasBody = ['POST', 'PUT', 'PATCH'].includes(pageConfig.selectedMethod)
    
    // 获取接口的请求体
    const apiRequestBody = hasBody ? this.getRequestRequestBodyJson(pageConfig) : null
    
    // 合并请求体数据 - 使用修复的deepMerge方法确保嵌套对象正确合并
    let finalData = apiRequestBody
    
    if (hasBody && bodyParams && Object.keys(bodyParams).length > 0) {
      // 如果接口已有请求体，深度合并全局参数
      if (typeof apiRequestBody === 'object' && apiRequestBody !== null) {
        // 使用深拷贝确保不修改原始对象
        finalData = this.deepMerge(JSON.parse(JSON.stringify(apiRequestBody)), bodyParams)
      } else {
        // 如果接口没有请求体，直接使用全局参数作为请求体
        finalData = bodyParams
      }
    }
    
    // 确保最终数据应用占位符替换
    if (typeof finalData === 'object' && finalData !== null) {
      finalData = paramProcessor.processPlaceholdersInObject(finalData)
    }
    
    // 生成请求名称 - 优先使用用户输入的apiName，如果没有则使用API路径和方法作为默认名称
    let requestName = '';
    if (pageConfig.apiName && pageConfig.apiName.trim()) {
      requestName = pageConfig.apiName.trim();
    } else {
      const apiPath = pageConfig.apiPath || '';
      requestName = apiPath ? `${pageConfig.selectedMethod} ${apiPath}` : `${pageConfig.selectedMethod} 请求`;
    }
    
    return {
      url,
      targetUrl,
      method: pageConfig.selectedMethod,
      name: requestName, // 添加name属性，用于历史记录显示
      path: pageConfig.apiPath, // 保存apiPath用于历史记录加载
      params,
      headers,
      timeout: pageConfig.timeout,
      data: finalData,
      requestMode: pageConfig.requestMode
    }
  }
  
  /**
   * 加载历史记录项
   * @param {Object} item - 历史记录项
   * @param {Function} updateProperty - 更新属性的方法
   */
  loadHistoryItem(item, updateProperty) {
    // 1. 优先恢复页面基本配置
    if (item.globalConfig) {
      // 恢复全局配置（页面显示用）
      updateProperty('globalParamMode', item.globalConfig.globalParamMode || 'kv');
      updateProperty('globalJsonInput', item.globalConfig.globalJsonInput || '{}');
      updateProperty('baseUrl', item.globalConfig.baseUrl || 'https://jsonplaceholder.typicode.com');
      updateProperty('timeout', item.globalConfig.timeout || 5000);
      updateProperty('requestMode', item.globalConfig.requestMode || 'proxy');
      updateProperty('proxyUrl', item.globalConfig.proxyUrl || 'backend/api-test-worker.php');
      
      // 恢复请求头配置
      updateProperty('headers', JSON.parse(JSON.stringify(item.globalConfig.headers || [
        { name: 'Content-Type', value: 'application/json', visible: true },
        { name: 'Accept', value: 'application/json', visible: true }
      ])));
      
      // 恢复全局参数配置（但这些参数不会直接影响已保存的请求参数）
      updateProperty('globalParams', JSON.parse(JSON.stringify(item.globalConfig.globalParams || [{ name: '', value: '', visible: true }])));
    }
    
    // 2. 恢复请求基本信息
    updateProperty('selectedMethod', item.method);
    updateProperty('apiPath', item.path);
    
    // 3. 优先使用存储的合并后参数，而不是重新计算
    // 转换参数格式为UI显示所需的格式
    if (item.params) {
      // 过滤掉代理模式下的target_url参数（如果存在）
      const filteredParams = { ...item.params };
      delete filteredParams.target_url;
      
      updateProperty('apiParams', Object.entries(filteredParams).map(([name, value]) => ({
        name,
        value: String(value),
        visible: true
      })));
    } else {
      updateProperty('apiParams', [{ name: '', value: '', visible: true }]);
    }
    
    // 4. 处理请求体
    if (['POST', 'PUT', 'PATCH'].includes(item.method) && item.data) {
      updateProperty('jsonRawInput', JSON.stringify(item.data, null, 2));
      updateProperty('inputMode', 'json');
    }
  }
  
  /**
   * 验证JSON字符串
   * @param {string} jsonString - JSON字符串
   * @returns {Object} 验证结果
   */
  validateJson(jsonString) {
    try {
      if (!jsonString || !jsonString.trim()) {
        return { valid: false, error: 'JSON内容为空' };
      }
      
      JSON.parse(jsonString);
      return { valid: true };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }
  
  /**
   * 格式化JSON字符串
   * @param {string} jsonString - JSON字符串
   * @returns {Object} 格式化结果
   */
  formatJson(jsonString) {
    try {
      if (!jsonString || !jsonString.trim()) {
        return { valid: true, formatted: '' };
      }
      
      const parsed = JSON.parse(jsonString);
      const formatted = JSON.stringify(parsed, null, 2);
      return { valid: true, formatted };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }
  

  
  /**
   * 保存请求到历史记录
   * @param {Object} config - 请求配置
   * @param {Object} response - 响应信息
   * @param {Array} requestHistory - 当前历史记录
   * @param {Function} updateProperty - 更新属性的方法
   * @param {Object} globalConfig - 全局配置
   */
  saveToHistory(config, response, requestHistory, updateProperty, globalConfig) {
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
      path: config.path || '',
      apiName: config.name || '未命名请求',
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
        globalParams: JSON.parse(JSON.stringify(globalConfig.globalParams)),
        globalParamMode: globalConfig.globalParamMode,
        globalJsonInput: globalConfig.globalJsonInput,
        baseUrl: globalConfig.baseUrl,
        timeout: globalConfig.timeout,
        requestMode: globalConfig.requestMode,
        proxyUrl: globalConfig.proxyUrl,
        headers: JSON.parse(JSON.stringify(globalConfig.headers))
      }
    };
    
    const newHistory = [historyItem, ...requestHistory];
    
    // 限制历史记录最多保存500个
    if (newHistory.length > 500) {
      updateProperty('requestHistory', newHistory.slice(0, 500));
    } else {
      updateProperty('requestHistory', newHistory);
    }
    
    try {
      // 保存更新后的历史记录数组，而不是原始的requestHistory
      storage.saveHistory(newHistory.length > 500 ? newHistory.slice(0, 500) : newHistory);
    } catch (e) {
      // 存储失败时静默处理
    }
  }
}

// 创建并导出ApiService实例
const apiService = new ApiService()
export default apiService