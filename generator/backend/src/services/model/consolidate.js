const _ = require('lodash');
const constant = require('../../constant');
const helpers = require('../../helpers');

function consolidate(model) {
  const auto_data = helpers.yml.read(constant.modelPath(`01_automatic/${model}.yaml`));
  const manual_data = helpers.yml.read(constant.modelPath(`03_manual/${model}.yaml`));
  const consolidated_data = _.merge(auto_data, manual_data);

  consolidated_data.fieldsArray = Object.keys(consolidated_data.fields)
    .map(field => ({...consolidated_data.fields[field], name: field}));

  helpers.yml.write(constant.modelPath(`04_consolidated/${model}.yaml`), consolidated_data);
}

module.exports = consolidate;