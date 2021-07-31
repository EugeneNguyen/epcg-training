#!/usr/bin/env node

const fs = require('fs');
const sequelize = require('../src/database/models').sequelize;
const _ = require('lodash')
const args = require('args');
const helpers = require('../src/helpers/index');

args
  .option('command', 'all_table | table_info')
  .option('table', 'Table name')

const flags = args.parse(process.argv)

if (flags.command === "clear") {
  fs.rmdirSync("../models", { recursive: true });
  fs.mkdirSync("../models", { recursive: true });
  fs.mkdirSync("../models/automatic", { recursive: true });
  fs.mkdirSync("../models/manual", { recursive: true });
  fs.mkdirSync("../models/consolidated", { recursive: true });
}

if (flags.command === "all_table") {
  sequelize.getQueryInterface().showAllSchemas().then((tableObj) => {
    const tables = tableObj.map(obj => obj['Tables_in_nexus_resource']);
    helpers.yml.write(
      '../models/automatic/tables.yaml',
      {tables},
    );
  })
    .catch((err) => {
      console.log('showAllSchemas ERROR',err);
    })
}

if (flags.command === "table_info") {
  sequelize.getQueryInterface().describeTable(flags.table).then(fields => {
    helpers.yml.write(
      `../models/automatic/${flags.table}.yaml`,
      {
        modelName: flags.table,
        fields
      }
    );
  })
    .catch((err) => {
      console.log('showAllSchemas ERROR',err);
    })
}

if (flags.command === "consolidate") {
  const auto_data = helpers.yml.read(`../models/automatic/${flags.table}.yaml`);
  const manual_data = helpers.yml.read(`../models/manual/${flags.table}.yaml`);
  const consolidated_data = _.merge(auto_data, manual_data);

  consolidated_data.fieldsArray = Object.keys(consolidated_data.fields)
    .map(field => ({...consolidated_data.fields[field], name: field}));

  helpers.yml.write(`../models/consolidated/${flags.table}.yaml`, consolidated_data);
}