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
      message: '请输入你的artifact id',
      default: 'deepexi-spring-cloud'
    },
    option: { desc: 'artifact id', type: String, default: 'deepexi-spring-cloud' }
  },
  basePackage: {
    prompting: {
      type: 'input',
      message: '请输入你的基础包路径（为空则使用group id）'
    },
    option: { desc: 'artifact id', type: String, default: '' }
  },
  mavenUrl: {
    prompting: {
      type: 'input',
      message: '请输入你的maven仓库地址',
      default: 'http://nexus.deepexi.top/repository/maven-public/'
    },
    option: { desc: 'maven仓库url', type: String, default: 'http://nexus.deepexi.top/repository/maven-public/' }
  }
}

module.exports = require('yo-power-generator').getGenerator(obj, {
  handlerDir: path.join(__dirname, 'handler'),
  templateDir: path.join(__dirname, 'templates'),
  beforeWrite (props) {
    if (!props.basePackage) {
      props.basePackage = props.groupId;
    }
    props.basePath = props.basePackage.replace(/\./g, '/');
  }
});
