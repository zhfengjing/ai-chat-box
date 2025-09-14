#!/bin/bash

# AI 聊天框项目快速启动脚本

echo "🚀 AI 聊天框项目快速启动"
echo "========================="

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js (https://nodejs.org)"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"

# 检查是否在项目根目录
if [ ! -d "frontend" ] || [ ! -d "server" ]; then
    echo "❌ 请在项目根目录运行此脚本"
    exit 1
fi

echo ""
echo "🔧 安装依赖..."

# 安装前端依赖
echo "📦 安装前端依赖..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ 前端依赖安装失败"
    exit 1
fi
cd ..

# 安装后端依赖
echo "📦 安装后端依赖..."
cd server
npm install
if [ $? -ne 0 ]; then
    echo "❌ 后端依赖安装失败"
    exit 1
fi
cd ..

echo ""
echo "✅ 依赖安装完成！"
echo ""
echo "📋 下一步操作："
echo "1. 配置 OpenAI API Key:"
echo "   cd server && wrangler secret put OPENAI_API_KEY"
echo ""
echo "2. 创建 KV 命名空间:"
echo "   cd server && wrangler kv:namespace create \"CHAT_STORAGE\""
echo "   cd server && wrangler kv:namespace create \"CHAT_STORAGE\" --preview"
echo ""
echo "3. 更新 server/wrangler.toml 中的 KV 命名空间 ID"
echo ""
echo "4. 启动开发服务器:"
echo "   # 后端 (新终端窗口)"
echo "   cd server && npm run dev"
echo ""
echo "   # 前端 (新终端窗口)"
echo "   cd frontend && npm start"
echo ""
echo "🌟 更多详细说明请查看 README.md 和 GETTING_STARTED.md"
