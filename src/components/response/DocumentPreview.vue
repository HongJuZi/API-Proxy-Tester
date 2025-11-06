<template>
  <div class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-content" :class="{ 'fullscreen': isFullscreen }" @click.stop>
      <!-- 模态框头部 -->
      <div class="modal-header">
        <h2 class="modal-title">
          <i class="fa fa-file-text-o text-primary mr-2"></i>文档预览
        </h2>
        <div class="flex items-center space-x-3">
          <button @click="copyDocument" class="text-primary text-sm hover:text-secondary transition-all-300">
            <i class="fa fa-copy mr-1"></i>复制
          </button>
          <button @click="downloadDocument" class="text-primary text-sm hover:text-secondary transition-all-300">
            <i class="fa fa-download mr-1"></i>下载
          </button>
          <button @click="toggleFullscreen" class="text-primary text-sm hover:text-secondary transition-all-300">
            <i :class="isFullscreen ? 'fa fa-compress' : 'fa fa-expand'"></i>
          </button>
          <button @click="closePreview" class="modal-close p-1">
            <i class="fa fa-times"></i>
          </button>
        </div>
      </div>
      
      <!-- 模态框内容 -->
      <div class="modal-body">
        <div class="markdown-preview animate-fade-in" v-html="documentContent"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DocumentPreview',
  props: {
    documentContent: String
  },
  data() {
    return {
      isFullscreen: false
    }
  },
  methods: {
    copyDocument() {
      this.$emit('copy-document')
    },
    downloadDocument() {
      this.$emit('download-document')
    },
    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen
    },
    closePreview() {
      this.$emit('close-preview')
    },
    handleOverlayClick() {
      // 点击遮罩层关闭模态框
      this.closePreview()
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background-color: #ffffff;
  border-radius: 0.75rem;
  width: 100%;
  max-width: 64rem;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease;
  transition: all 0.3s ease;
}

.modal-content.fullscreen {
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  border-radius: 0;
  position: fixed;
  top: 0;
  left: 0;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #E5E6EB;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 10;
}

.modal-title {
  font-size: 1.125rem;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.modal-close {
  color: #4E5969;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 0.25rem;
}

.modal-close:hover {
  color: #1D2129;
  background-color: #F7F8FA;
}

.modal-body {
  padding: 1.5rem;
  max-height: calc(90vh - 6rem);
  overflow-y: auto;
}

.modal-content.fullscreen .modal-body {
  max-height: calc(100vh - 4rem);
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>