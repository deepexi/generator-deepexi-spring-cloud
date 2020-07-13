package ${basePackage};

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
<%
if (openfeign) {
    print(`import org.springframework.cloud.openfeign.EnableFeignClients;`);
}
%>
<%
if (distributedTransaction) {
    print(`import com.codingapi.txlcn.tc.config.EnableDistributedTransaction;`);
}
%>

<%
if (distributedTransaction) {
    print(`@EnableDistributedTransaction`);
}
%>
<%
if (openfeign) {
    print(`@EnableFeignClients`);
}
%>
@SpringBootApplication
public class StartupApplication {
    public static void main(String[] args) {
        SpringApplication.run(StartupApplication.class, args);
    }
}
