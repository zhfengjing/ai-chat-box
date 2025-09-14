# AI 聊天框项目

这是一个基于 React + TypeScript + GraphQL 的 AI 聊天应用，前端使用现代化的聊天界面，后端部署在 Cloudflare Workers 上，集成了 OpenAI API。

## 项目结构

```
ai-chat-box/
├── frontend/                 # React + TypeScript 前端
│   ├── src/
│   │   ├── components/       # React 组件
│   │   ├── graphql/         # GraphQL 查询和客户端配置
│   │   ├── types/           # TypeScript 类型定义
│   │   └── ...
│   ├── public/
│   └── package.json
├── server/                   # Cloudflare Workers 后端
│   ├── src/
│   │   ├── index.ts         # Worker 入口文件
│   │   ├── schema.ts        # GraphQL Schema 定义
│   │   ├── resolvers.ts     # GraphQL 解析器
│   │   ├── openai.ts        # OpenAI API 集成
│   │   ├── storage.ts       # 数据存储服务
│   │   └── types.ts         # TypeScript 类型
│   ├── wrangler.toml        # Cloudflare Workers 配置
│   └── package.json
└── README.md
```

## 功能特性

### 前端功能
- 🎨 现代化的聊天界面设计
- 💬 实时消息发送和接收
- 🔄 消息状态指示器（发送中、已发送）
- 🗑️ 清空对话功能
- 📱 响应式设计，适配移动端
- ⌨️ 支持 Enter 发送消息
- 🎯 TypeScript 类型安全

### 后端功能
- 🚀 部署在 Cloudflare Workers 上
- 🔗 GraphQL API 接口
- 🤖 集成 OpenAI GPT-3.5-turbo
- 💾 基于 Cloudflare KV 的消息存储
- 🌐 CORS 支持
- 🛡️ 错误处理和异常管理

## 快速开始

### 1. 安装依赖

**前端：**
```bash
cd frontend
npm install
```

**后端：**
```bash
cd server
npm install
```

### 2. 配置环境变量

**前端环境变量 (frontend/.env)：**
```
REACT_APP_GRAPHQL_ENDPOINT=http://localhost:8787/graphql
```

**后端环境变量 (server/wrangler.toml)：**
```toml
[vars]
OPENAI_API_KEY = "your-openai-api-key"

[[kv_namespaces]]
binding = "CHAT_STORAGE"
id = "your-kv-namespace-id"
preview_id = "your-preview-kv-namespace-id"
```

### 3. 开发环境运行

**启动后端服务：**
```bash
cd server
npm run dev
```
服务将在 http://localhost:8787 启动

**启动前端应用：**
```bash
cd frontend
npm start
```
应用将在 http://localhost:3000 启动

### 4. 生产环境部署

**部署后端到 Cloudflare Workers：**
```bash
cd server
npm run deploy
```

**构建前端应用：**
```bash
cd frontend
npm run build
```

## 配置说明

### Cloudflare Workers 配置

1. **创建 KV 命名空间：**
```bash
wrangler kv:namespace create "CHAT_STORAGE"
wrangler kv:namespace create "CHAT_STORAGE" --preview
```

2. **设置环境变量：**
```bash
wrangler secret put OPENAI_API_KEY
```

3. **更新 wrangler.toml 配置文件**

### OpenAI API 配置

1. 在 [OpenAI 官网](https://platform.openai.com/) 创建账户
2. 获取 API Key
3. 设置为环境变量或 Cloudflare Workers Secret

## GraphQL API 文档

### 查询 (Queries)

**获取聊天历史：**
```graphql
query GetChatHistory($limit: Int, $sessionId: String) {
  chatHistory(limit: $limit, sessionId: $sessionId) {
    id
    content
    role
    timestamp
  }
}
```

**获取单条消息：**
```graphql
query GetMessage($id: ID!) {
  message(id: $id) {
    id
    content
    role
    timestamp
  }
}
```

### 变更 (Mutations)

**发送消息：**
```graphql
mutation SendMessage($message: String!, $sessionId: String) {
  sendMessage(message: $message, sessionId: $sessionId) {
    id
    content
    role
    timestamp
  }
}
```

**清空对话：**
```graphql
mutation ClearChat($sessionId: String) {
  clearChat(sessionId: $sessionId)
}
```

## 技术栈

### 前端技术栈
- **React 18** - 用户界面框架
- **TypeScript** - 类型安全的 JavaScript
- **Apollo Client** - GraphQL 客户端
- **Tailwind CSS** - 原子化 CSS 框架
- **Heroicons** - 图标库

### 后端技术栈
- **Cloudflare Workers** - 边缘计算平台
- **GraphQL Yoga** - GraphQL 服务器
- **TypeScript** - 类型安全
- **Cloudflare KV** - 键值存储
- **OpenAI API** - AI 对话能力

## 开发指南

### 添加新功能

1. **前端添加新组件：**
   - 在 `frontend/src/components/` 创建组件
   - 更新类型定义 `frontend/src/types/`
   - 添加 GraphQL 查询 `frontend/src/graphql/queries.ts`

2. **后端添加新 API：**
   - 更新 Schema `server/src/schema.ts`
   - 添加解析器 `server/src/resolvers.ts`
   - 更新类型定义 `server/src/types.ts`

### 调试建议

1. **前端调试：**
   - 使用 React DevTools
   - 检查 Apollo Client DevTools
   - 查看浏览器控制台

2. **后端调试：**
   - 使用 `wrangler tail` 查看日志
   - 检查 Cloudflare Workers 仪表板
   - 验证环境变量配置

## 常见问题

### Q: OpenAI API 调用失败
A: 检查 API Key 是否正确设置，账户余额是否充足

### Q: KV 存储无法访问
A: 确认 KV 命名空间 ID 配置正确，绑定名称匹配

### Q: CORS 错误
A: 检查服务端 CORS 配置，确保前端域名在允许列表中

### Q: 前端无法连接后端
A: 确认 GraphQL 端点 URL 配置正确

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 联系方式

如有问题，请通过 GitHub Issues 联系。
