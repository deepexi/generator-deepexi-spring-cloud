const _ = require('lodash');

module.exports = {
  key: 'gson',
  fn: {
    configureProviderPomDependencies (optionalDependencies, props) {
      optionalDependencies.push({
        dependency: [
          { groupId: 'com.google.code.gson' },
          { artifactId: 'gson' }
        ]
      })
    },
    configureApplicationYaml (yaml, env, props) {
      switch (env) {
        case 'default': {
          _.merge(yaml, {
            spring: {
              http: {
                converters: {
                  'preferred-json-mapper': 'gson'
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
