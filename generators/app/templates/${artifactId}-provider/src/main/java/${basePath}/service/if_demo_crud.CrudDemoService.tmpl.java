package ${basePackage}.service;

import ${basePackage}.domain.DemoDo;

import java.util.List;

/**
 * @author deepexi
 */
public interface CrudDemoService {
      /**
     * 获得所有数据
     * @return List<DemoDo>
     */
    List<DemoDo> listAll();
}
