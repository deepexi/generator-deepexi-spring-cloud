package ${basePackage}.controller;

import ${basePackage}.service.ObjectCacheDemoService;
import ${basePackage}.service.StringCacheDemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("demo/cache")
@Payload
public class CacheDemoController {
    @Autowired
    private StringCacheDemoService stringService;
    @Autowired
    private ObjectCacheDemoService objectService;

    // string cache demo

    @GetMapping("/string/{id}")
    public String get(@PathVariable String id) {
        return stringService.get(id);
    }

    @PostMapping("/string/{id}")
    public String create(@PathVariable String id) {
        return stringService.create(id);
    }

    @PutMapping("/string/{id}")
    public String update(@PathVariable String id, String content) {
        return stringService.update(id, content);
    }

    @DeleteMapping("/string/{id}")
    public void delete(@PathVariable String id) {
        stringService.delete(id);
    }

    // object cache demo

    @GetMapping("/object/{id}")
    public Object getObj(@PathVariable String id) {
        return objectService.get(id);
    }

    @PostMapping("/object/{id}")
    public Object createObj(@PathVariable String id) {
        return objectService.create(id);
    }

    @PutMapping("/object/{id}")
    public Object updateObj(@PathVariable String id, ObjectCacheDemoService.Model content) {
        return objectService.update(id, content);
    }

    @DeleteMapping("/object/{id}")
    public void deleteObj(@PathVariable String id) {
        objectService.delete(id);
    }
}
