'use strict';

const AbstractTemplateHandler = require('../abstract_template_handler');
const _ = require('lodash')
const fileUtils = require('../../../util/file_utils')

class DefaultTemplateHandler extends AbstractTemplateHandler {
  _handle0 () {
    const tpl = _.template(this.generator.fs.read(this.generator.templatePath(this.tmpl)))
    this.generator.fs.write(this.generator.destinationPath(fileUtils.tmplToFileName(this.tmpl)), tpl(this.props))
  }
}

module.exports = {
  key: 'default',
  cls: DefaultTemplateHandler
};
