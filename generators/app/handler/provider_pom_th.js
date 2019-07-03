'use strict';

const AbstractTemplateHandler = require('yo-power-generator').AbstractTemplateHandler;
const _ = require('lodash')
const fileUtils = require('yo-power-generator').FileUtils;
const xml = require('xml');
const configurers = require('./configurer/configurers');
const debug = require('debug')('generator:th:provider_pom')
const prettifyXml = require('prettify-xml')

class ProviderPomTemplateHandler extends AbstractTemplateHandler {
  /**
   * @param {*} optionalDependencies
   * @param {Array} types
   */
  _configureOptionalDependencies (optionalDependencies, types) {
    types.forEach(type => {
      const typeVal = this.props[type];
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
          if (configurer.configureProviderPomDependencies) {
            debug(`configure provider pom dependencies for ${type}[${typeVal}]`);
            configurer.configureProviderPomDependencies(optionalDependencies);
          }
        }
      }
    })
  }

  _handle0 () {
    const optionalDependencies = []

    this._configureOptionalDependencies(optionalDependencies, ['discovery', 'db', 'orm', 'dbPool', 'openfeign']);

    const tpl = _.template(this.generator.fs.read(this.generator.templatePath(this.tmpl)));
    const content = prettifyXml(tpl(_.merge(
      {}, this.props, {
        optionalDependencies: xml(optionalDependencies)
      }
    )), { indent: 4, newline: '\n' });

    const destTpl = _.template(fileUtils.tmplToFileName(this.tmpl));
    this.generator.fs.write(
      this.generator.destinationPath(destTpl(this.props)),
      content
    )
  }
}

module.exports = {
  key: 'provider_pom',
  cls: ProviderPomTemplateHandler
};
