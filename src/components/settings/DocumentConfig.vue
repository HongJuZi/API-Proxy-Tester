<template>
  <div class="bg-white rounded-xl shadow-card p-5 mb-6 hover:shadow-hover transition-all-300 max-w-6xl mx-auto">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold flex items-center">
        <i class="fa fa-file-text text-primary mr-2"></i>文档配置
      </h2>
      <button @click="toggleExpand('document')" class="text-dark-2 hover:text-primary transition-all-300">
        <i :class="expandedSections.document ? 'fa fa-chevron-up' : 'fa fa-chevron-down'"></i>
      </button>
    </div>
    
    <transition name="fade">
      <div v-if="expandedSections.document" class="space-y-4 animate-fade-in">
        <!-- 接口名称 -->
        <div>
          <label class="block text-sm font-medium text-dark-2 mb-1">接口名称</label>
          <input 
            :value="apiName"
            @input="$emit('update:apiName', $event.target.value)"
            type="text" 
            placeholder="例如：用户列表查询" 
            class="w-full form-input rounded-lg border-light-2 px-3 py-2 text-sm"
          >
        </div>
        
        <!-- 接口描述 -->
        <div>
          <label class="block text-sm font-medium text-dark-2 mb-1">接口描述</label>
          <textarea 
            :value="apiDescription"
            @input="$emit('update:apiDescription', $event.target.value)"
            placeholder="描述接口的功能和用途" 
            class="w-full form-textarea rounded-lg border-light-2 px-3 py-2 text-sm h-20"
          ></textarea>
        </div>
        
        <!-- 作者信息 -->
        <div>
          <label class="block text-sm font-medium text-dark-2 mb-1">作者</label>
          <input 
            :value="apiAuthor"
            @input="$emit('update:apiAuthor', $event.target.value)"
            type="text" 
            placeholder="文档作者" 
            class="w-full form-input rounded-lg border-light-2 px-3 py-2 text-sm"
          >
        </div>
        
        <!-- 生成文档按钮 -->
        <div class="grid grid-cols-2 gap-3 mt-4">
          <button @click="generateDocument('markdown')" class="bg-secondary hover:bg-secondary/90 text-white font-medium py-2 px-4 rounded-lg transition-all-300 flex items-center justify-center space-x-1">
            <i class="fa fa-code"></i>
            <span>生成Markdown</span>
          </button>
          <button @click="generateDocument('html')" class="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-all-300 flex items-center justify-center space-x-1">
            <i class="fab fa-html5"></i>
            <span>生成HTML</span>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'DocumentConfig',
  props: {
    apiName: String,
    apiDescription: String,
    apiAuthor: String,
    expandedSections: Object
  },
  methods: {
    toggleExpand(section) {
      this.$emit('toggle-expand', section)
    },
    generateDocument(format) {
      this.$emit('generate-document', format)
    }
  }
}
</script>