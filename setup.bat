@echo off
title AI 聊天框项目快速启动

echo 🚀 AI 聊天框项目快速启动
echo =========================

REM 检查 Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js 未安装，请先安装 Node.js (https://nodejs.org)
    pause
    exit /b 1
)

echo ✅ Node.js 已安装

REM 检查是否在项目根目录
if not exist "frontend" (
    echo ❌ 请在项目根目录运行此脚本
    pause
    exit /b 1
)

if not exist "server" (
    echo ❌ 请在项目根目录运行此脚本
    pause
    exit /b 1
)

echo.
echo 🔧 安装依赖...

REM 安装前端依赖
echo 📦 安装前端依赖...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ 前端依赖安装失败
    pause
    exit /b 1
)
cd ..

REM 安装后端依赖
echo 📦 安装后端依赖...
cd server
call npm install
if %errorlevel% neq 0 (
    echo ❌ 后端依赖安装失败
    pause
    exit /b 1
)
cd ..

echo.
echo ✅ 依赖安装完成！
echo.
echo 📋 下一步操作：
echo 1. 配置 OpenAI API Key:
echo    cd server ^&^& wrangler secret put OPENAI_API_KEY
echo.
echo 2. 创建 KV 命名空间:
echo    cd server ^&^& wrangler kv:namespace create "CHAT_STORAGE"
echo    cd server ^&^& wrangler kv:namespace create "CHAT_STORAGE" --preview
echo.
echo 3. 更新 server/wrangler.toml 中的 KV 命名空间 ID
echo.
echo 4. 启动开发服务器:
echo    # 后端 (新命令行窗口)
echo    cd server ^&^& npm run dev
echo.
echo    # 前端 (新命令行窗口)
echo    cd frontend ^&^& npm start
echo.
echo 🌟 更多详细说明请查看 README.md 和 GETTING_STARTED.md

pause
