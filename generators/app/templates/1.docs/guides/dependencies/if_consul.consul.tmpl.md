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

健康检查默认是关闭的，如要开启请如下配置：
```yaml
# application-local.yml
spring:
  cloud:
    consul:
      discovery:
        register-health-check: true
        register: true
        enabled: true
        management-port: 8083 #配置的健康检查端口
```
注意的是，健康检查依赖 spring boot 的如下依赖:

```xml
 <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
 </dependency>
```

同时，为了便于排查问题，prefer-ip-address 默认配置为 true


更多 consul 配置，请参考[官方文档](https://cloud.spring.io/spring-cloud-consul/2.2.x/reference/html/)
