const _ = require('lodash');

module.exports = {
  key: 'prometheus',
  fn: {
    configureProviderPomDependencies (optionalDependencies) {
      optionalDependencies.push({
        dependency: [
          { groupId: 'io.micrometer' },
          { artifactId: 'micrometer-core' }
        ]
      });
      optionalDependencies.push({
        dependency: [
          { groupId: 'io.micrometer' },
          { artifactId: 'micrometer-registry-prometheus' }
        ]
      })
    },
    configureApplicationYaml (yaml, env) {
      switch (env) {
        case 'prod': {
          _.merge(yaml, {
            management: {
              endpoints: {
                web: {
                  exposure: {
                    include: 'health, info, prometheus'
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
