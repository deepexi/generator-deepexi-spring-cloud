'use strict'

const path = require('path');

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
          trigger (answers) {
            return answers.db === 'mysql';
          }
        }
      },
      orm: {
        prompting: {
          type: 'list',
          choices: [
            'mybatis-plus',
            'mybatis',
            'none'
          ],
          message: '请选择你使用的ORM框架'
        },
        option: { desc: 'ORM框架', type: String, default: 'none' },
        callbacks: {
          trigger (answers) {
            return answers.db === 'mysql';
          }
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
            'sentinel',
            'none'
          ],
          message: '请选择你的openfeign熔断器类型'
        },
        option: { desc: 'feign熔断降级', type: String, default: 'hystrix' },
        callbacks: {
          trigger (answers) {
            return answers.discovery === 'eureka';
          }
        }
      }
    }
  },
  mq: {
    prompting: {
      type: 'list',
      choices: [
        'rabbitmq',
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
        'apollo',
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
          trigger (answers) {
            return answers.authentication === 'jwt';
          }
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
          trigger (answers) {
            return answers.authentication !== 'none';
          }
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
    if (props.db !== 'none') {
      if (props.orm !== 'none') {
        props.conditions[props.orm] = true;
        if (props.demo) {
          props.conditions.crud = true;
        }
      }
    }

    if (props.mq !== 'none') {
      props.conditions[props.mq] = true;
    }

    if (props.configservice !== 'none') {
      props.conditions[props.configservice] = true;
    }

    if (props.security !== 'none') {
      props.conditions[props.security] = true;
    }

    props.openfeign = props.discovery === 'eureka';
  }
});
