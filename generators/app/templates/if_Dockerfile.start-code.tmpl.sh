#!/bin/bash
cd `dirname $0`

source ./common.sh

#----------------- 参数提取 start -----------------#
output_log=
build=
port=8080
version='latest'
custom_mvn_args=

while getopts lbp:v: opt
do
    case $opt in
        l)
            output_log=true
            ;;
        b)
            build=true
            ;;
        p)
            port=$OPTARG
            ;;
        v)
            version=$OPTARG
            ;;
       c)
            version=$CUSTOM_MVN_ARGS
            ;;
        ?)
            error "Usage: %s: [-b] [-l] [-p port] [-v version] args\n" $0
            exit 2
            ;;
    esac
done
#----------------- 参数提取 end -----------------#

#----------------- 启动逻辑 start -----------------#
project_name='${artifactId}'

proj_home=$PWD                              # the project root dir
img_output=$project_name:$version          # output image tag
container_name=$project_name                  # container name

h1 '准备启动应用'$project_name'（基于Docker）'

if [ ! -z $build ];then
    APP_NAME=$project_name \
    VERSION=$version \
   if [ ! -z $proj_home ];then
        PROJECT_HOME=$proj_home \
    fi
    if [ ! -z $img_output ];then
        IMAGE_NAME=$img_output \
    fi
    if [ ! -z $custom_mvn_args ];then
        CUSTOM_MVN_ARGS=$custom_mvn_args \
    fi
    sh build.sh

    if [ $? -eq 0 ];then
        success '镜像构建成功'
    else
        error '镜像构建失败'
        exit 2
    fi
fi

info '删除已存在的容器' && docker rm -f $container_name

info '准备启动docker容器'

CONTAINER_NAME=$container_name \
PORT=$port \
IMG_NAME=$img_output \
sh run.sh

if [ $? -eq 0 ];then
    success '容器启动成功'
else
    error '容器启动失败'
    exit 3
fi

if [ ! -z $output_log ];then
    note '以下是docker容器启动输出，你可以通过ctrl-c中止它，这并不会导致容器停止'
    docker logs -f $container_name
fi

#----------------- 启动逻辑 end -----------------#
