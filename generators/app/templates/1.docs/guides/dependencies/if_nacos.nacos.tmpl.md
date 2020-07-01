# Nacos

> Nacos 属于外部依赖，在接入之前请先准备好可用的 Nacos 基础设施

## 如何接入

配置 Nacos 地址

```yaml
spring:
  cloud:
    nacos:
      config:
        server-addr: '127.0.0.1:8848'
        file-extension: properties
```

然后启动应用即可

## 如何使用
接入 Nacos 后，关于如何在代码使用 Nacos 相关功能请参考[官方文档](https://nacos.io/zh-cn/docs/quick-start-spring-cloud.html)