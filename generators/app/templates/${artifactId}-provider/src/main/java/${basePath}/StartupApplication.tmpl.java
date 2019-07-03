package ${basePackage};

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
<%
if (openfeign) {
    print(`import org.springframework.cloud.openfeign.EnableFeignClients;`);
}
%>

@SpringBootApplication
<%
if (openfeign) {
    print(`@EnableFeignClients`);
}
%>
public class StartupApplication {
    public static void main(String[] args) {
        SpringApplication.run(StartupApplication.class, args);
    }
}
