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
  assert.fileContent(
    artifacts.map(artifact => {
      return ['pom.xml', new RegExp('<artifactId>' + artifact + '<\\/artifactId>')];
    })
  )
}

function assertProviderArtifacts (artifacts) {
  assert.fileContent(
    artifacts.map(artifact => {
      return ['foo-service-provider/pom.xml', new RegExp('<artifactId>' + artifact + '<\\/artifactId>')];
    })
  )
}

function assertNoProviderArtifact (artifacts) {
  assert.noFileContent(
    artifacts.map(artifact => {
      return ['foo-service-provider/pom.xml', new RegExp('<artifactId>' + artifact + '<\\/artifactId>')];
    })
  )
}

function assertClasses (classes) {
  assert.file(classes.map(clazz => {
    return `foo-service-provider/src/main/java/com/deepexi/foo/${clazz}`;
  }))
}

function assertNoClasses (classes) {
  assert.noFile(classes.map(clazz => {
    return `foo-service-provider/src/main/java/com/deepexi/foo/${clazz}`;
  }))
}

function assertResources (resources) {
  assert.file(resources.map(resource => {
    return `foo-service-provider/src/main/resources/${resource}`;
  }))
}

function assertNoResources (resources) {
  assert.noFile(resources.map(resource => {
    return `foo-service-provider/src/main/resources/${resource}`;
  }))
}

function readYamlConfigs (env) {
  if (env) {
    if (env === 'bootstrap' || env === 'boot') {
      return yaml.safeLoad(fs.readFileSync(`foo-service-provider/src/main/resources/bootstrap.yml`));
    }
    return yaml.safeLoad(fs.readFileSync(`foo-service-provider/src/main/resources/application-${env}.yml`));
  }
  return yaml.safeLoad(fs.readFileSync('foo-service-provider/src/main/resources/application.yml'));
}

describe('generate app', () => {
  before(() => {
    return generate()
  });

  describe('project root', () => {
    it('should exists project files', () => {
      assert.file([
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
        assertClasses([
          'StartupApplication.java',
          'config/ApplicationConfiguration.java',
          'config/web/ReturnValueConfigurer.java',
          'controller/Payload.java',
          'config/web/ApplicationErrorAttributes.java',
          'exception/BizErrorResponseStatus.java',
          'config/web/ConverterConfigurer.java',
          'util/ConverterUtils.java',
          'domain/.gitkeep',
          'domain/dto/.gitkeep',
          'domain/entity/.gitkeep',
          'domain/query/.gitkeep',
          'domain/query/PaginationRequest.java',
          'domain/vo/.gitkeep',
          'domain/vo/Pagination.java'
        ])
      })

      it('should exists files', () => {
        assert.file([
          'foo-service-provider/pom.xml',

          'foo-service-provider/src/main/resources/application.properties',
          'foo-service-provider/src/main/resources/application.yml',
          'foo-service-provider/src/main/resources/application-local.yml',
          'foo-service-provider/src/main/resources/application-dev.yml',
          'foo-service-provider/src/main/resources/application-qa.yml',
          'foo-service-provider/src/main/resources/application-prod.yml'
        ])
      });

      it('should exists test java files', () => {
      })

      it('should exists test resources files', () => {
      })
    });
  });

  describe('required dependencies', () => {
    describe('swagger', () => {
      it('should have dependency', () => {
        assertRootArtifacts([
          'versions-maven-plugin'
        ])

        assertProviderArtifacts([
          'foo-service-api',
          'spring-boot-starter-web',
          'guava',
          'commons-lang3',
          'lombok',
          'spring-boot-devtools',
          'spring-boot-maven-plugin',
          'joda-time',
          'hutool-all'
        ])
      });

      it('should have test dependency', () => {
        assertProviderArtifacts([
          'spring-boot-starter-test'
        ])
      });

      it('should have properties', () => {
        const yaml = readYamlConfigs();
        assert(yaml.swagger);
        assert(yaml.spring.application.name);
      });

      it('should disabled on env prod', () => {
        const yaml = readYamlConfigs('prod');
        assert(yaml.swagger.enabled === false);
      });
    });
  });
})

