'use strict'
/* eslint-disable no-undef */

const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const path = require('path')
const fs = require('fs');
const yaml = require('js-yaml');
const _ = require('lodash');

function generate (prompts) {
  const def = {
    groupId: 'com.deepexi',
    artifactId: 'foo-service',
    basePackage: 'com.deepexi.foo'
  }
  _.assignIn(def, prompts);
  return helpers
    .run(path.join(__dirname, '../../app'))
    .withPrompts(def)
    .then(() => {
    })
}

function assertRootArtifacts (artifacts) {
  if (_.isArray(artifacts) && artifacts.length > 0) {
    assert.fileContent(
      artifacts.map(artifact => {
        return ['pom.xml', new RegExp('<artifactId>' + artifact + '<\\/artifactId>')];
      })
    )
  }
}

function assertNoRootArtifacts (artifacts) {
  if (_.isArray(artifacts) && artifacts.length > 0) {
    assert.noFileContent(
      artifacts.map(artifact => {
        return ['pom.xml', new RegExp('<artifactId>' + artifact + '<\\/artifactId>')];
      })
    )
  }
}

function assertProviderArtifacts (artifacts) {
  if (_.isArray(artifacts) && artifacts.length > 0) {
    assert.fileContent(
      artifacts.map(artifact => {
        return ['foo-service-provider/pom.xml', new RegExp('<artifactId>' + artifact + '<\\/artifactId>')];
      })
    )
  }
}

function assertNoProviderArtifacts (artifacts) {
  if (_.isArray(artifacts) && artifacts.length > 0) {
    assert.noFileContent(
      artifacts.map(artifact => {
        return ['foo-service-provider/pom.xml', new RegExp('<artifactId>' + artifact + '<\\/artifactId>')];
      })
    )
  }
}

function assertClasses (classes) {
  if (_.isArray(classes) && classes.length > 0) {
    assert.file(classes.map(clazz => {
      return `foo-service-provider/src/main/java/com/deepexi/foo/${clazz}`;
    }))
  }
}

function assertNoClasses (classes) {
  if (_.isArray(classes) && classes.length > 0) {
    assert.noFile(classes.map(clazz => {
      return `foo-service-provider/src/main/java/com/deepexi/foo/${clazz}`;
    }))
  }
}

function assertTestClasses (classes) {
  if (_.isArray(classes) && classes.length > 0) {
    assert.file(classes.map(clazz => {
      return `foo-service-provider/src/test/java/com/deepexi/foo/${clazz}`;
    }))
  }
}

function assertNoTestClasses (classes) {
  if (_.isArray(classes) && classes.length > 0) {
    assert.noFile(classes.map(clazz => {
      return `foo-service-provider/src/test/java/com/deepexi/foo/${clazz}`;
    }))
  }
}

function assertResources (resources) {
  if (_.isArray(resources) && resources.length > 0) {
    assert.file(resources.map(resource => {
      return `foo-service-provider/src/main/resources/${resource}`;
    }))
  }
}

function assertNoResources (resources) {
  if (_.isArray(resources) && resources.length > 0) {
    assert.noFile(resources.map(resource => {
      return `foo-service-provider/src/main/resources/${resource}`;
    }))
  }
}

function readYamlConfigs (env) {
  if (env) {
    if (env === 'bootstrap' || env === 'boot') {
      return yaml.safeLoad(fs.readFileSync(`foo-service-provider/src/main/resources/bootstrap.yml`)) || {};
    }
    return yaml.safeLoad(fs.readFileSync(`foo-service-provider/src/main/resources/application-${env}.yml`)) || {};
  }
  return yaml.safeLoad(fs.readFileSync('foo-service-provider/src/main/resources/application.yml')) || {};
}

class Expect {
  addFiles (name, files) {
    if (!_.isArray(this[name])) {
      this[name] = [];
    }
    this[name].push(...files);
  }

  getFiles (name) {
    return this[name];
  }

  // project files

