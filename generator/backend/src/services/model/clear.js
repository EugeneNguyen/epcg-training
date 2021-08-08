const fs = require('fs');
const constant = require('../../constant');

function clear() {
  fs.rmdirSync(constant.modelPath("automatic"), { recursive: true });
  fs.rmdirSync(constant.modelPath("consolidated"), { recursive: true });
  fs.mkdirSync(constant.modelPath(), { recursive: true });
  fs.mkdirSync(constant.modelPath("automatic"), { recursive: true });
  fs.mkdirSync(constant.modelPath("manual"), { recursive: true });
  fs.mkdirSync(constant.modelPath("consolidated"), { recursive: true });
}

module.exports = clear;