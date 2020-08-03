# DeepEXI Spring Cloud Scaffold Generator

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]
[![Build Status](https://www.travis-ci.org/deepexi/generator-deepexi-spring-cloud.svg?branch=master)](https://www.travis-ci.org/deepexi/generator-deepexi-spring-cloud)
[![codecov](https://codecov.io/gh/deepexi/generator-deepexi-spring-cloud/branch/master/graph/badge.svg)](https://codecov.io/gh/deepexi/generator-deepexi-spring-cloud)

[npm-image]: https://img.shields.io/npm/v/generator-deepexi-spring-cloud.svg
[npm-url]: https://www.npmjs.com/package/generator-deepexi-spring-cloud
[download-image]: https://img.shields.io/npm/dm/generator-deepexi-spring-cloud.svg
[download-url]: https://www.npmjs.com/package/generator-deepexi-spring-cloud

此脚手架生成器基于[Yeoman](https://yeoman.io/)构建。

[CHANGELOG](./CHANGELOG.md)

## How To

### Getting Started

#### 1. 安装yeoman

```bash
$ npm install -g yo
```

#### 2. 安装generator-deepexi-spring-cloud

```bash
$ npm install -g generator-deepexi-spring-cloud
```

#### 3. 创建你的应用

通过交互模式创建

```bash
$ mkdir {your_project_name}
$ cd {your_project_name}
$ yo deepexi-spring-cloud
```

或者使用命令行模式创建

```bash
$ mkdir {your_project_name}
$ cd {your_project_name}
$ yo deepexi-spring-cloud -c
```

更多帮助信息可以通过以下命令查看

```bash
$ yo deepexi-spring-cloud --help
```

#### 4. 自行修改配置

脚手架对自动集成的第三方依赖都提供了默认的配置，但是有一些外部资源依赖（如mysql db, eureka server, rabbit mq等）可能需要你在生成项目后手动进行配置，否则项目可能无法直接运行。

#### 5. 其它

- 脚手架生成后，请查看其`README.md`文档进行开发、构建或部署等操作。
- 通过`demo=yes`选项可以为你选择的集成项生成相应的使用示例，但仅供参考，真实项目中建议设置`demo=no`

## 功能一览

### 可选项

|**类型**||||||
|:-:|--|--|--|--|--|
|注册中心|✅eureka|✅consul|✅nacos|
|配置中心|✅Apollo|☑️Disconfig|☑️Config|✅nacos|
|消息队列|✅RabbitMQ|☑️RocketMQ|
|任务调度|☑️ES Job|☑️XXL-Job|☑️SiaTask|✅Quartz|
|RDBMS|✅MySQL|☑️PG SQL|☑️SQL Server|
|NoSQL|✅Redis|✅MongoDB|
|连接池|✅Druid|☑️Hikari|
|认证机制|✅JWT|
|权限控制|✅Shiro|☑️Spring Security|
|分布式事务|☑️TCC-Transaction|☑️LCN|
|APM|✅️SkyWalking|☑️Zipkin|☑️PinPoint|
|分库分表|☑️Sharding-JDBC|☑️MyCAT|
|服务器|✅Tomcat|☑️Jetty|☑️Undertow|
|JSON解析器|✅Jackson|✅️FastJson|✅️Gson|
|模板引擎|✅Thymeleaf|☑️Freemarker|
|对象存储|☑️AliOSS|☑️FastDFS|
|ORM|✅MybatisPlus|✅Mapper|☑️JPA|
|日志系统|✅Logback|✅Log4j2|
|DDD|
|WebSocket|☑️Spring Boot Websocket|
|Bean转换器|✅SpringMVC Converter|☑️MapStruct|
|DeepEXI产品|☑️sPaaS|
|其它|✅️Prometheus|

### 固有项

|**类型**||||||
|:-:|--|--|--|--|--|
|Java版本|✅jdk8|
|开发框架|✅springfox(swagger)|✅lombok|✅guava|✅common-lang3|✅joda-time|
|       |✅hutool|✅payload|
|测试框架|✅junit|✅mockito|✅assertj|✅jacoco|☑️mockserver|
|       |✅️jfairy|☑️mockneat|✅sonar|
|开发相关|✅devtools|
|部署相关|✅docker|✅filebeat|
|其它|✅actuator|

## Development Reference
