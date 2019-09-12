# Development reference

## Project Structure

```txt
.
├── 1.docs  // 与项目相关的文档
│   ├── guides  // 指导文档
│   │   ├── dev_reference.md
│   │   ├── quickly_start.md
│   │   └── reference.md
│   └── sql     // 数据库sql脚本
│       └── v1.0.0
├── deepexi-spring-cloud-api
│   ├── pom.xml
│   └── src
│       └── main
│           └── java
│               └── com
│                   └── deepexi
│                       ├── api
│                       └── domain
├── deepexi-spring-cloud-provider
│   ├── pom.xml
│   └── src
│       └── main
│           ├── java
│           │   └── com
│           │       └── deepexi
│           │           ├── config      // 应用相关配置
│           │           │   └── web
│           │           ├── constant    // 常量定义
│           │           ├── controller  // controller层
│           │           ├── converter   // bean转换器
│           │           ├── domain      // 领域模型
│           │           │   ├── dto     // 数据传输对象（data transfer object）
│           │           │   ├── entity  // 数据库对象
│           │           │   ├── query   // 查询对象
│           │           │   └── vo      // 视图对象（view object）
│           │           ├── enums       // 枚举类
│           │           ├── exception   // 异常类
│           │           ├── manager     // 领域逻辑层
│           │           ├── mapper      // mapper层
│           │           ├── remote      // 与远程调用相关的类
│           │           ├── repo        // 仓储层（repository）
│           │           ├── service     // 业务逻辑层
│           │           │   └── impl
│           │           ├── util        // 工具类
│           │           └── StartupApplication.java     // 应用启动入口
│           └── resources
│               ├── META-INF
│               │   └── spring-devtools.properties      // devtools元数据
│               ├── application.yml             // 通用配置文件
│               ├── application-dev.yml         // 开发环境配置文件
│               ├── application-local.yml       // 本地环境配置文件
│               ├── application-prod.yml        // 生产环境配置文件
│               ├── application-qa.yml          // 测试环境配置文件
│               ├── bootstrap.yml
│               └── mapper           // mybatis mapper相关
├── entrypoint.sh
├── LICENSE     // 协议信息
├── commitlint.config.js
├── common.sh
├── Dockerfile
├── build.sh        // 项目构建脚本
├── run.sh          // 运行脚本
├── start-code.sh   // 项目启动脚本
├── filebeat.yml
├── start-fb.sh     // filebeat启动脚本
├── scaffold.md     // 脚手架信息
├── README.md       // 帮助文档
├── package.json
└── pom.xml
```

## Node.JS相关

以下功能均基于Node.JS，使用前请先确保安装了[Node.JS](https://nodejs.org/zh-cn/download/)并在项目根目录下执行`npm install`。

- 通过 `commitlint` + `husky` 自动控制commit规范（安装husky会修改githook，因此需要确保已经执行`git init`）
- 使用 `npm run commit` 通过交互模式提交代码
- 使用 `npm run release` 根据提交记录自动调整版本并生成相应的CHANGELOG
