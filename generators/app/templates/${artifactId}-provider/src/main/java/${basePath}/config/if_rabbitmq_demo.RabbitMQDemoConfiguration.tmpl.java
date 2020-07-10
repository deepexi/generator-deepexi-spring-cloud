package ${basePackage}.config;

import ${basePackage}.service.MqDemoService;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

/**
 * @author deepexi
 */
@Configuration
@Import(RabbitMqDemoConfiguration.Receiver.class)
public class RabbitMqDemoConfiguration {
    @Bean
    public Queue test() {
        return new Queue("test.queue");
    }

    @RabbitListener(queues = "test.queue")
    public class Receiver {
        @Autowired
        private MqDemoService service;

        @RabbitHandler
        public void process(MqDemoService.ContentDto data) {
            service.consume(data);
        }
    }
}