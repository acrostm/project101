#!/bin/bash

# 设置前端和后端的目录路径
FRONTEND_HOME="/home/jiachzha/github/project101/frontend"
BACKEND_HOME="/home/jiachzha/github/project101/backend"

# 检查当前目录是否为所需目录
CURRENT_DIR=$(pwd)

# 检查当前Shell类型
CURRENT_SHELL="$SHELL"

if [ "$CURRENT_SHELL" = "/bin/bash" ]; then
  echo "当前Shell是Bash:"
  # 在Bash中执行操作
  # 示例操作：输出Bash特定的信息

  # 执行 git pull
  git pull origin master

  # 进入前端目录
  cd "$FRONTEND_HOME" || exit
  npm install
  npm run build

  # 进入后端目录
  cd "$BACKEND_HOME" || exit
  npm install

  # 分别进入 screen 会话并启动服务
  screen -dmS frontend bash -c "npm start; exec bash"
  screen -dmS backend bash -c "npm start; exec bash"

elif [ "$CURRENT_SHELL" = "/usr/bin/zsh" ]; then
  echo "当前Shell是Zsh:"
  # 在Zsh中执行操作
  # 示例操作：输出Zsh特定的信息

  # 执行 git pull
  git pull origin master

  # 进入前端目录
  cd "$FRONTEND_HOME" || exit
  npm install
  npm run build

  # 进入后端目录
  cd "$BACKEND_HOME" || exit
  npm install

  # 分别进入 screen 会话并启动服务
  screen -dmS frontend bash -c "npm start; exec bash"
  screen -dmS backend bash -c "npm start; exec bash"

else
  echo "未知Shell: $CURRENT_SHELL"
fi

# 共同的操作
# 示例操作：输出通用信息
echo "通用操作:"
