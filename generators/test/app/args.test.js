/* eslint-disable no-undef */
const Adapter = require('../../app/args').Adapter;
const assert = require('assert');

describe('args.test.js', () => {
  describe('toPrompting()', () => {
    it('should have prop name', () => {
      const promptings = new Adapter({
        foo: {
          prompting: {
            key1: 'val1'
          }
        }
      }).toPromptings();
      assert(promptings instanceof Array);
      assert(promptings.length === 1);
      assert(promptings[0].name === 'foo');
      assert(promptings[0].key1 === 'val1');
    });

    it('should override prop name if specify', () => {
      const promptings = new Adapter({
        foo: {
          prompting: {
            name: 'hhh'
          }
        }
      }).toPromptings();
      assert(promptings[0].name === 'foo');
    });

    it('should have multi-item on multi-key', () => {
      const promptings = new Adapter({
        foo: { prompting: {} },
        bar: { prompting: {} }
      }).toPromptings();
      assert(promptings.length === 2);
    });

    it('should be filtered on prompting undefined', () => {
      const prompting = new Adapter({
        foo: { hhh: {} }
      }).toPromptings();
      assert(prompting.length === 0);
    });
  });

  describe('toOptions()', () => {
    it('should have key and val', () => {
      const options = new Adapter({
        foo: {
          option: {
            key1: 'val1'
          }
        }
      }).toOptions();
      assert(options instanceof Array);
      assert(options.length === 1);
      assert(options[0].key === 'foo');
      assert(options[0].val.key1 === 'val1');
    });

    it('should have multi-item on multi-key', () => {
      const options = new Adapter({
        foo: { option: {} },
        bar: { option: {} }
      }).toOptions();
      assert(options.length === 2);
    });

    it('should be filtered on option undefined', () => {
      const options = new Adapter({
        foo: { hhh: {} }
      }).toOptions();
      assert(options.length === 0);
    });
  });

  describe('_getCache()', () => {
    let adapter;

    beforeEach(() => {
      adapter = new Adapter({});
    });

    it('should get val', () => {
      assert(adapter._getCache('foo', () => { return 'bar' }) === 'bar');
    });

    it('should get cache', () => {
      adapter._getCache('foo', () => { return 'bar' });
      assert(adapter._getCache('foo') === 'bar');
      assert(adapter._getCache('foo', () => { return 'bbb' }) === 'bar');
    });

    it('should undefined on key null', () => {
      assert(adapter._getCache() === undefined);
    });

    it('should undefined on fn null when get first', () => {
      assert(adapter._getCache('foo') === undefined);
    });
  });
});
