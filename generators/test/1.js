const _ = require('lodash')
const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '/1.tmpl'), { encoding: 'utf-8' });
console.log(_.template(content, {})({
  artifactId: 'test',
  docker: 'Dockerfile'
}))
