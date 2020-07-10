package ${basePackage}.mapper;

import ${basePackage}.domain.DemoDo;
import org.apache.ibatis.annotations.Mapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import java.util.List;

/**
 * @author deepexi
 */
@Mapper
public interface DemoMapper extends BaseMapper<DemoDo> {
     /**
     * 查询所有数据
     * @return List<DemoDo>
     */
    default List<DemoDo> selectAll() {
        return this.selectList(null);
    }
}
