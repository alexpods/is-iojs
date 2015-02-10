'use strict';

var childProcess = require('child_process');

var isIojs = function () {
  return /iojs\.org/.test(childProcess.execSync('node -h', { encoding: 'utf8' }));
};

module.exports = isIojs;
