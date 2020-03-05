package ${basePackage}.controller;

import ${basePackage}.domain.DocumentDemo;
import ${basePackage}.domain.dto.DocumentDemoDTO;
import ${basePackage}.service.MongodbDemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("demo/mongodbs")
@Payload
public class MongodbDemoController {

    @Autowired
    private MongodbDemoService service;

    @GetMapping()
    public List<DocumentDemo> list() {
        return service.list();
    }

    @PostMapping
    public String save(@RequestBody @Valid DocumentDemoDTO dto) {
        return service.save(dto);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable("id") String id,
                       @RequestBody @Valid DocumentDemoDTO dto) {
        service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void remove(@PathVariable("id") String id) {
        service.remove(id);
    }

    @GetMapping("/{id}")
    public DocumentDemo get(@PathVariable("id") String id) {
        return service.get(id);
    }
}
