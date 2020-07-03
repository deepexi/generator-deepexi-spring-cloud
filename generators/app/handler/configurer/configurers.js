const fs = require('fs');
const path = require('path');
const debug = require('debug')('generator:th:configurers')

const configurers = {};

const files = fs.readdirSync(__dirname);
files.forEach(file => {
  const obj = require(path.join(__dirname, file));
  if (obj.key && obj.fn) {
    configurers[obj.key] = obj.fn;
  }
})

const types = [
  'discovery',
  'db',
  'orm',
  'dbPool',
  'openfeign',
  'mq',
  'configservice',
  'authentication',
  'templateEngine',
  'cache',
  'jsonParser',
  'log',
  'apm',
  'mongodb',
  'prometheus',
  'docker',
  'schedule'
];

configurers.receive = (event, args) => {
  types.forEach(type => {
    const typeVal = args.props[type];
    if (typeVal) {
      let configurer;
      if (typeof typeVal === 'string') {
        configurer = configurers[typeVal];
      } else {
        configurer = configurers[type];
      }
      if (!configurer) {
        debug(`not any configurer found for ${type}[${typeVal}]`);
      } else {
        switch (event) {
          case 'configure_optional_dependencies': {
            if (configurer.configureProviderPomDependencies) {
              debug(`configure provider pom dependencies for ${type}[${typeVal}]`);
              configurer.configureProviderPomDependencies(args.optionalDependencies, args.props, type);
            }
            break;
          }
          case 'configure_application_yaml': {
            if (args.isBootstrap) {
              if (configurer.configureBootstrapYaml) {
                debug(`configure bootstrap.yaml for ${type}[${typeVal}]`);
                configurer.configureBootstrapYaml(args.yaml, args.props);
              }
            } else {
              if (configurer.configureApplicationYaml) {
                debug(`configure application-${args.env}.yaml for ${type}[${typeVal}]`);
                configurer.configureApplicationYaml(args.yaml, args.env, args.props, args.isBootstrap);
              }
            }

            break;
          }
          default: {
            break
          }
        }
      }
    }
  })
}

module.exports = configurers;
