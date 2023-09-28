#!/bin/bash

# 设置前端和后端的目录路径
FRONTEND_HOME="/home/jiachzha/github/project101/frontend"
BACKEND_HOME="/home/jiachzha/github/project101/backend"

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
  screen -ls | grep Detached | cut -d. -f1 | awk '{print $1}' | xargs -I {} screen -X -S {} quit
  screen -dmS frontend serve -S build

  # 进入后端目录
  cd "$BACKEND_HOME" || exit
  npm install
  screen -dmS backend npm start


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
  screen -ls | grep Detached | cut -d. -f1 | awk '{print $1}' | xargs -I {} screen -X -S {} quit
  screen -dmS frontend serve -S build

  # 进入后端目录
  cd "$BACKEND_HOME" || exit
  npm install
  screen -dmS backend npm start

else
  echo "未知Shell: $CURRENT_SHELL"
fi
