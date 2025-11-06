import { createApp } from 'vue'
import StatusModal from '../components/modals/StatusModal.vue'

/**
 * Modal帮助类，用于显示各种类型的模态框
 */
class ModalHelper {
  constructor() {
    this.app = null
    this.modalInstance = null
    this.modalContainer = null
  }

  /**
   * 创建模态框实例
   * @param {Object} options 配置选项
   */
  createModal(options) {
    // 如果已有实例，先销毁
    if (this.app) {
      this.destroyModal()
    }

    // 创建容器元素
    this.modalContainer = document.createElement('div')
    document.body.appendChild(this.modalContainer)

    // 合并默认选项
    const defaultOptions = {
      visible: true,
      type: 'info',
      title: '',
      message: '',
      showCancel: false,
      confirmText: '确定',
      cancelText: '取消',
      onConfirm: null,
      onCancel: null
    }

    const mergedOptions = { ...defaultOptions, ...options }

    // 创建Vue应用
    this.app = createApp(StatusModal, {
      ...mergedOptions,
      onConfirm: () => {
        if (mergedOptions.onConfirm) {
          mergedOptions.onConfirm()
        }
        this.destroyModal()
      },
      onCancel: () => {
        if (mergedOptions.onCancel) {
          mergedOptions.onCancel()
        }
        this.destroyModal()
      }
    })

    // 在Vue 3中，全局属性上不再支持$on事件，改为使用provide/inject或直接传递prop
    // 这里我们已经通过props传递了关闭回调，不需要额外监听

    // 挂载应用
    this.modalInstance = this.app.mount(this.modalContainer)
  }

  /**
   * 销毁模态框实例
   */
  destroyModal() {
    if (this.app) {
      this.app.unmount()
      this.app = null
    }
    if (this.modalContainer && this.modalContainer.parentNode) {
      this.modalContainer.parentNode.removeChild(this.modalContainer)
      this.modalContainer = null
    }
    this.modalInstance = null
  }

  /**
   * 显示成功模态框
   * @param {String} message 消息内容
   * @param {Object} options 其他选项
   */
  success(message, options = {}) {
    this.createModal({
      type: 'success',
      title: '成功',
      message,
      ...options
    })
  }

  /**
   * 显示错误模态框
   * @param {String} message 消息内容
   * @param {Object} options 其他选项
   */
  error(message, options = {}) {
    this.createModal({
      type: 'error',
      title: '错误',
      message,
      ...options
    })
  }

  /**
   * 显示信息模态框
   * @param {String} message 消息内容
   * @param {Object} options 其他选项
   */
  info(message, options = {}) {
    this.createModal({
      type: 'info',
      title: '提示',
      message,
      ...options
    })
  }

  /**
   * 显示警告模态框
   * @param {String} message 消息内容
   * @param {Object} options 其他选项
   */
  warning(message, options = {}) {
    this.createModal({
      type: 'warning',
      title: '警告',
      message,
      ...options
    })
  }

  /**
   * 显示询问模态框
   * @param {String} message 消息内容
   * @param {Function} onConfirm 确认回调
   * @param {Function} onCancel 取消回调
   * @param {Object} options 其他选项
   */
  confirm(message, onConfirm = null, onCancel = null, options = {}) {
    this.createModal({
      type: 'question',
      title: '确认操作',
      message,
      showCancel: true,
      onConfirm,
      onCancel,
      ...options
    })
  }

  /**
   * 显示自定义模态框
   * @param {Object} options 完整配置选项
   */
  show(options) {
    this.createModal(options)
  }
}

// 导出单例
export default new ModalHelper()