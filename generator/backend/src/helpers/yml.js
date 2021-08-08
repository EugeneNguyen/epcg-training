const yaml = require('js-yaml');
const fs = require('fs');

const UTF8 = 'utf8';

function read(file) {
  try {
    const yamlStr = fs.readFileSync(file, UTF8)
    return yaml.load(yamlStr);
  }
  catch (error) {
    return null;
  }
}

function write(file, data) {
  const yamlStr = yaml.dump(data);
  fs.writeFileSync(file, yamlStr, UTF8);
}

module.exports = {
  read,
  write,
};
