const _ = require('lodash');

module.exports = {
  key: 'nacos',
  fn: {
    configureProviderPomDependencies (optionalDependencies) {
      optionalDependencies.push({
        dependency: [
          { groupId: 'com.alibaba.cloud' },
          { artifactId: 'spring-cloud-starter-alibaba-nacos-config' },
          { version: '2.0.2.RELEASE' }
        ]
      })
    },
    configureBootstrapYaml (yaml, props) {
      _.merge(yaml, {
        spring: {
          cloud: {
            nacos: {
              config: {
                'server-addr': '127.0.0.1:8848',
                'file-extension': 'properties'
              }
            }
          }
        }
      });
    }
  }
}