  addProjectFiles (files) {
    this.addFiles('project_files', files);
  }

  getProjectFiles () {
    return this.getFiles('project_files');
  }

  assertProjectFiles () {
    if (this.getProjectFiles()) {
      it('should exist project files', () => {
        assert.file(this.getProjectFiles())
      });
    }
  }

  assertNoProjectFiles () {
    if (this.getProjectFiles()) {
      it('should not exist project files', () => {
        assert.noFile(this.getProjectFiles())
      });
    }
  }

  // provider classes

  addProviderClasses (classes) {
    this.addFiles('provider_classes', classes);
  }

  getProviderClasses () {
    return this.getFiles('provider_classes');
  }

  assertProviderClasses () {
    if (this.getProviderClasses()) {
      it('should exist provider classes', () => {
        assertClasses(this.getProviderClasses());
      });
    }
  }

  assertNoProviderClasses () {
    if (this.getProviderClasses()) {
      it('should not exist provider classes', () => {
        assertNoClasses(this.getProviderClasses());
      });
    }
  }

  // provider test classes

  addProviderTestClasses (classes) {
    this.addFiles('provider_classes.test', classes);
  }

  getProviderTestClasses () {
    return this.getFiles('provider_classes.test');
  }

  assertProviderTestClasses () {
    if (this.getProviderClasses()) {
      it('should exist provider test classes', () => {
        assertTestClasses(this.getProviderTestClasses());
      });
    }
  }

  assertNoProviderTestClasses () {
    if (this.getProviderClasses()) {
      it('should not exist provider test classes', () => {
        assertNoTestClasses(this.getProviderTestClasses());
      });
    }
  }

  // provider resources

  addProviderResources (resources) {
    this.addFiles('provider_resources', resources);
  }

  getProviderResources () {
    return this.getFiles('provider_resources');
  }

  assertProviderResources () {
    if (this.getProviderResources()) {
      it('should exist provider resources', () => {
        assertResources(this.getProviderResources());
      });
    }
  }

  assertNoProviderResources () {
    if (this.getProviderResources()) {
      it('should not exist provider resources', () => {
        assertNoResources(this.getProviderResources());
      });
    }
  }

  // root artifacts

  addRootArtifacts (artifact) {
    this.addFiles('root_artifacts', artifact);
  }

  getRootArtifacts () {
    return this.getFiles('root_artifacts');
  }

  assertRootArtifacts () {
    if (this.getRootArtifacts()) {
      it('should exist root artifacts', () => {
        assertRootArtifacts(this.getRootArtifacts());
      });
    }
  }

  assertNoRootArtifacts () {
    if (this.getRootArtifacts()) {
      it('should not exist root artifacts', () => {
        assertNoRootArtifacts(this.getRootArtifacts());
      });
    }
  }

  // provider artifacts

  addProviderArtifacts (artifact) {
    this.addFiles('provider_artifacts', artifact);
  }

  getProviderArtifacts () {
    return this.getFiles('provider_artifacts');
  }

  assertProviderArtifacts () {
    if (this.getProviderArtifacts()) {
      it('should exist provider artifacts', () => {
        assertProviderArtifacts(this.getProviderArtifacts());
      });
    }
  }

  assertNoProviderArtifacts () {
    if (this.getProviderArtifacts()) {
      it('should not exist provider artifacts', () => {
        assertNoProviderArtifacts(this.getProviderArtifacts());
      });
    }
  }

  assertAll () {
    const keys = [];
    Object.getOwnPropertyNames(Object.getPrototypeOf(this)).map(name => {
      keys.push(name);
    })
    Object.keys(this).map(key => {
      keys.push(key);
    })

    keys.map(key => {
      if (key.match(/^assert.*/) && !key.startsWith('assertNo')) {
        if (key === 'assertAll') {
          return;
        }
        const func = this[key];
        if (func && typeof func === 'function') {
          this[key]();
        }
      }
    })
  }

