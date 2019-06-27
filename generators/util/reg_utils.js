'use strict';

module.exports = {
  /**
   * 判断是否英文名称
   * @param {string} str
   */
  isEnglishName (str) {
    return /^(\w|\x20)+$/.test(str);
  },

  isWord (str) {
    return /^[a-zA-Z]+$/.test(str);
  }
};
