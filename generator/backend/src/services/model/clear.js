const fs = require('fs');
const constant = require('../../constant');

function clear() {
  fs.rmdirSync(constant.modelPath("01_automatic"), { recursive: true });
  fs.rmdirSync(constant.modelPath("04_consolidated"), { recursive: true });
  fs.mkdirSync(constant.modelPath(), { recursive: true });
  fs.mkdirSync(constant.modelPath("01_automatic"), { recursive: true });
  fs.mkdirSync(constant.modelPath("03_manual"), { recursive: true });
  fs.mkdirSync(constant.modelPath("04_consolidated"), { recursive: true });
}

module.exports = clear;