  assertNoAll () {
    const keys = [];
    Object.getOwnPropertyNames(Object.getPrototypeOf(this)).map(name => {
      keys.push(name);
    })
    Object.keys(this).map(key => {
      keys.push(key);
    })

    keys.map(key => {
      if (key.match(/^assertNo.*/)) {
        if (key === 'assertNoAll') {
          return;
        }
        const func = this[key];
        if (func && typeof func === 'function') {
          this[key]();
        }
      }
    })
  }
}

const expects = {
  required: new Expect(),
  demo: new Expect(),
  eureka: new Expect(),
  feign: new Expect(),
  hystrix: new Expect(),
  sentinel: new Expect(),
  mybatis: new Expect(),
  mybatisplus: new Expect(),
  rabbitmq: new Expect(),
  druid: new Expect(),
  apollo: new Expect(),
  jwtShiro: new Expect(),
  thymeleaf: new Expect(),
  redis: new Expect(),
  skywalking: new Expect(),
  fastjson: new Expect(),
  gson: new Expect(),
  log4j2: new Expect()
};

const required = expects.required;
required.addProjectFiles([
  'pom.xml',
  '.gitignore',
  'filebeat.yml',
  'start-fb.sh',
  'start-code.sh',
  'Dockerfile',
  'entrypoint.sh',
  'run.sh',
  'LICENSE',
  'README.md',
  '1.docs/guides/quickly_start.md',
  '1.docs/guides/reference.md',
  '1.docs/guides/dev_reference.md',
  '1.docs/sql/v1.0.0/schema.sql',
  '1.docs/sql/v1.0.0/data.sql',
  'scaffold.md',

  'package.json',
  'commitlint.config.js'
])
required.addProviderClasses([
  'StartupApplication.java',
  'config/ApplicationConfiguration.java',
  'config/web/ReturnValueConfigurer.java',
  'controller/Payload.java',
  'config/web/ApplicationErrorAttributes.java',
  'exception/BizErrorResponseStatus.java',
  'config/web/ConverterConfigurer.java',
  'util/ConverterUtils.java',
  'util/ValidationUtils.java',
  'domain/.gitkeep',
  'domain/dto/.gitkeep',
  'domain/entity/.gitkeep',
  'domain/query/.gitkeep',
  'domain/query/PaginationRequest.java',
  'domain/vo/.gitkeep',
  'domain/vo/Pagination.java'
]);
required.addProviderResources([
  // 'pom.xml',   // TODO::

  'application.properties',
  'application.yml',
  'application-local.yml',
  'application-dev.yml',
  'application-qa.yml',
  'application-prod.yml'
])
required.addProviderTestClasses([
  'BaseTest.java'
])
required.addRootArtifacts([
  'versions-maven-plugin'
])
required.addProviderArtifacts([
  'foo-service-api',
  'spring-boot-starter-web',
  'guava',
  'commons-lang3',
  'lombok',
  'spring-boot-devtools',
  'spring-boot-maven-plugin',
  'joda-time',
  'hutool-all',

  // test dependencies
  'spring-boot-starter-test'
]);
required.assertProperties = () => {
  it('should have properties', () => {
    const yaml = readYamlConfigs();
    assert(yaml.swagger);
    assert(yaml.spring.application.name);
  });

  it('should disabled swagger on env prod', () => {
    const yaml = readYamlConfigs('prod');
    assert(yaml.swagger.enabled === false);
  });
}

const demo = expects.demo;
demo.addProviderClasses([
  'controller/DemoController.java',
  'service/DemoService.java',
  'service/impl/DemoServiceImpl.java',
  'exception/DemoException.java',
  'converter/String2DemoControllerModelConverter.java'
]);

demo.addProviderTestClasses([
  'util/DemoTest.java'
])

const eureka = expects.eureka;
eureka.addProviderArtifacts([
  'spring-cloud-starter-netflix-eureka-client'
])
eureka.assertProperties = () => {
  it('should have properties', () => {
    assert(readYamlConfigs().eureka.client);
    assert(readYamlConfigs('local').eureka.client);
  });
}

