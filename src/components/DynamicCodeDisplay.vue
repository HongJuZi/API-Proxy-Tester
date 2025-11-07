<template>
  <div class="bg-gray-900 rounded-xl shadow-card overflow-hidden">
    <div class="flex items-center px-4 py-2 bg-gray-800">
      <div class="flex space-x-1">
        <div class="w-3 h-3 rounded-full bg-red-500"></div>
        <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div class="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div class="text-gray-300 text-sm ml-2">{{ fileName }}</div>
    </div>
    
    <div class="h-48 overflow-y-auto p-4 font-mono text-sm">
      <div class="text-gray-400">// AI正在编写代码...</div>
      <div v-html="formattedCode"></div>
      <span v-if="isTyping" class="animate-pulse">▌</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DynamicCodeDisplay',
  props: {
    fileName: {
      type: String,
      default: 'HomePage.vue'
    },
    codeSpeed: {
      type: Number,
      default: 30 // 每个字符的延迟时间（毫秒）
    },
    pauseBetweenBlocks: {
      type: Number,
      default: 200 // 代码块之间的暂停时间（毫秒）
    },
    restartDelay: {
      type: Number,
      default: 3000 // 完成后重新开始的延迟时间（毫秒）
    }
  },
  data() {
    return {
      isTyping: false,
      currentText: '',
      codeBlocks: [
        {
          type: 'keyword',
          text: 'export default ' + '{\n'
        },
        {
          type: 'indent',
          text: '  '
        },
        {
          type: 'property',
          text: 'name:'
        },
        {
          type: 'string',
          text: " 'HomePage'" + ',\n'
        },
        {
          type: 'indent',
          text: '  '
        },
        {
          type: 'property',
          text: 'data()'
        },
        {
          type: 'code',
          text: ' {' + '\n'
        },
        {
          type: 'indent',
          text: '    '
        },
        {
          type: 'keyword',
          text: 'return '
        },
        {
          type: 'code',
          text: '{\n'
        },
        {
          type: 'indent',
          text: '      '
        },
        {
          type: 'property',
          text: 'currentIndex:'
        },
        {
          type: 'number',
          text: ' 0' + ',\n'
        },
        {
          type: 'indent',
          text: '      '
        },
        {
          type: 'property',
          text: 'imageHeights:'
        },
        {
          type: 'code',
          text: ' []' + ',\n'
        },
        {
          type: 'indent',
          text: '    '
        },
        {
          type: 'code',
          text: '}' + '\n'
        },
        {
          type: 'indent',
          text: '  ' + '},' + '\n'
        },
        {
          type: 'indent',
          text: '  '
        },
        {
          type: 'property',
          text: 'methods:'
        },
        {
          type: 'code',
          text: ' {' + '\n'
        },
        {
          type: 'indent',
          text: '    '
        },
        {
          type: 'function',
          text: 'adjustCarouselHeight()'
        },
        {
          type: 'code',
          text: ' {' + '\n'
        },
        {
          type: 'indent',
          text: '      '
        },
        {
          type: 'comment',
          text: '// 根据当前图片调整轮播图高度' + '\n'
        },
        {
          type: 'indent',
          text: '      '
        },
        {
          type: 'keyword',
          text: 'const '
        },
        {
          type: 'variable',
          text: 'images = '
        },
        {
          type: 'keyword',
          text: 'this.$refs.carouselContainer.querySelectorAll('
        },
        {
          type: 'string',
          text: "'img'"
        },
        {
          type: 'code',
          text: ');\n'
        },
        {
          type: 'indent',
          text: '      '
        },
        {
          type: 'keyword',
          text: 'if '
        },
        {
          type: 'code',
          text: '(images.length > '
        },
        {
          type: 'keyword',
          text: 'this.currentIndex) {' + '\n'
        },
        {
          type: 'indent',
          text: '        '
        },
        {
          type: 'keyword',
          text: 'const '
        },
        {
          type: 'variable',
          text: 'currentImage = images['
        },
        {
          type: 'keyword',
          text: 'this.currentIndex];' + '\n'
        },
        {
          type: 'indent',
          text: '        '
        },
        {
          type: 'keyword',
          text: 'this.$refs.carouselContainer.style.height = currentImage.offsetHeight + '
        },
        {
          type: 'string',
          text: "'px'"
        },
        {
          type: 'code',
          text: ';\n'
        },
        {
          type: 'indent',
          text: '  }'
        },
        {
          type: 'indent',
          text: '    }' + ',' + '\n'
        },
        {
          type: 'indent',
          text: '    '
        },
        {
          type: 'function',
          text: 'startAutoSlide()'
        },
        {
          type: 'code',
          text: ' {' + '\n'
        },
        {
          type: 'indent',
          text: '      '
        },
        {
          type: 'function',
          text: 'setInterval(() => {' + '\n'
        },
        {
          type: 'indent',
          text: '        '
        },
        {
          type: 'keyword',
          text: 'this.nextSlide();' + '\n'
        },
        {
          type: 'indent',
          text: '        '
        },
        {
          type: 'keyword',
          text: 'this.adjustCarouselHeight();' + '\n'
        },
        {
          type: 'indent',
          text: '      }, '
        },
        {
          type: 'number',
          text: '5000' + ');' + '\n'
        },
        {
          type: 'indent',
          text: '    }' + '\n'
        },
        {
          type: 'indent',
          text: '  }' + '\n'
        },
        {
          type: 'code',
          text: '}'
        }
      ],
      currentBlockIndex: 0,
      currentCharIndex: 0,
      animationTimer: null,
      restartTimer: null
    }
  },
  computed: {
    formattedCode() {
      // 将当前文本转换为带样式的HTML
      let result = ''
      let tempText = this.currentText
      let lastIndex = 0
      
      // 简单的代码高亮实现
      const patterns = [
        { regex: /\/\/[^\n]*/g, className: 'text-green-400' }, // 注释
        { regex: /'[^']*'/g, className: 'text-yellow-400' }, // 字符串
        { regex: /"[^"]*"/g, className: 'text-yellow-400' }, // 字符串
        { regex: /\b\d+\b/g, className: 'text-purple-400' }, // 数字
        { regex: /\b(export|default|return|const|if|this)\b/g, className: 'text-blue-400' }, // 关键字
        { regex: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, className: 'text-pink-400' }, // 函数
        { regex: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, className: 'text-blue-400' } // 属性
      ]
      
      // 处理缩进
      tempText = tempText.split('\n').map(line => {
        const indentLevel = (line.match(/^\s*/)[0].length - 2) / 4
        return ' '.repeat(indentLevel * 4) + line.trim()
      }).join('\n')
      
      // 应用高亮
      let hasMatch = true
      while (hasMatch) {
        hasMatch = false
        let earliestMatch = null
        let earliestPattern = null
        
        // 找到最早的匹配
        patterns.forEach(pattern => {
          const match = pattern.regex.exec(tempText)
          if (match && match.index >= lastIndex && (!earliestMatch || match.index < earliestMatch.index)) {
            earliestMatch = match
            earliestPattern = pattern
            hasMatch = true
          }
        })
        
        if (earliestMatch) {
          // 添加匹配前的普通文本
          if (earliestMatch.index > lastIndex) {
            result += this.escapeHtml(tempText.substring(lastIndex, earliestMatch.index))
          }
          
          // 添加高亮的匹配文本
          result += `<span class="${earliestPattern.className}">${this.escapeHtml(earliestMatch[0])}</span>`
          lastIndex = earliestMatch.index + earliestMatch[0].length
        }
      }
      
      // 添加剩余的普通文本
      if (lastIndex < tempText.length) {
        result += this.escapeHtml(tempText.substring(lastIndex))
      }
      
      return result
    }
  },
  mounted() {
    this.startTyping()
  },
  beforeUnmount() {
    this.stopTyping()
  },
  methods: {
    escapeHtml(text) {
      // 将特殊字符转换为HTML实体
      const div = document.createElement('div')
      div.textContent = text
      return div.innerHTML.replace(/\n/g, '<br/>')
    },
    startTyping() {
      this.isTyping = true
      this.typeNextChar()
    },
    typeNextChar() {
      if (this.currentBlockIndex >= this.codeBlocks.length) {
        this.finishTyping()
        return
      }
      
      const currentBlock = this.codeBlocks[this.currentBlockIndex]
      
      if (this.currentCharIndex < currentBlock.text.length) {
        // 输入当前块的下一个字符
        const char = currentBlock.text[this.currentCharIndex]
        this.currentText += char
        this.currentCharIndex++
        
        // 随机调整速度，使打字效果更自然
        const adjustedSpeed = this.codeSpeed + (Math.random() * 10 - 5)
        this.animationTimer = setTimeout(() => this.typeNextChar(), adjustedSpeed)
      } else {
        // 当前块完成，移动到下一个块
        this.currentBlockIndex++
        this.currentCharIndex = 0
        
        // 在代码块之间添加短暂暂停
        this.animationTimer = setTimeout(() => this.typeNextChar(), this.pauseBetweenBlocks)
      }
    },
    finishTyping() {
      this.isTyping = false
      
      // 设置延迟后重新开始
      this.restartTimer = setTimeout(() => {
        this.resetAndRestart()
      }, this.restartDelay)
    },
    resetAndRestart() {
      this.currentText = ''
      this.currentBlockIndex = 0
      this.currentCharIndex = 0
      this.startTyping()
    },
    stopTyping() {
      if (this.animationTimer) {
        clearTimeout(this.animationTimer)
      }
      if (this.restartTimer) {
        clearTimeout(this.restartTimer)
      }
    }
  }
}
</script>

<style scoped>
/* 可以在这里添加额外的样式 */
</style>