# 快速开始指南

## 前置要求

1. Node.js (版本 16 或更高)
2. npm 或 yarn
3. OpenAI API Key
4. Cloudflare 账户

## 设置步骤

### 1. 安装 Wrangler CLI
```bash
npm install -g wrangler
```

### 2. 登录 Cloudflare
```bash
wrangler login
```

### 3. 创建 KV 命名空间
```bash
cd server
wrangler kv namespace create "CHAT_STORAGE"
wrangler kv namespace create "CHAT_STORAGE" --preview
```

### 4. 设置 OpenAI API Key
```bash
wrangler secret put OPENAI_API_KEY
# 输入您的 OpenAI API Key
```

### 5. 更新配置文件
编辑 `server/wrangler.toml`，替换 KV 命名空间 ID

### 6. 安装依赖并启动开发服务器
```bash
# 后端
cd server
npm install
npm run dev

# 前端 (新终端窗口)
cd ../frontend
npm install
npm start
```

### 7. 访问应用
前端：http://localhost:3000
后端 GraphQL Playground：http://localhost:8787/graphql

## 部署到生产环境

### 部署后端
```bash
cd server
npm run deploy
```

### 部署前端
```bash
cd frontend
npm run build
# 将 build 文件夹内容部署到您的静态托管服务
```

## 环境变量配置

记得更新前端的 GraphQL 端点为您的生产 Worker URL：
```
REACT_APP_GRAPHQL_ENDPOINT=https://your-worker.your-subdomain.workers.dev/graphql
```
