package ${basePackage}.domain.dto;

import lombok.Data;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotBlank;

/**
 * @author deepexi
 */

@Data
@Accessors(chain = true)
public class ShardingUserDemoDTO {

    @NotBlank(message = "姓名不能为空")
    private String name;

    @NotBlank(message = "城市不能为空")
    private String city;
}
