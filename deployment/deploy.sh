#!/bin/bash

# 设置前端和后端的目录路径
FRONTEND_HOME="/home/jiachzha/github/project101/frontend"
BACKEND_HOME="/home/jiachzha/github/project101/backend"

# 检查当前目录是否为所需目录
CURRENT_DIR=$(pwd)
EXPECTED_DIR="/home/jiachzha/github/project101/"

if [ "$CURRENT_DIR" != "$EXPECTED_DIR" ]; then
  echo "当前目录不是 $EXPECTED_DIR，请进入该目录后再运行此脚本。"
  exit 1
fi

# 执行 git pull
git pull origin master

# 进入前端目录
cd "$FRONTEND_HOME" || exit

# 安装前端依赖并构建
npm install
npm run build
serve -s build

# 进入后端目录
cd "$BACKEND_HOME" || exit

# 安装后端依赖并启动
npm install
npm start




