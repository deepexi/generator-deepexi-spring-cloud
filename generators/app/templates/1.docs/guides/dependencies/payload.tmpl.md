# Payload

可通过为控制器或其方法添加`@Payload`注解来统一响应数据的格式，如

```java
@RestController
@RequestMapping("demo")
@Payload
public class DemoController {
    @GetMapping("greeting")
    public String sayHello() {
        return "welcome!";
    }
}
```

该接口响应内容将被处理为

```json
{
  "code": "1",
  "payload": {
    "content": "welcome!"
  },
  "success": true
}
```

若要修改统一响应的格式，可自行调整`${basePackage}.config.web.ReturnValueConfigurer`内容。
