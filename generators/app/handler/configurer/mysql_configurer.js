const _ = require('lodash');

module.exports = {
  key: 'mysql',
  fn: {
    configureProviderPomDependencies (optionalDependencies) {
      optionalDependencies.push({
        dependency: [
          { groupId: 'mysql' },
          { artifactId: 'mysql-connector-java' }
        ]
      })
    },
    configureApplicationYaml (yaml, env) {
      switch (env) {
        case 'default': {
          _.merge(yaml, {
            spring: {
              datasource: {
                'driver-class-name': 'com.mysql.jdbc.Driver'
              }
            }
          });
          break;
        }
        default: {
          _.merge(yaml, {
            spring: {
              datasource: {
                username: 'root',
                password: 'root',
                url: 'jdbc:mysql://127.0.0.1:3306/db_name'
              }
            }
          });
          break;
        }
      }
    }
  }
}
