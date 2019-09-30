const _ = require('lodash');

module.exports = {
  key: 'redis',
  fn: {
    configureProviderPomDependencies (optionalDependencies) {
      optionalDependencies.push({
        dependency: [
          { groupId: 'org.springframework.boot' },
          { artifactId: 'spring-boot-starter-data-redis' }
        ]
      })
      optionalDependencies.push({
        dependency: [
          { groupId: 'org.springframework.boot' },
          { artifactId: 'spring-boot-starter-cache' }
        ]
      })
    },
    configureApplicationYaml (yaml, env) {
      switch (env) {
        case 'local': {
          _.merge(yaml, {
            spring: {
              redis: {
                host: '127.0.0.1',
                port: '6379'
              }
            }
          });
          break;
        }
        case 'default': {
          _.merge(yaml, {
            spring: {
              redis: {
                timeout: 1000
              }
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
