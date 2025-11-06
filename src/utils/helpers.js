// 工具类模块
export default class Helpers {
  // 格式化日期
  static formatDate(timestamp) {
    const date = new Date(timestamp)
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`
  }
  
  // 获取状态码样式类
  static getStatusCodeClass(code) {
    if (code >= 200 && code < 300) return 'text-success'
    if (code >= 300 && code < 400) return 'text-warning'
    if (code >= 400) return 'text-danger'
    return 'text-dark'
  }
  
  // 根据请求方法获取样式类
  static getMethodClass(method) {
    const methodClasses = {
      'GET': 'bg-secondary/20 text-secondary',
      'POST': 'bg-primary/20 text-primary',
      'PUT': 'bg-warning/20 text-warning',
      'DELETE': 'bg-danger/20 text-danger'
    }
    return methodClasses[method] || 'bg-dark-2/20 text-dark-2'
  }
  
  // 显示提示
  static showToast(message = '操作成功！') {
    // 这个方法将在Vue组件中实现
    return message
  }
  
  // 验证JSON格式
  static validateJson(jsonString) {
    try {
      JSON.parse(jsonString)
      return { valid: true }
    } catch (error) {
      return { valid: false, error: error.message }
    }
  }
  
  // 格式化JSON
  static formatJson(jsonString) {
    try {
      const parsed = JSON.parse(jsonString)
      return { valid: true, formatted: JSON.stringify(parsed, null, 2) }
    } catch (error) {
      return { valid: false, error: error.message }
    }
  }
}