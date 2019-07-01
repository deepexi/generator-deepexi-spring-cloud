'use strict';

const AbstractTemplateHandler = require('yo-power-generator').AbstractTemplateHandler;
const _ = require('lodash')
const fileUtils = require('yo-power-generator').FileUtils;
const xml = require('xml');
const configurers = require('./configurer/configurers');
const debug = require('debug')('generator:th:provider_pom')
const prettifyXml = require('prettify-xml')

class ProviderPomTemplateHandler extends AbstractTemplateHandler {
  _handle0 () {
    const optionalDependencies = []

    switch (this.props.discovery) {
      case 'eureka': {
        debug('configure provider pom dependencies for eureka');
        configurers.eureka.configureProviderPomDependencies(optionalDependencies);
        break;
      }
      //   case 'zookeeper': {
      //     break;
      //   }
      default: {
        break;
      }
    }

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
