#!/bin/bash

source common.sh

img_mvn="maven:3.3.3-jdk-8"                 # docker image of maven
m2_cache=~/.m2                              # the local maven cache dir

h2 '准备构建项目'

if which mvn ; then
    info '使用本地maven构建项目'
    mvn clean package -DskipTests
else
    info '使用maven镜像['$img_mvn']构建项目'
    docker run --rm \
        -v $m2_cache:/root/.m2 \
        -v $PROJECT_HOME:/usr/src/mymaven \
        -w /usr/src/mymaven \
        $img_mvn mvn clean package -DskipTests
fi
if [ $? -eq 0 ];then
    success '项目构建成功'
else
    error '项目构建失败'
    exit 1
fi

h2 '准备构建Docker镜像'

if [ ! -z $IMAGE_NAME ];then
    docker build --rm -t $IMAGE_NAME .
else
    docker build --rm -t $APP_NAME:v$VERSION .
fi
