/* eslint-disable no-undef */

const fileUtils = require('../../../app/utils/file_utils');
const assert = require('assert');

describe('generators/app/utils/file_utils.test.js', () => {
  describe('extractApplicationYamlEnv()', () => {
    it('should pass on simple cases', () => {
      assert(fileUtils.extractApplicationYamlEnv('application-local.yaml') === 'local');
      assert(fileUtils.extractApplicationYamlEnv('application-prod.yaml') === 'prod');
    });

    it('should return default on env not specified', () => {
      assert(fileUtils.extractApplicationYamlEnv('application.yaml') === 'default');
    });

    it('should pass on complex cases', () => {
      assert(fileUtils.extractApplicationYamlEnv('application-local.tmpl.yaml') === 'local');
      assert(fileUtils.extractApplicationYamlEnv('application.tmpl.yaml') === 'default');
    });

    it('should return unknown on match fail', () => {
      assert(fileUtils.extractApplicationYamlEnv('app-local.yaml') === 'unknown');
      assert(fileUtils.extractApplicationYamlEnv('app.local.yaml') === 'unknown');
    });
  });
});
