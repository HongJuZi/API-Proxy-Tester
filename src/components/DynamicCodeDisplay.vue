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
      let result = ''
      let tempText = this.currentText
      let lastIndex = 0
      
      const patterns = [
        { regex: /\/\/[^\n]*/g, className: 'text-green-400' },
        { regex: /'[^']*'/g, className: 'text-yellow-400' },
        { regex: /"[^"]*"/g, className: 'text-yellow-400' },
        { regex: /\b\d+\b/g, className: 'text-purple-400' },
        { regex: /\b(export|default|return|const|if|this)\b/g, className: 'text-blue-400' },
        { regex: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, className: 'text-pink-400' },
        { regex: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, className: 'text-blue-400' }
      ]
      
      tempText = tempText.split('\n').map(line => {
          const indentLevel = Math.max(0, Math.floor((line.match(/^\s*/)[0].length - 2) / 4))
          return ' '.repeat(indentLevel * 4) + line.trim()
        }).join('\n')
      
      let hasMatch = true
      while (hasMatch) {
        hasMatch = false
        let earliestMatch = null
        let earliestPattern = null
        
        patterns.forEach(pattern => {
          const match = pattern.regex.exec(tempText)
          if (match && match.index >= lastIndex && (!earliestMatch || match.index < earliestMatch.index)) {
            earliestMatch = match
            earliestPattern = pattern
            hasMatch = true
          }
        })
        
        if (earliestMatch) {
          if (earliestMatch.index > lastIndex) {
            result += this.escapeHtml(tempText.substring(lastIndex, earliestMatch.index))
          }
          result += `<span class="${earliestPattern.className}">${this.escapeHtml(earliestMatch[0])}</span>`
          lastIndex = earliestMatch.index + earliestMatch[0].length
        }
      }
      
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
    }
  }
}
</script>

<style scoped>
</style>