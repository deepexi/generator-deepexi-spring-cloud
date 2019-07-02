package ${basePackage}.service.impl;

import ${basePackage}.domain.DemoDo;
import ${basePackage}.mapper.DemoMapper;
import ${basePackage}.service.CrudDemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CrudDemoServiceImpl implements CrudDemoService {
    @Autowired
    private DemoMapper mapper;

    @Override
    public List<DemoDo> listAll() {
        return mapper.selectAll();
    }
}
