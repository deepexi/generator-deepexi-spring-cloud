package ${basePackage}.service.impl;

import ${basePackage}.service.MQDemoService;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQDemoServiceImpl implements MQDemoService {
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
