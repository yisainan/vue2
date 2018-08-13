#!/usr/bin/env sh
#如果指令传回值不等于0，则立即退出shell。
set -e
echo "Enter release version: "
read VERSION

# 打印 "Release $VERSION - are you sure? (y/n)"，只读取一个字符，并且允许输入反斜杠
read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  #build
  VERSION=$VERSION npm run build

  #commit
  git add -A
  git commit -m "[build] $VERSION"
  npm version $VERSION --message "[release] $VERSION"

  #publish
  git push origin refs/tags/v$VERSION
  git push
  npm publish

  #deploy
  bash ./build/gh-pages.sh
fi