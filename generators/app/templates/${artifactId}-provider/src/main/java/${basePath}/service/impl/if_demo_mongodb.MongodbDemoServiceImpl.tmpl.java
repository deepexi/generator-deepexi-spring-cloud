package ${basePackage}.service.impl;

import ${basePackage}.domain.DocumentDemo;
import ${basePackage}.domain.dto.DocumentDemoDTO;
import ${basePackage}.repo.DocumentDemoRepository;
import ${basePackage}.service.MongodbDemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.deepexi.pojo.converter.utils.ConverterUtils.convert;


@Service
public class MongodbDemoServiceImpl implements MongodbDemoService {

    @Autowired
    private DocumentDemoRepository repository;

    @Override
    public List<DocumentDemo> list() {
        return repository.findAll();
    }

    @Override
    public String save(DocumentDemoDTO dto) {
        return repository.save(convert(dto, DocumentDemo.class)).getId();
    }

    @Override
    public void update(String id, DocumentDemoDTO dto) {
        DocumentDemo documentDemo = convert(dto, DocumentDemo.class);
        documentDemo.setId(id);
        repository.save(documentDemo);
    }

    @Override
    public void remove(String id) {
        repository.deleteById(id);
    }

    @Override
    public DocumentDemo get(String id) {
         return repository.findById(id).orElse(new DocumentDemo());
    }
}
