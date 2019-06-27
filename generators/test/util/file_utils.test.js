'use strict'
/* eslint-disable no-undef */

const assert = require('assert')
const path = require('path')
const fileUtils = require('../../util/file_utils')

describe('file utils', () => {
  describe('readAllFileRecursivelySync()', () => {
    it('should read recursively', () => {
      const files = fileUtils.readAllFileRecursivelySync(path.join(__dirname, './resources/app'))
      assert(files.includes('index.js'))
      assert(files.includes('README.md'))
      assert(files.includes('controller/home.js'))
    })
  })

  describe('isTemplate()', () => {
    it('is template', () => {
      assert(fileUtils.isTemplate('foo.tmpl.js'))
      assert(fileUtils.isTemplate('foo.tmpl'))
      assert(fileUtils.isTemplate('.tmpl.gitignore'))
      assert(fileUtils.isTemplate('app/foo.tmpl.js'))
      assert(fileUtils.isTemplate('app/foo.tmpl'))
    })

    it('is not template', () => {
      assert(!fileUtils.isTemplate('foo.js'))
      assert(!fileUtils.isTemplate('foo'))
      assert(!fileUtils.isTemplate('footmpl'))
      assert(!fileUtils.isTemplate('foo.tmpl.'))
      assert(!fileUtils.isTemplate('foo.tmpl1'))
    })
  })

  describe('tmplToFileName()', () => {
    it('is template', () => {
      assert.strictEqual(fileUtils.tmplToFileName('foo.tmpl.js'), 'foo.js')
      assert.strictEqual(fileUtils.tmplToFileName('foo.tmpl'), 'foo')
      assert.strictEqual(fileUtils.tmplToFileName('app/foo.tmpl.js'), 'app/foo.js')
    })

    it('is not template', () => {
      assert.strictEqual(fileUtils.tmplToFileName('foo.js'), 'foo.js')
      assert.strictEqual(fileUtils.tmplToFileName('foo'), 'foo')
      assert.strictEqual(fileUtils.tmplToFileName('app/foo.js'), 'app/foo.js')
    })
  })
})
