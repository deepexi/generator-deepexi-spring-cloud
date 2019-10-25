# Converter

你可以通过定义converter来处理两个类之间的转换逻辑

```java
@Component
public class Foo2BarConverter implements Converter<Foo, Bar> {
    @Override
    public Bar convert(Foo source) {
        Bar target = new Bar();
        target.setContent(source.getContent());
        return target;
    }
}
```

然后通过静态方法`com.deepexi.pojo.converter.utils.ConverterUtils.convert`来使用它

```java
import static com.deepexi.pojo.converter.utils.ConverterUtils.convert;

public class DemoService {
    public Bar doConvert(Foo foo) {
        return convert(foo, Bar.class);
    }
}
```

如果该方法无法找到合适的converter，则默认会匹配字段名及字段类型进行转换。

## 其它

更多内容请访问[pojo-converter-spring-boot-starter](https://github.com/deepexi/pojo-converter-spring-boot-starter)主页，参考相应文档。
