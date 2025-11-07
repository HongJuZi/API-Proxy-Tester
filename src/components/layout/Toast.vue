<template>
  <Transition name="toast">
    <div 
      v-if="visible" 
      :class="[
        'fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg z-50',
        {
          'bg-success text-white': toastType === 'success',
          'bg-danger text-white': toastType === 'error',
          'bg-warning text-dark': toastType === 'warning',
          'bg-info text-white': toastType === 'info'
        }
      ]"
    >
      {{ message || '操作成功！' }}
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    message: String,
    visible: {
      type: Boolean,
      default: true
    },
    toastType: {
      type: String,
      default: 'success'
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        // 5秒后自动隐藏
        this.$nextTick(() => {
          setTimeout(() => {
            this.$emit('close');
          }, 3000);
        });
      }
    }
  }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translate(-50%, -20px);
}

.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px);
}
</style>