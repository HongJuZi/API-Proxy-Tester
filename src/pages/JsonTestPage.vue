<template>
  <div class="json-test-page p-8">
    <h1 class="text-2xl font-bold mb-6">JSON输入测试页面</h1>
    
    <!-- 简单的JSON输入区域 -->
    <div style="border: 3px solid red; padding: 20px; margin-bottom: 20px;">
      <h2 class="text-xl font-semibold mb-4">JSON输入框</h2>
      <textarea
        v-model="testJson"
        placeholder="请输入JSON数据..."
        style="
          width: 100%;
          height: 300px;
          padding: 15px;
          border: 2px solid black;
          background: white;
          font-family: monospace;
          font-size: 16px;
          resize: vertical;
          box-sizing: border-box;
        "
      ></textarea>
      
      <div class="mt-4">
        <button @click="formatJson" class="bg-blue-500 text-white px-4 py-2 rounded-md">格式化JSON</button>
      </div>
    </div>
    
    <!-- 显示输入值 -->
    <div style="border: 2px solid blue; padding: 20px;">
      <h2 class="text-xl font-semibold mb-4">输入的JSON值</h2>
      <pre>{{ testJson }}</pre>
      <p>字符数: {{ testJson.length }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JsonTestPage',
  data() {
    return {
      testJson: '{"test": "这是一个测试JSON"}'
    }
  },
  methods: {
    formatJson() {
      try {
        const parsed = JSON.parse(this.testJson);
        this.testJson = JSON.stringify(parsed, null, 2);
      } catch (e) {
        alert('无效的JSON格式');
      }
    }
  }
}
</script>

<style scoped>
.json-test-page {
  max-width: 800px;
  margin: 0 auto;
}
</style>