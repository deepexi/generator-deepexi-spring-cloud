# Eureka

## 如何接入

> Eureka属于外部依赖，在接入之前请先准备好可用的`eureka server`基础设施

配置eureka server地址

```yaml
eureka:
  client:
    service-url:
      defaultZone: 'http://user:pass@127.0.0.1:8761/eureka/'
```

然后启动应用即可。

## 不同环境的差异

### 本地环境

由于本地环境配置往往用于开发阶段，因此eureka默认是禁用掉的，可以通过以下配置修改

```yaml
# application-local.yml
eureka:
  client:
    enabled: true
```

如果确实需要使用eureka的服务，建议配置成以下形式

```yaml
eureka:
  client:
    fetch-registry: true
    register-with-eureka: false
```

这样即可以从eureka获取应用实例数据，用于远程调用，又不至于将本地应用注册到eureka，导致数据混乱。

## 其它

更多eureka配置，请参考[官方文档](https://cloud.spring.io/spring-cloud-netflix/reference/html/#service-discovery-eureka-clients)
