package ${basePackage}.remote;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "demo", url = "http://www.baidu.com", fallback = DemoFeignClient.Fallback.class)
public interface DemoFeignClient {
    @GetMapping("/")
    String index();

    @GetMapping("/1")
    String fallback();

    @Component
    class Fallback implements DemoFeignClient {
        @Override
        public String index() {
            return "index";
        }

        @Override
        public String fallback() {
            return "fallback value";
        }
    }
}
