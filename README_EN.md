[中文](./README.md) | [English](./README_EN.md)
---

# API Proxy Tester

API Proxy Testing Tool designed to solve the challenges of enterprise internal system interface testing. When integrating with some internal systems, APIs are often not accessible from the public network, making it impossible for developers to test interfaces locally. This tool can be easily deployed in an intranet environment to provide convenient testing and real-time interface data integration for subsequent internal interface integration.

[![GitHub Stars](https://img.shields.io/github/stars/HongJuZi/API-Proxy-Tester?style=social)](https://github.com/HongJuZi/API-Proxy-Tester) [![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE) [![Platform: Web](https://img.shields.io/badge/platform-web-blue)]()

## Project Background and Pain Points Solved

### Core Pain Points
1. **Intranet API Access Challenges**: Many enterprise internal system APIs are not accessible from the public network, preventing developers from testing interfaces locally
2. **Documentation vs. Reality**: Many enterprise custom system API documentation may have update lags, causing discrepancies between documented descriptions and actual running interface data
3. **Complex Test Environment Setup**: Traditional methods require complex environment configurations for intranet interface testing

### Solutions
API Proxy Tester solves the above pain points through:
- Providing an easy-to-use web interface that can be quickly deployed in intranet environments
- Supporting proxy request mode to access restricted APIs through intranet penetration
- Real-time acquisition of real response data to verify interface availability and correctness
- Automatic API documentation generation to ensure documentation stays synchronized with actual interfaces

## Features

- Built with Vue 3, Pinia, and Vite for fast development and deployment
- Supports multiple HTTP methods (GET, POST, PUT, DELETE, etc.)
- Configurable global parameters and request headers
- Request body supports both key-value pairs and raw JSON data modes
- Automatic API documentation generation (Markdown/HTML)
- Response content formatting and downloading
- Parameter placeholder automatic replacement
- Historical request records
- Proxy request mode support to solve intranet API access issues
- Real-time response data viewing to ensure interface test accuracy

## DEMO

![Home Page](./demo/index.jpg)
![API Proxy Tester Demo](./demo/api.png)
![Global Setting](./demo/config.png)

## Project Structure

```
API-Proxy-Tester/
├── .env.example        # Environment variables configuration example file
├── .gitignore          # Git ignore file configuration
├── BUILD_CONFIG.md     # Build configuration documentation (Chinese)
├── BUILD_CONFIG_EN.md  # Build configuration documentation (English)
├── LICENSE             # License file
├── README.md           # Project documentation (Chinese)
├── README_EN.md        # Project documentation (English)
├── backend/            # Backend related files
│   └── api-test-worker.php
├── dist/               # Build output directory
├── index.html          # Entry HTML file
├── package-lock.json   # Dependency lock file
├── package.json        # Project configuration and dependencies
├── postcss.config.js   # PostCSS configuration
├── public/             # Static resources directory
│   └── demo/           # Demo images directory
│       ├── ai-coding.jpg
│       ├── api.jpg
│       ├── config.jpg
│       └── index.jpg
├── scripts/            # Script tools directory
│   ├── check-image-dimensions.js
│   └── process-images.js
├── src/                # Source code directory
│   ├── App.vue         # Root component
│   ├── assets/         # Resource files
│   ├── components/     # Vue components
│   │   ├── DynamicCodeDisplay.vue
│   │   ├── JsonEditor.vue
│   │   ├── forms/      # Form related components
│   │   │   └── ApiConfig.vue
│   │   ├── layout/     # Layout components
│   │   │   ├── AppFooter.vue
│   │   │   ├── AppHeader.vue
│   │   │   ├── RequestHistory.vue
│   │   │   └── Toast.vue
│   │   ├── modals/     # Modal components
│   │   │   ├── GlobalSettings.vue
│   │   │   ├── HelpModal.vue
│   │   │   └── StatusModal.vue
│   │   ├── response/   # Response related components
│   │   │   ├── DocumentPreview.vue
│   │   │   ├── RequestInfo.vue
│   │   │   └── ResponseInfo.vue
│   │   └── settings/   # Settings related components
│   │       └── DocumentConfig.vue
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
│   │   │   ├── forms.css
│   │   │   ├── header.css
│   │   │   ├── modals.css
│   │   │   └── response.css
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

4. Build production version:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run serve
   ```

## Advanced Build Configuration

The project supports flexible build configurations that can be customized according to different deployment requirements. For detailed configuration instructions, please refer to:

- [Build Configuration Documentation](./BUILD_CONFIG_EN.md)

Main build options include:

- Custom base path (default: `/tools/`)
- Custom output directory (default: `dist/`)
- Custom static assets directory (default: `assets`)
- Predefined build scripts (root path build, custom mode, etc.)
- Environment configuration file support

## Project Roadmap

### Completed Features
- [x] Basic API testing functionality (GET/POST/PUT/DELETE requests)
- [x] Request parameter configuration (global parameters, headers, body)
- [x] Response data viewing and formatting
- [x] Historical request record management
- [x] API documentation auto-generation (Markdown/HTML)
- [x] Parameter placeholder auto-replacement
- [x] Proxy request mode support

### Near-term Plans (v1.1 - v1.3)
- [ ] Mock service functionality: Quickly create mock API interfaces
- [ ] API test automation: Support test case writing and execution
- [ ] Team collaboration features: Support for multi-user shared testing environments
- [ ] Performance testing module: API stress testing and performance analysis
- [ ] Data comparison functionality: Compare response data across different API versions

### Mid-term Plans (v1.4 - v2.0)
- [ ] AI-powered interface analysis: Automatically identify interface parameters and data structures
- [ ] Code generator: Auto-generate API calling code in multiple languages
- [ ] Interface monitoring and alerting: Real-time monitoring of interface status with alerts
- [ ] Test report generation: Automatically generate detailed test reports
- [ ] Plugin system: Support custom plugin extensions

### Long-term Vision (v2.0+)
- [ ] AI-driven intelligent testing: Auto-generate test cases based on historical data and API documentation
- [ ] Natural language interface testing: Perform interface testing through natural language descriptions
- [ ] Intelligent documentation updates: Automatically detect interface changes and update documentation
- [ ] Predictive analytics: Predict interface performance and stability based on historical data

## AI Capability Integration Plan

### Current AI Applications
- Project fully developed by AI, using AI development tools such as Trace CN and Qorder
- AI-assisted code generation, debugging, and optimization

### Future AI Capability Expansion
1. **Intelligent Interface Analysis**
   - Automatically identify interface parameter types and data structures
   - AI-generated test cases based on API documentation
   - Intelligent recommendation of common parameter combinations

2. **Natural Language Processing**
   - Support interface testing through natural language descriptions
   - Intelligent parsing of API requirement documents to generate test configurations
   - Auto-generate API documentation summaries and explanations

3. **Intelligent Test Optimization**
   - Optimize testing strategies based on historical test data
   - Automatically identify API changes and remind to update test cases
   - Intelligent performance bottleneck prediction

4. **Code Generation and Optimization**
   - Auto-generate API calling code in multiple languages based on interfaces
   - AI-assisted code review and optimization suggestions
   - Intelligent refactoring recommendations

5. **Intelligent Collaboration**
   - AI-assisted team collaboration and knowledge sharing
   - Intelligent problem diagnosis and solution recommendations
   - Context-aware intelligent help system

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