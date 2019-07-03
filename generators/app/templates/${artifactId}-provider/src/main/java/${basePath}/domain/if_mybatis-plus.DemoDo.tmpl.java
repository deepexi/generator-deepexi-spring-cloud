package ${basePackage}.domain;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@TableName("demo")
@Data
public class DemoDo {
    private Long id;
    private String name;
}
