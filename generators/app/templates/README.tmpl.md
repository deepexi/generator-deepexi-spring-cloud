# ${artifactId}

## 如何运行

### 本地开发

通过IDE运行[StartupApplication](${artifactId}-provider/src/main/java/${basePath}/StartupApplication.java)

<%
if(dependencies.swagger){
    print(`swagger地址：http://127.0.0.1:8080/swagger-ui.html  \n`);
    print(`swagger json：http://127.0.0.1:8080/v2/api-docs  \n`);
}
%>

### 部署

#### 进程启动

```bash
$ mvn clean package
$ java -jar ./${artifactId}-provider/target/${artifactId}-provider-{version}.jar
```

#### 容器启动

```bash
$ sh start-code.sh [-bl] [-p port]
```

- -b: 是否从本地构建镜像
- -l: 是否在启动后输出容器日志
- -p: 指定容器映射端口号

## 开发参考

## Release Notes

### v1.0.0

- 工程搭建

