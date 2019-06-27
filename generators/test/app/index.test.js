'use strict'
/* eslint-disable no-undef */

// const assert = require('yeoman-assert')
// const helpers = require('yeoman-test')
// const path = require('path')
// const fs = require('fs')

// describe('generate app', () => {
//   before(() => {
//     return helpers
//       .run(path.join(__dirname, '../../app'))
//       .withPrompts({
//         projectName: 'taccisum-service',
//         author: 'taccisum'
//       })
//       .then(() => {
//       })
//   });

//   it('should exists project files', () => {
//     assert.file('app.js')
//     assert.file('.gitignore')
//     assert.file('.npmrc')
//     assert.file('.eslintrc')
//     assert.file('.eslintignore')
//     assert.file('.autod.conf.js')
//     assert.file('filebeat.yml')
//     assert.file('start-fb.sh')
//     assert.file('start-code.sh')
//     assert.file('package.json')
//     assert.file('Dockerfile')
//     assert.file('LICENSE')
//     assert.file('README.md')
//   })

//   it('should exists app files', () => {
//     assert.file('app/controller/home.js')
//     assert.file('app/contract/response/home.js')
//     assert.file('app/middleware/compress.js')
//     assert.file('app/middleware/payload.js')
//     assert.file('app/middleware/request_logger.js')
//     assert.file('app/model')
//     assert.file('app/service')
//   })

//   it('should exists domain files', () => {
//     assert.file('modules/domain/index.js')
//     assert.file('modules/domain/package.json')
//   })

//   it('should exists config files', () => {
//     assert.file('config/config.default.js')
//     assert.file('config/config.local.js')
//     assert.file('config/config.dev.js')
//     assert.file('config/config.qa.js')
//     assert.file('config/config.prod.js')
//     assert.file('config/plugin.js')
//   })

//   it('should exists unit test files', () => {
//     assert.file('test/app/controller/home.test.js')
//     assert.file('test/domain/index.test.js')
//   })
// })

// describe('package.json content', () => {
//   describe('default dependencies', () => {
//     let pkg = {};
//     before(() => {
//       return helpers
//         .run(path.join(__dirname, '../../app'))
//         .withPrompts({
//           projectName: 'taccisum-service',
//           author: 'taccisum'
//         })
//         .then(() => {
//           pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
//         })
//     })

//     it('should have project info', () => {
//       assert(pkg.name === 'taccisum-service');
//       assert(pkg.author === 'taccisum');
//     })

//     it('should have dependencies', () => {
//       assert(pkg.dependencies['egg']);
//       assert(pkg.dependencies['egg-scripts']);
//       assert(pkg.dependencies['egg-validate']);
//       assert(pkg.dependencies['koa-logger']);
//       assert(pkg.dependencies['koa-compress']);
//       assert(pkg.dependencies['lodash']);
//       assert(pkg.dependencies['egg-validate-plus']);
//       assert(pkg.dependencies['@taccisum/egg-eureka']);
//       assert(pkg.dependencies['egg-swagger-doc']);
//       assert(pkg.dependencies['@taccisum/egg-utils']);
//       assert(pkg.dependencies['deepexi-onerror']);
//       assert(pkg.dependencies['deepexi-body']);
//     })

//     it('should have config', () => {
//       assert.fileContent([
//         ['config/config.default.js', /config.eureka.*=/],
//         ['config/config.local.js', /eureka.*:/],
//         ['config/plugin.js', /eureka.*:/],

//         ['config/config.default.js', /config.swagger.*=/],
//         ['config/config.prod.js', /swagger.*:/],
//         ['config/plugin.js', /swagger.*:/],

//         ['config/plugin.js', /utils.*:/],

//         ['config/config.default.js', /require\('deepexi-onerror'\)/],
//         ['config/config.default.js', /config.onerror.*=/],

//         ['config/config.default.js', /config.payload.*=/]
//       ])
//     })
//   })

//   describe('db dependencies', () => {
//     describe('mongo', () => {
//       let pkg = {};
//       before(() => {
//         return helpers
//           .run(path.join(__dirname, '../../app'))
//           .withPrompts({
//             author: 'taccisum',
//             db: 'mongo'
//           })
//           .then(() => {
//             pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
//           })
//       })