describe('generate demo', () => {
  before(() => {
    return generate({
      demo: true
    })
  });

  it('should exists classes', () => {
    assertClasses([
      'controller/DemoController.java',
      'service/DemoService.java',
      'service/impl/DemoServiceImpl.java',
      'exception/DemoException.java',
      'converter/String2DemoControllerModelConverter.java'
    ])
  });
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

    it('should have dependency', () => {
      assertProviderArtifacts([
        'spring-cloud-starter-netflix-eureka-client'
      ])
    });

    it('should have properties', () => {
      assert(readYamlConfigs().eureka.client);
      assert(readYamlConfigs('local').eureka.client);
    });

    describe('openfeign', () => {
      it('should exist demo files', () => {
        assertClasses([
          'controller/OpenFeignDemoController.java',
          'remote/DemoFeignClient.java'
        ])
      });

      it('should have dependency', () => {
        assertProviderArtifacts([
          'spring-cloud-starter-openfeign'
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
          return generate({
            discovery: 'eureka',
            feignCircuit: 'hystrix',
            demo: true
          })
        });

        it('should have properties', () => {
          const yaml = readYamlConfigs();
          assert(yaml.feign.hystrix);
        });
      });

      describe('sentinel', () => {
        before(() => {
          return generate({
            discovery: 'eureka',
            feignCircuit: 'sentinel',
            demo: true
          })
        });

        it('should have dependency', () => {
          assertProviderArtifacts([
            'spring-cloud-starter-alibaba-sentinel'
          ])
        });

        it('should have properties', () => {
          const yaml = readYamlConfigs();
          assert(yaml.feign.sentinel);
        });
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

      it('should have dependency', () => {
        assertProviderArtifacts([
          'mybatis-spring-boot-starter'
        ])
      });

      it('should have properties', () => {
        assert(readYamlConfigs().mybatis);
      });

      it('should exist files', () => {
        assert.file('foo-service-provider/src/main/resources/mapper/.gitkeep')
      });

      it('should exist demo files', () => {
        assertClasses([
          'controller/CrudDemoController.java',
          'service/CrudDemoService.java',
          'service/impl/CrudDemoServiceImpl.java',
          'mapper/DemoMapper.java',
          'domain/DemoDo.java'
        ])
      });
    });

    describe('mybatis-plus', () => {
      before(() => {
        return generate({
          db: 'mysql',
          orm: 'mybatis-plus',
          demo: true
        })
      });

      it('should have dependency', () => {
        assertProviderArtifacts([
          'mybatis-plus-boot-starter'
        ])
      });

      it('should have properties', () => {
        assert(readYamlConfigs().mybatis);
      });

      it('should exist files', () => {
        assert.file('foo-service-provider/src/main/resources/mapper/.gitkeep')
        assertClasses([
          'config/ApplicationMetaObjectHandler.java'
        ])
      });

      it('should exist contents', () => {
        assert.fileContent([
          ['foo-service-provider/src/main/java/com/deepexi/foo/config/ApplicationConfiguration.java', /ApplicationMetaObjectHandler.RuntimeData/]
        ])
      });

      it('should exist demo files', () => {
        assertClasses([
          'controller/CrudDemoController.java',
          'service/CrudDemoService.java',
          'service/impl/CrudDemoServiceImpl.java',
          'mapper/DemoMapper.java',
          'domain/DemoDo.java'
        ])
      });
    });

    describe('druid', () => {
      before(() => {
        return generate({
          db: 'mysql',
          dbPool: 'druid'
        })
      });

      it('should have dependency', () => {
        assertProviderArtifacts([
          'druid-spring-boot-starter'
        ])
      });

      it('should have properties', () => {
        assert(readYamlConfigs().spring.datasource.druid);
      });
    });
  });

  describe('mq', () => {
    before(() => {
      return generate({
        mq: 'rabbitmq',
        demo: true
      })
    });

    it('should have dependency', () => {
      assertProviderArtifacts([
        'spring-boot-starter-amqp'
      ])
    });

    it('should have properties', () => {
      assert(readYamlConfigs('local').spring.rabbitmq);
    });

    it('should exist files', () => {
      assertClasses([
        'config/RabbitMQConfiguration.java'
      ])
    });

    it('should exist demo files', () => {
      assertClasses([
        'controller/MQDemoController.java',
        'service/MQDemoService.java',
        'service/impl/RabbitMQDemoServiceImpl.java',
        'config/RabbitMQDemoConfiguration.java'
      ])
    });
  });

  describe('configservice', () => {
    before(() => {
      return generate({
        configservice: 'apollo',
        demo: true
      })
    });

    it('should have dependency', () => {
      assertProviderArtifacts([
        'apollo-client'
      ])
    });

    it('should have properties', () => {
      assert(readYamlConfigs('bootstrap').apollo);
    });

    it('should exist files', () => {
      assert.file('foo-service-provider/src/main/resources/META-INF/app.properties')
    });

    it('should exist demo files', () => {
    });
  });

  describe('authentication', () => {
    const expects = {
      jwtAndShiro: {
        artifact: {
          provider: [
            'shiro-starter',
            'java-jwt'
          ]
        },
        classes: [
          'config/ShiroConfiguration.java',
          'util/AuthUtils.java'
        ]
      }
    }
    describe('jwt & shiro', () => {
      const expect = expects.jwtAndShiro;

      before(() => {
        return generate({
          authentication: 'jwt',
          security: 'shiro',
          demo: true
        })
      });

      it('should have dependency', () => {
        assertProviderArtifacts(expect.artifact.provider);
      });

      it('should have properties', () => {
        const yaml = readYamlConfigs();
        assert(yaml.shiro);
        assert.strictEqual(yaml.shiro.web.mode, 'stateless');
      });

      it('should exist classes', () => {
        assertClasses(expect.classes);
      });

      it('should exist demo files', () => {
      });
    });

    describe('none', () => {
      const expect = {
        artifact: {
          provider: []
        },
        classes: []
      };
      for (const key in expects) {
        expect.artifact.provider.push(expects[key].artifact.provider);
        expect.classes.push(expects[key].classes);
      }

      before(() => {
        return generate({
          authentication: 'none',
          demo: true
        })
      });

      it('should not have dependency', () => {
        assertNoProviderArtifact(expect.artifact.provider);
      });

      it('should not have properties', () => {
        const yaml = readYamlConfigs();
        assert(!yaml.shiro);
      });

      it('should not exist classes', () => {
        assertNoClasses(expect.classes);
      });
    });
  });

  describe('template engine', () => {
    const expects = {
      thymeleaf: {
        artifact: {
          provider: [
            'spring-boot-starter-thymeleaf'
          ]
        },
        classes: [
          'controller/ThymeleafDemoController.java'
        ],
        resources: [
          'templates/demo_page.html'
        ]
      }
    }
    describe('thymeleaf', () => {
      const expect = expects.thymeleaf;

      before(() => {
        return generate({
          templateEngine: 'thymeleaf',
          demo: true
        })
      });

      it('should have dependency', () => {
        assertProviderArtifacts(expect.artifact.provider);
      });

      it('should have properties', () => {
        assert.strictEqual(readYamlConfigs().spring.thymeleaf.cache, false);
        assert.strictEqual(readYamlConfigs('prod').spring.thymeleaf.cache, true);
      });

      it('should exist classes', () => {
        assertClasses(expect.classes);
      });

      it('should exist resources', () => {
        assertResources(expect.resources);
      });
    });

    describe('none', () => {
      const expect = {
        artifact: {
          provider: []
        },
        classes: [],
        resources: []
      };
      for (const key in expects) {
        expect.artifact.provider.push(expects[key].artifact.provider);
        expect.classes.push(expects[key].classes);
        expect.resources.push(expects[key].resources);
      }

      before(() => {
        return generate({
          templateEngine: 'none',
          demo: true
        })
      });

      it('should not have dependency', () => {
        assertNoProviderArtifact(expect.artifact.provider);
      });

      it('should not have properties', () => {
        assert(!readYamlConfigs().spring.thymeleaf);
        assert(!readYamlConfigs('prod').spring.thymeleaf);
      });

      it('should not exist classes', () => {
        assertNoClasses(expect.classes);
      });

      it('should not exist resources', () => {
        assertNoResources(expect.resources);
      });
    });
  });
});
