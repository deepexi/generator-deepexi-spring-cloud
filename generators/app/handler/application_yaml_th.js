'use strict';

const AbstractTemplateHandler = require('yo-power-generator').AbstractTemplateHandler;
const _ = require('lodash')
const fileUtils = require('yo-power-generator').FileUtils;
const myFileUtils = require('../utils/file_utils');
const yaml = require('js-yaml');
const debug = require('debug')('generator:th:application_yaml')
const configurers = require('./configurer/configurers');

class ApplicationYamlTemplateHandler extends AbstractTemplateHandler {
  _notify (receiver, event, args) {
    return receiver.receive(event, args);
  }

  _handle0 () {
    let env;
    let isBootstrap = false;
    debug(`${this.tmpl} is bootstrap: ${myFileUtils.isBootstrapYaml(this.tmpl)}`);
    if (myFileUtils.isBootstrapYaml(this.tmpl)) {
      isBootstrap = true;
      env = 'none';
    } else {
      env = myFileUtils.extractApplicationYamlEnv(this.tmpl);
    }
    const tpl = _.template(this.generator.fs.read(this.generator.templatePath(this.tmpl)));
    const content = tpl(this.props)
    const yamlDoc = yaml.safeLoad(content) || {};

    this._notify(configurers, 'configure_application_yaml', {
      isBootstrap,
      yaml: yamlDoc,
      env,
      props: this.props
    });

    const destTpl = _.template(fileUtils.tmplToFileName(this.tmpl));
    this.generator.fs.write(
      this.generator.destinationPath(destTpl(this.props)),
      Object.keys(yamlDoc).length > 0 ? yaml.safeDump(yamlDoc) : '' // 避免空对象被渲染为字符串'{}'
    )
  }
}

module.exports = {
  key: 'app_yml',
  cls: ApplicationYamlTemplateHandler
};
