<template>
  <div class="json-editor-wrapper" style="background: #fff3f3; border: 3px solid red; border-radius: 8px; padding: 12px; margin: 10px 0;">
    <!-- 非常明显的调试信息 -->
    <div style="background: yellow; color: black; padding: 8px; margin-bottom: 10px; font-weight: bold; font-size: 14px;">
      调试: JSON编辑器组件已渲染
    </div>
    
    <h4 style="margin-top: 0; margin-bottom: 12px; font-size: 16px; color: #333;">JSON编辑器</h4>
    <textarea
      v-model="localValue"
      @input="handleInput"
      :placeholder="placeholder || '请输入JSON格式的数据...'"
      style="width: 100%; height: 250px; border: 2px solid blue; background: #e6f7ff; border-radius: 6px; padding: 12px; font-family: monospace; font-size: 14px; resize: vertical; color: black;"
    ></textarea>
    
    <!-- 调试信息显示当前值 -->
    <div style="background: green; color: white; padding: 8px; margin-top: 10px;">
      当前JSON值: {{ localValue || '(空)' }}
    </div>
    
    <div v-if="error" style="margin-top: 8px; color: red; font-size: 14px; font-weight: bold;">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: 'JsonEditor',
  props: {
    value: {
      type: String,
      default: '{}'
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      localValue: this.value,
      error: ''
    }
  },
  watch: {
    value(newVal) {
      this.localValue = newVal
      console.log('JSON编辑器: 值已更新', newVal)
    }
  },
  mounted() {
    // 添加调试日志，确认组件是否被挂载
    console.log('JSON编辑器: 组件已挂载', {
      value: this.value,
      placeholder: this.placeholder,
      parentInputMode: this.$parent?.inputMode || '未知'
    })
    
    // 确保组件可见
    setTimeout(() => {
      console.log('JSON编辑器: 检查可见性', {
        element: this.$el,
        display: window.getComputedStyle(this.$el).display,
        visibility: window.getComputedStyle(this.$el).visibility,
        opacity: window.getComputedStyle(this.$el).opacity
      })
    }, 500)
  },
  methods: {
    handleInput() {
      // 简单的JSON验证
      try {
        JSON.parse(this.localValue)
        this.error = ''
      } catch (e) {
        this.error = 'JSON格式不正确'
      }
      
      // 发出输入事件
      this.$emit('input', this.localValue)
      // 发出验证事件
      this.$emit('validated', { valid: !this.error, error: this.error })
    }
  }
}
</script>

<style scoped>
/* 简单的样式，确保组件可见 */
.json-editor-wrapper {
  min-height: 250px;
}
</style>