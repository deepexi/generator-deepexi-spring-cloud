package ${basePackage}.domain;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.experimental.Accessors;

/**
 * @author deepexi
 */

@Data
@Accessors(chain = true)
@TableName("user_demo")
public class ShardingDemoDO {

    private Long id;
    private String city;
    private String name;
}
