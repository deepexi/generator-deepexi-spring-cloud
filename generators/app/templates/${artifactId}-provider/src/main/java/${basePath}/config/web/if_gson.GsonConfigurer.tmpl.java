package ${basePackage}.config.web;

import com.google.gson.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import springfox.documentation.spring.web.json.Json;

import java.lang.reflect.Type;

@Configuration
public class GsonConfigurer implements WebMvcConfigurer {
    @Bean
    public GsonBuilder gsonBuilder() {
        GsonBuilder builder = new GsonBuilder();
        // for spring fox swagger json serialization
        builder.registerTypeAdapter(Json.class, new JsonSerializer<Json>() {
            private JsonParser parser = new JsonParser();

            @Override
            public JsonElement serialize(Json json, Type type, JsonSerializationContext jsonSerializationContext) {
                return parser.parse(json.value());
            }
        });
        return builder;
    }
}
