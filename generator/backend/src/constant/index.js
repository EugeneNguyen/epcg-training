const path = require('path');

module.exports = {
  modelPath: (subpath = '') => path.join(__dirname, "../../../../models", subpath),
  frontendPath: (subpath = '') => path.join(__dirname, "../../../../frontend/src/generator", subpath),
  graphqlPath: (subpath = '') => path.join(__dirname, "../../../../backend/src/models", subpath),
}
