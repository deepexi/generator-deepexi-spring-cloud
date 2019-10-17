'use strict'

const path = require('path');
const Trigger = require('yo-power-generator').Trigger;

const obj = {
  groupId: {
    prompting: { type: 'input', message: '请输入你的group id', default: 'com.deepexi' },
    option: { desc: 'group id', type: String, default: 'com.deepexi' }
  },
  artifactId: {
    prompting: { type: 'input', message: '请输入你的artifact id', default: 'deepexi-spring-cloud' },
    option: { desc: 'artifact id', type: String, default: 'deepexi-spring-cloud' }
  },
  basePackage: {
    prompting: { type: 'input', message: '请输入你的基础包路径（为空则使用group id）' },
    option: { desc: '基础包路径（为空则使用group id）', type: String, default: '' }
  },
  mavenUrl: {
    prompting: { type: 'input', message: '请输入你的maven仓库地址', default: 'http://nexus.deepexi.top/repository/maven-public/' },
    option: { desc: 'maven仓库url', type: String, default: 'http://nexus.deepexi.top/repository/maven-public/' }
  },
  templateEngine: {
    prompting: {
      type: 'list',
      choices: [
        'thymeleaf',
        // 'freemarker',
        'none'
      ],
      message: '请选择你使用的模板引擎'
    },
    option: { desc: '模板引擎', type: String, default: 'none' }
  },
  log: {
    prompting: {
      type: 'list',
      choices: [
        { key: 'logback', display: '默认(logback)' },
        'log4j2'
      ],
      message: '请选择你使用的日志框架类型'
    },
    option: { desc: '日志框架', type: String, default: 'logback' }
  },
  jsonParser: {
    prompting: {
      type: 'list',
      choices: [
        'jackson',
        'fastjson',
        'gson'
      ],
      message: '请选择你使用的JSON解析器'
    },
    option: { desc: 'JSON解析器', type: String, default: 'jackson' }
  },
  db: {
    prompting: {
      type: 'list',
      choices: [
        'mysql',
        'none'
      ],
      message: '请选择你使用的数据库'
    },
    option: { desc: '数据库', type: String, default: 'none' },
    child: {
      dbPool: {
        prompting: {
          type: 'list',
          choices: [
            'druid',
            // 'hikari',
            'default'
          ],
          message: '请选择你使用的数据库连接池'
        },
        option: { desc: '数据库连接池', type: String, default: 'none' },
        callbacks: {
          trigger: [
            new Trigger.AnyAnswerTrigger('db', 'mysql')
          ]
        }
      },
      orm: {
        prompting: {
          type: 'list',
          choices: [
            { key: 'mybatis-plus', display: 'mybatis plus' },
            // 'mybatis-plus',
            'mybatis',
            'none'
          ],
          message: '请选择你使用的ORM框架'
        },
        option: { desc: 'ORM框架', type: String, default: 'none' },
        callbacks: {
          trigger: [
            new Trigger.AnyAnswerTrigger('db', 'mysql')
          ]
        }
      }
    }
  },
  discovery: {
    prompting: {
      type: 'list',
      choices: [
        'eureka',
        // 'zookeeper',
        'none'
      ],
      message: '请选择你使用的注册中心类型'
    },
    option: { desc: '注册中心', type: String, default: 'eureka' },
    child: {
      feignCircuit: {
        prompting: {
          type: 'list',
          choices: [
            'hystrix',
            { key: 'sentinel', display: 'alibaba sentinel' },
            'none'
          ],
          message: '请选择你的openfeign熔断器类型'
        },
        option: { desc: 'feign熔断降级', type: String, default: 'hystrix' },
        callbacks: {
          trigger: [
            new Trigger.AnyAnswerTrigger('discovery', 'eureka')
          ]
        }
      }
    }
  },
  mq: {
    prompting: {
      type: 'list',
      choices: [
        { key: 'rabbitmq', display: 'rabbit mq' },
        // 'rocketmq',
        'none'
      ],
      message: '请选择你使用的消息中间件类型'
    },
    option: { desc: '消息中间件', type: String, default: 'none' }
  },
  configservice: {
    prompting: {
      type: 'list',
      choices: [
        { key: 'apollo', display: '携程apollo' },
        'none'
      ],
      message: '请选择你的配置中心类型'
    },
    option: { desc: '配置中心', type: String, default: 'none' }
  },
  authentication: {
    prompting: {
      type: 'list',
      choices: [
        'jwt',
        'none'
      ],
      message: '请选择你采用的认证机制类型'
    },
    option: { desc: '认证机制', type: String, default: 'jwt' },
    child: {
      jwtIssue: {
        prompting: { type: 'input', default: 'deepexi', message: '请填写你的jwt issue' },
        option: { desc: 'jwt issue', type: String, default: 'deepexi' },
        callbacks: {
          trigger: [
            new Trigger.AnyAnswerTrigger('authentication', 'jwt')
          ]
        }
      },
      security: {
        prompting: {
          type: 'list',
          choices: [
            'shiro'
            // 'spring-security'
          ],
          message: '请选择你使用认证框架类型'
        },
        option: { desc: '认证框架', type: String, default: 'shiro' },
        callbacks: {
          trigger: [
            new Trigger.NoAnyAnswerTrigger('authentication', 'none')
          ]
        }
      }
    }
  },
  cache: {
    prompting: {
      type: 'list',
      choices: [
        'redis',
        // 'ehcache',
        'none'
      ],
      message: '请选择你使用的缓存类型'
    },
    option: { desc: '缓存', type: String, default: 'none' }
    // child: {
    //   redisAddress: {
    //     prompting: { type: 'input', default: '127.0.0.1:6379', message: '请填写你的redis地址' },
    //     option: { desc: 'redis地址', type: String, default: '127.0.0.1:6379' },
    //     callbacks: {
    //       trigger: [
    //         new Trigger.AnyAnswerTrigger('cache', 'redis')
    //       ]
    //     }
    //   }
    // }
  },
  apm: {
    prompting: {
      type: 'list',
      choices: [
        'skywalking',
        // 'pinpoint',
        'none'
      ],
      message: '请选择你使用的APM类型'
    },
    option: { desc: '缓存', type: String, default: 'skywalking' },
    child: {
      swVersion: {
        prompting: { type: 'input', default: '6.4.0', message: '请填写你使用的skywalking版本' },
        option: { desc: 'skywalking版本', type: String, default: '6.4.0' },
        callbacks: {
          trigger: [
            new Trigger.AnyAnswerTrigger('apm', 'skywalking')
          ]
        }
      }
    }
  },
  demo: {
    prompting: {
      type: 'confirm',
      message: '是否为你生成相关的demo文件（默认No）',
      default: false
    },
    option: { desc: '生成demo', type: Boolean, default: false }
  }
}

