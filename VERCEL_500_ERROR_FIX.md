# Vercel 500 Internal Server Error 修复指南

## 🔍 问题诊断

如果遇到 `GET https://nexoraofficial.vercel.app/ 500 (Internal Server Error)`，请按以下步骤检查：

## ✅ 步骤 1：检查 Vercel 项目设置

### 1.1 设置根目录（重要！）

在 Vercel Dashboard 中：

1. 进入项目 → **Settings** → **General**
2. 找到 **Root Directory** 设置
3. **不要设置根目录**（留空），或者设置为项目根目录 `/`
4. Vercel 会根据 `vercel.json` 中的配置自动处理

### 1.2 检查构建配置

在 **Settings** → **Build & Development Settings**：

- **Framework Preset**: 应该自动检测为 "Other" 或 "Vite"
- **Build Command**: `cd client && npm install && npm run build`（已在 vercel.json 中配置）
- **Output Directory**: `client/dist`（已在 vercel.json 中配置）
- **Install Command**: `cd client && npm install`（已在 vercel.json 中配置）

## ✅ 步骤 2：配置环境变量（必需）

在 **Settings** → **Environment Variables** 中添加：

```
VITE_CLERK_PUBLISHABLE_KEY = pk_test_cHJpbWFyeS1yb2RlbnQtMjIuY2xlcmsuYWNjb3VudHMuZGV2JA
VITE_BASEURL = http://localhost:5000
```

**重要**：
- 环境变量名称必须以 `VITE_` 开头
- 添加后，**必须重新部署**才能生效

## ✅ 步骤 3：检查构建日志

1. 进入 **Deployments** 标签
2. 点击最新的部署
3. 查看 **Build Logs**
4. 查找错误信息

### 常见构建错误：

- **"Missing VITE_CLERK_PUBLISHABLE_KEY"**: 环境变量未设置
- **"Command failed"**: 构建命令执行失败
- **"Module not found"**: 依赖安装问题

## ✅ 步骤 4：检查运行时日志

1. 在部署详情页面
2. 查看 **Runtime Logs** 或 **Function Logs**
3. 查找 500 错误的具体原因

## 🔧 解决方案

### 方案 A：使用 Vercel CLI 本地测试

```bash
# 安装 Vercel CLI
npm i -g vercel

# 在项目根目录运行
vercel

# 按照提示操作
```

### 方案 B：手动指定项目结构

如果自动检测失败，在 Vercel Dashboard 中：

1. **Settings** → **Build & Development Settings**
2. 手动设置：
   - **Root Directory**: 留空或 `/`
   - **Build Command**: `cd client && npm install && npm run build`
   - **Output Directory**: `client/dist`
   - **Install Command**: `cd client && npm install`

### 方案 C：创建独立的 Vercel 项目

如果 monorepo 结构导致问题：

1. 在 GitHub 中创建一个新分支，只包含 `client` 目录
2. 在 Vercel 中创建新项目，连接到这个分支
3. 或者使用 Vercel 的 Monorepo 支持

## 🚨 如果仍然失败

### 检查清单：

- [ ] 环境变量已配置（`VITE_CLERK_PUBLISHABLE_KEY`）
- [ ] 环境变量已重新部署
- [ ] 构建日志中没有错误
- [ ] `client/dist` 目录存在且包含文件
- [ ] `vercel.json` 配置正确
- [ ] 没有重复的 `vercel.json` 文件

### 获取详细错误信息：

1. 在浏览器中打开开发者工具（F12）
2. 查看 **Console** 标签的错误
3. 查看 **Network** 标签，点击失败的请求，查看响应内容

### 联系支持：

如果以上方法都不行，请提供：
- Vercel 构建日志的完整输出
- 浏览器控制台的错误信息
- `vercel.json` 文件内容
- 环境变量配置截图（隐藏敏感值）

## 📝 当前配置

当前 `vercel.json` 配置：

```json
{
  "buildCommand": "cd client && npm install && npm run build",
  "outputDirectory": "client/dist",
  "installCommand": "cd client && npm install",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

这个配置应该可以工作。如果仍然失败，问题可能在：
1. 环境变量未正确加载
2. Vercel 项目设置中的根目录配置
3. 构建过程中的某个步骤失败

