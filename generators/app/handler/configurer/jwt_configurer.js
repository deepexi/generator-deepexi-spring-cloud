const _ = require('lodash');

module.exports = {
  key: 'jwt',
  fn: {
    configureProviderPomDependencies (optionalDependencies, props) {
      optionalDependencies.push({
        dependency: [
          { groupId: 'com.auth0' },
          { artifactId: 'java-jwt' },
          { version: '3.8.1' }
        ]
      })
      if (props.security === 'shiro') {
        optionalDependencies.push({
          dependency: [
            { groupId: 'com.github.taccisum' },
            { artifactId: 'shiro-starter' },
            { version: '2.2.0' }
          ]
        })
      }
    },
    configureApplicationYaml (yaml, env, props) {
      if (props.security === 'shiro') {
        switch (env) {
          case 'default': {
            _.merge(yaml, {
              shiro: {
                web: {
                  mode: 'stateless',
                  'filter-chain-definition': {
                    authc: [
                      '/v1/**'
                    ],
                    anon: [
                      '/**'
                    ]
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
}
