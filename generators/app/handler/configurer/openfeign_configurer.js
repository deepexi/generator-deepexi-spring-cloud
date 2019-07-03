const _ = require('lodash');

module.exports = {
  key: 'openfeign',
  fn: {
    configureProviderPomDependencies (optionalDependencies, props) {
      optionalDependencies.push({
        dependency: [
          { groupId: 'org.springframework.cloud' },
          { artifactId: 'spring-cloud-starter-openfeign' }
        ]
      })

      if (props.feignCircuit === 'sentinel') {
        optionalDependencies.push({
          dependency: [
            { groupId: 'org.springframework.cloud' },
            { artifactId: 'spring-cloud-starter-alibaba-sentinel' },
            { version: '0.9.0.RELEASE' }
          ]
        })
      }
    },
    configureApplicationYaml (yaml, env, props) {
      switch (env) {
        case 'default': {
          switch (props.feignCircuit) {
            case 'hystrix': {
              _.merge(yaml, {
                feign: {
                  hystrix: {
                    enabled: true
                  }
                }
              });
              break;
            }
            case 'sentinel': {
              _.merge(yaml, {
                feign: {
                  sentinel: {
                    enabled: true
                  }
                }
              });
              break;
            }
          }

          break;
        }
        default: {
          break;
        }
      }
    }
  }
}
