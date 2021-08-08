const path = require('path');
const helpers = require('../../helpers');
const constant = require('../../constant');

let query = {
  model_get_all(parent, args, context, info) {
    const content = helpers.yml.read(constant.modelPath("01_automatic/tables.yaml"));
    return content.tables.map(table => ({name: table}));
  },
};

module.exports = query;
