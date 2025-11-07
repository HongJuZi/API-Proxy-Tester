import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 引入Pinia
import { createPinia } from 'pinia'

// 引入全局样式文件
import './styles/main.css'
import './styles/tailwind.css'

// 引入font-awesome
import '@fortawesome/fontawesome-free/css/all.min.css'

// 引入json5
import JSON5 from 'json5'

// 将JSON5添加到全局属性中，以便在组件中使用
window.jsonlint = {
  parse: JSON5.parse,
  stringify: JSON5.stringify
}

// 创建Vue应用实例
const app = createApp(App)

// 创建Pinia实例
const pinia = createPinia()

// 使用路由和Pinia
app.use(router)
app.use(pinia)

// 挂载应用
app.mount('#app')