'use strict';

module.exports = {
  key: 'skywalking',
  fn: {
    configureProviderPomDependencies (optionalDependencies, props) {
      switch (props.log) {
        case 'log4j2': {
          break;
        }
        case 'logback': {
          optionalDependencies.push({
            dependency: [
              { groupId: 'org.apache.skywalking' },
              { artifactId: 'apm-toolkit-logback-1.x' },
              { version: props.swVersion }
            ]
          })
          break;
        }
        default: {
          break;
        }
      }
    }
  }
}
