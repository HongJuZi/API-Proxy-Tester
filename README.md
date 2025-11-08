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

![首页](./public/demo/index.jpg)
![API Proxy Tester Demo](./public/demo/api.png)
![全局设置](./public/demo/config.png)

## 项目结构

```
API-Proxy-Tester/
├── .env.example        # 环境变量配置示例文件
├── .gitignore          # Git忽略文件配置
├── BUILD_CONFIG.md     # 构建配置说明文档
├── BUILD_CONFIG_EN.md  # 英文构建配置说明文档
├── LICENSE             # 许可证文件
├── README.md           # 项目说明文档（中文）
├── README_EN.md        # 项目说明文档（英文）
├── backend/            # 后端相关文件
│   └── api-test-worker.php
├── dist/               # 构建输出目录
├── index.html          # 入口HTML文件
├── package-lock.json   # 依赖锁定文件
├── package.json        # 项目配置和依赖
├── postcss.config.js   # PostCSS配置
├── public/             # 静态资源目录
│   └── demo/           # 演示图片目录
│       ├── ai-coding.jpg
│       ├── api.jpg
│       ├── config.jpg
│       └── index.jpg
├── scripts/            # 脚本工具目录
│   ├── check-image-dimensions.js
│   └── process-images.js
├── src/                # 源代码目录
│   ├── App.vue         # 根组件
│   ├── assets/         # 资源文件
│   ├── components/     # Vue组件
│   │   ├── DynamicCodeDisplay.vue
│   │   ├── JsonEditor.vue
│   │   ├── forms/      # 表单相关组件
│   │   │   └── ApiConfig.vue
│   │   ├── layout/     # 布局组件
│   │   │   ├── AppFooter.vue
│   │   │   ├── AppHeader.vue
│   │   │   ├── RequestHistory.vue
│   │   │   └── Toast.vue
│   │   ├── modals/     # 模态框组件
│   │   │   ├── GlobalSettings.vue
│   │   │   ├── HelpModal.vue
│   │   │   └── StatusModal.vue
│   │   ├── response/   # 响应相关组件
│   │   │   ├── DocumentPreview.vue
│   │   │   ├── RequestInfo.vue
│   │   │   └── ResponseInfo.vue
│   │   └── settings/   # 设置相关组件
│   │       └── DocumentConfig.vue
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
│   │   │   ├── forms.css
│   │   │   ├── header.css
│   │   │   ├── modals.css
│   │   │   └── response.css
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

## 高级构建配置

项目支持灵活的构建配置，可以根据不同的部署需求自定义构建参数。详细配置说明请参考：

- [构建配置文档](./BUILD_CONFIG.md)

> 注：英文版本README_EN.md中的构建配置文档链接也已更新为指向正确的文档

主要构建选项包括：

- 自定义基础路径（默认为 `/tools/`）
- 自定义输出目录（默认为 `dist/`）
- 自定义静态资源目录（默认为 `assets`）
- 预定义的构建脚本（根路径构建、自定义模式等）
- 环境配置文件支持

## 项目路线图 (Roadmap)

### 已完成功能
- [x] 基础API测试功能（GET/POST/PUT/DELETE等请求）
- [x] 请求参数配置（全局参数、请求头、请求体）
- [x] 响应数据查看与格式化
- [x] 历史请求记录管理
- [x] API文档自动生成（Markdown/HTML）
- [x] 参数占位符自动替换
- [x] 代理请求模式支持

### 近期规划 (v1.1 - v1.3)
- [ ] Mock服务功能：快速创建模拟API接口
- [ ] 接口测试自动化：支持测试用例编写与执行
- [ ] 团队协作功能：支持多人共享测试环境
- [ ] 性能测试模块：接口压力测试与性能分析
- [ ] 数据对比功能：不同版本接口响应数据对比

### 中期规划 (v1.4 - v2.0)
- [ ] AI智能接口分析：自动识别接口参数和数据结构
- [ ] 代码生成器：根据接口自动生成调用代码（多语言支持）
- [ ] 接口监控告警：实时监控接口状态并发送告警
- [ ] 测试报告生成：自动生成详细的测试报告
- [ ] 插件系统：支持自定义插件扩展功能

### 长期愿景 (v2.0+)
- [ ] AI驱动的智能测试：基于历史数据和接口文档自动生成测试用例
- [ ] 自然语言接口测试：通过自然语言描述进行接口测试
- [ ] 智能文档更新：自动检测接口变更并更新文档
- [ ] 预测性分析：基于历史数据预测接口性能和稳定性

## AI能力集成规划

### 当前AI应用
- 项目由AI全程编写，使用了Trace CN、Qorder等AI开发工具
- 通过AI辅助进行代码生成、调试和优化

### 未来AI能力扩展
1. **智能接口分析**
   - 自动识别接口参数类型和数据结构
   - 基于接口文档智能生成测试用例
   - 智能推荐常用参数组合

2. **自然语言处理**
   - 支持通过自然语言描述进行接口测试
   - 智能解析接口需求文档并生成测试配置
   - 自动生成接口文档摘要和说明

3. **智能测试优化**
   - 基于历史测试数据优化测试策略
   - 自动识别接口变更并提醒更新测试用例
   - 智能预测接口性能瓶颈

4. **代码生成与优化**
   - 根据接口自动生成多种语言的调用代码
   - AI辅助代码审查和优化建议
   - 智能重构建议

5. **智能协作**
   - AI辅助的团队协作和知识共享
   - 智能问题诊断和解决方案推荐
   - 基于上下文的智能帮助系统

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
