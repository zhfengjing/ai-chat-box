# Wrangler.toml 完整配置指南

## 基础配置属性

### 项目基本信息
```toml
# Worker 名称（必须）
name = "my-worker"

# 入口文件路径
main = "src/index.js"
# 或者 TypeScript
# main = "src/index.ts"

# 兼容性日期（重要：影响 Workers Runtime API）
compatibility_date = "2023-05-18"

# 兼容性标志
compatibility_flags = ["nodejs_compat"]

# 账户 ID（可选，通常从环境或认证中获取）
account_id = "your-account-id"
```

### 构建配置
```toml
# 构建配置
[build]
command = "npm run build"
cwd = "."
watch_dir = "src"

# 上传配置
[upload]
format = "modules"
dir = "dist"
main = "./index.js"
```

### 路由配置
```toml
# 路由模式（推荐用于生产环境）
routes = [
  { pattern = "api.example.com/*", zone_name = "example.com" },
  { pattern = "example.com/api/*", zone_name = "example.com" }
]

# 或者使用自定义域名
routes = ["api.example.com/*"]

# Workers 开发域名（开发使用）
# 会自动分配 your-worker.your-subdomain.workers.dev
```

## 环境变量配置

### 普通变量
```toml
# 全局变量（不推荐，因为环境不会继承）
[vars]
API_VERSION = "v1"
DEBUG = "false"

# 正确的方式：为每个环境单独配置
[env.development.vars]
NODE_ENV = "development"
API_URL = "http://localhost:3000"
DEBUG = "true"
LOG_LEVEL = "debug"

[env.production.vars]
NODE_ENV = "production"
API_URL = "https://api.example.com"
DEBUG = "false"
LOG_LEVEL = "error"
```

### 敏感信息（Secrets）
```toml
# 注意：secrets 不在 toml 中配置，而是通过命令行设置
# wrangler secret put SECRET_NAME --env production
```

## 存储服务配置

### KV 存储
```toml
# 全局 KV（不推荐）
[[kv_namespaces]]
binding = "MY_KV"
id = "global-kv-id"

# 环境特定 KV 配置（推荐）
[env.development]
[[env.development.kv_namespaces]]
binding = "CACHE"
id = "dev-cache-namespace-id"
preview_id = "dev-preview-cache-id"

[env.production]
[[env.production.kv_namespaces]]
binding = "CACHE"
id = "prod-cache-namespace-id"
```

### D1 数据库
```toml
[env.development]
[[env.development.d1_databases]]
binding = "DB"
database_name = "my-app-dev"
database_id = "dev-database-id"

[env.production]
[[env.production.d1_databases]]
binding = "DB"
database_name = "my-app-prod"
database_id = "prod-database-id"
```

### R2 对象存储
```toml
[env.development]
[[env.development.r2_buckets]]
binding = "UPLOADS"
bucket_name = "my-app-uploads-dev"

[env.production]
[[env.production.r2_buckets]]
binding = "UPLOADS"
bucket_name = "my-app-uploads-prod"
```

### Durable Objects
```toml
[[durable_objects.bindings]]
name = "CHAT_ROOM"
class_name = "ChatRoom"

# 环境特定配置
[env.production]
[[env.production.durable_objects.bindings]]
name = "CHAT_ROOM"
class_name = "ChatRoom"
script_name = "chat-room-worker"
```

## 服务绑定
```toml
# Service 绑定（调用其他 Workers）
[env.development]
[[env.development.services]]
binding = "AUTH_SERVICE"
service = "auth-worker-dev"

[env.production]
[[env.production.services]]
binding = "AUTH_SERVICE"
service = "auth-worker-prod"
```

## 高级配置

### Cron 触发器
```toml
[triggers]
crons = [
  "0 0 * * *",      # 每日午夜
  "*/15 * * * *"    # 每15分钟
]
```

### 资源限制
```toml
# CPU 限制（毫秒）
cpu_ms = 50

# 内存限制（MB）
memory_mb = 128
```

### 安全配置
```toml
# 内容安全策略
[placement]
mode = "smart"

# 日志配置
[observability]
enabled = true
```

## 环境区分最佳实践

