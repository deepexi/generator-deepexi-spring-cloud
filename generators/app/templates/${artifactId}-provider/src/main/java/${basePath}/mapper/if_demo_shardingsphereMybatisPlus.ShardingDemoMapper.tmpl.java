package ${basePackage}.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import ${basePackage}.domain.ShardingDemoDO;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * @author deepexi
 */

@Mapper
public interface ShardingDemoMapper extends BaseMapper<ShardingDemoDO> {

    default List<ShardingDemoDO> selectList() {
        return this.selectList(null);
    }
}
