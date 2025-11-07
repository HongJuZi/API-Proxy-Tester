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
    <div class="h-50 overflow-hidden overflow-y-scroll p-4 font-mono text-sm scroll-thin">
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
      default: 30
    },
    pauseBetweenBlocks: {
      type: Number,
      default: 200
    },
    restartDelay: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      isTyping: false,
      currentText: '',
      codeBlocks: [
        { type: 'keyword', text: 'export default {' + '\n' },
        { type: 'indent', text: '  ' },
        { type: 'property', text: 'name:' },
        { type: 'string', text: " 'HomePage'" + ',\n' },
        { type: 'indent', text: '  ' },
        { type: 'property', text: 'data()' },
        { type: 'code', text: ' {' + '\n' },
        { type: 'indent', text: '    ' },
        { type: 'keyword', text: 'return ' },
        { type: 'code', text: '{\n' },
        { type: 'indent', text: '      ' },
        { type: 'property', text: 'currentIndex:' },
        { type: 'number', text: ' 0' + ',\n' },
        { type: 'indent', text: '      ' },
        { type: 'property', text: 'imageHeights:' },
        { type: 'code', text: ' []' + ',\n' },
        { type: 'indent', text: '    ' },
        { type: 'code', text: '}' + '\n' },
        { type: 'indent', text: '  ' + '},' + '\n' },
        { type: 'indent', text: '  ' },
        { type: 'property', text: 'methods:' },
        { type: 'code', text: ' {' + '\n' },
        { type: 'indent', text: '    ' },
        { type: 'function', text: 'adjustCarouselHeight()' },
        { type: 'code', text: ' {' + '\n' },
        { type: 'indent', text: '      ' },
        { type: 'comment', text: '// 根据当前图片调整轮播图高度' + '\n' },
        { type: 'indent', text: '      ' },
        { type: 'keyword', text: 'const ' },
        { type: 'variable', text: 'images = ' },
        { type: 'keyword', text: 'this.$refs.carouselContainer.querySelectorAll(' },
        { type: 'string', text: "'img'" },
        { type: 'code', text: ');\n' },
        { type: 'indent', text: '      ' },
        { type: 'keyword', text: 'if ' },
        { type: 'code', text: '(images.length > ' },
        { type: 'keyword', text: 'this.currentIndex) {' + '\n' },
        { type: 'indent', text: '        ' },
        { type: 'keyword', text: 'const ' },
        { type: 'variable', text: 'currentImage = images[' },
        { type: 'keyword', text: 'this.currentIndex];' + '\n' },
        { type: 'indent', text: '        ' },
        { type: 'keyword', text: 'this.$refs.carouselContainer.style.height = currentImage.offsetHeight + ' },
        { type: 'string', text: "'px'" },
        { type: 'code', text: ';\n' },
        { type: 'indent', text: '      ' },
        { type: 'code', text: '}' + '\n' },
        { type: 'indent', text: '    ' },
        { type: 'code', text: '},' + '\n' },
        { type: 'indent', text: '    ' },
        { type: 'function', text: 'startAutoSlide()' },
        { type: 'code', text: ' {' + '\n' },
        { type: 'indent', text: '      ' },
        { type: 'function', text: 'setInterval(() => {' + '\n' },
        { type: 'indent', text: '        ' },
        { type: 'keyword', text: 'this.nextSlide();' + '\n' },
        { type: 'indent', text: '        ' },
        { type: 'keyword', text: 'this.adjustCarouselHeight();' + '\n' },
        { type: 'indent', text: '      ' },
        { type: 'code', text: '}, ' },
        { type: 'number', text: '5000' + ');' + '\n' },
        { type: 'indent', text: '    ' },
        { type: 'code', text: '}' + '\n' },
        { type: 'indent', text: '  ' },
        { type: 'code', text: '}' + '\n' },
        { type: 'code', text: '}' }
      ],
      currentBlockIndex: 0,
      currentCharIndex: 0,
      animationTimer: null,
      restartTimer: null
    }
  },
  computed: {
    formattedCode() {
      let tempText = this.currentText
      
      // 先解码HTML实体，再进行HTML转义，防止代码中的HTML被解析
      let unescapedText = this.unescapeHtml(tempText)
      let escapedText = this.escapeHtml(unescapedText)
      
      // 应用语法高亮
      let highlightedText = this.applySyntaxHighlighting(escapedText)
      
      // 处理换行符
      highlightedText = highlightedText.replace(/\n/g, '<br/>')
      
      // 确保所有内容都在span标签内，默认白色
      return '<span class="text-white">' + highlightedText + '</span>'
    }
  },
  methods: {
    // 添加一个方法来解码HTML实体
    unescapeHtml(text) {
      const map = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#039;': "'"
      }
      let result = text
      for (const [entity, char] of Object.entries(map)) {
        result = result.replace(new RegExp(entity, 'g'), char)
      }
      return result
    },
    
    escapeHtml(text) {
      // 安全的HTML转义函数
      const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }
      return text.replace(/[&<>"']/g, m => map[m])
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
        const char = currentBlock.text[this.currentCharIndex]
        this.currentText += char
        this.currentCharIndex++
        
        const adjustedSpeed = this.codeSpeed + (Math.random() * 10 - 5)
        this.animationTimer = setTimeout(() => this.typeNextChar(), adjustedSpeed)
      } else {
        this.currentBlockIndex++
        this.currentCharIndex = 0
        
        this.animationTimer = setTimeout(() => this.typeNextChar(), this.pauseBetweenBlocks)
      }
    },
    
    finishTyping() {
      this.isTyping = false
      
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
    },
    
    // 应用语法高亮
    applySyntaxHighlighting(text) {
      // 将文本按行分割，逐行处理
      const lines = text.split('\n')
      const processedLines = lines.map(line => {
        return this.highlightLine(line)
      })
      return processedLines.join('\n')
    },
    
    // 高亮单行代码
    highlightLine(line) {
      // 存储所有需要高亮的部分及其位置
      const highlights = []
      
      // 1. 查找字符串字面量
      let i = 0
      while (i < line.length) {
        if (line[i] === '"' || line[i] === "'") {
          const quote = line[i]
          const start = i
          i++
          // 找到匹配的结束引号
          while (i < line.length && line[i] !== quote) {
            // 处理转义字符
            if (line[i] === '\\' && i + 1 < line.length) {
              i += 2
            } else {
              i++
            }
          }
          if (i < line.length) i++ // 跳过结束引号
          highlights.push({
            start: start,
            end: i,
            type: 'string'
          })
        } else {
          i++
        }
      }
      
      // 2. 查找注释
      for (i = 0; i < line.length - 1; i++) {
        // 单行注释
        if (line[i] === '/' && line[i + 1] === '/') {
          highlights.push({
            start: i,
            end: line.length,
            type: 'comment'
          })
          break // 找到单行注释后，该行剩余部分都是注释
        }
        // 多行注释开始
        else if (line[i] === '/' && line[i + 1] === '*') {
          let end = i + 2
          // 找到多行注释结束
          while (end < line.length - 1 && !(line[end] === '*' && line[end + 1] === '/')) {
            end++
          }
          if (end < line.length - 1) {
            end += 2
          }
          highlights.push({
            start: i,
            end: end,
            type: 'comment'
          })
          i = end - 1 // 跳过已处理的部分
        }
      }
      
      // 3. 查找关键字、函数名、属性等
      for (i = 0; i < line.length; ) {  // 移除了自动递增，在循环内部控制
        // 处理关键字和标识符
        if (/[a-zA-Z_$]/.test(line[i])) {
          const start = i
          // 提取完整单词
          while (i < line.length && /[a-zA-Z0-9_$]/.test(line[i])) {
            i++
          }
          const word = line.substring(start, i)
          
          // 检查是否需要高亮
          let type = null
          if (['export', 'default', 'return', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 
              'function', 'new', 'this', 'class', 'extends', 'import', 'from', 'async', 'await', 
              'try', 'catch', 'finally', 'throw'].includes(word)) {
            type = 'keyword'
          } 
          else if (['methods', 'data', 'name', 'props', 'computed', 'mounted', 'beforeUnmount', 
                   'created', 'beforeCreate', 'beforeUpdate', 'updated', 'destroyed', 'beforeDestroy'].includes(word)) {
            type = 'lifecycle'
          }
          else if (['setTimeout', 'setInterval', 'console.log', 'alert', 'confirm', 'prompt'].includes(word)) {
            type = 'builtin'
          }
          else if (i < line.length && line[i] === '(') {
            type = 'function'
          }
          else if (i < line.length && line[i] === ':') {
            type = 'property'
          }
          
          if (type) {
            highlights.push({
              start: start,
              end: i,
              type: type
            })
          }
        }
        // 处理数字
        else if (/[0-9]/.test(line[i])) {
          const start = i
          // 提取完整数字（包括小数）
          while (i < line.length && /[0-9.]/.test(line[i])) {
            i++
          }
          // 确保提取到的是有效数字
          const numberStr = line.substring(start, i)
          if (/^\d+(\.\d+)?$/.test(numberStr)) {
            highlights.push({
              start: start,
              end: i,
              type: 'number'
            })
          }
        }
        // 处理属性访问
        else if (line[i] === '.' && i + 1 < line.length && /[a-zA-Z_$]/.test(line[i+1])) {
          const start = i
          i++ // 跳过点号
          const propStart = i
          // 提取属性名
          while (i < line.length && /[a-zA-Z0-9_$]/.test(line[i])) {
            i++
          }
          highlights.push({
            start: start,
            end: i,
            type: 'property-access'
          })
        }
        // 其他情况递增i
        else {
          i++
        }
      }
      
      // 根据位置排序高亮部分，避免重叠
      highlights.sort((a, b) => a.start - b.start)
      
      // 合并重叠的高亮部分，保留优先级高的
      const mergedHighlights = []
      for (const highlight of highlights) {
        if (mergedHighlights.length === 0) {
          mergedHighlights.push(highlight)
        } else {
          const last = mergedHighlights[mergedHighlights.length - 1]
          // 如果当前高亮与上一个重叠
          if (highlight.start < last.end) {
            // 保留优先级高的（按类型优先级）
            const priority = {
              'string': 5,
              'comment': 4,
              'keyword': 3,
              'lifecycle': 3,
              'builtin': 3,
              'function': 2,
              'property': 2,
              'property-access': 2,
              'number': 1
            }
            
            if (priority[highlight.type] > priority[last.type]) {
              mergedHighlights[mergedHighlights.length - 1] = highlight
            }
            // 否则保留原有的
          } else {
            mergedHighlights.push(highlight)
          }
        }
      }
      
      // 应用高亮标签
      let result = ''
      let lastIndex = 0
      for (const highlight of mergedHighlights) {
        // 添加高亮前的普通文本
        if (highlight.start > lastIndex) {
          result += line.substring(lastIndex, highlight.start)
        }
        
        // 添加高亮文本
        const highlightedText = line.substring(highlight.start, highlight.end)
        switch (highlight.type) {
          case 'string':
            result += `<span class="text-yellow-400">${highlightedText}</span>`
            break
          case 'comment':
            result += `<span class="text-green-400">${highlightedText}</span>`
            break
          case 'keyword':
          case 'lifecycle':
          case 'builtin':
            result += `<span class="text-blue-400">${highlightedText}</span>`
            break
          case 'function':
            result += `<span class="text-orange-400">${highlightedText}</span>`
            break
          case 'property':
            result += `<span class="text-pink-400">${highlightedText}</span>`
            break
          case 'property-access':
            result += `<span class="text-teal-400">${highlightedText}</span>`
            break
          case 'number':
            result += `<span class="text-purple-400">${highlightedText}</span>`
            break
          default:
            result += highlightedText
        }
        
        lastIndex = highlight.end
      }
      
      // 添加最后一段普通文本
      if (lastIndex < line.length) {
        result += line.substring(lastIndex)
      }
      
      return result
    }
  },
  beforeUnmount() {
    this.stopTyping()
  },
  mounted() {
    this.startTyping()
  },
}
</script>

<style scoped>
</style>