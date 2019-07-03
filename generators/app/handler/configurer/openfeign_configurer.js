const _ = require('lodash');

module.exports = {
  key: 'openfeign',
  fn: {
    configureProviderPomDependencies (optionalDependencies) {
      optionalDependencies.push({
        dependency: [
          { groupId: 'org.springframework.cloud' },
          { artifactId: 'spring-cloud-starter-openfeign' }
        ]
      })
    },
    configureApplicationYaml (yaml, env) {
      switch (env) {
        case 'default': {
          _.merge(yaml, {
            feign: {
              hystrix: {
                enabled: true
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
