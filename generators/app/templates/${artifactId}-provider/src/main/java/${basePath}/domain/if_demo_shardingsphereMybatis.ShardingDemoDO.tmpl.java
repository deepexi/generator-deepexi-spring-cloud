package ${basePackage}.domain;

import lombok.Data;
import lombok.experimental.Accessors;

/**
 * @author deepexi
 */

@Data
@Accessors(chain = true)
public class ShardingDemoDO {

    private Long id;
    private String city;
    private String name;
}
