'use strict'
var Generator = require('yeoman-generator');

const path = require('path');
const fileUtils = require('../util/file_utils');
const Adapter = require('./args').Adapter;
const args0 = new Adapter(require('./args').args);

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    const _this = this;

    this.option('command', { desc: '使用命令模式（非交互操作）', alias: 'c', type: Boolean, default: false });
    args0.toOptions().forEach(option => {
      _this.option(option.key, option.val);
    })
  }

  catch(e) {
    // if (e) {
    // console.log(e)
    // }
  };

  async prompting() {
    if (!this.options.command) {
      this.props = await this.prompt(args0.toPromptings());
    } else {
      args0.toOptions().forEach(option => {
        this.props[key] = _this.option[option.key];
      })
    }

    this.props.dependencies = {
      utils: true,
    }
  }

  write() {
    const dir = path.join(__dirname, './templates')
    const files = fileUtils.readAllFileRecursivelySync(dir)

    files.forEach(f => {
      if (fileUtils.isTemplate(f)) {
        TemplateHandlerFactory.create(f, this, this.props).handle();
      }
    })
  }
}
