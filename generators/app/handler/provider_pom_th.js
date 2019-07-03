'use strict';

const AbstractTemplateHandler = require('yo-power-generator').AbstractTemplateHandler;
const _ = require('lodash')
const fileUtils = require('yo-power-generator').FileUtils;
const xml = require('xml');
const configurers = require('./configurer/configurers');
const prettifyXml = require('prettify-xml')

class ProviderPomTemplateHandler extends AbstractTemplateHandler {
  _notify (receiver, event, args) {
    return receiver.receive(event, args);
  }

  _handle0 () {
    const optionalDependencies = []

    this._notify(configurers, 'configure_optional_dependencies', {
      optionalDependencies,
      props: this.props
    });

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
