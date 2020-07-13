package ${basePackage}.service.impl;

import ${basePackage}.service.DemoService;
import org.springframework.stereotype.Service;

/**
 * @author deepexi
 */
@Service
public class DemoServiceImpl implements DemoService {
    @Override
    public String sayHello() {
        return "welcome!";
    }
}
