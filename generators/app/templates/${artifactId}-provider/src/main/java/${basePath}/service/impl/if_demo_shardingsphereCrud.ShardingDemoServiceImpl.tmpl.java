package ${basePackage}.service.impl;

import ${basePackage}.domain.ShardingDemoDO;
import ${basePackage}.domain.dto.ShardingUserDemoDTO;
import ${basePackage}.mapper.ShardingDemoMapper;
import ${basePackage}.service.ShardingDemoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static ${basePackage}.pojo.converter.utils.ConverterUtils.convert;

/**
 * @author deepexi
 */

@Service
@Slf4j
public class ShardingDemoServiceImpl implements ShardingDemoService {

    @Autowired
    private ShardingDemoMapper mapper;

    @Override
    public List<ShardingDemoDO> list() {
        return mapper.selectList();
    }

    @Override
    public Long save(ShardingUserDemoDTO dto) {
        ShardingDemoDO shardingDemoDO = convert(dto, ShardingDemoDO.class);
        mapper.insert(shardingDemoDO);
        return shardingDemoDO.getId();
    }

    @Override
    public ShardingDemoDO get(Long id) {
        return mapper.selectById(id);
    }

    @Override
    public void update(Long id, ShardingUserDemoDTO dto) {
        ShardingDemoDO shardingDemoDO = convert(dto, ShardingDemoDO.class);
        shardingDemoDO.setId(id);
        mapper.updateById(shardingDemoDO);
    }

    @Override
    public void remove(Long id) {
        mapper.deleteById(id);
    }
}
