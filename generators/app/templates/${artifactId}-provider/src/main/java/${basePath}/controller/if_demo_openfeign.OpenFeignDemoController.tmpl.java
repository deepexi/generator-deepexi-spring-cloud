package ${basePackage}.controller;

import ${basePackage}.remote.DemoFeignClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("demo/openfeign")
public class OpenFeignDemoController {
    @Autowired
    private DemoFeignClient client;

    @GetMapping("/")
    public String index() {
        return client.index();
    }
}