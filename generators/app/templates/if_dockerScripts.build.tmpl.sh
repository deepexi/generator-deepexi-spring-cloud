#!/bin/bash
<%
let scripts = `
cd \`dirname $0\`

source common.sh

img_mvn='maven:3.3.3-jdk-8'                 # docker image of maven
m2_cache='~/.m2'                              # the local maven cache dir
project_home=\$\{PROJECT_HOME:-$PWD\}

h2 '准备构建项目'

cmd='mvn clean package -DskipTests'

if [[ -n "$APP_NAME" ]];then
    cmd=\$\{cmd\}' -Ddocker.name='\$\{APP_NAME\}
fi
if [[ -n "$VERSION" ]];then
    cmd=\$\{cmd\}' -Ddocker.tag='\$\{VERSION\}
fi
if [[ -n "$CUSTOM_MVN_ARGS" ]];then
    cmd=\$\{cmd\}' '\$\{CUSTOM_MVN_ARGS\}
fi

if which mvn ; then
    info '使用本地 maven 构建项目'
else
    info '未检查到本地 maven，将通过 maven 容器['\$\{img_mvn\}']构建项目'

    docker_cmd='docker run --rm
        -v '\$\{m2_cache\}':/root/.m2
        -v '\$\{project_home\}':/usr/src/mymaven'
    # 为了在容器中使用 docker，需要将宿主机的相关文件挂载到容器中
    docker_cmd=\$\{docker_cmd\}'
        -v /var/run/docker.sock:/var/run/docker.sock
        -v /usr/local/bin/docker:/usr/bin/docker:ro
        -v /etc/docker:/etc/docker'
    docker_cmd=\$\{docker_cmd\}'
        -w /usr/src/mymaven '\$\{img_mvn\}

    cmd=\$\{docker_cmd\}' '\$\{cmd\}

fi

info '构建命令：'
echo \$\{cmd\}
eval \$\{cmd\}
asset_last '构建成功' '构建失败'

`

print(scripts)
%>
