const fs = require('fs');
const path = require('path');

const configurers = {};

const files = fs.readdirSync(__dirname);
files.forEach(file => {
  const obj = require(path.join(__dirname, file));
  if (obj.key && obj.fn) {
    configurers[obj.key] = obj.fn;
  }
})

module.exports = configurers;