const feign = expects.feign;
feign.addProviderClasses([
  'controller/OpenFeignDemoController.java',
  'remote/DemoFeignClient.java'
])
feign.addProviderArtifacts([
  'spring-cloud-starter-openfeign'
])

const hystrix = expects.hystrix;
hystrix.assertProperties = () => {
  it('should have properties', () => {
    const yaml = readYamlConfigs();
    assert(yaml.feign.hystrix);
  });
}

const sentinel = expects.sentinel;
sentinel.addProviderArtifacts([
  'spring-cloud-starter-alibaba-sentinel'
])
sentinel.assertProperties = () => {
  it('should have properties', () => {
    const yaml = readYamlConfigs();
    assert(yaml.feign.sentinel);
  });
}

const mybatis = expects.mybatis;
mybatis.addProviderArtifacts([
  'mybatis-spring-boot-starter'
])
mybatis.assertProperties = () => {
  it('should have properties', () => {
    assert(readYamlConfigs().mybatis);
  });
}
mybatis.assertOthers = () => {
  describe('other', () => {
    it('should have provider classes', () => {
      assertClasses([
        'controller/CrudDemoController.java',
        'service/CrudDemoService.java',
        'service/impl/CrudDemoServiceImpl.java',
        'mapper/DemoMapper.java',
        'domain/DemoDo.java'
      ])
    });
    it('should have provider resources', () => {
      assertResources(['mapper/.gitkeep'])
    });
  });
}

const mybatisplus = expects.mybatisplus;
mybatisplus.addProviderArtifacts([
  'mybatis-plus-boot-starter'
])
mybatisplus.assertProperties = () => {
  it('should have configs', () => {
    assert(readYamlConfigs().mybatis);
  });
}
mybatisplus.addProviderClasses([
  'config/ApplicationMetaObjectHandler.java'
])
mybatisplus.assertContent = () => {
  it('should exist contents', () => {
    assert.fileContent([
      ['foo-service-provider/src/main/java/com/deepexi/foo/config/ApplicationConfiguration.java', /ApplicationMetaObjectHandler.RuntimeData/]
    ])
  });
}

mybatisplus.assertOthers = () => {
  describe('other', () => {
    it('should have provider classes', () => {
      assertClasses([
        'controller/CrudDemoController.java',
        'service/CrudDemoService.java',
        'service/impl/CrudDemoServiceImpl.java',
        'mapper/DemoMapper.java',
        'domain/DemoDo.java'
      ])
    });
    it('should have provider resources', () => {
      assertResources(['mapper/.gitkeep'])
    });
  });
}

const rabbitmq = expects.rabbitmq;
rabbitmq.addProviderArtifacts([
  'spring-boot-starter-amqp'
])
rabbitmq.assertProperties = () => {
  it('should have properties', () => {
    assert(readYamlConfigs('local').spring.rabbitmq);
  });
}
rabbitmq.addProviderClasses([
  'config/RabbitMQConfiguration.java'
])
rabbitmq.assertDemoFiles = () => {
  it('should exist demo files', () => {
    assertClasses([
      'controller/MQDemoController.java',
      'service/MQDemoService.java',
      'service/impl/RabbitMQDemoServiceImpl.java',
      'config/RabbitMQDemoConfiguration.java'
    ])
  });
}

const druid = expects.druid;
druid.addProviderArtifacts([
  'druid-spring-boot-starter'
])
druid.assertProperties = () => {
  it('should have properties', () => {
    assert(readYamlConfigs().spring.datasource.druid);
  });
}

const apollo = expects.apollo;
apollo.addProviderArtifacts([
  'apollo-client'
])
apollo.assertProperties = () => {
  it('should have properties', () => {
    assert(readYamlConfigs('bootstrap').apollo);
  });
}
apollo.addProviderResources([
  'META-INF/app.properties'
])

