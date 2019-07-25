package ${basePackage}.service;

import lombok.Data;
import lombok.ToString;

public interface MQDemoService {
    void produce(ContentDto dto);

    void consume(ContentDto dto);

    @Data
    @ToString
    class ContentDto {
        private Long id;
        private String content;
    }
}
