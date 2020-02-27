package ${basePackage}.service;

import ${basePackage}.domain.dto.JobDemoCronDTO;
import ${basePackage}.domain.dto.JobDemoInfoDTO;
import org.quartz.SchedulerException;

public interface JobDemoService {

    void save(JobDemoCronDTO dto) throws Exception;

    void remove(JobDemoInfoDTO dto) throws SchedulerException;

    void pause(JobDemoInfoDTO dto) throws SchedulerException;

    void resume(JobDemoInfoDTO dto) throws SchedulerException;

    void cron(JobDemoCronDTO dto) throws Exception;
}
