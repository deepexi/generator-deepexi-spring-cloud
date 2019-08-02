# ${artifactId}

[CHANGELOG](./CHANGELOG.md)

## 如何使用

### 本地开发

通过IDE运行[StartupApplication](${artifactId}-provider/src/main/java/${basePath}/StartupApplication.java)

**swagger地址**：http://127.0.0.1:8080/swagger-ui.html  
**swagger json**：http://127.0.0.1:8080/v2/api-docs

### 构建

#### jar包

```bash
$ mvn clean package -DskipTests
```

#### 镜像

```bash
$ PROJECT_HOME=$PWD \
APP_NAME=${artifactId} \
VERSION=1.0.0 \
sh build.sh
```

或者

```bash
$ PROJECT_HOME=$PWD \
IMAGE_NAME=${artifactId}:v1.0.0 \
sh build.sh
```

### 部署

#### 进程启动

```bash
$ mvn clean package
$ java -jar ./${artifactId}-provider/target/${artifactId}-provider-{version}.jar
```

#### 容器启动

```bash
$ sh start-code.sh [-bl] [-p port] [-v version]
```

- -b: 是否从本地构建镜像
- -l: 是否在启动后输出容器日志
- -p: 指定容器映射端口号（默认8080）
- -v: 指定构建镜像的版本号（默认1.0.0）

如果需要自定义启动命令，可以自行修改[`run.sh`](./run.sh)。

## 开发参考

### Node.JS相关

以下功能均基于Node.JS，使用前请先确保安装了[Node.JS](https://nodejs.org/zh-cn/download/)并在项目根目录下执行`npm install`。

- 通过 `commitlint` + `husky` 自动控制commit规范（安装husky会修改githook，因此需要确保已经执行`git init`）
- 使用 `npm run commit` 通过交互模式提交代码
- 使用 `npm run release` 根据提交记录自动调整版本并生成相应的CHANGELOG
