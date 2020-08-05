package ${basePackage}.controller;

import ${basePackage}.domain.dto.JobDemoCronDTO;
import ${basePackage}.domain.dto.JobDemoInfoDTO;
import ${basePackage}.service.JobDemoService;
import org.quartz.SchedulerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * @author deepexi
 */
@RestController
@RequestMapping("demo/jobs")
@Payload
public class JobDemoController {

    @Autowired
    private JobDemoService jobDemoService;

    /**
     * 保存定时任务
     */
    @PostMapping
    public void save(@RequestBody @Valid JobDemoCronDTO dto) throws Exception {
        jobDemoService.save(dto);
    }

    /**
     * 删除定时任务
     */
    @DeleteMapping
    public void remove(@RequestBody @Valid JobDemoInfoDTO dto) throws SchedulerException {
        jobDemoService.remove(dto);
    }

    /**
     * 暂停定时任务
     */
    @PutMapping("/pause")
    public void pause(@RequestBody @Valid JobDemoInfoDTO dto) throws SchedulerException {
        jobDemoService.pause(dto);
    }

    /**
     * 恢复定时任务
     */
    @PutMapping("/resume")
    public void resumeJob(@RequestBody @Valid JobDemoInfoDTO dto) throws SchedulerException {
        jobDemoService.resume(dto);
    }

    /**
     * 修改定时任务，定时时间
     */
    @PutMapping("/cron")
    public void cronJob(@RequestBody @Valid JobDemoCronDTO dto) throws Exception {
        jobDemoService.cron(dto);
    }
}
