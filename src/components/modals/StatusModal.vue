<template>
  <Teleport to="body">
    <transition name="modal">
      <div v-if="visible" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-xl shadow-xl w-full max-w-md animate-fade-in">
          <!-- 模态框内容 -->
          <div class="p-6">
            <div class="flex flex-col items-center text-center">
              <!-- 图标 -->
              <div class="mb-4">
                <i :class="iconClass" :style="{ fontSize: '48px', color: iconColor }"></i>
              </div>
              
              <!-- 标题 -->
              <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
              
              <!-- 消息内容 -->
              <p class="text-dark-2 mb-6">{{ message }}</p>
              
              <!-- 按钮区域 -->
              <div class="flex space-x-4 w-full justify-center">
                <button
                  v-if="showCancel"
                  @click="handleCancel"
                  class="px-4 py-2 border border-light-2 rounded-lg hover:bg-light-1 transition-colors"
                >
                  {{ cancelText }}
                </button>
                <button
                  @click="handleConfirm"
                  :class="confirmButtonClass"
                >
                  {{ confirmText }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
export default {
  name: 'StatusModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'info',
      validator: (value) => ['success', 'error', 'info', 'warning', 'question'].includes(value)
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      required: true
    },
    showCancel: {
      type: Boolean,
      default: false
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    onConfirm: {
      type: Function,
      default: null
    },
    onCancel: {
      type: Function,
      default: null
    }
  },
  computed: {
    iconClass() {
      const iconMap = {
        success: 'fa fa-check-circle',
        error: 'fa fa-exclamation-circle',
        info: 'fa fa-info-circle',
        warning: 'fa fa-exclamation-triangle',
        question: 'fa fa-question-circle'
      }
      return iconMap[this.type]
    },
    iconColor() {
      const colorMap = {
        success: '#10b981', // 绿色
        error: '#ef4444',   // 红色
        info: '#3b82f6',    // 蓝色
        warning: '#f59e0b', // 橙色
        question: '#6366f1' // 紫色
      }
      return colorMap[this.type]
    },
    confirmButtonClass() {
      const baseClass = 'px-4 py-2 rounded-lg text-white transition-colors'
      const colorMap = {
        success: 'bg-green-500 hover:bg-green-600',
        error: 'bg-red-500 hover:bg-red-600',
        info: 'bg-blue-500 hover:bg-blue-600',
        warning: 'bg-orange-500 hover:bg-orange-600',
        question: 'bg-indigo-500 hover:bg-indigo-600'
      }
      return `${baseClass} ${colorMap[this.type]}`
    }
  },
  methods: {
    handleConfirm() {
      if (this.onConfirm) {
        this.onConfirm()
      }
      this.$emit('close')
    },
    handleCancel() {
      if (this.onCancel) {
        this.onCancel()
      }
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>