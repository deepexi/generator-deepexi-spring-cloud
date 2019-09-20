package ${basePackage}.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller("/demo/thymeleaf")
public class ThymeleafDemoController {
    @GetMapping
    public String index(Model model) {
        model.addAttribute("greeting", "hello thymeleaf!");
        return "demo_page";
    }
}
