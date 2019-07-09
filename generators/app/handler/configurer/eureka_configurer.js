const _ = require('lodash');

module.exports = {
  key: 'eureka',
  fn: {
    configureProviderPomDependencies (optionalDependencies) {
      optionalDependencies.push({
        dependency: [
          { groupId: 'org.springframework.cloud' },
          { artifactId: 'spring-cloud-starter-netflix-eureka-client' }
        ]
      })
    },
    configureApplicationYaml (yaml, env) {
      switch (env) {
        case 'local': {
          _.merge(yaml, {
            eureka: {
              client: {
                'enabled': false,
                'fetch-registry': true,
                'register-with-eureka': false
              }
            }
          });
          break;
        }
        case 'default': {
          _.merge(yaml, {
            eureka: {
              client: {
                'service-url': {
                  defaultZone: 'http://user:pass@127.0.0.1:8761/eureka/'
                }
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
