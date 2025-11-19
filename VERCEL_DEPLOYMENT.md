# Vercel 部署指南

## 🔧 环境变量配置

在 Vercel 项目设置中，必须配置以下环境变量：

### 必需的环境变量

1. **VITE_CLERK_PUBLISHABLE_KEY**
   - 值：你的 Clerk Publishable Key
   - 例如：`pk_test_...`

2. **VITE_BASEURL**
   - 值：后端 API 的 URL
   - 如果后端也部署在 Vercel：使用 Vercel 提供的后端 URL
   - 如果后端部署在其他地方：使用完整的后端 URL（例如：`https://your-backend.railway.app`）
   - 本地开发：`http://localhost:5000`

## 📝 配置步骤

### 在 Vercel 中配置环境变量：

1. 登录 Vercel Dashboard
2. 选择你的项目
3. 进入 **Settings** → **Environment Variables**
4. 添加以下变量：

```
VITE_CLERK_PUBLISHABLE_KEY = pk_test_cHJpbWFyeS1yb2RlbnQtMjIuY2xlcmsuYWNjb3VudHMuZGV2JA
VITE_BASEURL = https://your-backend-url.com
```

5. 点击 **Save**
6. 重新部署项目（Redeploy）

## 🚀 后端部署选项

### 选项 1：部署到 Railway（推荐）

1. 访问 [Railway](https://railway.app)
2. 创建新项目
3. 连接 GitHub 仓库
4. 选择 `server` 目录作为根目录
5. 配置环境变量：
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `CLERK_SECRET_KEY`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `SENDER_EMAIL`
   - `PORT=5000`
6. 部署后，复制 Railway 提供的 URL
7. 在 Vercel 中设置 `VITE_BASEURL` 为这个 URL

### 选项 2：部署到 Render

1. 访问 [Render](https://render.com)
2. 创建新的 Web Service
3. 连接 GitHub 仓库
4. 设置：
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. 配置环境变量（同上）
6. 部署后，复制 Render 提供的 URL

### 选项 3：Vercel Serverless Functions

需要将后端代码转换为 Vercel Serverless Functions 格式。

## 🔍 故障排除

### Internal Server Error

1. **检查环境变量**：
   - 确认 `VITE_CLERK_PUBLISHABLE_KEY` 已设置
   - 确认 `VITE_BASEURL` 已设置且正确

2. **检查后端连接**：
   - 确认后端服务器正在运行
   - 确认 `VITE_BASEURL` 指向正确的后端地址
   - 检查后端 CORS 配置

3. **查看 Vercel 日志**：
   - 在 Vercel Dashboard 中查看部署日志
   - 检查运行时错误

4. **检查浏览器控制台**：
   - 打开浏览器开发者工具
   - 查看 Console 和 Network 标签
   - 查找错误信息

### 常见错误

- **Missing Publishable Key**: 未设置 `VITE_CLERK_PUBLISHABLE_KEY`
- **Network Error**: `VITE_BASEURL` 不正确或后端未运行
- **CORS Error**: 后端 CORS 配置问题

## ✅ 验证清单

- [ ] 环境变量已配置
- [ ] 后端已部署并运行
- [ ] `VITE_BASEURL` 指向正确的后端地址
- [ ] Clerk 密钥已配置
- [ ] 项目已重新部署

