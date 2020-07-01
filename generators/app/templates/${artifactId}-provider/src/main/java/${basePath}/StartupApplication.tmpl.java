package ${basePackage};

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
<%
if (openfeign) {
    print(`import org.springframework.cloud.openfeign.EnableFeignClients;`);
}
if (openNacosDiscovery) {
    print(`import org.springframework.cloud.client.discovery.EnableDiscoveryClient;`);
}
%>

<%
if (openfeign) {
    print(`@EnableFeignClients`);
}
if (openNacosDiscovery) {
    print(`@EnableDiscoveryClient`);
}
%>
@SpringBootApplication
public class StartupApplication {
    public static void main(String[] args) {
        SpringApplication.run(StartupApplication.class, args);
    }
}
