package ${basePackage}.remote;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author deepexi
 */
@FeignClient(name = "demo", url = "http://www.baidu.com", fallback = DemoFeignClient.Fallback.class)
public interface DemoFeignClient {
     /**
     * Feign示例1
     * @return String
     */
    @GetMapping("/")
    String index();

    /**
     * Feign示例2
     * @return String
     */
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
