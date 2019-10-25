# JWT无状态认证

## 如何使用

在代码中通过[AuthUtils](/${basePath}/util/AuthUtils.java)相关方法使用token

```java
// 获取用户传入的token
AuthUtils.getToken()
// 获取用户传入的token解析后的payload
AuthUtils.getPayload()
```

## 相关配置

## 修改拦截路径

```yaml
# application.yml
shiro:
  web:
    filter-chain-definition:
      authc:
        - /v1/**
      anon:
        - /**
```

## 其它

更多配置（如token格式，获取方式，校验方式等）请参考[Shiro-Starter](https://github.com/taccisum/shiro-starter)相关文档，在[ShiroConfiguration](/${basePath}/config/ShiroConfiguration.java)中进行配置。

### Swagger相关

在使用JWT无状态认证后，相关接口每次调用时均需要传入token，可以通过[application.properties](/${artifactId}-provider/src/main/resources/application.properties)进行配置

```properties
swagger.auth.api-key.token.keyName=Authorization
swagger.auth.api-key.token.passAs=header
swagger.auth.api-key.token.includePaths[0]=/**
```
