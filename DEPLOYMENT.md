# AI 聊天框项目部署指南

## 🚀 部署步骤

### 1. 环境准备

#### 安装必要工具
```bash
# 安装 Node.js (推荐 v18+)
# 从 https://nodejs.org 下载安装

# 安装 Wrangler CLI
npm install -g wrangler

# 验证安装
wrangler --version
```

#### 创建账户和服务
1. 注册 [Cloudflare 账户](https://cloudflare.com)
2. 注册 [OpenAI 账户](https://platform.openai.com)并获取 API Key

### 2. 后端部署 (Cloudflare Workers)

```bash
cd server

# 1. 登录 Cloudflare
wrangler login

# 2. 创建 KV 命名空间
wrangler kv:namespace create "CHAT_STORAGE"
wrangler kv:namespace create "CHAT_STORAGE" --preview

# 3. 设置 OpenAI API Key
wrangler secret put OPENAI_API_KEY
# 在提示时输入您的 OpenAI API Key

# 4. 更新 wrangler.toml 中的 KV 命名空间 ID
# 将步骤2输出的 ID 替换到配置文件中

# 5. 安装依赖
npm install

# 6. 本地测试
npm run dev

# 7. 部署到生产环境
npm run deploy
```

部署成功后会得到 Worker URL，例如：
`https://ai-chat-box-server.your-subdomain.workers.dev`

### 3. 前端部署

#### 更新配置
编辑 `frontend/.env.production`：
```env
REACT_APP_GRAPHQL_ENDPOINT=https://your-worker-url.workers.dev/graphql
```

#### 构建和部署
```bash
cd frontend

# 1. 安装依赖
npm install

# 2. 构建生产版本
npm run build

# 3. 部署选项 A: Cloudflare Pages
wrangler pages publish build

# 3. 部署选项 B: Vercel
npm install -g vercel
vercel --prod

# 3. 部署选项 C: Netlify
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

## 📝 环境变量配置

### 后端环境变量 (Cloudflare Workers)
- `OPENAI_API_KEY` - OpenAI API 密钥
- `CHAT_STORAGE` - KV 命名空间绑定

### 前端环境变量
- `REACT_APP_GRAPHQL_ENDPOINT` - GraphQL API 端点

## 🔧 配置文件说明

### wrangler.toml
```toml
name = "ai-chat-box-server"
main = "src/index.ts"
compatibility_date = "2023-11-07"

[vars]
# 生产环境变量
# OPENAI_API_KEY 通过 wrangler secret 设置

[[kv_namespaces]]
binding = "CHAT_STORAGE"
id = "your-production-kv-id"
preview_id = "your-preview-kv-id"
```

## 🧪 测试部署

### 1. 测试后端 API
```bash
# 访问 GraphQL Playground
curl -X POST https://your-worker-url.workers.dev/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"query { chatHistory { id content role timestamp } }"}'
```

### 2. 测试前端应用
访问部署的前端 URL，测试以下功能：
- 发送消息
- 接收 AI 回复
- 清空对话
- 消息历史记录

## 🚨 常见部署问题

### 问题 1: OpenAI API 调用失败
**解决方案：**
- 检查 API Key 是否正确设置
- 确认 OpenAI 账户有足够余额
- 验证网络连接

### 问题 2: KV 存储访问失败
**解决方案：**
- 确认 KV 命名空间 ID 正确
- 检查 wrangler.toml 配置
- 验证 KV 绑定名称

### 问题 3: CORS 错误
**解决方案：**
- 更新后端 CORS 配置
- 添加前端域名到允许列表
- 检查请求头设置

### 问题 4: 前端无法连接后端
**解决方案：**
- 确认 GraphQL 端点 URL 正确
- 检查网络连接
- 验证后端服务运行状态

## 📊 监控和日志

### Cloudflare Workers 日志
```bash
# 实时查看日志
wrangler tail

# 查看特定时间段日志
wrangler tail --since 1h
```

### 性能监控
- 使用 Cloudflare Dashboard 查看 Worker 指标
- 监控 KV 读写操作
- 跟踪 OpenAI API 调用次数

## 🔄 持续部署

### GitHub Actions 示例
创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: |
          cd server
          npm install
      - name: Deploy to Cloudflare Workers
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          workingDirectory: 'server'

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install and build
        run: |
          cd frontend
          npm install
          npm run build
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: 'ai-chat-box-frontend'
          directory: 'frontend/build'
```

## 💡 优化建议

### 性能优化
- 启用 Cloudflare CDN
- 使用 HTTP/2 和 Brotli 压缩
- 优化图片和静态资源

### 成本优化
- 监控 OpenAI API 使用量
- 设置 KV 存储 TTL
- 使用 Cloudflare Workers 免费额度

### 安全优化
- 实现用户认证
- 添加 API 速率限制
- 使用 HTTPS 强制访问

部署完成后，您的 AI 聊天应用就可以在生产环境中使用了！🎉
