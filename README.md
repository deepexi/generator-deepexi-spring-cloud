# DeepEXI Spring Cloud Scaffold Generator

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]
[![Build Status](https://www.travis-ci.org/deepexi/generator-deepexi-spring-cloud.svg?branch=master)](https://www.travis-ci.org/deepexi/generator-deepexi-spring-cloud)
[![codecov](https://codecov.io/gh/deepexi/generator-deepexi-spring-cloud/branch/master/graph/badge.svg)](https://codecov.io/gh/deepexi/generator-deepexi-spring-cloud)

[npm-image]: https://img.shields.io/npm/v/generator-deepexi-spring-cloud.svg
[npm-url]: https://www.npmjs.com/package/generator-deepexi-spring-cloud
[download-image]: https://img.shields.io/npm/dm/generator-deepexi-spring-cloud.svg
[download-url]: https://www.npmjs.com/package/generator-deepexi-spring-cloud

此脚手架生成器基于[Yeoman](https://yeoman.io/)构建。

[CHANGELOG](./CHANGELOG.md)

## How To

### Getting Started

#### 1. 安装yeoman

```bash
$ npm install -g yo
```

#### 2. 安装generator-deepexi-spring-cloud

```bash
$ npm install -g generator-deepexi-spring-cloud
```

#### 3. 创建你的应用

通过交互模式创建

```bash
$ mdir {your_project_name}
$ cd {your_project_name}
$ yo deepexi-spring-cloud
```

或者使用命令行模式创建

```bash
$ mdir {your_project_name}
$ cd {your_project_name}
$ yo deepexi-spring-cloud -c
```

更多帮助信息可以通过以下命令查看

```bash
$ yo deepexi-spring-cloud --help
```

#### 4. 自行修改配置

脚手架对自动集成的第三方插件都提供了默认的配置，但是有一些外部资源依赖（如mysql db, eureka server等）可能需要你在生成项目后手动进行配置，否则项目可能无法直接运行。

## Development Reference
