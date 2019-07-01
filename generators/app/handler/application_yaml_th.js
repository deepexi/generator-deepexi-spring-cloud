'use strict';

const AbstractTemplateHandler = require('yo-power-generator').AbstractTemplateHandler;
const _ = require('lodash')
const fileUtils = require('yo-power-generator').FileUtils;
const myFileUtils = require('../utils/file_utils');
const yaml = require('js-yaml');
const debug = require('debug')('generator:th:application_yaml')
const configurers = require('./configurer/configurers');

class ApplicationYamlTemplateHandler extends AbstractTemplateHandler {
  _handle0 () {
    const env = myFileUtils.extractApplicationYamlEnv(this.tmpl);
    const tpl = _.template(this.generator.fs.read(this.generator.templatePath(this.tmpl)));
    const content = tpl(this.props)
    const yamlDoc = yaml.safeLoad(content) || {};

    switch (this.props.discovery) {
      case 'eureka': {
        debug(`configure application-${env}.yaml for eureka`);
        configurers.eureka.configureApplicationYaml(yamlDoc, env);
        break;
      }
      //   case 'zookeeper': {
      //     break;
      //   }
      default: {
        break;
      }
    }

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
