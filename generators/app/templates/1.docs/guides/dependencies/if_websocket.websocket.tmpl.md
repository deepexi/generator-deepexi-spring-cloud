# WebSocket

> 为浏览器和服务器提供了双工异步通信的功能。直接使用 WebSocket 协议开发程序显得十分繁琐，所以使用它的子协议 STOMP

> STOMP: 高级的流文本定向消息协议，是一种为 MOM (Message Oriented Middleware，面向消息的中间件) 设计的简单文本协议。

## 如何使用

### pom.xml 配置
```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-websocket</artifactId>
        </dependency>
```

### 配置 websocket
实现 WebSocketMessageBrokerConfigurer 接口，注册一个 STOMP 节点，配置消息代理
```java
@Configuration
@EnableWebSocket
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // 注册一个 stomp 节点(deo=mo-endpoint)
        registry.addEndpoint("/demo-endpoint")
                .setAllowedOrigins("*");
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 配置消息代理
        registry.setApplicationDestinationPrefixes("/demo-server")
                .enableSimpleBroker("/topic", "/queue");
    }
```
具体的使用样例可参考脚手架提供的 demo，客户端的调用样例在单元测试内。