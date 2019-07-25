'use strict'
/* eslint-disable no-undef */

const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const path = require('path')
const fs = require('fs');
const yaml = require('js-yaml');

describe('generate app', () => {
  before(() => {
    return helpers
      .run(path.join(__dirname, '../../app'))
      .withPrompts({
        groupId: 'com.deepexi',
        artifactId: 'foo-service',
        basePackage: 'com.deepexi.foo'
      })
      .then(() => {
      })
  });

  describe('exists files', () => {
    it('should exists project files', () => {
      assert.file('pom.xml')
      assert.file('.gitignore')
      assert.file('filebeat.yml')
      assert.file('start-fb.sh')
      assert.file('start-code.sh')
      assert.file('Dockerfile')
      assert.file('entrypoint.sh')
      assert.file('run.sh')
      assert.file('LICENSE')
      assert.file('README.md')
      assert.file('scaffold.md')
    })

    describe('api', () => {
      it('should exists java files', () => {
      })

      it('should exists resources files', () => {
      })

      it('should exists test java files', () => {
      })

      it('should exists test resources files', () => {
      })
    });

    describe('provider', () => {
      it('should exists java files', () => {
        assert.file('foo-service-provider/src/main/java/com/deepexi/foo/StartupApplication.java')
        assert.file('foo-service-provider/src/main/java/com/deepexi/foo/config/ApplicationConfiguration.java')
        assert.file('foo-service-provider/src/main/java/com/deepexi/foo/config/web/ReturnValueConfigurer.java')
        assert.file('foo-service-provider/src/main/java/com/deepexi/foo/controller/Payload.java')
        assert.file('foo-service-provider/src/main/java/com/deepexi/foo/config/web/ApplicationErrorAttributes.java')
        assert.file('foo-service-provider/src/main/java/com/deepexi/foo/exception/BizErrorResponseStatus.java')
        assert.file('foo-service-provider/src/main/java/com/deepexi/foo/config/web/ConverterConfigurer.java')
        assert.file('foo-service-provider/src/main/java/com/deepexi/foo/util/ConverterUtils.java')
        assert.file('foo-service-provider/pom.xml')
      })

      it('should exists resources files', () => {
        assert.file('foo-service-provider/src/main/resources/application.yml')
        assert.file('foo-service-provider/src/main/resources/application-local.yml')
        assert.file('foo-service-provider/src/main/resources/application-dev.yml')
        assert.file('foo-service-provider/src/main/resources/application-qa.yml')
        assert.file('foo-service-provider/src/main/resources/application-prod.yml')
      })

      it('should exists test java files', () => {
      })

      it('should exists test resources files', () => {
      })
    });
  });

  describe('required dependencies', () => {
    describe('swagger', () => {
      it('should have dependency', () => {
        assert.fileContent([
          ['foo-service-provider/pom.xml', /<artifactId>foo-service-api<\/artifactId>/],
          ['foo-service-provider/pom.xml', /<artifactId>spring-boot-starter-web<\/artifactId>/],
          ['foo-service-provider/pom.xml', /<artifactId>guava<\/artifactId>/],
          ['foo-service-provider/pom.xml', /<artifactId>commons-lang3<\/artifactId>/],
          ['foo-service-provider/pom.xml', /<artifactId>lombok<\/artifactId>/],
          ['foo-service-provider/pom.xml', /<artifactId>spring-boot-devtools<\/artifactId>/],
          ['foo-service-provider/pom.xml', /<artifactId>spring-boot-maven-plugin<\/artifactId>/],
          ['foo-service-provider/pom.xml', /<artifactId>joda-time<\/artifactId>/],
          ['foo-service-provider/pom.xml', /<artifactId>hutool-all<\/artifactId>/]
        ])
      });

      it('should have properties', () => {
        const appYaml = yaml.safeLoad(fs.readFileSync('foo-service-provider/src/main/resources/application.yml'));
        assert(appYaml.swagger);
        assert(appYaml.spring.application.name);
      });

      it('should disabled on env prod', () => {
        assert(yaml.safeLoad(fs.readFileSync('foo-service-provider/src/main/resources/application-prod.yml')).swagger.enabled === false);
      });
    });
  });
})

