# Swagger

## 访问UI界面

启动应用后，访问路径[/swagger-ui.html](http://127.0.0.1:8080/swagger-ui.html)

## 获取swagger.json

启动应用后，访问路径[/v2/api-docs](http://127.0.0.1:8080/v2/api-docs)

## 不同环境的差异

### 生产环境

出于安全考虑，在生产环境下`Swagger`默认为禁用状态，可通过以下配置修改

```yaml
# application-prod.yml
swagger:
    enabled: true
```

## 其它

更多swagger配置请访问[spring-boot-swagger-starter](https://github.com/taccisum/spring-boot-starter-swagger)主页，参考相应文档。
