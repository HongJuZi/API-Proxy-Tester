<template>
  <div class="fixed bottom-4 right-4 bg-dark text-white px-4 py-2 rounded-lg shadow-card">
    {{ message || '操作成功！' }}
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    message: String
  }
}
</script>