# Nexyro 项目设置指南

## 📋 前置要求

- ✅ Node.js v18+ (已安装: v24.9.0)
- 需要注册以下服务账户：
  - Clerk (身份认证)
  - Neon Database (PostgreSQL 数据库)
  - Brevo (邮件服务)
  - Inngest (可选，后台任务)

---

## 🚀 设置步骤

### 步骤 1: 创建环境变量文件

#### 前端环境变量 (`client/.env`)

在 `client` 目录下创建 `.env` 文件：

```env
VITE_BASEURL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=你的_clerk_公钥
```

#### 后端环境变量 (`server/.env`)

在 `server` 目录下创建 `.env` 文件：

```env
# 数据库配置
DATABASE_URL=你的_neon_数据库连接字符串
DIRECT_URL=你的_neon_直接连接字符串

# Clerk 配置
CLERK_SECRET_KEY=你的_clerk_密钥

# 邮件服务配置
SMTP_USER=你的_brevo_smtp_用户名
SMTP_PASS=你的_brevo_smtp_密码
SENDER_EMAIL=你的_发件人邮箱

# 服务器配置
PORT=5000
```

---

### 步骤 2: 设置 Clerk (身份认证)

1. 访问 [Clerk Dashboard](https://dashboard.clerk.com)
2. 创建新应用或使用现有应用
3. 获取以下密钥：
   - **Publishable Key** → 用于前端 (`VITE_CLERK_PUBLISHABLE_KEY`)
   - **Secret Key** → 用于后端 (`CLERK_SECRET_KEY`)
4. 配置 Webhook（用于 Inngest 同步用户数据）：
   - Webhook URL: `https://your-domain.com/api/inngest`
   - 监听事件：`user.created`, `user.updated`, `user.deleted`, `organization.created`, `organization.updated`, `organization.deleted`, `organizationInvitation.accepted`

---

### 步骤 3: 设置 Neon Database

1. 访问 [Neon Database](https://neon.tech)
2. 创建新项目
3. 获取连接字符串：
   - **Connection String** → `DATABASE_URL`
   - **Direct Connection String** → `DIRECT_URL`
4. 复制连接字符串到 `server/.env`

---

### 步骤 4: 设置 Brevo (邮件服务)

1. 访问 [Brevo](https://www.brevo.com)
2. 注册账户并登录
3. 进入 SMTP 设置
4. 获取 SMTP 凭证：
   - **SMTP Server**: `smtp-relay.brevo.com`
   - **Port**: `587`
   - **Username** → `SMTP_USER`
   - **Password** → `SMTP_PASS`
5. 设置发件人邮箱 → `SENDER_EMAIL`

---

### 步骤 5: 设置 Inngest (可选)

1. 访问 [Inngest](https://www.inngest.com)
2. 创建账户
3. 创建新应用
4. 获取密钥（如果需要）

---

### 步骤 6: 安装依赖

#### 安装前端依赖

```bash
cd client
npm install
```

#### 安装后端依赖

```bash
cd server
npm install
```

---

### 步骤 7: 初始化数据库

```bash
cd server
npx prisma generate
npx prisma db push
```

---

### 步骤 8: 运行项目

#### 启动后端服务器

```bash
cd server
npm run server
# 或
npm start
```

后端将在 `http://localhost:5000` 运行

#### 启动前端应用

```bash
cd client
npm run dev
```

前端将在 `http://localhost:5173` 运行（Vite 默认端口）

---

## ✅ 验证清单

- [ ] Node.js 已安装
- [ ] 前端 `.env` 文件已创建并配置
- [ ] 后端 `.env` 文件已创建并配置
- [ ] Clerk 账户已设置，密钥已配置
- [ ] Neon Database 已创建，连接字符串已配置
- [ ] Brevo 账户已设置，SMTP 凭证已配置
- [ ] 前端依赖已安装
- [ ] 后端依赖已安装
- [ ] 数据库已初始化
- [ ] 后端服务器可以启动
- [ ] 前端应用可以启动

---

## 🔧 常见问题

### 1. 前端无法连接后端

- 检查 `VITE_BASEURL` 是否正确指向后端地址
- 确认后端服务器已启动
- 检查浏览器控制台的错误信息

### 2. 认证失败

- 确认 Clerk 密钥正确
- 检查前后端是否使用同一个 Clerk 应用
- 查看后端日志中的错误信息

### 3. 数据库连接失败

- 检查 `DATABASE_URL` 和 `DIRECT_URL` 是否正确
- 确认 Neon Database 项目已创建
- 检查网络连接

### 4. 邮件发送失败

- 检查 Brevo SMTP 凭证是否正确
- 确认发件人邮箱已验证
- 查看后端日志中的错误信息

---

## 📝 下一步

设置完成后，你可以：
1. 访问前端应用 `http://localhost:5173`
2. 使用 Clerk 登录
3. 创建或加入工作空间
4. 开始使用项目管理功能

