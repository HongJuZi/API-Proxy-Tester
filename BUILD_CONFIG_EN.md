# Build Configuration Documentation

This document describes how to customize build output paths and base directories in the API-Proxy-Tester project through different parameter configurations.

## Environment Variable Configuration

The project supports customization of the following build parameters through environment variables:

- `VITE_BASE_DIR`: The base path of the application, default is `/tools/`
- `VITE_OUT_DIR`: Packaging output directory, default is `dist/`
- `VITE_ASSETS_DIR`: Static assets directory, default is `assets`

## Usage Methods

### Method 1: Using Predefined npm Scripts

The project has configured several commonly used build scripts in `package.json`:

```bash
# Default build (base: /tools/, outDir: dist/)
npm run build

# Root path build (base: /, outDir: dist-root/)
npm run build:root

# Custom mode build (can be configured through .env.custom file)
npm run build:custom

# Specific parameter build (base: /custom/, outDir: dist-custom/, assetsDir: static)
npm run build:specific
```

### Method 2: Directly Specify Environment Variables

You can directly specify environment variables when running the build command:

```bash
# Custom base path and output directory
VITE_BASE_DIR=/api/ VITE_OUT_DIR=dist-api/ npm run build

# Custom assets directory
VITE_ASSETS_DIR=static-files npm run build

# Complete customization
VITE_BASE_DIR=/test/ VITE_OUT_DIR=dist-test/ VITE_ASSETS_DIR=test-assets npm run build
```

### Method 3: Using Environment Configuration Files

You can create different `.env` files to store configurations for different environments:

1. Create `.env` file - applies to all environments
2. Create `.env.production` - only used for production environment builds
3. Create `.env.development` - only used for development environment
4. Create custom environment files such as `.env.custom`

Define variables in the environment file:
```
VITE_BASE_DIR=/custom-base/
VITE_OUT_DIR=custom-dist/
VITE_ASSETS_DIR=custom-assets
```

Then run with the corresponding mode:
```bash
# Use custom environment configuration
npm run build -- --mode custom
```

## Preview Deployment

After building, you can use the preview command to view the effect:

```bash
# Default preview
npm run serve

# Root path preview
npm run serve:root
```

Or directly specify environment variables for preview:

```bash
VITE_BASE_DIR=/your-base/ npm run serve
```

## Notes

1. Ensure `VITE_BASE_DIR` starts and ends with `/`, such as `/api/` instead of `api`
2. The build output directory will be created automatically, and if the directory already exists, it will be overwritten
3. During actual deployment, ensure the server configuration correctly points to the build output directory
4. When using environment files, variable names must start with `VITE_` to be correctly recognized by Vite

## Example Scenarios

### Scenario 1: Deploy to Website Root Directory

```bash
npm run build:root
```

### Scenario 2: Deploy to Subpath

```bash
VITE_BASE_DIR=/api-tester/ npm run build
```

### Scenario 3: Using Custom Assets Directory

```bash
VITE_ASSETS_DIR=resources npm run build
```