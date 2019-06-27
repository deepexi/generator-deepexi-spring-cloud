'use strict'

const path = require('path');

const obj = {
  groupId: {
    prompting: {
      type: 'input',
      message: '请输入你的group id',
      default: 'com.deepexi'
    },
    option: { desc: 'group id', type: String, default: 'com.deepexi' }
  },
  artifactId: {
    prompting: {
      type: 'input',
      message: '请输入你的app id',
      default: 'deepexi-spring-cloud'
    },
    option: { desc: '项目名称', type: String, default: 'deepexi-spring-cloud' }
  }
}

module.exports = require('yo-power-generator').getGenerator(obj, {
  handlerDir: path.join(__dirname, 'handler'),
  templateDir: path.join(__dirname, 'templates'),
  beforeWrite (props) {
    if (!props.basePath) {
      props.basePath = props.groupId.replace('.', '/');
    }
  }
});
