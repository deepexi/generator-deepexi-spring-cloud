'use strict';

class AbstractTemplateHandler {
  constructor (tmpl, generator, props) {
    this.tmpl = tmpl;
    this.generator = generator;
    this.props = props;
  }

  handle () {
    if (this._ignore()) {
      return;
    }
    this._handle0();
  }

  _ignore () {
    return false;
  }

  _handle0 () {
    throw new Error('must implement _handle0()');
  }
}

module.exports = AbstractTemplateHandler;
