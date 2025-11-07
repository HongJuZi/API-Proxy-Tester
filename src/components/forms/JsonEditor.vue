<template>
  <div class="json-editor-wrapper">
    <!-- 工具栏 -->
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center space-x-2">
        <button 
          @click="formatJson" 
          class="text-primary text-sm hover:text-secondary transition-all-300"
          :disabled="!hasContent"
          :title="'格式化JSON'"
        >
          <i class="fa fa-indent mr-1"></i>格式化
        </button>
        <button 
          @click="minifyJson" 
          class="text-primary text-sm hover:text-secondary transition-all-300"
          :disabled="!hasContent"
          :title="'压缩JSON'"
        >
          <i class="fa fa-compress mr-1"></i>压缩
        </button>
        <button 
          @click="validateJson"
          class="text-primary text-sm hover:text-secondary transition-all-300"
          :disabled="!hasContent"
          :title="'验证JSON'"
        >
          <i class="fa fa-check-circle mr-1"></i>验证
        </button>
      </div>
      
      <!-- 状态指示器 -->
      <div class="flex items-center space-x-2">
        <span v-if="isValid !== null" :class="['text-xs', isValid ? 'text-success' : 'text-danger']">
          {{ isValid ? '✓ 有效' : '✗ 无效' }}
        </span>
        <span v-if="charCount > 0" class="text-xs text-dark-2">
          {{ charCount }} 字符
        </span>
      </div>
    </div>
    
    <!-- JSON编辑器 -->
    <div class="relative">
      <textarea
        ref="jsonTextarea"
        :value="modelValue"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
        class="w-full h-64 form-textarea rounded-lg border-light-2 p-3 text-sm font-mono resize-none scrollbar-thin scrollbar-thumb-rounded"
        :class="{ 'border-danger': isValid === false }"
        :placeholder="placeholder || '请输入JSON格式的数据...'"
      ></textarea>
      
      <!-- 行号显示 -->
      <div v-if="showLineNumbers" class="absolute top-3 left-0 bottom-3 text-xs text-dark-3 select-none overflow-hidden">
        <div v-for="i in lineCount" :key="i" class="h-[1.5em] leading-[1.5em] px-2">{{ i }}</div>
      </div>
    </div>
    
    <!-- 错误消息 -->
    <div v-if="errorMessage" class="mt-1 text-xs text-danger">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import json5 from 'json5'
import Helpers from '../../utils/helpers.js'

export default {
  name: 'JsonEditor',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入JSON格式的数据...'
    },
    useJson5: {
      type: Boolean,
      default: true
    },
    showLineNumbers: {
      type: Boolean,
      default: true
    },
    autoValidate: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isValid: null,
      errorMessage: '',
      isFocused: false
    }
  },
  computed: {
    hasContent() {
      return this.modelValue && this.modelValue.trim().length > 0
    },
    charCount() {
      return this.modelValue ? this.modelValue.length : 0
    },
    lineCount() {
      return this.modelValue ? this.modelValue.split('\n').length : 1
    }
  },
  watch: {
    modelValue: {
      handler() {
        if (this.autoValidate) {
          this.validateJsonInternal()
        }
      },
      immediate: true
    }
  },
  methods: {
    handleInput(event) {
      const value = event.target.value
      this.$emit('update:modelValue', value)
    },
    handleFocus() {
      this.isFocused = true
    },
    handleBlur() {
      this.isFocused = false
    },
    handleKeydown(event) {
      // Tab键缩进
      if (event.key === 'Tab') {
        event.preventDefault()
        const textarea = event.target
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        
        // 在光标位置插入两个空格作为缩进
        const newValue = this.modelValue.substring(0, start) + '  ' + this.modelValue.substring(end)
        this.$emit('update:modelValue', newValue)
        
        // 设置新的光标位置
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2
        }, 0)
      }
      
      // Ctrl+Enter或Cmd+Enter格式化
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault()
        this.formatJson()
      }
    },
    validateJsonInternal() {
      if (!this.hasContent) {
        this.isValid = null
        this.errorMessage = ''
        return
      }
      
      try {
        if (this.useJson5) {
          json5.parse(this.modelValue)
        } else {
          JSON.parse(this.modelValue)
        }
        this.isValid = true
        this.errorMessage = ''
      } catch (error) {
        this.isValid = false
        this.errorMessage = `JSON错误: ${error.message}`
      }
    },
    validateJson() {
      this.validateJsonInternal()
      
      if (this.isValid === true) {
        this.$emit('validated', { valid: true })
      } else if (this.isValid === false) {
        this.$emit('validated', { valid: false, error: this.errorMessage })
      }
    },
    formatJson() {
      if (!this.hasContent) return
      
      try {
        let parsed
        if (this.useJson5) {
          parsed = json5.parse(this.modelValue)
        } else {
          parsed = JSON.parse(this.modelValue)
        }
        
        const formatted = JSON.stringify(parsed, null, 2)
        this.$emit('update:modelValue', formatted)
        this.$emit('formatted', formatted)
      } catch (error) {
        this.errorMessage = `格式化失败: ${error.message}`
        this.$emit('format-error', error)
      }
    },
    minifyJson() {
      if (!this.hasContent) return
      
      try {
        let parsed
        if (this.useJson5) {
          parsed = json5.parse(this.modelValue)
        } else {
          parsed = JSON.parse(this.modelValue)
        }
        
        const minified = JSON.stringify(parsed)
        this.$emit('update:modelValue', minified)
        this.$emit('minified', minified)
      } catch (error) {
        this.errorMessage = `压缩失败: ${error.message}`
        this.$emit('minify-error', error)
      }
    },
    getJsonData() {
      try {
        if (this.useJson5) {
          return json5.parse(this.modelValue || '{}')
        } else {
          return JSON.parse(this.modelValue || '{}')
        }
      } catch (error) {
        throw new Error(`JSON解析错误: ${error.message}`)
      }
    },
    setJsonData(data) {
      try {
        const jsonString = JSON.stringify(data, null, 2)
        this.$emit('update:modelValue', jsonString)
        return true
      } catch (error) {
        this.errorMessage = `设置数据失败: ${error.message}`
        return false
      }
    }
  }
}
</script>

<style scoped>
.json-editor-wrapper {
  position: relative;
}

textarea {
  padding-left: 3em !important;
}

:deep(.form-textarea) {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  line-height: 1.5;
  tab-size: 2;
}

:deep(.form-textarea:focus) {
  outline: none;
  ring: 2px solid var(--primary-color);
  ring-opacity: 0.2;
}

:deep(.form-textarea.border-danger) {
  border-color: var(--danger-color);
}

/* 自定义滚动条样式 */
:deep(.scrollbar-thin) {
  scrollbar-width: thin;
}

:deep(.scrollbar-thin::-webkit-scrollbar) {
  width: 6px;
  height: 6px;
}

:deep(.scrollbar-thin::-webkit-scrollbar-track) {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}

:deep(.scrollbar-thin::-webkit-scrollbar-thumb) {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

:deep(.scrollbar-thin::-webkit-scrollbar-thumb:hover) {
  background: rgba(0, 0, 0, 0.3);
}
</style>