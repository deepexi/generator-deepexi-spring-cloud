const _ = require('lodash');

module.exports = {
  key: 'shardingsphere',
  fn: {
    configureProviderPomDependencies (optionalDependencies) {
      optionalDependencies.push({
        dependency: [
          { groupId: 'org.apache.shardingsphere' },
          { artifactId: 'sharding-jdbc-spring-boot-starter' },
          { version: '4.0.0-RC1' }
        ]
      });
    },
    configureApplicationYaml (yaml, env) {
      switch (env) {
        case 'local': {
          _.merge(yaml, {
            spring: {
              shardingsphere: {
                datasource: {
                  names: 'ds0,ds1',
                  ds0: {
                    type: 'com.alibaba.druid.pool.DruidDataSource',
                    'driver-class-name': 'com.mysql.jdbc.Driver',
                    url: 'jdbc:mysql://localhost:3306/ds_0?characterEncoding=utf-8',
                    username: 'root',
                    password: 'root'
                  },
                  ds1: {
                    type: 'com.alibaba.druid.pool.DruidDataSource',
                    'driver-class-name': 'com.mysql.jdbc.Driver',
                    url: 'jdbc:mysql://localhost:3306/ds_1?characterEncoding=utf-8',
                    username: 'root',
                    password: 'root'
                  }
                },
                sharding: {
                  'default-database-strategy': {
                    inline: {
                      'sharding-column': 'id',
                      'algorithm-expression': 'ds$->{id % 2}'
                    }
                  },
                  tables: {
                    'user_demo': {
                      'actual-data-nodes': 'ds$->{0..1}.user_demo_$->{0..2}',
                      'table-strategy': {
                        inline: {
                          'sharding-column': 'id',
                          'algorithm-expression': 'user_demo_$->{id % 3}'
                        }
                      },
                      'key-generator': {
                        column: 'id',
                        type: 'SNOWFLAKE'
                      }
                    }
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
};
