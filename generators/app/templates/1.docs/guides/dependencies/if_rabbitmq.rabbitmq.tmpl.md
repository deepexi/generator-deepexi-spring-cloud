# Rabbit MQ

## 如何接入

> Rabbit MQ属于外部依赖，在接入之前请先准备好可用的Rabbit MQ基础设施

配置Rabbit MQ地址

```yaml
spring:
  rabbitmq:
    host: localhost
    port: 5672
    username: guest
    password: guest
```

然后启动应用即可。

## 如何使用

接入MQ后，关于如何在代码里面使用MQ相关功能，请参考[Spring AMQP](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-amqp)。
