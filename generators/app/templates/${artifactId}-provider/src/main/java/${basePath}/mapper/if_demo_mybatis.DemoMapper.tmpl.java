package ${basePackage}.mapper;

import ${basePackage}.domain.DemoDo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface DemoMapper {
    @Select("SELECT * FROM demo")
    List<DemoDo> selectAll();
}
