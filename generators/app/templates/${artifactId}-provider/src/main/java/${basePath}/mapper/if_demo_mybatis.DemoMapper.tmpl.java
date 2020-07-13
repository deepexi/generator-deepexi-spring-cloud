package ${basePackage}.mapper;

import ${basePackage}.domain.DemoDo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author deepexi
 */
@Mapper
public interface DemoMapper {
    /**
     * 查询demo表的所有数据
     *
     * @return List<DemoDo>
     */
    @Select("SELECT * FROM demo")
    List<DemoDo> selectAll();
}
