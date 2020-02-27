package ${basePackage}.job;

import cn.hutool.core.date.DateUtil;
import lombok.extern.slf4j.Slf4j;
import org.quartz.JobExecutionContext;

@Slf4j
public class DemoJob implements BaseJob {
    @Override
    public void execute(JobExecutionContext context) {
        log.error("Demo Job 执行时间: {}", DateUtil.now());
    }
}
