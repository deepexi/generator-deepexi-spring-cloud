package ${basePackage}.controller;

import ${basePackage}.service.DemoService;
import ${basePackage}.exception.DemoController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("demo")
@Payload
public class DemoController {
    @Autowired
    private DemoService service;

    @GetMapping("greeting")
    public String sayHello() {
        return "welcome!";
    }

    @GetMapping("sys-error")
    public void syserror() {
        throw new RuntimeException();
    }

    @GetMapping("biz-error")
    public void bizerror() {
        throw new DemoException();
    }
}
