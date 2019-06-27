'use strict';

const fs = require('fs');
const path = require('path');
const fileUtils = require('../../util/file_utils');

const handlers = {};
const files = fs.readdirSync(path.join(__dirname, 'concrete'));
files.forEach(file => {
  const obj = require(path.join(__dirname, 'concrete', file));
  handlers[obj.key] = obj.cls;
})

class TemplateHandlerFactory {
  static create (tmpl, generator, props) {
    const type = fileUtils.extractTmplType(tmpl);
    let Cls = handlers[type];
    return new Cls(tmpl, generator, props);
  }
}

module.exports = TemplateHandlerFactory;
