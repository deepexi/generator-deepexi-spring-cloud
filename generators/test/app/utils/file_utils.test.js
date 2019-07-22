/* eslint-disable no-undef */

const fileUtils = require('../../../app/utils/file_utils');
const assert = require('assert');

describe('generators/app/utils/file_utils.test.js', () => {
  describe('isBootstrapYam()', () => {
    it('should pass on simple cases', () => {
      assert(fileUtils.isBootstrapYaml('bootstrap.yml') === true);
      assert(fileUtils.isBootstrapYaml('bootstrap.yaml') === true);
      assert(fileUtils.isBootstrapYaml('bootstrap.tmpl.yaml') === true);
      assert(fileUtils.isBootstrapYaml('bootstrap.tmpl_app_yml.yml') === true);
      assert(fileUtils.isBootstrapYaml('/abc/bootstrap.tmpl_app_yml.yml') === true);
    });

    it('should fail on error style', () => {
      assert(fileUtils.isBootstrapYaml('bootstrap1.tmpl.yaml') === false);
      assert(fileUtils.isBootstrapYaml('1bootstrap.tmpl.yaml') === false);
    });
  });

  describe('extractApplicationYamlEnv()', () => {
    it('should pass on simple cases', () => {
      assert(fileUtils.extractApplicationYamlEnv('application-local.yml') === 'local');
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