//       it('should have dependencies', () => {
//         assert(pkg.dependencies['egg-mongoose']);
//       })

//       it('should have config', () => {
//         assert.fileContent([
//           ['config/config.default.js', /config.mongoose.*=/],
//           ['config/plugin.js', /mongoose.*:/]
//         ])
//       })
//     })

//     describe('mysql', () => {
//       let pkg = {};
//       before(() => {
//         return helpers
//           .run(path.join(__dirname, '../../app'))
//           .withPrompts({
//             author: 'taccisum',
//             db: 'mysql'
//           })
//           .then(() => {
//             pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
//           })
//       })

//       it('should have dependencies', () => {
//         assert(pkg.dependencies['egg-sequelize']);
//         assert(pkg.dependencies['mysql2']);
//       })

//       it('should have config', () => {
//         assert.fileContent([
//           ['config/config.default.js', /config.sequelize.*=/],
//           ['config/plugin.js', /sequelize.*:/]
//         ])
//       })
//     })

//     describe('none', () => {
//       let pkg = {};
//       before(() => {
//         return helpers
//           .run(path.join(__dirname, '../../app'))
//           .withPrompts({
//             author: 'taccisum',
//             db: 'none'
//           })
//           .then(() => {
//             pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
//           })
//       })

//       it('should have not dependencies', () => {
//         assert(!pkg.dependencies['egg-mongoose']);
//         assert(!pkg.dependencies['egg-sequelize']);
//       })

//       it('should have not config', () => {
//         assert.noFileContent([
//           ['config/config.default.js', /config.mongoose.*=/],
//           ['config/plugin.js', /mongoose.*:/],
//           ['config/config.default.js', /config.sequelize.*=/],
//           ['config/plugin.js', /sequelize.*:/]
//         ])
//       })
//     })
//   })

//   describe('config service dependencies', () => {
//     describe('apollo', () => {
//       let pkg = {};
//       before(() => {
//         return helpers
//           .run(path.join(__dirname, '../../app'))
//           .withPrompts({
//             author: 'taccisum',
//             configservice: 'apollo'
//           })
//           .then(() => {
//             pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
//           })
//       })

//       it('should have dependencies', () => {
//         assert(pkg.dependencies['@taccisum/egg-apollo']);
//       })

//       it('should have config', () => {
//         assert.fileContent([
//           ['config/config.default.js', /config.apollo.*=/],
//           ['config/plugin.js', /apollo.*:/]
//         ])
//       })
//     })

//     describe('none', () => {
//       let pkg = {};
//       before(() => {
//         return helpers
//           .run(path.join(__dirname, '../../app'))
//           .withPrompts({
//             author: 'taccisum',
//             configservice: 'none'
//           })
//           .then(() => {
//             pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
//           })
//       })

//       it('should have not dependencies', () => {
//         assert(!pkg.dependencies['@taccisum/egg-apollo']);
//       })

//       it('should have not config', () => {
//         assert.noFileContent([
//           ['config/config.default.js', /config.apollo.*=/],
//           ['config/plugin.js', /apollo.*:/]
//         ])
//       })
//     })
//   })

//   describe('router dependencies', () => {
//     describe('default', () => {
//       before(() => {
//         return helpers
//           .run(path.join(__dirname, '../../app'))
//           .withPrompts({
//             author: 'taccisum',
//             router: 'default'
//           })
//           .then(() => {
//           })
//       })

//       it('should exist files', () => {
//         assert.file('app/router.js')
//       })
//     })

//     describe('router-plus', () => {
//       let pkg;
//       before(() => {
//         return helpers
//           .run(path.join(__dirname, '../../app'))
//           .withPrompts({
//             author: 'taccisum',
//             router: 'router-plus'
//           })
//           .then(() => {
//             pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
//           })
//       })

//       it('should exist files', () => {
//         assert.file('app/router/home.js')
//       })

//       it('should have dependencies', () => {
//         assert(pkg.dependencies['egg-router-plus']);
//       })

//       it('should have config', () => {
//         assert.fileContent([
//           ['config/plugin.js', /routerPlus.*:/]
//         ])
//       })
//     })
//   })
// })
