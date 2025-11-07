import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ApiTestPage from '../pages/ApiTestPage.vue'
import AboutPage from '../pages/AboutPage.vue'
import JsonTestPage from '../pages/JsonTestPage.vue'

// 定义路由
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/api-test',
    name: 'ApiTest',
    component: ApiTestPage
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  },
  {
    path: '/json-test',
    name: 'JsonTest',
    component: JsonTestPage
  },
  // 后续可以在这里添加更多页面路由
  // {
  //   path: '/docs',
  //   name: 'Documentation',
  //   component: () => import('../pages/DocumentationPage.vue')
  // }
]

// 创建路由实例 - 使用hash模式确保在任何部署路径下都能正常工作
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router