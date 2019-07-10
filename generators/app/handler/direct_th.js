'use strict';

const AbstractTemplateHandler = require('yo-power-generator').AbstractTemplateHandler;
const fileUtils = require('yo-power-generator').FileUtils;

class DirectTemplateHandler extends AbstractTemplateHandler {
  _handle0 () {
    this.generator.fs.write(
      this.generator.destinationPath(fileUtils.tmplToFileName(this.tmpl)),
      this.generator.fs.read(this.generator.templatePath(this.tmpl))
    )
  }
}

module.exports = {
  key: 'direct',
  cls: DirectTemplateHandler
};
