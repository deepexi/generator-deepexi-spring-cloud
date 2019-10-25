'use strict';

const AbstractTemplateHandler = require('yo-power-generator').AbstractTemplateHandler;
const _ = require('lodash')
const fileUtils = require('yo-power-generator').FileUtils;

class DefaultTemplateHandler extends AbstractTemplateHandler {
  _handle0 () {
    const tpl = _.template(this.generator.fs.read(this.generator.templatePath(this.tmpl)));
    const destTpl = _.template(fileUtils.tmplToFileName(this.tmpl));
    const props = {};
    _.assignIn(props, this.props, {
      props: this.props // for template reference
    })
    this.generator.fs.write(
      this.generator.destinationPath(destTpl(props)),
      tpl(props)
    )
  }
}

module.exports = {
  key: 'default',
  cls: DefaultTemplateHandler
};
