package ${basePackage}.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotBlank;

/**
 * @author deepexi
 */
@Data
@Accessors(chain = true)
@ApiModel
public class JobDemoCronDTO {

    @ApiModelProperty(value = "全类名", example = "com.deepexi.job.DemoJob")
    @NotBlank(message = "类名不能为空")
    private String jobClassName;

    @ApiModelProperty(value = "任务组名", example = "com.deepexi.job")
    @NotBlank(message = "任务组名不能为空")
    private String jobGroupName;

    @ApiModelProperty(value = "定时任务cron表达式", example = "*/5 * * * * ?")
    @NotBlank(message = "cron表达式不能为空")
    private String cronExpression;
}
