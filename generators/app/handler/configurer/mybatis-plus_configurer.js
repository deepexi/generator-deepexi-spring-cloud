const _ = require('lodash');

module.exports = {
  key: 'mybatis-plus',
  fn: {
    configureProviderPomDependencies (optionalDependencies) {
      optionalDependencies.push({
        dependency: [
          { groupId: 'com.baomidou' },
          { artifactId: 'mybatis-plus-boot-starter' },
          { version: '3.1.2' }
        ]
      })
    },
    configureApplicationYaml (yaml, env) {
      switch (env) {
        case 'default': {
          _.merge(yaml, {
            mybatis: {
              'mapper-locations': 'classpath:mapper/*.xml'
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
