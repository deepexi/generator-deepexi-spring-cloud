#!/bin/bash

cd `dirname $0`

# 必填部署变量
# elk_env="local"
# elk_logstash="47.92.70.95:5044"

img_fb='docker.elastic.co/beats/filebeat:7.0.0'

source ./common.sh

h1 '准备启动filebeat['$img_fb']'

h2 '修改filebeat.yml配置'

git checkout -- filebeat.yml
<%= "sed -i s/{{elk_env}}/$elk_env/ filebeat.yml" %>
<%= "sed -i s/{{elk_logstash}}/$elk_logstash/ filebeat.yml" %>

h2 '准备启动容器'

info '删除已存在的容器'
docker rm -f fb-${artifactId}

info '准备启动Docker容器'
docker run -d \
    --name fb-${artifactId} \
    -v $PWD/filebeat.yml:/usr/share/filebeat/filebeat.yml \
    -v $PWD/logs/:/var/logs/ \
    $img_fb
    