package ${basePackage}.converter;

import ${basePackage}.controller.DemoController;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class String2DemoControllerModelConverter implements Converter<String, DemoController.Model> {
    @Override
    public DemoController.Model convert(String source) {
        DemoController.Model target = new DemoController.Model();
        target.setContent(source);
        return target;
    }
}
