package ${basePackage}.service;

import lombok.Data;
import lombok.ToString;

/**
 * @author deepexi
 */
public interface MqDemoService {
    /**
     * 生产消息
     * @param dto ContentDto
     */
    void produce(ContentDto dto);

    /**
     * 消费消息
     * @param dto ContentDto
     */
    void consume(ContentDto dto);

    @Data
    @ToString
    class ContentDto {
        private Long id;
        private String content;
    }
}
