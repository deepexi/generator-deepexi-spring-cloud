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
      assert.file('LICENSE')
      assert.file('README.md')
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
          ['foo-service-provider/pom.xml', /<artifactId>swagger-spring-boot2-starter<\/artifactId>/]
        ])
      });

      it('should have properties', () => {
        assert(yaml.safeLoad(fs.readFileSync('foo-service-provider/src/main/resources/application.yml')).swagger);
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
          discovery: 'eureka'
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
  });
});
