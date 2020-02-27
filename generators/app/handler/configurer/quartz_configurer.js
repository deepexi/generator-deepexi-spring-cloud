const _ = require('lodash');

module.exports = {
  key: 'quartz',
  fn: {
    configureProviderPomDependencies (optionalDependencies) {
      optionalDependencies.push({
        dependency: [
          { groupId: 'org.springframework.boot' },
          { artifactId: 'spring-boot-starter-quartz' }
        ]
      })
    },
    configureApplicationYaml (yaml, env) {
      switch (env) {
        case 'default': {
          _.merge(yaml, {
            spring: {
              quartz: {
                'job-store-type': 'memory',
                properties: {
                  'org.quartz.threadPool.threadCount': 5,
                  'org.quartz.threadPool.threadPriority': 5,
                  'org.quartz.threadPool.threadsInheritContextClassLoaderOfInitializingThread': true,
                  'org.quartz.jobStore.misfireThreshold': 5000
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
