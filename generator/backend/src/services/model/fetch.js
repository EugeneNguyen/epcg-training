const sequelize = require('../../database/models').sequelize;
const helpers = require('../../helpers/index');
const constant = require('../../constant/index');

async function fetch() {
  const tableObj = await sequelize.getQueryInterface().showAllSchemas();
  const tables = tableObj.map(obj => Object.values(obj).pop());
  helpers.yml.write(
    constant.modelPath("01_automatic/tables.yaml"),
    {tables},
  );
}

module.exports = fetch;