describe('generate demo', () => {
  before(() => {
    return helpers
      .run(path.join(__dirname, '../../app'))
      .withPrompts({
        groupId: 'com.deepexi',
        artifactId: 'foo-service',
        basePackage: 'com.deepexi.foo',
        demo: true
      })
      .then(() => {
      })
  });

  it('should exists files', () => {
    assert.file('foo-service-provider/src/main/java/com/deepexi/foo/controller/DemoController.java')
    assert.file('foo-service-provider/src/main/java/com/deepexi/foo/service/DemoService.java')
    assert.file('foo-service-provider/src/main/java/com/deepexi/foo/service/impl/DemoServiceImpl.java')
    assert.file('foo-service-provider/src/main/java/com/deepexi/foo/exception/DemoException.java')
    assert.file('foo-service-provider/src/main/java/com/deepexi/foo/converter/String2DemoControllerModelConverter.java')
  });
});

describe('optional dependencies', () => {
  describe('eureka', () => {
    before(() => {
      return helpers
        .run(path.join(__dirname, '../../app'))
        .withPrompts({
          groupId: 'com.deepexi',
          artifactId: 'foo-service',
          basePackage: 'com.deepexi.foo',
          discovery: 'eureka',
          feignCircuit: 'none',
          demo: true
        })
        .then(() => {
        })
    });

    it('should have dependency', () => {
      assert.fileContent([
        ['foo-service-provider/pom.xml', /<groupId>org.springframework.cloud<\/groupId>/],
        ['foo-service-provider/pom.xml', /<artifactId>spring-cloud-starter-netflix-eureka-client<\/artifactId>/]
      ])
    });

    it('should have properties', () => {
      assert(yaml.safeLoad(fs.readFileSync('foo-service-provider/src/main/resources/application.yml')).eureka.client);
      assert(yaml.safeLoad(fs.readFileSync('foo-service-provider/src/main/resources/application-local.yml')).eureka.client);
    });

    describe('openfeign', () => {
      it('should exist demo files', () => {
        assert.file('foo-service-provider/src/main/java/com/deepexi/foo/controller/OpenFeignDemoController.java')
        assert.file('foo-service-provider/src/main/java/com/deepexi/foo/remote/DemoFeignClient.java')
      });

      it('should have dependency', () => {
        assert.fileContent([
          ['foo-service-provider/pom.xml', /<groupId>org.springframework.cloud<\/groupId>/],
          ['foo-service-provider/pom.xml', /<artifactId>spring-cloud-starter-openfeign<\/artifactId>/]
        ])
      });

      it('should exist annotations', () => {
        assert.fileContent([
          ['foo-service-provider/src/main/java/com/deepexi/foo/StartupApplication.java', /import org.springframework.cloud.openfeign.EnableFeignClients;/],
          ['foo-service-provider/src/main/java/com/deepexi/foo/StartupApplication.java', /@EnableFeignClients/]
        ])
      });

      describe('hystrix', () => {
        before(() => {
          return helpers
            .run(path.join(__dirname, '../../app'))
            .withPrompts({
              groupId: 'com.deepexi',
              artifactId: 'foo-service',
              basePackage: 'com.deepexi.foo',
              discovery: 'eureka',
              feignCircuit: 'hystrix',
              demo: true
            })
            .then(() => {
            })
        });

        it('should have properties', () => {
          const appYaml = yaml.safeLoad(fs.readFileSync('foo-service-provider/src/main/resources/application.yml'));
          assert(appYaml.feign.hystrix);
        });
      });

      describe('sentinel', () => {
        before(() => {
          return helpers
            .run(path.join(__dirname, '../../app'))
            .withPrompts({
              groupId: 'com.deepexi',
              artifactId: 'foo-service',
              basePackage: 'com.deepexi.foo',
              discovery: 'eureka',
              feignCircuit: 'sentinel',
              demo: true
            })
            .then(() => {
            })
        });

        it('should have dependency', () => {
          assert.fileContent([
            ['foo-service-provider/pom.xml', /<groupId>org.springframework.cloud<\/groupId>/],
            ['foo-service-provider/pom.xml', /<artifactId>spring-cloud-starter-alibaba-sentinel<\/artifactId>/]
          ])
        });

        it('should have properties', () => {
          const appYaml = yaml.safeLoad(fs.readFileSync('foo-service-provider/src/main/resources/application.yml'));
          assert(appYaml.feign.sentinel);
        });
      });
    });
  });

  describe('mysql', () => {
    // it('should ', () => {

    // });

    describe('mybatis', () => {
      before(() => {
        return helpers
          .run(path.join(__dirname, '../../app'))
          .withPrompts({
            groupId: 'com.deepexi',
            artifactId: 'foo-service',
            basePackage: 'com.deepexi.foo',
            db: 'mysql',
            orm: 'mybatis',
            demo: true
          })
          .then(() => {
          })
      });

      it('should have dependency', () => {
        assert.fileContent([
          ['foo-service-provider/pom.xml', /<groupId>org.mybatis.spring.boot<\/groupId>/],
          ['foo-service-provider/pom.xml', /<artifactId>mybatis-spring-boot-starter<\/artifactId>/]
        ])
      });

      it('should have properties', () => {
        assert(yaml.safeLoad(fs.readFileSync('foo-service-provider/src/main/resources/application.yml')).mybatis);
      });

      it('should exist files', () => {
        assert.file('foo-service-provider/src/main/resources/mapper/.gitkeep')
      });

      it('should exist demo files', () => {
        assert.file('foo-service-provider/src/main/java/com/deepexi/foo/controller/CrudDemoController.java')
        assert.file('foo-service-provider/src/main/java/com/deepexi/foo/service/CrudDemoService.java')
        assert.file('foo-service-provider/src/main/java/com/deepexi/foo/service/impl/CrudDemoServiceImpl.java')
        assert.file('foo-service-provider/src/main/java/com/deepexi/foo/mapper/DemoMapper.java')
        assert.file('foo-service-provider/src/main/java/com/deepexi/foo/domain/DemoDo.java')
      });
    });

    describe('mybatis-plus', () => {
      before(() => {
        return helpers
          .run(path.join(__dirname, '../../app'))
          .withPrompts({
            groupId: 'com.deepexi',
            artifactId: 'foo-service',
            basePackage: 'com.deepexi.foo',
            db: 'mysql',
            orm: 'mybatis-plus',
            demo: true
          })
          .then(() => {
          })
      });

      it('should have dependency', () => {
        assert.fileContent([
          ['foo-service-provider/pom.xml', /<groupId>com.baomidou<\/groupId>/],
          ['foo-service-provider/pom.xml', /<artifactId>mybatis-plus-boot-starter<\/artifactId>/]
        ])
      });

      it('should have properties', () => {
        assert(yaml.safeLoad(fs.readFileSync('foo-service-provider/src/main/resources/application.yml')).mybatis);
      });

      it('should exist files', () => {
        assert.file('foo-service-provider/src/main/resources/mapper/.gitkeep')
        assert.file('foo-service-provider/src/main/java/com/deepexi/foo/config/ApplicationMetaObjectHandler.java')
      });

      it('should exist contents', () => {
        assert.fileContent([
          ['foo-service-provider/src/main/java/com/deepexi/foo/config/ApplicationConfiguration.java', /ApplicationMetaObjectHandler.RuntimeData/]
        ])
      });

      it('should exist demo files', () => {
        assert.file('foo-service-provider/src/main/java/com/deepexi/foo/controller/CrudDemoController.java')
        assert.file('foo-service-provider/src/main/java/com/deepexi/foo/service/CrudDemoService.java')
        assert.file('foo-service-provider/src/main/java/com/deepexi/foo/service/impl/CrudDemoServiceImpl.java')
        assert.file('foo-service-provider/src/main/java/com/deepexi/foo/mapper/DemoMapper.java')
        assert.file('foo-service-provider/src/main/java/com/deepexi/foo/domain/DemoDo.java')
      });
    });

    describe('druid', () => {
      before(() => {
        return helpers
          .run(path.join(__dirname, '../../app'))
          .withPrompts({
            groupId: 'com.deepexi',
            artifactId: 'foo-service',
            basePackage: 'com.deepexi.foo',
            db: 'mysql',
            dbPool: 'druid'
          })
          .then(() => {
          })
      });

      it('should have dependency', () => {
        assert.fileContent([
          ['foo-service-provider/pom.xml', /<groupId>com.alibaba<\/groupId>/],
          ['foo-service-provider/pom.xml', /<artifactId>druid-spring-boot-starter<\/artifactId>/]
        ])
      });

      it('should have properties', () => {
        assert(yaml.safeLoad(fs.readFileSync('foo-service-provider/src/main/resources/application.yml')).spring.datasource.druid);
      });
    });
  });

  describe('mq', () => {
    before(() => {
      return helpers
        .run(path.join(__dirname, '../../app'))
        .withPrompts({
          groupId: 'com.deepexi',
          artifactId: 'foo-service',
          basePackage: 'com.deepexi.foo',
          mq: 'rabbitmq',
          demo: true
        })
        .then(() => {
        })
    });

    it('should have dependency', () => {
      assert.fileContent([
        ['foo-service-provider/pom.xml', /<groupId>org.springframework.boot<\/groupId>/],
        ['foo-service-provider/pom.xml', /<artifactId>spring-boot-starter-amqp<\/artifactId>/]
      ])
    });

    it('should have properties', () => {
      assert(yaml.safeLoad(fs.readFileSync('foo-service-provider/src/main/resources/application-local.yml')).spring.rabbitmq);
    });

    it('should exist files', () => {
      assert.file('foo-service-provider/src/main/java/com/deepexi/foo/config/RabbitMQConfiguration.java')
    });

    it('should exist demo files', () => {
      assert.file('foo-service-provider/src/main/java/com/deepexi/foo/controller/MQDemoController.java')
      assert.file('foo-service-provider/src/main/java/com/deepexi/foo/service/MQDemoService.java')
      assert.file('foo-service-provider/src/main/java/com/deepexi/foo/service/impl/RabbitMQDemoServiceImpl.java')
      assert.file('foo-service-provider/src/main/java/com/deepexi/foo/config/RabbitMQDemoConfiguration.java')
    });
  });

  describe('configservice', () => {
    before(() => {
      return helpers
        .run(path.join(__dirname, '../../app'))
        .withPrompts({
          groupId: 'com.deepexi',
          artifactId: 'foo-service',
          basePackage: 'com.deepexi.foo',
          configservice: 'apollo',
          demo: true
        })
        .then(() => {
        })
    });

    it('should have dependency', () => {
      assert.fileContent([
        ['foo-service-provider/pom.xml', /<groupId>com.ctrip.framework.apollo<\/groupId>/],
        ['foo-service-provider/pom.xml', /<artifactId>apollo-client<\/artifactId>/]
      ])
    });

    it('should have properties', () => {
      assert(yaml.safeLoad(fs.readFileSync('foo-service-provider/src/main/resources/bootstrap.yml')).apollo);
    });

    it('should exist files', () => {
      assert.file('foo-service-provider/src/main/resources/META-INF/app.properties')
    });

    it('should exist demo files', () => {
    });
  });
});
