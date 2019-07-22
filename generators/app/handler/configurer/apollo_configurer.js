const _ = require('lodash');

module.exports = {
  key: 'apollo',
  fn: {
    configureProviderPomDependencies (optionalDependencies) {
      optionalDependencies.push({
        dependency: [
          { groupId: 'com.ctrip.framework.apollo' },
          { artifactId: 'apollo-client' },
          { version: '1.4.0' }
        ]
      })
    },
    configureBootstrapYaml (yaml, props) {
      _.merge(yaml, {
        apollo: {
          bootstrap: {
            enabled: true,
            namespaces: 'application'
          },
          meta: 'http://127.0.0.1:8080'
        }
      });
    }
  }
}
