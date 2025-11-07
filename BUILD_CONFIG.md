# 构建配置文档

本文档介绍如何在 API-Proxy-Tester 项目中通过不同的参数配置来定制构建输出路径和基础目录。

## 环境变量配置

项目支持通过环境变量来自定义以下构建参数：

- `VITE_BASE_DIR`: 应用的基础路径，默认为 `/tools/`
- `VITE_OUT_DIR`: 打包输出目录，默认为 `dist/`
- `VITE_ASSETS_DIR`: 静态资源目录，默认为 `assets`

## 使用方式

### 方法1：使用预定义的 npm 脚本

项目已经在 `package.json` 中配置了几个常用的构建脚本：

```bash
# 默认构建（base: /tools/, outDir: dist/）
npm run build

# 根路径构建（base: /, outDir: dist-root/）
npm run build:root

# 自定义模式构建（可通过 .env.custom 文件配置）
npm run build:custom

# 特定参数构建（base: /custom/, outDir: dist-custom/, assetsDir: static）
npm run build:specific
```

### 方法2：直接指定环境变量

您可以在运行构建命令时直接指定环境变量：

```bash
# 自定义基础路径和输出目录
VITE_BASE_DIR=/api/ VITE_OUT_DIR=dist-api/ npm run build

# 自定义资源目录
VITE_ASSETS_DIR=static-files npm run build

# 完整自定义
VITE_BASE_DIR=/test/ VITE_OUT_DIR=dist-test/ VITE_ASSETS_DIR=test-assets npm run build
```

### 方法3：使用环境配置文件

您可以创建不同的 `.env` 文件来存储不同环境的配置：

1. 创建 `.env` 文件 - 适用于所有环境
2. 创建 `.env.production` - 仅用于生产环境构建
3. 创建 `.env.development` - 仅用于开发环境
4. 创建自定义环境文件如 `.env.custom`

在环境文件中定义变量：
```
VITE_BASE_DIR=/custom-base/
VITE_OUT_DIR=custom-dist/
VITE_ASSETS_DIR=custom-assets
```

然后使用相应的模式运行：
```bash
# 使用自定义环境配置
npm run build -- --mode custom
```

## 预览部署

构建完成后，可以使用预览命令查看效果：

```bash
# 默认预览
npm run serve

# 根路径预览
npm run serve:root
```

或者直接指定环境变量进行预览：

```bash
VITE_BASE_DIR=/your-base/ npm run serve
```

## 注意事项

1. 确保 `VITE_BASE_DIR` 以 `/` 开头和结尾，例如 `/api/` 而不是 `api`
2. 构建输出目录会自动创建，如果目录已存在则会被覆盖
3. 在实际部署时，请确保服务器配置正确指向构建输出目录
4. 使用环境文件时，变量名必须以 `VITE_` 开头才能被 Vite 正确识别

## 示例场景

### 场景1：部署到网站根目录

```bash
npm run build:root
```

### 场景2：部署到子路径

```bash
VITE_BASE_DIR=/api-tester/ npm run build
```

### 场景3：使用自定义资源目录

```bash
VITE_ASSETS_DIR=resources npm run build
```