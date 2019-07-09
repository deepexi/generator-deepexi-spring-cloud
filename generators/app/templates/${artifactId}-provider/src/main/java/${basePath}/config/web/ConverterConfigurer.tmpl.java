package ${basePackage}.config.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Map;

@Configuration
public class ConverterConfigurer implements WebMvcConfigurer {
    @Autowired
    private ApplicationContext context;

    @Override
    public void addFormatters(FormatterRegistry registry) {
        Map<String, Converter> beans = context.getBeansOfType(Converter.class);
        beans.forEach((k, v) -> {
            if (v != null) {
                registry.addConverter((Converter<?, ?>) v);
            }
        });
    }
}
