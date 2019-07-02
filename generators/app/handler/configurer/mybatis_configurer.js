const _ = require('lodash');

module.exports = {
  key: 'mybatis',
  fn: {
    configureProviderPomDependencies (optionalDependencies) {
      optionalDependencies.push({
        dependency: [
          { groupId: 'org.mybatis.spring.boot' },
          { artifactId: 'mybatis-spring-boot-starter' },
          { version: '2.0.1' }
        ]
      })
    },
    configureApplicationYaml (yaml, env) {
      switch (env) {
        case 'default': {
          _.merge(yaml, {
            mybatis: {
              'mapper-locations': 'classpath:mapper/*.xml'
            }
          });
          break;
        }
        default: {
          break;
        }
      }
    }
  }
}
