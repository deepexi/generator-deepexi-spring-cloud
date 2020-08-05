package ${basePackage}.job;

import cn.hutool.core.date.DateUtil;
import lombok.extern.slf4j.Slf4j;
import org.quartz.Job;
import org.quartz.JobExecutionContext;

/**
 * @author deepexi
 */
@Slf4j
public class DemoJob implements Job {
    @Override
    public void execute(JobExecutionContext context) {
        log.error("Demo Job 执行时间: {}", DateUtil.now());
    }
}