const jwtShiro = expects.jwtShiro;
jwtShiro.addProviderArtifacts([
  'shiro-starter',
  'java-jwt'
])
jwtShiro.addProviderClasses([
  'config/ShiroConfiguration.java',
  'util/AuthUtils.java'
])
jwtShiro.assertProperties = () => {
  it('should have properties', () => {
    const yaml = readYamlConfigs();
    assert(yaml.shiro);
    assert.strictEqual(yaml.shiro.web.mode, 'stateless');
  });
}

const thymeleaf = expects.thymeleaf;
thymeleaf.addProviderArtifacts([
  'spring-boot-starter-thymeleaf'
])
thymeleaf.addProviderClasses([
  // 'controller/ThymeleafDemoController.java'
])
thymeleaf.addProviderResources([
  'templates/demo_page.html'
])
thymeleaf.assertProperties = () => {
  it('should have properties', () => {
    assert.strictEqual(readYamlConfigs().spring.thymeleaf.cache, false);
    assert.strictEqual(readYamlConfigs('prod').spring.thymeleaf.cache, true);
  });
}

const redis = expects.redis;
redis.addProviderArtifacts([
  'spring-boot-starter-data-redis',
  'spring-boot-starter-cache'
])
redis.addProviderClasses([
  'config/CacheConfiguration.java',
  'controller/CacheDemoController.java',
  'service/ObjectCacheDemoService.java',
  'service/StringCacheDemoService.java'
])
redis.assertProperties = () => {
  it('should have properties', () => {
    assert(readYamlConfigs().spring.redis);
    assert(readYamlConfigs('local').spring.redis);
  });
}

const skywalking = expects.skywalking;
skywalking.addProjectFiles([
  '1.docs/guides/integrate_skywalking.md'
])
skywalking.assertREADME = () => {
  it('should contain content', () => {
    assert.fileContent('README.md', /接入SkyWalking/)
    assert.fileContent('entrypoint.sh', /javaagent/)
    assert.fileContent('entrypoint.sh', /skywalking/)
    assert.fileContent('run.sh', /-e SW_SERVICE_ADDR=/)
  });
}
skywalking.assertNoREADME = () => {
  it('should not contain content', () => {
    assert.noFileContent('README.md', /接入SkyWalking/)
    assert.noFileContent('entrypoint.sh', /javaagent/)
    assert.noFileContent('entrypoint.sh', /skywalking/)
    assert.noFileContent('run.sh', /-e SW_SERVICE_ADDR=/)
  });
}

const fastjson = expects.fastjson;
fastjson.addProviderArtifacts([
  'fastjson'
])
fastjson.addProviderClasses([
  'config/web/FastJsonConfigurer.java'
])

const gson = expects.gson;
gson.addProviderArtifacts([
  'gson'
])
gson.addProviderClasses([
  'config/web/GsonConfigurer.java'
])
gson.assertProperties = () => {
  it('should have properties', () => {
    assert.strictEqual(readYamlConfigs().spring.http.converters['preferred-json-mapper'], 'gson')
  });
}
gson.assertNoProperties = () => {
  it('should have properties', () => {
    try {
      assert.notStrictEqual(readYamlConfigs().spring.http.converters['preferred-json-mapper'], 'gson');
    } catch (e) {
    }
  });
}

const log4j2 = expects.log4j2;
log4j2.addProviderArtifacts([
  'spring-boot-starter-log4j2',
  'spring-boot-starter-logging'
])

function assertByExpected (expected, expects) {
  describe('required files or classes', () => {
    for (const key in expects) {
      if (expected.includes(key)) {
        describe(key, () => {
          expects[key].assertAll();
        });
      }
    }
  });

  describe('needless files or classes', () => {
    for (const key in expects) {
      if (!expected.includes(key)) {
        describe(key, () => {
          expects[key].assertNoAll();
        });
      }
    }
  });
}

