const _ = require('lodash');

module.exports = {
  key: 'druid',
  fn: {
    configureProviderPomDependencies (optionalDependencies) {
      optionalDependencies.push({
        dependency: [
          { groupId: 'com.alibaba' },
          { artifactId: 'druid-spring-boot-starter' },
          { version: '1.1.17' }
        ]
      })
    },
    configureApplicationYaml (yaml, env) {
      switch (env) {
        case 'default': {
          _.merge(yaml, {
            spring: {
              datasource: {
                druid: {
                  'web-stat-filter': {
                    enabled: true
                  },
                  'stat-view-servlet': {
                    enabled: true,
                    'login-username': 'root',
                    'login-password': 'root'
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
