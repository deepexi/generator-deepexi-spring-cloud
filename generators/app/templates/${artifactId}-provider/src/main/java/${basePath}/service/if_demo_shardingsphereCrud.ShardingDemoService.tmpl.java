package ${basePackage}.service;

import ${basePackage}.domain.ShardingDemoDO;
import ${basePackage}.domain.dto.ShardingUserDemoDTO;

import java.util.List;

/**
 * @author deepexi
 */

public interface ShardingDemoService {
    List<ShardingDemoDO> list();

    Long save(ShardingUserDemoDTO dto);

    ShardingDemoDO get(Long id);

    void update(Long id, ShardingUserDemoDTO dto);

    void remove(Long id);
}