module.exports = require('yo-power-generator').getGenerator(obj, {
  description: 'deepexi spring cloud scaffold',
  handlerDir: path.join(__dirname, 'handler'),
  templateDir: path.join(__dirname, 'templates'),
  afterPropsSet (props) {
    props.version = require('../../package.json').version
    props.cli = `yo generator-deepexi-spring-cloud -c ${props.cli}`;

    if (!props.basePackage) {
      props.basePackage = props.groupId;
    }
    props.basePath = props.basePackage.replace(/\./g, '/');

    props.conditions = {};
    if (props.db && props.db !== 'none') {
      if (props.orm && props.orm !== 'none') {
        props.conditions[props.orm] = true;
        if (props.demo) {
          props.conditions.crud = true;
        }
      }
    }

    if (props.jsonParser !== 'none') {
      props.conditions[props.jsonParser] = true;
    }

    if (props.mq !== 'none') {
      props.conditions[props.mq] = true;
    }

    if (props.configservice !== 'none') {
      props.conditions[props.configservice] = true;
    }

    if (props.authentication !== 'none') {
      props.conditions[props.authentication] = true;
    }

    if (props.security !== 'none') {
      props.conditions[props.security] = true;
    }

    if (props.templateEngine !== 'none') {
      props.conditions[props.templateEngine] = true;
    }

    if (props.cache !== 'none') {
      props.conditions[props.cache] = true;
    }

    if (props.apm !== 'none') {
      props.conditions[props.apm] = true;
    }

    props.openfeign = props.discovery === 'eureka';
  }
});