describe('minimum app', () => {
  before(() => {
    return generate()
  });

  assertByExpected(['required'], expects);
})

describe('minimun app with demo', () => {
  before(() => {
    return generate({
      demo: true
    })
  });

  assertByExpected(['required', 'demo'], expects)
});

describe('optional dependencies', () => {
  describe('eureka', () => {
    before(() => {
      return generate({
        discovery: 'eureka',
        feignCircuit: 'none',
        demo: true
      })
    });

    assertByExpected(['required', 'demo', 'eureka', 'feign'], expects)

    describe('openfeign circuit', () => {
      describe('hystrix', () => {
        before(() => {
          return generate({
            discovery: 'eureka',
            feignCircuit: 'hystrix',
            demo: true
          })
        });

        assertByExpected(['required', 'demo', 'hystrix', 'eureka', 'feign'], expects)
      });

      describe('sentinel', () => {
        before(() => {
          return generate({
            discovery: 'eureka',
            feignCircuit: 'sentinel',
            demo: true
          })
        });

        assertByExpected(['required', 'demo', 'sentinel', 'eureka', 'feign'], expects)
      });
    });
  });

  describe('mysql', () => {
    describe('mybatis', () => {
      before(() => {
        return generate({
          db: 'mysql',
          orm: 'mybatis',
          demo: true
        })
      });

      assertByExpected(['required', 'demo', 'mybatis'], expects)
    });

    describe('mybatis-plus', () => {
      before(() => {
        return generate({
          db: 'mysql',
          orm: 'mybatis-plus',
          demo: true
        })
      });

      assertByExpected(['required', 'demo', 'mybatisplus'], expects)
    });

    describe('druid', () => {
      before(() => {
        return generate({
          db: 'mysql',
          dbPool: 'druid',
          demo: true
        })
      });

      assertByExpected(['required', 'demo', 'druid'], expects)
    });
  });

  describe('mq', () => {
    before(() => {
      return generate({
        mq: 'rabbitmq',
        demo: true
      })
    });

    assertByExpected(['required', 'demo', 'rabbitmq'], expects)
  });

  describe('configservice', () => {
    before(() => {
      return generate({
        configservice: 'apollo',
        demo: true
      })
    });

    assertByExpected(['required', 'demo', 'apollo'], expects)
  });

  describe('authentication', () => {
    describe('jwt & shiro', () => {
      before(() => {
        return generate({
          authentication: 'jwt',
          security: 'shiro',
          demo: true
        })
      });

      assertByExpected(['required', 'demo', 'jwtShiro'], expects)
    });
  });

  describe('template engine', () => {
    describe('thymeleaf', () => {
      before(() => {
        return generate({
          templateEngine: 'thymeleaf',
          demo: true
        })
      });

      assertByExpected(['required', 'demo', 'thymeleaf'], expects)
    });
  });

  describe('cache', () => {
    describe('redis', () => {
      before(() => {
        return generate({
          cache: 'redis',
          demo: true
        })
      });

      assertByExpected(['required', 'demo', 'redis'], expects)
    });
  });

  describe('apm', () => {
    describe('skywalking', () => {
      before(() => {
        return generate({
          apm: 'skywalking',
          demo: true
        })
      });

      assertByExpected(['required', 'demo', 'skywalking'], expects)
    });
  });

  describe('json parser', () => {
    describe('fastjson', () => {
      before(() => {
        return generate({
          jsonParser: 'fastjson',
          demo: true
        })
      });

      assertByExpected(['required', 'demo', 'fastjson'], expects)
    });

    describe('gson', () => {
      before(() => {
        return generate({
          jsonParser: 'gson',
          demo: true
        })
      });

      assertByExpected(['required', 'demo', 'gson'], expects)
    });
  });

  describe('log', () => {
    describe('log4j2', () => {
      before(() => {
        return generate({
          log: 'log4j2',
          demo: true
        })
      });

      assertByExpected(['required', 'demo', 'log4j2'], expects)
    });
  });
});
