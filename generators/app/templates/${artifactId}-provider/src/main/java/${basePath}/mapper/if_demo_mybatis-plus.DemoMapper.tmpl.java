package ${basePackage}.mapper;

import ${basePackage}.domain.DemoDo;
import org.apache.ibatis.annotations.Mapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import java.util.List;

@Mapper
public interface DemoMapper extends BaseMapper<DemoDo> {
    default List<DemoDo> selectAll() {
        return this.selectList(null);
    }
}
