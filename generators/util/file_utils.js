const fs = require('fs')
const path = require('path')

module.exports = {

  /**
     * 判断是否模板文件
     * @param {string} file 文件名
     */
  isTemplate (file) {
    const regexp = /^.*\.tmpl(\..+)?$/
    return regexp.test(file)
  },

  /**
     * 将模板文件名转换为文件名
     * @param {string} tmpl 模板文件名
     */
  tmplToFileName (tmpl) {
    const file = tmpl.replace(/.tmpl/, '')
    return file
  },

  /**
     * 递归读取目录文件，并返回相对路径
     *
     * @param {*} dir 要读取的目录
     * @param {*} files 递归参数，一般不需要传
     * @param {*} relative 递归参数，一般不需要传
     */
  readAllFileRecursivelySync (dir, files, relative = '') {
    if (!fs.statSync(dir).isDirectory()) {
      throw new Error('abs path is not dir!')
    }
    if (!files) {
      files = []
    }

    const ls = fs.readdirSync(dir)

    ls.forEach(f => {
      const fpath = path.join(dir, f)
      const rela = path.join(relative, f)
      if (fs.statSync(fpath).isDirectory()) {
        this.readAllFileRecursivelySync(fpath, files, rela)
      } else {
        files.push(rela)
      }
    })
    return files
  }
}
