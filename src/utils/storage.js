// 本地存储模块
class Storage {
  // 保存数据到localStorage
  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data))
      return true
    } catch (error) {
      console.error(`保存${key}失败:`, error)
      return false
    }
  }
  
  // 从localStorage加载数据
  load(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key)
      return data ? JSON.parse(data) : defaultValue
    } catch (error) {
      console.error(`加载${key}失败:`, error)
      return defaultValue
    }
  }
  
  // 删除localStorage中的数据
  remove(key) {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error(`删除${key}失败:`, error)
      return false
    }
  }
  
  // 清空所有localStorage数据
  clear() {
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error('清空localStorage失败:', error)
      return false
    }
  }
  
  // 保存全局设置
  saveGlobalSettings(settings) {
    return this.save('apiTestGlobalSettings', settings)
  }
  
  // 加载全局设置
  loadGlobalSettings() {
    return this.load('apiTestGlobalSettings', {})
  }
  
  // 保存历史记录
  saveHistory(history) {
    return this.save('api-test-history', history)
  }
  
  // 加载历史记录
  loadHistory() {
    return this.load('api-test-history', [])
  }
  
  // 保存请求配置
  saveRequestConfig(config) {
    const savedRequests = this.load('api-tester-saved-requests', [])
    savedRequests.push(config)
    return this.save('api-tester-saved-requests', savedRequests)
  }
  
  // 加载请求配置
  loadRequestConfig() {
    return this.load('api-tester-saved-requests', [])
  }
}

// 创建并导出Storage实例
const storage = new Storage()
export default storage