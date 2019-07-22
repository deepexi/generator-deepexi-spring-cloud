const _ = require('lodash');

module.exports = {
  key: 'rabbitmq',
  fn: {
    configureProviderPomDependencies (optionalDependencies) {
      optionalDependencies.push({
        dependency: [
          { groupId: 'org.springframework.boot' },
          { artifactId: 'spring-boot-starter-amqp' }
        ]
      })
    },
    configureApplicationYaml (yaml, env) {
      switch (env) {
        case 'local': {
          _.merge(yaml, {
            spring: {
              rabbitmq: {
                host: 'localhost',
                port: 5672,
                username: 'guest',
                password: 'guest'
              }
            }
          });
          break;
        }
        case 'default': {
          break;
        }
        default: {
          break;
        }
      }
    }
  }
}
