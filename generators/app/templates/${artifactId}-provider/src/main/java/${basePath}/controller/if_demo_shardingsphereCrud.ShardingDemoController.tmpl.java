package ${basePackage}.controller;

import ${basePackage}.domain.ShardingDemoDO;
import ${basePackage}.domain.dto.ShardingUserDemoDTO;
import ${basePackage}.service.ShardingDemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * @author deepexi
 */

@RestController
@RequestMapping("demo/sharding/users")
@Payload
public class ShardingDemoController {

    @Autowired
    private ShardingDemoService service;

    @GetMapping
    public List<ShardingDemoDO> list() {
        return service.list();
    }

    @PostMapping
    public Long save(@RequestBody @Valid ShardingUserDemoDTO dto) {
        return service.save(dto);
    }

    @GetMapping("/{id}")
    public ShardingDemoDO get(@PathVariable Long id) {
        return service.get(id);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id,
                       @RequestBody @Valid ShardingUserDemoDTO dto) {
        service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void remove(@PathVariable Long id) {
        service.remove(id);
    }
}
