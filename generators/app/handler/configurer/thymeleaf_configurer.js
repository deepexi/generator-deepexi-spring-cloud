const _ = require('lodash');

module.exports = {
  key: 'thymeleaf',
  fn: {
    configureProviderPomDependencies (optionalDependencies) {
      optionalDependencies.push({
        dependency: [
          { groupId: 'org.springframework.boot' },
          { artifactId: 'spring-boot-starter-thymeleaf' }
        ]
      })
    },
    configureApplicationYaml (yaml, env) {
      switch (env) {
        case 'prod': {
          _.merge(yaml, {
            spring: {
              thymeleaf: {
                cache: true
              }
            }
          });
          break;
        }
        case 'default': {
          _.merge(yaml, {
            spring: {
              thymeleaf: {
                cache: false
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
