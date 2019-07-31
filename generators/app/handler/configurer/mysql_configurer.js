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
      optionalDependencies.push({
        dependency: [
          { groupId: 'com.h2database' },
          { artifactId: 'h2' }
        ]
      })
    },
    configureApplicationYaml (yaml, env, props) {
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
        case 'local': {
          _.merge(yaml, {
            spring: {
              datasource: {
                'driver-class-name': 'org.h2.Driver',
                username: 'root',
                password: 'root',
                url: 'jdbc:h2:mem:test'
              },
              h2: {
                console: {
                  enabled: true
                }
              }
            }
          });
          if (props.demo) {
            _.merge(yaml, {
              spring: {
                datasource: {
                  schema: 'classpath:db/sql/demo_schema.sql',
                  data: 'classpath:db/sql/demo_data.sql'
                }
              }
            });
          }
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
