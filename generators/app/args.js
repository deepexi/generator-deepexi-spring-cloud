const _ = require('lodash');

const obj = {
    orgName: {
        prompting: {
            type: 'input',
            message: '请输入你的组织名称（可空）',
        },
        option: { desc: '组织名称', type: String, default: '' }
    },
}

module.exports.args = obj;
module.exports.Adapter = class {
    constructor(args) {
        this.args = args;
        this.cache = {};
    }

    _getCache(key, fn) {
        if (key) {
            if (!this.cache[key]) {
                if (fn instanceof Function) {
                    const val = fn();
                    this.cache[key] = val;
                } else {
                    return;
                }
            }
            return this.cache[key];
        }
    }

    toOptions() {
        const args = this.args;
        return this._getCache('options', () => {
            return Object.keys(args).map(key => {
                const val = args[key];
                if (val.option) {
                    return {
                        key,
                        val: val.option
                    }
                }
            }).filter(option => {
                return option ? true : false;
            })
        })
    }

    toPromptings() {
        const args = this.args;
        return this._getCache('promptings', () => {
            const promptings = Object.keys(args).map(key => {
                if (args[key].prompting) {
                    return _.merge(args[key].prompting, {
                        name: key
                    });
                }
            }).filter(prompting => {
                return prompting ? true : false;
            })
            return promptings;
        })
    }
}

// module.exports = [
//     {
//     },
//     {
//         type: 'input',
//         name: 'projectName',
//         message: '请输入你的项目名称',
//         default: 'deepexi-spring-cloud'
//     },
//     {
//         type: 'input',
//         name: 'author',
//         message: '请输入你的名称',
//         validate: (msg) => {
//             if (msg) {
//                 if (regUtils.isEnglishName(msg)) {
//                     return true;
//                 } else {
//                     return '只支持英文名称';
//                 }
//             } else {
//                 return '名称不能为空';
//             }
//         }
//     },
//     {
//         type: 'list',
//         choices: [
//             'router-plus',
//             'default'
//         ],
//         name: 'router',
//         message: '请选择路由组件'
//     },
//     {
//         type: 'list',
//         choices: [
//             'mongo',
//             'mysql',
//             'none'
//         ],
//         name: 'db',
//         message: '请选择你使用的数据库'
//     },
//     {
//         type: 'list',
//         choices: [
//             'apollo',
//             'none'
//         ],
//         name: 'configservice',
//         message: '请选择你的配置中心类型'
//     }
// ];
