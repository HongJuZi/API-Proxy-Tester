// 参数处理模块
class ParamProcessor {
  // 替换占位符
  replacePlaceholders(str) {
    if (typeof str !== 'string') return str
    
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    
    const dateStr = `${year}-${month}-${day}`
    const datetimeStr = `${dateStr} ${hours}:${minutes}:${seconds}`
    const timestamp = String(now.getTime())
    
    // 生成UUID
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
    
    // 生成32位随机数
    const s32 = Array.from({length: 32}, () => Math.floor(Math.random() * 10)).join('')
    
    // 生成16位随机数
    const s16 = Array.from({length: 16}, () => Math.floor(Math.random() * 10)).join('')
    
    return str
      .replace(/\$\{datetime\}/g, datetimeStr)
      .replace(/\$\{time\}/g, timestamp)
      .replace(/\$\{UUID\}/g, uuid)
      .replace(/\$\{s32\}/g, s32)
      .replace(/\$\{date\}/g, dateStr)
      .replace(/\$\{s16\}/g, s16)
  }
  
  // 深度合并对象
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
    
    // 递归合并对象属性
    const merged = {...target}
    for (const key in source) {
      if(typeof(target[key]) === 'undefined') {
        target[key] = source[key]
        return target
      }
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        merged[key] = this.deepMerge(merged[key], source[key])
      }
    }
    
    return merged
  }
  
  // 处理参数中的占位符
  processPlaceholdersInObject(obj) {
    if (typeof obj !== 'object' || obj === null) {
      if (typeof obj === 'string') {
        return this.replacePlaceholders(obj)
      }
      return obj
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.processPlaceholdersInObject(item))
    }
    
    const result = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = this.processPlaceholdersInObject(obj[key])
      }
    }
    
    return result
  }
  
  // 处理单个参数值（包含占位符替换和JSON解析）
  processParamValue(value) {
    // 处理占位符
    value = this.replacePlaceholders(value)
    
    // 尝试解析JSON字符串
    try {
      // 检查值是否可能是JSON字符串
      if (value && (value.startsWith('{') && value.endsWith('}') || value.startsWith('[') && value.endsWith(']'))) {
        return JSON.parse(value)
      }
      return value
    } catch (e) {
      return value
    }
  }
}

// 创建并导出ParamProcessor实例
const paramProcessor = new ParamProcessor()
export default paramProcessor