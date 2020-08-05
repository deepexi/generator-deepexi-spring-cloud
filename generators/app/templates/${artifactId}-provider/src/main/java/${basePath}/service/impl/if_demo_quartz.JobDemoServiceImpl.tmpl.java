package ${basePackage}.service.impl;

import ${basePackage}.domain.dto.JobDemoCronDTO;
import ${basePackage}.domain.dto.JobDemoInfoDTO;
import ${basePackage}.service.JobDemoService;
import ${basePackage}.job.DemoJob;
import lombok.extern.slf4j.Slf4j;
import org.quartz.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author deepexi
 */
@Service
@Slf4j
public class JobDemoServiceImpl implements JobDemoService {

    @Autowired
    private Scheduler scheduler;

    @Override
    public void save(JobDemoCronDTO dto) throws Exception {
        JobDetail jobDetail = JobBuilder
                .newJob(DemoJob.class)
                .withIdentity(dto.getJobClassName(), dto.getJobGroupName())
                .build();
        CronScheduleBuilder cron = CronScheduleBuilder.cronSchedule(dto.getCronExpression());
        CronTrigger trigger = TriggerBuilder
                .newTrigger()
                .withIdentity(dto.getJobClassName(), dto.getJobGroupName())
                .withSchedule(cron)
                .build();
        try {
            scheduler.start();
            scheduler.scheduleJob(jobDetail, trigger);
        } catch (SchedulerException e) {
            log.error("【定时任务】创建失败！", e);
            throw new Exception("【定时任务】创建失败！");
        }
    }

    @Override
    public void remove(JobDemoInfoDTO dto) throws SchedulerException {
        scheduler.pauseTrigger(TriggerKey.triggerKey(dto.getJobClassName(), dto.getJobGroupName()));
        scheduler.unscheduleJob(TriggerKey.triggerKey(dto.getJobClassName(), dto.getJobGroupName()));
        scheduler.deleteJob(JobKey.jobKey(dto.getJobClassName(), dto.getJobGroupName()));
    }

    @Override
    public void pause(JobDemoInfoDTO dto) throws SchedulerException {
        scheduler.pauseJob(JobKey.jobKey(dto.getJobClassName(), dto.getJobGroupName()));
    }

    @Override
    public void resume(JobDemoInfoDTO dto) throws SchedulerException {
        scheduler.resumeJob(JobKey.jobKey(dto.getJobClassName(), dto.getJobGroupName()));
    }

    @Override
    public void cron(JobDemoCronDTO dto) throws Exception {
        try {
            TriggerKey triggerKey = TriggerKey.triggerKey(dto.getJobClassName(), dto.getJobGroupName());

            CronScheduleBuilder scheduleBuilder = CronScheduleBuilder.cronSchedule(dto.getCronExpression());

            CronTrigger trigger = (CronTrigger) scheduler.getTrigger(triggerKey);

            trigger = trigger.getTriggerBuilder().withIdentity(triggerKey).withSchedule(scheduleBuilder).build();

            scheduler.rescheduleJob(triggerKey, trigger);
        } catch (SchedulerException e) {
            log.error("【定时任务】更新失败！", e);
            throw new Exception("【定时任务】创建失败！");
        }
    }
}
