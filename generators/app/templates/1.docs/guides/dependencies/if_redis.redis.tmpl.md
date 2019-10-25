# Redis Cache

> Redis属于外部依赖，在接入之前请先准备好可用的基础设施

## 如何接入

修改配置，指定redis地址

```yaml
spring:
  redis:
    host: 127.0.0.1
    port: '6379'
    password: 'xxxx'
```

## 如何使用

通过为方法添加注解`@Cacheable`, `@CachePut`, `@CacheEvict`即可使用。

具体请参考[spring cache annotations](https://docs.spring.io/spring/docs/current/spring-framework-reference/integration.html#cache-annotations)。

