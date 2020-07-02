const _ = require('lodash');

module.exports = {
  key: 'nacos',
  fn: {
    configureProviderPomDependencies (optionalDependencies, props) {
      if (props.openNacosDiscovery) {
        optionalDependencies.push({
          dependency: [
            { groupId: 'com.alibaba.cloud' },
            { artifactId: 'spring-cloud-starter-alibaba-nacos-discovery' },
            { version: '2.0.2.RELEASE' }
          ]
        })
      }

      if (props.openNacosConfigservice) {
        optionalDependencies.push({
          dependency: [
            { groupId: 'com.alibaba.cloud' },
            { artifactId: 'spring-cloud-starter-alibaba-nacos-config' },
            { version: '2.0.2.RELEASE' }
          ]
        })
      }
    },

    configureApplicationYaml (yaml, env, props) {
      if (props.openNacosDiscovery) {
        switch (env) {
          case 'local': {
            _.merge(yaml, {
              spring: {
                cloud: {
                  nacos: {
                    discovery: {
                      enabled: false
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
                  nacos: {
                    discovery: {
                      'server-addr': '127.0.0.1:8848'
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
    },

    configureBootstrapYaml (yaml, props) {
      if (props.openNacosConfigservice) {
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
}
