package ${basePackage}.domain;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

/**
 * @author deepexi
 */
@TableName("demo")
@Data
public class DemoDo {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String name;
}
