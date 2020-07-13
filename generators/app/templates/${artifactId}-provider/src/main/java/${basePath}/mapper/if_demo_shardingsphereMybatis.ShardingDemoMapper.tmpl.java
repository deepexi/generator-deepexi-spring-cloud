package ${basePackage}.mapper;

import ${basePackage}.domain.ShardingDemoDO;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * @author deepexi
 */

@Mapper
public interface ShardingDemoMapper {

    @Select("select * from user_demo")
    List<ShardingDemoDO> selectList();

    @Insert("insert into user_demo (city, name) values (#{city,jdbcType=VARCHAR}, #{name,jdbcType=VARCHAR})")
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    int insert(ShardingDemoDO shardingDemoDO);

    @Select("select * from user_demo where id = #{id,jdbcType=INTEGER}")
    ShardingDemoDO selectById(Long id);

    @Update("update user_demo set city = #{city,jdbcType=VARCHAR}, name = #{name,jdbcType=VARCHAR} where id = #{id,jdbcType=INTEGER}")
    void updateById(ShardingDemoDO shardingDemoDO);

    @Delete("delete from user_demo where id = #{id,jdbcType=INTEGER}")
    void deleteById(Long id);
}
