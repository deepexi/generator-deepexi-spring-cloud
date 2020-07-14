package ${basePackage}.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author deepexi
 */
@RestController
@Payload
@Slf4j
public class WebSocketDemoController {

    @MessageMapping("/echo")
    @SendTo("/topic/message")
    public String serverInfo(String name) {
        log.info("服务端返回：名字： " + name);
        return "服务端返回：名字： " + name;
    }
}
