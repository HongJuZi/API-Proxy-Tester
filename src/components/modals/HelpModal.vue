<template>
  <div class="fixed inset-0 bg-dark/50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-auto">
      <div class="p-6 border-b">
        <h2 class="text-xl font-bold text-dark">使用帮助</h2>
      </div>
      <div class="p-6">
        <div class="markdown-preview">
          <h3>API Proxy Tester 使用指南</h3>
          <p>这是一个强大的API测试工具，支持多种请求方法、参数配置和文档生成功能。</p>
          <h4>主要功能：</h4>
          <ul>
            <li>支持 GET, POST, PUT, DELETE 等请求方法</li>
            <li>可配置全局参数和请求头</li>
            <li>请求体支持键值对和JSON原始数据两种模式</li>
            <li>自动生成接口文档</li>
            <li>支持响应内容格式化和下载</li>
            <li>支持参数占位符自动替换</li>
          </ul>
          
          <h4>占位符使用说明：</h4>
          <p>在全局参数和请求体参数中，支持以下占位符自动替换：</p>
          <ul>
            <li><code>${datetime}</code> - 当前日期时间，格式：YYYY-MM-DD HH:mm:ss</li>
            <li><code>${date}</code> - 当前日期，格式：YYYY-MM-DD</li>
            <li><code>${time}</code> - 当前时间，格式：HH:mm:ss</li>
            <li><code>${UUID}</code> - 生成唯一UUID</li>
            <li><code>${s32}</code> - 生成32位随机字符串</li>
            <li><code>${s16}</code> - 生成16位随机字符串</li>
          </ul>
          <p>示例：在JSON中使用 <code>{"timestamp": "${datetime}", "request_id": "${UUID}"}</code> 将自动替换为实际值</p>
        </div>
      </div>
      <div class="p-4 border-t flex justify-end">
        <button @click="close" class="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelpModal',
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>