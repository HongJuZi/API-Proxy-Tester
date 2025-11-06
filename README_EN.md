[中文](./README.md) | [English](./README_EN.md)
---

# API Proxy Tester

API Proxy Testing Tool built with Vue 3 and Vite. Core goal is for interface testing and integration development in VPN intranet environments, providing an easy-to-use interface and powerful features.

[![GitHub Stars](https://img.shields.io/github/stars/HongJuZi/API-Proxy-Tester?style=social)](https://github.com/HongJuZi/API-Proxy-Tester) [![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE) [![Platform: Web](https://img.shields.io/badge/platform-web-blue)]()

## Features

- Built with Vue 3 and Vite for fast development and deployment
- Supports multiple HTTP methods (GET, POST, PUT, DELETE, etc.)
- Configurable global parameters and request headers
- Request body supports both key-value pairs and raw JSON data modes
- Automatic API documentation generation (Markdown/HTML)
- Response content formatting and downloading
- Parameter placeholder automatic replacement
- Historical request records


## DEMO演示

![Home Page](./demo/index.jpg)
![API Proxy Tester Demo](./demo/api.png)
![Global Setting](./demo/config.png)

## Project Structure

```
API-Proxy-Tester/
├── .gitignore          # Git ignore file configuration
├── LICENSE             # License file
├── README.md           # Project documentation (Chinese)
├── README_EN.md        # Project documentation (English)
├── backend/            # Backend related files
│   └── api-test-worker.php
├── index.html          # Entry HTML file
├── package-lock.json   # Dependency lock file
├── package.json        # Project configuration and dependencies
├── postcss.config.js   # PostCSS configuration
├── public/             # Static resources directory
├── src/                # Source code directory
│   ├── App.vue         # Root component
│   ├── assets/         # Resource files
│   ├── components/     # Vue components
│   │   ├── forms/      # Form related components
│   │   ├── layout/     # Layout components
│   │   ├── modals/     # Modal components
│   │   ├── response/   # Response related components
│   │   └── settings/   # Settings related components
│   ├── main.js         # Entry JavaScript file
│   ├── pages/          # Page components
│   │   ├── AboutPage.vue
│   │   ├── ApiTestPage.vue
│   │   └── HomePage.vue
│   ├── router/         # Router configuration
│   │   └── index.js
│   ├── stores/         # State management (Pinia)
│   │   └── index.js
│   ├── styles/         # Style files
│   │   ├── components/ # Component styles
│   │   ├── main.css    # Main style file
│   │   └── tailwind.css # Tailwind CSS style
│   └── utils/          # Utility functions
│       ├── apiClient.js
│       ├── documentGenerator.js
│       ├── helpers.js
│       ├── modalHelper.js
│       ├── paramProcessor.js
│       └── storage.js
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.js      # Vite configuration
```

## Development Environment Setup

1. Enter the project directory:
   ```bash
   cd API-Proxy-Tester
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run serve
   ```

## Placeholder Usage Instructions

In global parameters and request body parameters, the following placeholders are supported for automatic replacement:

- `${datetime}` - Current date and time, format: YYYY-MM-DD HH:mm:ss
- `${date}` - Current date, format: YYYY-MM-DD
- `${time}` - Current time, format: HH:mm:ss
- `${UUID}` - Generate unique UUID
- `${s32}` - Generate 32-bit random string
- `${s16}` - Generate 16-bit random string

Example: Using `{"timestamp": "${datetime}", "request_id": "${UUID}"}` in JSON will be automatically replaced with actual values.

---

## Third-party Links

- [Discord](https://discord.com/invite/HongJuZi)
- [Twitter](https://twitter.com/HongJuZi)
- [GitHub](https://github.com/HongJuZi)

## License

MIT License