### 完整的多环境配置示例
```toml
name = "my-api-worker"
main = "src/index.ts"
compatibility_date = "2023-05-18"
compatibility_flags = ["nodejs_compat"]

# 开发环境配置
[env.development]
# 环境变量
[env.development.vars]
NODE_ENV = "development"
API_BASE_URL = "http://localhost:8000"
CORS_ORIGIN = "http://localhost:3000,http://localhost:5173"
LOG_LEVEL = "debug"
RATE_LIMIT = "1000"

# 数据库
[[env.development.d1_databases]]
binding = "DB"
database_name = "myapp_dev"
database_id = "dev-db-uuid"

# KV 存储
[[env.development.kv_namespaces]]
binding = "CACHE"
id = "dev-cache-uuid"

# R2 存储
[[env.development.r2_buckets]]
binding = "UPLOADS"
bucket_name = "myapp-uploads-dev"

# 测试环境配置
[env.staging]
[env.staging.vars]
NODE_ENV = "staging"
API_BASE_URL = "https://staging-api.example.com"
CORS_ORIGIN = "https://staging.example.com"
LOG_LEVEL = "info"
RATE_LIMIT = "500"

# 路由配置
routes = [
  { pattern = "staging-api.example.com/*", zone_name = "example.com" }
]

[[env.staging.d1_databases]]
binding = "DB"
database_name = "myapp_staging"
database_id = "staging-db-uuid"

[[env.staging.kv_namespaces]]
binding = "CACHE"
id = "staging-cache-uuid"

# 生产环境配置
[env.production]
[env.production.vars]
NODE_ENV = "production"
API_BASE_URL = "https://api.example.com"
CORS_ORIGIN = "https://example.com,https://www.example.com"
LOG_LEVEL = "error"
RATE_LIMIT = "200"

# 生产路由
routes = [
  { pattern = "api.example.com/*", zone_name = "example.com" },
  { pattern = "example.com/api/*", zone_name = "example.com" }
]

[[env.production.d1_databases]]
binding = "DB"
database_name = "myapp_production"
database_id = "prod-db-uuid"

[[env.production.kv_namespaces]]
binding = "CACHE"
id = "prod-cache-uuid"

[[env.production.r2_buckets]]
binding = "UPLOADS"
bucket_name = "myapp-uploads-prod"

# 定时任务
[env.production.triggers]
crons = ["0 2 * * *"]  # 每日凌晨2点执行
```

## 重要注意事项

### 1. 环境变量继承问题
```toml
# ❌ 错误：顶级 vars 不会被环境继承
[vars]
GLOBAL_VAR = "value"

[env.production]
# production 环境访问不到 GLOBAL_VAR

# ✅ 正确：每个环境单独配置
[env.development.vars]
APP_ENV = "development"
GLOBAL_VAR = "dev_value"

[env.production.vars]
APP_ENV = "production"  
GLOBAL_VAR = "prod_value"
```

### 2. 敏感信息管理
```bash
# 为不同环境设置 secrets
wrangler secret put DATABASE_PASSWORD --env development
wrangler secret put DATABASE_PASSWORD --env production
wrangler secret put JWT_SECRET --env production
```

### 3. 数据库迁移注意
```toml
# 确保每个环境使用独立的数据库
[[env.development.d1_databases]]
binding = "DB"
database_name = "app_dev"      # 不同的数据库名
database_id = "dev-uuid"

[[env.production.d1_databases]]
binding = "DB"
database_name = "app_prod"     # 不同的数据库名
database_id = "prod-uuid"
```

### 4. 部署命令
```bash
# 部署到不同环境
wrangler deploy                    # 默认环境
wrangler deploy --env development  # 开发环境
wrangler deploy --env staging      # 测试环境  
wrangler deploy --env production   # 生产环境

# 本地开发
wrangler dev                       # 默认环境
wrangler dev --env development     # 开发环境配置
```

### 5. 配置验证
```bash
# 验证配置
wrangler whoami                    # 确认账户
wrangler kv namespace list         # 检查 KV namespaces
wrangler d1 list                   # 检查数据库
wrangler secret list --env production  # 检查生产环境 secrets
```

### 6. 常见错误避免
- **不要在代码中硬编码环境相关配置**
- **确保 compatibility_date 与使用的 API 匹配**
- **测试环境使用真实但隔离的数据**
- **生产环境路由配置要准确**
- **定期更新依赖和兼容性设置**

这样配置可以确保各个环境独立运行，避免配置冲突，并且便于维护和部署。