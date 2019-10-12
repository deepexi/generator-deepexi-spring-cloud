const _ = require('lodash');

module.exports = {
  key: 'fastjson',
  fn: {
    configureProviderPomDependencies (optionalDependencies, props) {
      optionalDependencies.push({
        dependency: [
          { groupId: 'com.alibaba' },
          { artifactId: 'fastjson' },
          { version: '1.2.62' }
        ]
      })
    },
    configureApplicationYaml (yaml, env, props) {
      // if (props.security === 'shiro') {
      //   switch (env) {
      //     case 'default': {
      //       _.merge(yaml, {
      //         shiro: {
      //           web: {
      //             mode: 'stateless',
      //             'filter-chain-definition': {
      //               authc: [
      //                 '/v1/**'
      //               ],
      //               anon: [
      //                 '/**'
      //               ]
      //             }
      //           }
      //         }
      //       });
      //       break;
      //     }
      //   }
      // }
    }
  }
}
