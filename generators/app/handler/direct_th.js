'use strict';

const _ = require('lodash')
const AbstractTemplateHandler = require('yo-power-generator').AbstractTemplateHandler;
const fileUtils = require('yo-power-generator').FileUtils;

class DirectTemplateHandler extends AbstractTemplateHandler {
  _handle0 () {
    this.generator.fs.write(
      this.generator.destinationPath(_.template(fileUtils.tmplToFileName(this.tmpl))(this.props)),
      this.generator.fs.read(this.generator.templatePath(this.tmpl))
    )
  }
}

module.exports = {
  key: 'direct',
  cls: DirectTemplateHandler
};
