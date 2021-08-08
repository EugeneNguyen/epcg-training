const pluralize = require('pluralize');
const _ = require('lodash');

const sequelize = require('../../database/models').sequelize;
const helpers = require('../../helpers');
const constant = require('../../constant');

async function info(model) {
  const fields = await sequelize.getQueryInterface().describeTable(model);
  const modelName = pluralize.singular(model);
  for (const key of Object.keys(fields)) {
    fields[key] = fixGraphType(fields[key]);
    fields[key] = fixShow(fields[key]);
    fields[key] = fixLabel(fields[key], key);
  }
  const data = {
    modelName,
    modelNameSnake: _.snakeCase(modelName),
    modelNameCapitalCamel: _.upperFirst(_.camelCase(modelName)),
    modelNameUpSnake: _.toUpper(_.snakeCase(modelName)),
    baseUrl: modelName,
    fields,
  };
  helpers.yml.write(constant.modelPath(`01_automatic/${model}.yaml`), data);
}

function fixGraphType(field) {
  if (field.type === "DATETIME") field.graphType = "String";
  if (field.type.startsWith("VARCHAR")) field.graphType = "String";
  if (field.type.startsWith("CHAR")) field.graphType = "String";
  return field
}

function fixShow(field) {
  if (field.primaryKey) {
    field.showTable = true;
    field.addForm = false;
    field.editForm = false;
    return field;
  }

  field.showTable = true;
  field.addForm = true;
  field.editForm = true;
  return field
};

function fixLabel(field, key) {
  field.displayLabel = _.startCase(key);
  return field;
}

module.exports = info;