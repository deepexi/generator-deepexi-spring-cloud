package ${basePackage}.service;

import ${basePackage}.domain.dto.JobDemoCronDTO;
import ${basePackage}.domain.dto.JobDemoInfoDTO;
import org.quartz.SchedulerException;

/**
 * @author deepexi
 */
public interface JobDemoService {

    /**
     * 保存定时任务
     * @param dto 定时任务详细信息
     * @throws Exception 保存定时任务异常
     */
    void save(JobDemoCronDTO dto) throws Exception;

    /**
     * 删除定时任务
     * @param dto 定时任务基础信息
     * @throws SchedulerException 删除定时任务异常
     */
    void remove(JobDemoInfoDTO dto) throws SchedulerException;

    /**
     * 中止定时任务
     * @param dto 定时任务基础信息
     * @throws SchedulerException 中止定时任务异常
     */
    void pause(JobDemoInfoDTO dto) throws SchedulerException;

    /**
     * 恢复定时任务
     * @param dto 定时任务基础信息
     * @throws SchedulerException 恢复定时任务异常
     */
    void resume(JobDemoInfoDTO dto) throws SchedulerException;

    /**
     * 修改定时时间
     * @param dto 定时任务详细信息
     * @throws Exception 修改定时时间异常
     */
    void cron(JobDemoCronDTO dto) throws Exception;
}
