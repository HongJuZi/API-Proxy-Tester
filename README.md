[中文](./README.md) | [English](./README_EN.md)
---

# API Proxy Tester

API代理测试工具，专为解决企业内部系统接口测试难题而设计。在对接一些内部系统时，接口通常不允许外网访问，本地在做接口对接测试及开发时无法实时访问测试查看接口效果。本工具可简单部署在内网环境中，为后续的内部接口对接提供方便的测试和实时接口数据对接能力。

[![GitHub Stars](https://img.shields.io/github/stars/HongJuZi/API-Proxy-Tester?style=social)](https://github.com/HongJuZi/API-Proxy-Tester) [![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE) [![Platform: Web](https://img.shields.io/badge/platform-web-blue)]()

## 项目背景与痛点解决

### 核心痛点
1. **内网接口访问难题**：许多企业内部系统的API接口不允许外网访问，导致开发人员在本地无法直接测试接口
2. **文档与实际不符**：很多企业定制系统的接口文档可能存在更新滞后问题，文档描述与实际运行的接口数据不一致
3. **测试环境搭建复杂**：传统方式需要复杂的环境配置才能进行内网接口测试

### 解决方案
API Proxy Tester通过以下方式解决上述痛点：
- 提供简单易用的Web界面，可快速部署在内网环境中
- 支持代理请求模式，可穿透内网访问受限的API接口
- 实时获取真实响应数据，验证接口可用性和正确性
- 自动生成API文档，确保文档与实际接口保持同步

## 功能特性

- 基于Vue 3、Pinia和Vite构建，快速开发和部署
- 支持多种HTTP方法（GET, POST, PUT, DELETE等）
- 可配置全局参数和请求头
- 请求体支持键值对和JSON原始数据两种模式
- 自动生成接口文档（Markdown/HTML）
- 响应内容格式化和下载
- 参数占位符自动替换
- 历史请求记录
- 支持代理请求模式，解决内网接口访问问题
- 实时响应数据查看，确保接口测试准确性

## DEMO演示

![首页](./demo/index.jpg)
![API Proxy Tester Demo](./demo/api.png)
![全局设置](./demo/config.png)

## 项目结构

```
API-Proxy-Tester/
├── .gitignore          # Git忽略文件配置
├── LICENSE             # 许可证文件
├── README.md           # 项目说明文档
├── backend/            # 后端相关文件
│   └── api-test-worker.php
├── index.html          # 入口HTML文件
├── package-lock.json   # 依赖锁定文件
├── package.json        # 项目配置和依赖
├── postcss.config.js   # PostCSS配置
├── public/             # 静态资源目录
├── src/                # 源代码目录
│   ├── App.vue         # 根组件
│   ├── assets/         # 资源文件
│   ├── components/     # Vue组件
│   │   ├── forms/      # 表单相关组件
│   │   ├── layout/     # 布局组件
│   │   ├── modals/     # 模态框组件
│   │   ├── response/   # 响应相关组件
│   │   └── settings/   # 设置相关组件
│   ├── main.js         # 入口JavaScript文件
│   ├── pages/          # 页面组件
│   │   ├── AboutPage.vue
│   │   ├── ApiTestPage.vue
│   │   └── HomePage.vue
│   ├── router/         # 路由配置
│   │   └── index.js
│   ├── stores/         # 状态管理(Pinia)
│   │   └── index.js
│   ├── styles/         # 样式文件
│   │   ├── components/ # 组件样式
│   │   ├── main.css    # 主样式文件
│   │   └── tailwind.css # Tailwind CSS样式
│   └── utils/          # 工具函数
│       ├── apiClient.js
│       ├── documentGenerator.js
│       ├── helpers.js
│       ├── modalHelper.js
│       ├── paramProcessor.js
│       └── storage.js
├── tailwind.config.js  # Tailwind CSS配置
└── vite.config.js      # Vite配置
```

## 技术栈

### 前端技术
- Vue 3
- Vue Router
- Pinia
- Tailwind CSS
- Axios
- Font Awesome

### 构建工具
- Vite
- PostCSS
- Autoprefixer
- ESLint
- Prettier

## 开发环境搭建

1. 进入项目目录：
   ```bash
   cd API-Proxy-Tester
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 启动开发服务器：
   ```bash
   npm run dev
   ```

4. 构建生产版本：
   ```bash
   npm run build
   ```

5. 预览生产构建：
   ```bash
   npm run serve
   ```

## 占位符使用说明

在全局参数和请求体参数中，支持以下占位符自动替换：

- `${datetime}` - 当前日期时间，格式：YYYY-MM-DD HH:mm:ss
- `${date}` - 当前日期，格式：YYYY-MM-DD
- `${time}` - 当前时间，格式：HH:mm:ss
- `${UUID}` - 生成唯一UUID
- `${s32}` - 生成32位随机字符串
- `${s16}` - 生成16位随机字符串

示例：在JSON中使用 `{"timestamp": "${datetime}", "request_id": "${UUID}"}` 将自动替换为实际值。

---

## 第三方链接

- [Discord](https://discord.com/invite/HongJuZi)
- [Twitter](https://twitter.com/HongJuZi)
- [GitHub](https://github.com/HongJuZi)

## 许可证

MIT License
