package ${basePackage}.controller;

import ${basePackage}.domain.DocumentDemo;
import ${basePackage}.service.MongodbDemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("demo/mongodbs")
@Payload
public class MongodbDemoController {

    @Autowired
    private MongodbDemoService service;

    @GetMapping()
    public List<DocumentDemo> listAll() {
        return service.listAll();
    }
}
