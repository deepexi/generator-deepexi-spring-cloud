const _ = require('lodash');

module.exports = {
  key: 'mongodb',
  fn: {
    configureProviderPomDependencies (optionalDependencies) {
      optionalDependencies.push({
        dependency: [
          { groupId: 'org.springframework.boot' },
          { artifactId: 'spring-boot-starter-data-mongodb' }
        ]
      })
    },
    configureApplicationYaml (yaml, env) {
      switch (env) {
        case 'local': {
          _.merge(yaml, {
            spring: {
              data: {
                mongodb: {
                  uri: 'mongodb://user:pass@localhost:27017/db_name'
                }
              }
            }
          });
          break;
        }
        default: {
          _.merge(yaml, {
            spring: {
              data: {
                mongodb: {
                  uri: 'mongodb://user:pass@ip:port/db_name'
                }
              }
            }
          });
          break;
        }
      }
    }
  }
}
