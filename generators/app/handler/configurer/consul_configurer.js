const _ = require('lodash');

module.exports = {
  key: 'consul',
  fn: {
    configureProviderPomDependencies (optionalDependencies) {
      optionalDependencies.push({
        dependency: [
          { groupId: 'org.springframework.cloud' },
          { artifactId: 'spring-cloud-starter-consul-discovery' }
        ]
      })
    },
    configureApplicationYaml (yaml, env) {
      switch (env) {
        case 'local': {
          _.merge(yaml, {
            spring: {
              cloud: {
                consul: {
                  discovery: {
                    'register': false,
                    'enabled': false,
                    'register-health-check': false
                  }
                }
              }
            }
          });
          break;
        }
        case 'default': {
          _.merge(yaml, {
            spring: {
              cloud: {
                consul: {
                  host: 'localhost',
                  port: 8500,
                  discovery: {
                    'prefer-ip-address': true
                  }
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
