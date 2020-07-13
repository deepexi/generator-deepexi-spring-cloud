package ${basePackage}.service;

import ${basePackage}.domain.DocumentDemo;
import ${basePackage}.domain.dto.DocumentDemoDTO;

import java.util.List;

/**
 * @author deepexi
 */
public interface MongodbDemoService {
    /**
     * 查询列表
     *
     * @return List<DocumentDemo>
     */
    List<DocumentDemo> list();

    /**
     * 保存记录
     *
     * @param dto DocumentDemoDTO
     * @return id
     */
    String save(DocumentDemoDTO dto);

    /**
     * 根据id更新记录
     *
     * @param id  String
     * @param dto DocumentDemoDTO
     */
    void update(String id, DocumentDemoDTO dto);

    /**
     * 根据id删除
     *
     * @param id String
     */
    void remove(String id);

    /**
     * 根据id获取详细记录
     *
     * @param id id
     * @return DocumentDemo
     */
    DocumentDemo get(String id);
}
