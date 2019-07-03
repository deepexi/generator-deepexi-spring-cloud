package ${basePackage}.remote;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "demo", url = "http://www.baidu.com")
public interface DemoFeignClient {
    @GetMapping("/")
    String index();
}
