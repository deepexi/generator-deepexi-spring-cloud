package ${basePackage}.service;

import ${basePackage}.domain.DocumentDemo;
import ${basePackage}.domain.dto.DocumentDemoDTO;

import java.util.List;


public interface MongodbDemoService {
    List<DocumentDemo> list();

    String save(DocumentDemoDTO dto);

    void update(String id, DocumentDemoDTO dto);

    void remove(String id);

    DocumentDemo get(String id);
}
