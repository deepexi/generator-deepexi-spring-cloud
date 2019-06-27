const _ = require('lodash');

const obj = {
  orgName: {
    prompting: {
      type: 'input',
      message: '请输入你的组织名称（可空）'
    },
    option: { desc: '组织名称', type: String, default: '' }
  }
}

module.exports.args = obj;
module.exports.Adapter = class {
  constructor (args) {
    this.args = args;
    this.cache = {};
  }

  _getCache (key, fn) {
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

  toOptions () {
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
        return !!option;
      })
    })
  }

  toPromptings () {
    const args = this.args;
    return this._getCache('promptings', () => {
      const promptings = Object.keys(args).map(key => {
        if (args[key].prompting) {
          return _.merge(args[key].prompting, {
            name: key
          });
        }
      }).filter(prompting => {
        return !!prompting;
      })
      return promptings;
    })
  }
}
