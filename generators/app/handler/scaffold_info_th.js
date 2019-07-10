'use strict';

const AbstractTemplateHandler = require('yo-power-generator').AbstractTemplateHandler;
const _ = require('lodash')
const fileUtils = require('yo-power-generator').FileUtils;
const cp = require('child_process');
const moment = require('moment');

class DefaultTemplateHandler extends AbstractTemplateHandler {
  _handle0 () {
    const tpl = _.template(this.generator.fs.read(this.generator.templatePath(this.tmpl)));
    const destTpl = _.template(fileUtils.tmplToFileName(this.tmpl));

    let yoVer = 'unknown';
    try {
      yoVer = cp.execSync('yo --version', { encoding: 'utf-8' }).replace('\r', '').replace('\n', '');
    } catch (e) {
      // ingore error for unit test environment
    }

    this.generator.fs.write(
      this.generator.destinationPath(destTpl(this.props)),
      tpl(_.assignIn({
        toolVersion: 'v' + this.props.version,
        yoVersion: 'v' + yoVer,
        nodeVersion: process.version,
        date: moment().format('YYYY-MM-DD hh:mm:ss'),
        propsJson: JSON.stringify(this.props),
        generationType: this.props.mode === 'command' ? '命令模式' : '交互模式'
      }, this.props))
    )
  }
}

module.exports = {
  key: 'scaffold_info',
  cls: DefaultTemplateHandler
};
