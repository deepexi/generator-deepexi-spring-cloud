package ${basePackage}.controller;

import org.junit.Test;
import org.springframework.messaging.converter.StringMessageConverter;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandler;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

/**
 * @author deepexi
 */
public class WebSocketDemoControllerTest {

    @Test
    public void serverInfo() throws InterruptedException, ExecutionException, TimeoutException {
        WebSocketClient webSocketClient = new StandardWebSocketClient();
        WebSocketStompClient stompClient = new WebSocketStompClient(webSocketClient);
        stompClient.setMessageConverter(new StringMessageConverter());

        StompSessionHandler sessionHandler = new MyStompSessionHandler();
        String url = "ws://127.0.0.1:8080/demo-endpoint";
        StompSession session = stompClient.connect(url, sessionHandler)
                .get(10000, TimeUnit.SECONDS);
        Thread.sleep(1000);
        if (session.isConnected()) {
            StompHeaders hs = new StompHeaders();
            hs.add(StompHeaders.DESTINATION, "/demo-server/echo");
            session.send(hs, "xiaoming");
        }
    }
}
