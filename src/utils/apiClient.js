// API请求处理模块
import axios from 'axios'

class ApiClient {
  constructor() {
    // Axios实例配置
    this.axiosInstance = axios.create({
      timeout: 5000,
      validateStatus: () => true // 不抛出HTTP错误
    })
  }
  
  // 发送请求
  async sendRequest(config) {
    try {
      const startTime = performance.now()
      const response = await this.axiosInstance(config)
      const endTime = performance.now()
      
      return {
        response,
        responseTime: Math.round(endTime - startTime)
      }
    } catch (error) {
      throw new Error(`请求失败: ${error.message}`)
    }
  }
  
  // 格式化响应内容
  formatResponseContent(data) {
    try {
      return JSON.stringify(data, null, 2)
    } catch {
      return String(data)
    }
  }
  
  // 计算响应大小
  calculateResponseSize(content) {
    const sizeInBytes = new Blob([content]).size
    return sizeInBytes < 1024 ? 
      `${sizeInBytes} B` : 
      `${(sizeInBytes / 1024).toFixed(2)} KB`
  }
}

// 创建并导出ApiClient实例
const apiClient = new ApiClient()
export default apiClient