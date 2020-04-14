package ${basePackage}.config;

import org.springframework.amqp.core.Message;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConversionException;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfiguration {
    @Bean
    public MessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter() {
            @Override
            public Object fromMessage(Message message, Object conversionHint) throws MessageConversionException {
                return message.getBody();
            }
        };
    }
}
