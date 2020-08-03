# Quartz 任务调度

> Quartz是一个开源的作业调度框架，它完全由Java写成，并设计用于J2SE和J2EE应用中。它提供了巨大的灵 活性而不牺牲简单性。你能够用它来为执行一个作业而创建简单的或复杂的调度。它有很多特征，如：数据库支持，集群，插件，EJB作业预构建，JavaMail及其它，支持cron-like表达式等等。

## 如何使用

**Quartz API 关键的几个接口：**
- Scheduler：跟任务调度相关的最主要的API接口。
- Job：你期望任务调度执行的组件定义（调度器执行的内容），都必须实现该接口。
- JobDetail：用来定义Job的实例。
- Trigger：定义一个指定的Job何时被执行的组件，也叫触发器。
- JobBuilder：用来定义或创建JobDetail的实例，JobDetail限定了只能是Job的实例。
- TriggerBuilder：用来定义或创建触发器的实例。

调度器的生命周期，起始于SchedulerFactory的创建，终止于调用shutdown方法。当调度器接口实例创建完成后，就可以添加，删除和查询Jobs和Triggers对象，也可以执行其它的跟调度器相关的操作，比如中止触发器的触发。并且，调度器在调用start方法之前，不会触发任何一个触发器去执行作业任务。

具体样例可参考脚手架生成的对应 demo。

## 相关配置

```yaml
spring:
  quartz:
    job-store-type: memory
    properties:
      org.quartz.threadPool.threadCount: 5
      org.quartz.threadPool.threadPriority: 5
      org.quartz.threadPool.threadsInheritContextClassLoaderOfInitializingThread: true
      org.quartz.jobStore.misfireThreshold: 5000
```

## 其他

更多配置请参考[spring-boot-starter-quartz](https://docs.spring.io/spring-boot/docs/2.0.0.M3/reference/html/boot-features-quartz.html)

更多使用方式请参考[Quartz中文文档](https://xuzongbao.gitbooks.io/quartz/content/)以及[官方文档](http://www.quartz-scheduler.org/documentation/2.4.0-SNAPSHOT/migration-guide.html)