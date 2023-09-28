#!/bin/bash

# 设置前端和后端的目录路径
FRONTEND_HOME="/home/jiachzha/github/project101/frontend"
BACKEND_HOME="/home/jiachzha/github/project101/backend"

if [ "$CURRENT_SHELL" = "/bin/bash" ]; then
  echo "当前Shell是Bash:"
  # 在Bash中执行操作
  # 示例操作：输出Bash特定的信息

  # 执行 git pull
  echo "> Running git pull [responsitory: acrostm/project101, branch: master] ------------------"
  git pull origin master

  # 进入前端目录
  cd "$FRONTEND_HOME" || exit
  echo "> Entered $(PWD) /\ Running npm install -------------------------------------------------"
  npm install
  echo "> Running npm run build -----------------------------------------------------------------"
  npm run build
  echo "> cleaning detached screen --------------------------------------------------------------"
  screen -ls | grep Detached | cut -d. -f1 | awk '{print $1}' | xargs -I {} screen -X -S {} quit
  screen -dmS frontend serve -S build

  # 进入后端目录
  cd "$BACKEND_HOME" || exit
  echo "> Entered $(PWD) /\ Running npm install -------------------------------------------------"
  npm install
  screen -dmS backend npm start


elif [ "$CURRENT_SHELL" = "/usr/bin/zsh" ]; then
  echo "当前Shell是Zsh:"
  # 在Zsh中执行操作
  # 示例操作：输出Zsh特定的信息

  # 执行 git pull
  echo "> Running git pull [responsitory: acrostm/project101, branch: master] ------------------"
  git pull origin master

  # 进入前端目录
  cd "$FRONTEND_HOME" || exit
  echo "> Entered $(PWD) /\ Running npm install -------------------------------------------------"
  npm install
  echo "> Running npm run build -----------------------------------------------------------------"
  npm run build
  echo "> cleaning detached screen --------------------------------------------------------------"
  screen -ls | grep Detached | cut -d. -f1 | awk '{print $1}' | xargs -I {} screen -X -S {} quit
  screen -dmS frontend serve -S build

  # 进入后端目录
  cd "$BACKEND_HOME" || exit
  echo "> Entered $(PWD) /\ Running npm install -------------------------------------------------"
  npm install
  screen -dmS backend npm start

  echo "> React and Express service started /\ turn to https:www.jiachzha.top to check it out!"
else
  echo "未知Shell: $CURRENT_SHELL"
fi
