'use strict'
/* eslint-disable no-undef */

const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const path = require('path')

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
})
