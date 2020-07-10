package ${basePackage}.service.impl;

import ${basePackage}.service.MqDemoService;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author deepexi
 */
@Service
public class RabbitMqDemoServiceImpl implements MqDemoService {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Override
    public void produce(ContentDto dto) {
        rabbitTemplate.convertAndSend("test.queue", dto);
    }

    @Override
    public void consume(ContentDto dto) {
        System.out.println(dto.toString());
    }
}
