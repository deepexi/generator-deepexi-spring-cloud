# Consul

## 如何接入

> Consul 属于外部依赖，在接入之前请先准备好可用的 `consul server` 基础设施

配置consul server地址

```yaml
  cloud:
    consul:
      host: localhost
      port: 8500
```

然后启动应用即可。

## 不同环境的差异

### 本地环境

由于本地环境配置往往用于开发阶段，因此 consul 默认是禁用掉的，可以通过以下配置修改

```yaml
# application-local.yml
spring:
  cloud:
    consul:
      discovery:
        register: true
        enabled: true
```

## 其它

更多 consul 配置，请参考[官方文档](https://cloud.spring.io/spring-cloud-consul/2.2.x/reference/html/)
