# Crtip Apollo

> Apollo属于外部依赖，在接入之前请先准备好可用的基础设施

## 如何接入

通过Apollo的Portal界面创建你的应用，并将`app id`填入[META-INF/app.properties](/${artifactId}-provider/src/main/resources/META-INF/app.properties)。

### Run with IDE

修改配置，指定meta-server地址

```yaml
# bootstrap.yml
apollo:
bootstrap:
    enabled: true
    namespaces: application
meta: 'http://{meta-server-url}'
```

然后在IDE的启动VM参数中加入以下配置

```text
-Denv={env}
```

### Run with *.jar

请参考[Start via process](../quickly_start.md#start-via-process)，并加入以下启动参数

```text
-Denv={env}
-Dapollo.meta=http://{meta-server-url}
```

### Run with Docker

TODO:: 功能规划中，暂无相关支持。如有需要，请先手动配置

## 其它

更多关于Apollo客户端的使用方式，请参考[官方文档](https://github.com/ctripcorp/apollo/wiki/Java客户端使用指南)。
