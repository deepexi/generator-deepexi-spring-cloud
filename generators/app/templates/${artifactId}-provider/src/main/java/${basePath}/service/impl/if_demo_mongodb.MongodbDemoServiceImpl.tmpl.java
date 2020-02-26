package ${basePackage}.service.impl;

import ${basePackage}.domain.DocumentDemo;
import ${basePackage}.repo.DocumentDemoRepository;
import ${basePackage}.service.MongodbDemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MongodbDemoServiceImpl implements MongodbDemoService {

    @Autowired
    private DocumentDemoRepository repository;

    @Override
    public List<DocumentDemo> listAll() {
        return repository.findAll();
    }
}
